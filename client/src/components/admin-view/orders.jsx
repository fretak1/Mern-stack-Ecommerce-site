import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import {Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { Table,TableBody, TableHead, TableHeader,TableCell, TableRow } from "../ui/table"
import AdminOrdersDetails from "./order-details"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/order-slice"
import { Badge } from "../ui/badge"

function AdminOrdersView() {
    
    const [openDetailsDialog,setOpenDetailsDialog] = useState(false);
    const {orderList,orderDetails} = useSelector(state => state.adminOrder);
    const dispatch = useDispatch()

    function handleFetchOrderDetails(getid) {
        dispatch(getOrderDetailsForAdmin(getid))
    }

    useEffect(() => {
        if(orderDetails !== null) setOpenDetailsDialog(true)
    },[orderDetails])

    useEffect(() => {
       dispatch(getAllOrdersForAdmin())
    },[dispatch])

    console.log(orderDetails,"orderDetails")

    return (
        <Card>
            <CardHeader>
             <CardTitle>All Orders</CardTitle>
           </CardHeader>
            <CardContent>
                         <Table>
                           <TableHeader>
                               <TableRow >
                                   <TableHead >Order Id</TableHead>
                                   <TableHead >Order Date</TableHead>
                                   <TableHead >Order Status</TableHead>
                                   <TableHead >Order Price</TableHead>
                                   <TableHead >
                                     <span className="sr-only">Details</span>
                                   </TableHead>
                               </TableRow>
                           </TableHeader>
                           <TableBody>
                                                   {
                        orderList && orderList.length > 0 ?
                        orderList.map(orderItem => <TableRow>
                        <TableCell className="text-left">{orderItem?._id}</TableCell>
                        <TableCell className="text-left">{orderItem?.orderDate.split('T')[0]}</TableCell>
                        <TableCell className="text-left">
                            <Badge className={`py-1 px-3 ${
                                orderItem?.orderStatus === 'delivered' ? 'bg-green-500' : 
                                orderItem?.orderStatus === 'rejected' ? 'bg-red-800' : 'bg-black' }`}>{orderItem?.orderStatus}</Badge>
                        </TableCell>
                        <TableCell className="text-left">{orderItem?.totalAmount}</TableCell>
                        <TableCell className="text-left">
                            <Dialog 
                               open={openDetailsDialog}
                                onOpenChange={() => {
                                setOpenDetailsDialog(false)
                                dispatch(resetOrderDetails()) }}
                                >
                                <Button 
                                 onClick={() => handleFetchOrderDetails(orderItem?._id)}
                                 >View Details</Button>
                                <AdminOrdersDetails orderDetails={orderDetails}/>
                            </Dialog>
                        </TableCell>
                    </TableRow> ) : 
                        null
                    }
                   
                           </TableBody>
                         </Table>
                       </CardContent>
        </Card>
    )
}

export default AdminOrdersView


                      