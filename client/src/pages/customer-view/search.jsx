import { Input } from "@/components/ui/input";
import { getSearchResult, resetSearchResult } from "@/store/customer/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CustomerProductTile from "./product-tile";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/customer/cart-slice";
import { fetchProductDetails } from "@/store/customer/product-slice";
import ProductDetailsDialog from "@/components/customer-view/product-details";

function SearchProducts() {

    const [keyword,setKeyword] = useState('')
    const [searchParams,setSearchParams] = useSearchParams()
   const {productList,productDetail} = useSelector(state => state.customerProducts)
   const [openDetailsDialoge,setOpenDetailsDialoge] = useState(false)
    const {searchResult} = useSelector(state => state.customerSearch)
    const {cartItems} = useSelector(state => state.customerCart)
    const dispatch = useDispatch()
    const {toast} = useToast()
   const {user} = useSelector(state => state.auth)

    useEffect(() => {
    if(productDetail !== null) setOpenDetailsDialoge(true)
  },[productDetail])
    
    useEffect(() => {
      if(keyword && keyword.trim() !== '' && keyword.trim().length >= 3) {
          setTimeout(() => {
           setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
           dispatch(getSearchResult(keyword))
          },1000)
      } else {
           setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
           dispatch(resetSearchResult())
      }
    },[keyword])

 function handleAddToCart(getCurrentProductId, getTotalStock) {
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

   function handleGetProductDetails(getCurrentProductId) {
     dispatch(fetchProductDetails(getCurrentProductId))
   }

    return (
        <div className="container mx-auto md:px-6 px-4 py-8">
          <div className="flex justify-center mb-8">
            <div className="w-full flex items-center">
               <Input value={keyword} name="keyword" 
                onChange={(event) => setKeyword(event.target.value)}
                className="py-6" placeholder="Search Products..."/>
            </div>
          </div>
          {
            !searchResult.length ?  <h1 className="text-5xl font-extrabold">No Result Found!</h1> : null
          }
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-5">
            {
              searchResult.map(item => <CustomerProductTile 
                product={item}
                handleAddToCart={handleAddToCart}
                handleGetProductDetails={handleGetProductDetails}
                />) 
            }
          </div>
           <ProductDetailsDialog 
          open={openDetailsDialoge} 
          setOpen={setOpenDetailsDialoge}
          ProductDetail={productDetail}
           /> 
        </div>
    )
}

export default SearchProducts;