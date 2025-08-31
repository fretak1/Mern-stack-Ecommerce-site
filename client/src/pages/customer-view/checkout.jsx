import Address from '@/components/customer-view/address';
import Image from '../../assets/banner-8.webp'
import { useDispatch, useSelector } from 'react-redux';
import UserCartItemsContent from '@/components/customer-view/cart-items-content';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { createNewOrder } from '@/store/customer/order-slice';
import { useToast } from '@/hooks/use-toast';


function CustomerCheckout() {

   const {cartItems} = useSelector(state => state.customerCart)
   const {user} = useSelector(state => state.auth)
   const {approvalURL} = useSelector(state => state.customerOrder)
   const [currentSelectedAddress,setCurrentSelectedAddress] = useState(null)
   const dispatch = useDispatch()
   const [isPaymentStart,setIsPaymentStart] = useState(false)
   const {toast} = useToast()


   

       const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items.reduce((sum,currentItem) => sum + (
        currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price
    ) * currentItem?.quantity,0) : 0
  

   function handleInitiatePaypalPayment() {

    if(cartItems.length === 0) {
      toast({
        title : "Your Cart is empty. please add items to procced",
        variant : 'destructive'
      })

      return
    }
    if(currentSelectedAddress === null) {
      toast({
        title : "Please select one address to procced",
        variant : 'destructive'
      })

      return
    }

    const orderData = {
        userId : user?.id,
        cartId : cartItems?._id,
        cartItems : cartItems.items.map(singleCartItem => ({
             productId : singleCartItem?.productId,
             title : singleCartItem?.title,
             image : singleCartItem?.image,
             price : singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
             quantity : singleCartItem?.quantity
        })) , 
        addressInfo :
         {
        addressId : currentSelectedAddress?._id,
        address : currentSelectedAddress?.address,
        city : currentSelectedAddress?.city,
        pincode : currentSelectedAddress?.pincode,
        phone : currentSelectedAddress?.phone,
        notes : currentSelectedAddress?.notes
        },
        orderStatus : 'pending',
        paymentMethod : 'paypal',
        paymentstatus : 'pending',
        totalAmount : totalCartAmount,
        orderDate : new Date(),
        orderUpdateDate : new Date(),
        paymentId : '',
        payerId : ''
    }


    dispatch(createNewOrder(orderData)).then((data) => {
        
        if(data?.payload?.success) {
            console.log(data, 'FREZER')
            
            setIsPaymentStart(true)
        } else {
            setIsPaymentStart(false)
        }
    })
   }
   
   if(approvalURL) {
    window.location.href = approvalURL;
   }


    return(
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img src={Image} className='h-full w-full object-cover object-center'/>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
               <Address 
                    selectedId={currentSelectedAddress}
                    setCurrentSelectedAddress={setCurrentSelectedAddress} />
               <div className='flex flex-col gap-4'>
                  {
                     cartItems && cartItems.items && cartItems.items.length > 0 ? 
                     cartItems.items.map(cartItem => <UserCartItemsContent cartItem={cartItem}/>) 
                     : null
                  }
                  <div className="mt-8 space-y-4">
                    <div className="flex justify-between">
                        <span className="font-bold">Total</span>
                        <span className="font-bold">${totalCartAmount}</span>  
                    </div>
                </div>
                <div className='w-full mt-4'>
                    <Button onClick={handleInitiatePaypalPayment} className="w-full">
                        {
                            isPaymentStart ? 'Proccessing Paypal Payment' : 'Checkout with Paypal'
                        }
                        </Button>
                </div>
               </div>
                 
            </div>
        </div>
    )
}

export default CustomerCheckout;