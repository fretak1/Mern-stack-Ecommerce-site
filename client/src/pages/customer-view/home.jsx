import bannerone from '../../assets/banner-9.webp'
import bannertwo from '../../assets/banner-10.webp'
import bannerthree from '../../assets/banner-5.webp'
import { Button } from '@/components/ui/button';
import { BabyIcon, Bandage, ChevronLeft, ChevronRight, CloudLightning, Dumbbell,  Footprints,  Handbag,  Images,  Shirt,  ShirtIcon, ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/customer/product-slice';
import CustomerProductTile from './product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/customer/cart-slice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsDialog from '@/components/customer-view/product-details';
import { getFeatureImages } from '@/store/customer/common-slice';

function CustomerHome() {

    
    const [currentSlide,setCurrentSlide] = useState(0);
    const dispatch = useDispatch()
    const {productList, productDetail} = useSelector(state => state.customerProducts)
    const {user} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const {toast} = useToast()
   const [openDetailsDialoge,setOpenDetailsDialoge] = useState(false)
       const {featureImageList} = useSelector(state => state.feature)



    useEffect( () => {
        const timer = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1)% featureImageList.length)
        },5000)

        return ()=> clearInterval(timer)
    },[featureImageList])


    useEffect(()=> {
        dispatch(fetchAllFilteredProducts({filterParams : {}, sortParams : 'price-lowtohigh'}))
    },[dispatch])
   

    useEffect(() => {
    if(productDetail !== null) setOpenDetailsDialoge(true)
  },[productDetail])



    const catagoriesWithIcon = [
      { id: "men", label: "Men", icon : ShirtIcon },
      { id: "women", label: "Women", icon : CloudLightning},
      { id: "kids", label: "Kids", icon : BabyIcon },
      { id: "accessories", label: "Accessories", icon : WatchIcon },
      { id: "footwear", label: "Footwear", icon : UmbrellaIcon },
      { id: "sportswear", label: "Sportswear", icon : Dumbbell }, 
    ]

   const brandsWithIcon = [
      { id: "nike", label: "Nike", icon : Footprints  },
      { id: "adidas", label: "Adidas", icon : Handbag  },
      { id: "puma", label: "Puma", icon : Shirt },
      { id: "reebok", label: "Reebok", icon : ShoppingBasket}, 
      { id: "under-armour", label: "Under Armour", icon : Images },
    ]


    function handleNavigateToListingPage(getCurrentItem,section) {
        sessionStorage.removeItem('filters')
        const currentFilter = {
            [section] : [getCurrentItem.id]
        }

        sessionStorage.setItem('filters', JSON.stringify(currentFilter))
        navigate('/customer/listing')
    }

      function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId))
      }

       function handleAddToCart(getCurrentProductId) {
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

             useEffect(() => {
               dispatch(getFeatureImages())
             },[dispatch])
       


    return(
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[600px] overflow-hidden">
                {
                 featureImageList && featureImageList.length > 0 ? featureImageList.map((slide,index) => <img
                 
                 src={slide?.image}
                 key={index}
                 className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}

                 
                 />) : null
                }
                <Button 
                 variant='outline' size='icon'
                 className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
                 onClick={()=>setCurrentSlide(prevSlide => (prevSlide - 1 + featureImageList.length) % featureImageList.length)}
                 >
                    <ChevronLeft className='h-4 w-4'/>
                </Button>
                 <Button 
                 variant='outline' 
                 size='icon' 
                 className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
                 onClick={()=>setCurrentSlide(prevSlide => (prevSlide + 1) % featureImageList.length)}
                 >
                    <ChevronRight className='h-4 w-4'/>
                </Button>
            </div>
            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>Shop by catagory</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                        {
                            catagoriesWithIcon.map(categoryItem => 
                            <Card onClick={() => handleNavigateToListingPage(categoryItem,'category')} className="cursor-pointer hover:shadow-lg transition-shadow ">
                                <CardContent className="flex items-center flex-col justify-center p-6">
                                    <categoryItem.icon className='w-12 h-12 mb-4 text-primary'/>
                                    <span>{categoryItem.label}</span>
                                </CardContent>
                            </Card>)
                        }
                    </div>
                </div>
            </section>

             <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>Shop by Brand</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {
                            brandsWithIcon.map(brandItem => 
                            <Card  onClick={() => handleNavigateToListingPage(brandItem,'brand')} className="cursor-pointer hover:shadow-lg transition-shadow ">
                                <CardContent className="flex items-center flex-col justify-center p-6">
                                    <brandItem.icon className='w-12 h-12 mb-4 text-primary'/>
                                    <span>{brandItem.label}</span>
                                </CardContent>
                            </Card>)
                        }
                    </div>
                </div>
            </section>
            <section className='py-12'>
              <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                      {
                        productList && productList.length > 0 ? 
                        productList.map(productItem => 
                        <CustomerProductTile handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart}  product={productItem}/>)
                        : null
                      }
                    </div>
              </div>
            </section>
             <ProductDetailsDialog
             open={openDetailsDialoge} 
             setOpen={setOpenDetailsDialoge} 
             ProductDetail={productDetail}/> 
        </div>
    )
}

export default CustomerHome;