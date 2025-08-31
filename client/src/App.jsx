
import { Routes, Route } from 'react-router-dom';
import './App.css'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import React, { useEffect, useState } from 'react';
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminProducts from './pages/admin-view/products';
import AdminOrders from './pages/admin-view/orders';
import AdminFeatures from './pages/admin-view/features';
import PageNotFound from './pages/Not-Found';
import CustomerLayout from './components/customer-view/layout';
import CustomerHome from './pages/customer-view/home';
import CustomerListing from './pages/customer-view/listing';
import CustomerCheckout from './pages/customer-view/checkout';
import CustomerAccount from './pages/customer-view/account';
import CheckAuth from './components/common/check-auth';
import UnauthPage from './pages/unauth-page';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/auth-slice';
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturnPage from './pages/customer-view/paypal-return';
import PaymentSuccessPage from './pages/customer-view/payment-success';
import SearchProducts from './pages/customer-view/search';





function App() {
 
  
  const {user, isAuthenticated, isLoading} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect( () => {
   dispatch(checkAuth())
  },[dispatch])

  if(isLoading) return <Skeleton className="w-full bg-black h-[600px] " />
  

  return (
   <div className='flex flex-col overflow-hidden bg-white'>
    

     <Routes>
       <Route path='/'
       element={
         <CheckAuth isAuthenticated={isAuthenticated} user={user}>
         </CheckAuth>
        }
       
       />
       <Route path="/auth" element={
         <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
         </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
       </Route>
       <Route path='/admin' element={
           <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
         </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />     
       </Route>
       <Route path='/customer' element={
         <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <CustomerLayout />
         </CheckAuth>
       }>
          <Route path="home" element={<CustomerHome />} />
          <Route path="listing" element={<CustomerListing />} />
          <Route path="checkout" element={<CustomerCheckout />} />
          <Route path="account" element={<CustomerAccount />} /> 
          <Route path="paypal-return" element={<PaypalReturnPage />} /> 
          <Route path="payment-success" element={<PaymentSuccessPage />} /> 
          <Route path="search" element={<SearchProducts />} /> 

       </Route>
       <Route path='/unauth-page' element={<UnauthPage/>}/>
       <Route path='*' element={<PageNotFound/>}/>
     </Routes>



   </div>
  )
}

export default App
