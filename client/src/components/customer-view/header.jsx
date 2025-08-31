import { HousePlug, LogOut, Menu, ShoppingCart, UserCheck } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { customerMenuItem } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWraper from "./cart-wraper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/customer/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {

  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem('filters')
    const currentFilter = getCurrentMenuItem.id !== 'home' && getCurrentMenuItem.id !== 'products' ? 
    {
      category : [getCurrentMenuItem.id]
    } : null

    sessionStorage.setItem('filters',JSON.stringify(currentFilter))

    location.pathname.includes('includes') && currentFilter !== null ?
    setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`)):
    navigate(getCurrentMenuItem.path)
  }

    return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {
        customerMenuItem.map
        (menuItem =>
           <Label key={menuItem.id} 
            onClick={() => handleNavigate(menuItem)} className="text-sm font-medium cursor-pointer">{menuItem.label}
          </Label>)
      }
    </nav>
}

function HeaderRightContent() {
    
   const {user} = useSelector(state => state.auth)
   const {cartItems} = useSelector(state => state.customerCart)
   const navigate = useNavigate() 
   const dispatch = useDispatch()
   const [openCartSheet,setOpenCartSheet] = useState(false)

   function handleLogout(){
    dispatch(logoutUser())
   }

   useEffect( () => {
    dispatch(fetchCartItems(user?.id))
   },[dispatch])
   
    

    return <div className="flex lg:items-center lg:flex-row flex-col gap-2">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button onClick={() => setOpenCartSheet(true)} variant="outline" size="icon" className="relative">
         <ShoppingCart className="w-6 h-6"  />
         <span className="sr-only">User Cart</span>
         <span className="absolute top-[-5px] right-[2px] font-bold text-sm" >{cartItems?.items?.length || 0}</span>
        </Button> 
        <UserCartWraper cartItems={
          cartItems && cartItems.items && cartItems.items.length > 0
          ? cartItems.items : []
          }
          setOpenCartSheet={setOpenCartSheet}
          
          />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator/>
           <DropdownMenuItem onClick={() => navigate('/customer/account')}>
            <UserCheck className="mr-2 h-4 w-4" />
            Account
           </DropdownMenuItem>
           <DropdownMenuSeparator/>
           <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
             LogOut
           </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
     
    </div>
}


function CustomerHeader() {


  const {isAuthenticated} = useSelector(state => state.auth)

    return(
        <header className="sticky top-0 z-40 w-full border-b bg-background ">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
              <Link to="/customer/home" className="flex items-center gap-2"> 
                <HousePlug/>
                <span className="font-bold">Ecommerce</span>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6"/>
                    <span className="sr-only">toggle header menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs">
                 <MenuItems />
                 <HeaderRightContent/>
                </SheetContent>
                
              </Sheet>
              <div className="hidden lg:block">
               <MenuItems />
              </div>
                <div  className="hidden lg:block"><HeaderRightContent/></div> 
            </div>
        </header>
    )
}

export default CustomerHeader;