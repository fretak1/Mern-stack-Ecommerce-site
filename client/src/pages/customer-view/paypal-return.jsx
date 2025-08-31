import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/customer/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {

    const dispatch = useDispatch()
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId')
    const payerId = params.get('PayerID')



    useEffect(() => {
        if(paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'));
            
            dispatch(capturePayment({paymentId,payerId,orderId})).then((data => {
                if(data?.payload?.success) {
                    sessionStorage.removeItem('currentOrderId')
                    window.location.href = '/customer/payment-success'
                }
            }))
        }

    },[paymentId,payerId,dispatch])

    return (
         <Card>
            <CardHeader>
                <CardTitle>Proccessing Payment...Please Wait!</CardTitle>
            </CardHeader>
         </Card>
    )
}

export default PaypalReturnPage;