import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import accountImage from '../../assets/banner-8.webp'
import Address from '@/components/customer-view/address';
import CustomerOrders from '@/components/customer-view/orders';


function CustomerAccount() {
    return(
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img 
                src={accountImage}
                width={'1600'}
                height={'300'}
                style={{aspectRatio : "1600/300", objectFit : "cover"}}
                alt="" 
                className="h-full w-full object-cover object-center"
                 />
            </div>
            <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
              <div className='flex flex-col rounded-lg border bg-background shadow-sm'>
                <Tabs defaultValue='orders'>
                    <TabsList>
                       <TabsTrigger value='orders'>Orders</TabsTrigger>
                       <TabsTrigger value='address'>Address</TabsTrigger>
                    </TabsList>
                       <TabsContent value='orders'>
                            <CustomerOrders/>
                       </TabsContent>
                       <TabsContent value='address'>
                            <Address/>
                       </TabsContent>                 
                </Tabs>
              </div>
            </div>
        </div>
    )
}

export default CustomerAccount;