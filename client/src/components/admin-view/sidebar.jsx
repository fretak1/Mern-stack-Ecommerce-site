
import { BringToFront, ChartNoAxesCombined, LayoutDashboard, ShoppingCart } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";




 const adminSidebarMenuItems = [
    {
        id : 'dashboard',
        label : 'Dashboard',
        path : '/admin/dashboard',
        icon : <LayoutDashboard />
    },
    {
        id : 'products',
        label : 'Products',
        path : '/admin/products',
        icon : <ShoppingCart />

    },
    {
        id : 'orders',
        label : 'Orders',
        path : '/admin/orders',
        icon : <BringToFront />

    }
]

function MenuItems({setopen}) {

    const navigate = useNavigate();
    return (
        <nav className="flex-col mt-8 flex gap-2">
            {
                adminSidebarMenuItems.map(menuItem => <div key={menuItem.id} onClick={() => {
                 navigate(menuItem.path)
                 setopen ? setopen(false) : null
                } }
                 className="flex text-xl cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
                    {menuItem.icon}
                    {menuItem.label}
                </div>)
            }
        </nav>
    )
}


function AdminSideBar({open,setopen}) {
 
    const navigate = useNavigate();
    
    return(
        
        <Fragment>
            <Sheet open={open} onOpenChange={setopen}>
              <SheetContent side="left" className="w-64">
                 <div className="flex flex-col h-full">
                    <SheetHeader className="border-b">
                      <SheetTitle className="flex gap-2 mt-5 mb-5">
                        <ChartNoAxesCombined size={30}/>
                        <h1 className="text-2xl font-extrabold">Admin panel</h1>
                      </SheetTitle>
                    </SheetHeader>
                    <MenuItems setopen={setopen}/>
                 </div>
              </SheetContent>
            </Sheet>
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
              <div onClick={() => navigate('/admin/dashboard')} className="flex  cursor-pointer items-center gap-2">
                <ChartNoAxesCombined size={30}/>
                <h1 className="text-2xl font-extrabold">Admin panel</h1>
              </div>
              <MenuItems/>
            </aside>
        </Fragment>
    )
}

export default AdminSideBar;