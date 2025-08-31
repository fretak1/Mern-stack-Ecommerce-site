import ProductFilter from "@/components/customer-view/filter";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/customer/product-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerProductTile from "./product-tile";
import { createSearchParams, useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/customer-view/product-details";
import { addToCart, fetchCartItems } from "@/store/customer/cart-slice";
import { useToast } from "@/hooks/use-toast";



function createSearchParamsHelper(filterParams) {
  
  const queryParams = []

  for(const [key,value] of Object.entries(filterParams)) {
     if(Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',')

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
     }
  }

  return queryParams.join("&")
}


function CustomerListing() {

   const {user} = useSelector(state => state.auth)
   const dispatch = useDispatch();
   const {productList,productDetail} = useSelector(state => state.customerProducts)
   const [filters, setFilters] = useState({})
   const [sort,setSort] = useState(null)
   const [searchParams, setSearchParams] = useSearchParams();
   const [openDetailsDialoge,setOpenDetailsDialoge] = useState(false)
   const {cartItems} = useSelector(state => state.customerCart)
   const {toast} = useToast()

   const categorySearchParam = searchParams.get('category')

  function handleSort(value) {
    setSort(value)
  }

 function handleFilter(getSectionId, getcurrentOptions) {

     let cpyFilters = {...filters};
     const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

     if(indexOfCurrentSection === -1) {
    cpyFilters = {
      ...cpyFilters, [getSectionId]: [getcurrentOptions]
    }
     } else {
     const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getcurrentOptions);
      if(indexOfCurrentOption === -1) cpyFilters[getSectionId].push(getcurrentOptions) 
        else cpyFilters[getSectionId].splice(indexOfCurrentOption,1)

     }

     setFilters(cpyFilters)
     sessionStorage.setItem("filters",JSON.stringify(cpyFilters))
 }
   
  useEffect(()=> {
    setSort('price-lowtohigh')
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
  },[categorySearchParam])

  useEffect(() => {
    if(productDetail !== null) setOpenDetailsDialoge(true)
  },[productDetail])

 
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId))
  }

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


  useEffect(() => {
   if(filters && Object.keys(filters).length > 0) {
    const createQueryString = createSearchParamsHelper(filters)
    setSearchParams(new URLSearchParams(createQueryString))
   }
  },[filters])

   useEffect(()=> {
    if(filters !== null && sort !== null)
    dispatch(fetchAllFilteredProducts({filterParams : filters, sortParams : sort}))
   },[dispatch,sort,filters])


   console.log(productList ,"productList")




    return <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
          <ProductFilter filters={filters} handleFilter={handleFilter}/>
          <div className="bg-background w-full rounded-lg shadow-sm ">
            <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-extrabold ">All Products</h2>
                <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">{productList?.length} products</span>
                                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                       <Button className="flex items-center gap-1" variant="outline" size="sm">
                         <ArrowUpDownIcon className="h-4 w-4"/>
                         <span>sort by</span>
                       </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                       <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                        {
                            sortOptions.map(sortItem => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>)
                        }
                       </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {
                    productList && productList.length > 0 ? 
                    productList.map((productItem) => <CustomerProductTile handleGetProductDetails={handleGetProductDetails} product={productItem} handleAddToCart={handleAddToCart}/>) :
                    null
                }
            </div>
          </div>
          <ProductDetailsDialog 
          open={openDetailsDialoge} 
          setOpen={setOpenDetailsDialoge}
          ProductDetail={productDetail}
           /> 
    </div>
    
}

export default CustomerListing;