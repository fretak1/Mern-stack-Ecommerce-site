import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/product-slice";
import adminOrderSlice from "./admin/order-slice";
import customerProductSlice from "./customer/product-slice";
import customerCartSlice from "./customer/cart-slice";
import customerAddressSlice from "./customer/address-slice";
import customerOrderSlice from "./customer/order-slice";
import customerSearchSlice from "./customer/search-slice";
import customerReviewSlice from "./customer/review-slice"
import featureSlice from "./customer/common-slice"





const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProduct : adminProductSlice,
        adminOrder : adminOrderSlice,
        customerProducts : customerProductSlice,
        customerCart : customerCartSlice,
        customerAddress : customerAddressSlice,
        customerOrder : customerOrderSlice,
        customerSearch : customerSearchSlice,
        customerReview : customerReviewSlice,
        feature : featureSlice
    },
});

export default store;

