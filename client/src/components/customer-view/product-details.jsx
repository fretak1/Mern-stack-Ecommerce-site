import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/customer/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/customer/product-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/customer/review-slice";


function ProductDetailsDialog({open, setOpen,ProductDetail}) {

    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.auth)
    const {toast} = useToast()
    const {cartItems} = useSelector(state => state.customerCart)
    const {reviews} = useSelector(state => state.customerReview)

    const [reviewMsg,setReviewMesg] = useState('')
    const [rating,setRating] = useState(0)

    function handleRatingChange(getRating) {
      setRating(getRating)
    }

   function handleAddToCart(getCurrentProductId,getTotalStock) {

    let getCartItems = cartItems.items || []

  if(getCartItems.length) {
    const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId)
    if(indexOfCurrentItem > -1) {
      const getQuantity = getCartItems[indexOfCurrentItem].quantity
      if(getQuantity + 1 > getTotalStock) {
        toast({
          title : `Only ${getQuantity} quantity can be added for this item`,
          variant : 'destructive'
        })

        return;
      }
    }
    
  }    
    dispatch(addToCart({userId : user?.id ,productId : getCurrentProductId ,quantity : 1}))
    .then((data) => {
      if(data?.payload?.success) {
        dispatch(fetchCartItems(user?.id))
        toast({
          title : "product is added to cart"
        })
      }
    })
   }

   function handleDialogClose() {
     setOpen(false);
     dispatch(setProductDetails())
     setRating(0)
     setReviewMesg('')
   }
  
   function handleAddReview() {
     dispatch(addReview({
        productId : ProductDetail?._id,
        userId : user?.id,
        userName : user?.userName,
        reviewMessage : reviewMsg,
        reviewValue : rating
     })).then((data) => {
            if(data?.payload?.success) {
              setRating(0)
              setReviewMesg('')
            dispatch(getReviews(ProductDetail?._id))
            toast({
          title : "Review  added successfully"
        })
      }
     })
   }

   useEffect(() => {
    if(ProductDetail !== null) dispatch(getReviews(ProductDetail?._id))
   },[ProductDetail])

    const averageReview = reviews && reviews.length > 0 ? reviews.reduce((sum,reviewItem) => 
      sum + reviewItem.reviewValue, 0) / reviews.length : 0
    
    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                  src={ProductDetail?.image} 
                  alt={ProductDetail?.title}
                  width={600}
                  height={600}
                  className="aspect-square w-full object-cover"
                   />
                </div>
                <div className="">
                  <div>
                    <h1 className="text-3xl font-extrabold ">{ProductDetail?.title}</h1>
                    <p className="text-muted-foreground text-2xl mb-5 mt-4">{ProductDetail?.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`text-3xl font-bold text-primary
                      ${ProductDetail?.salePrice > 0 ? 'line-through':""}`}>${ProductDetail?.price}</p>
                      {
                        ProductDetail?.salePrice > 0 ? <p className="text-2xl font-bold text-muted-foreground">${ProductDetail?.salePrice}</p> : null
                      }
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-0.5">
                               <StarRatingComponent rating={averageReview}/>

                     </div>
                     <span className="text-muted-foreground">({averageReview.toFixed(1)})</span>
                  </div>
                  <div className="mt-5 mb-5">
                    {
                        ProductDetail?.totalStock === 0 ?  <Button className="w-full cursor-not-allowed opacity-55" 
                   onClick={()=> handleAddToCart(ProductDetail?._id)}>
                    Out Of Stock</Button> :  <Button className="w-full" 
                   onClick={()=> handleAddToCart(ProductDetail?._id,ProductDetail?.totalStock)}>
                    Add To Cart</Button>
                    }
                         
                  </div>
                  <Separator/>
                  <div className="max-h-[300px] overflow-auto">
                    <h2 className="text-xl font-bold mb-4">Reviews</h2>
                    <div className="grid gap-6">
                      {
                        reviews && reviews.length > 0 ? 
                        reviews.map(reviewItem =>                         <div className="flex gap-4">
                          <Avatar className="w-10 h-10 border">
                            <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="grid gap-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold">{reviewItem?.userName}</h3>
                            </div>
                            <div className="flex items-center gap-0.5">
                               <StarRatingComponent rating={reviewItem?.reviewValue}/>
                            </div>
                            <p className="text-muted-foreground">{reviewItem?.reviewMessage}</p>
                          </div>
                        </div> ) : 
                        <h1>No Review</h1>
                      }
                    </div>
                    <div className="mt-10 flex-col flex gap-2">
                        <Label>Write a review</Label>
                        <div className="flex gap-2">
                          <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
                        </div>
                        <Input name="reviewMsg" value={reviewMsg} onChange={(event) => setReviewMesg(event.target.value)} placeholder="write a rieview..."/>
                        <Button  onClick={handleAddReview} disabled={reviewMsg.trim() === ''}>Submit</Button>
                    </div>
                  </div>
                </div>
            </DialogContent> 
        </Dialog>
    )
}

export default ProductDetailsDialog