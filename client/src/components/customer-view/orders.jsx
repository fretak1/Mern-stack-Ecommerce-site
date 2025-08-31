import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import {Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import CustomerOrdersDetailsView from "./order-details"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersByUser, getOrderDetails, resetOrderDetails } from "@/store/customer/order-slice"
import { Badge } from "../ui/badge"


function CustomerOrders() {

    const [openDetailsDialog,setOpenDetailsDialog] = useState(false)
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth)
    const {orderList, orderDetails} = useSelector(state => state.customerOrder)

    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetails(getId))
    }


    useEffect(() => {
        dispatch(getAllOrdersByUser(user?.id))
    },[dispatch])

    useEffect(() => {
        if(orderDetails !== null) setOpenDetailsDialog(true)
    },[orderDetails])

    console.log(orderDetails,"orderDetails")
   

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
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
                            <Badge className={`
                                py-1 px-3 ${orderItem?.orderStatus === 'delivered' ? 'bg-green-500'
                                 : orderItem?.orderStatus === 'rejected' ? 'bg-red-800' : 'bg-black' }`}>{orderItem?.orderStatus}</Badge>
                        </TableCell>
                        <TableCell className="text-left">{orderItem?.totalAmount}</TableCell>
                        <TableCell className="text-left">
                            <Dialog open={openDetailsDialog} onOpenChange={() => {
                                setOpenDetailsDialog(false)
                                dispatch(resetOrderDetails())
                            }}>
                                <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>View Details</Button>
                                <CustomerOrdersDetailsView orderDetails={orderDetails}/>
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

export default CustomerOrders

