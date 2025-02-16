import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./Api/Users";
import { categoriesApi } from "./Api/Categories";
import { servicesApi } from "./Api/Services";
import { AboutUsApi } from "./Api/AboutUs";
import { BannerApi } from "./Api/Banner";
import { AdvertisingApi } from "./Api/Advertising";
import { productsApi } from "./Api/Product";
import { ReviewApi } from "./Api/Review";
import { CartApi } from "./Api/Cart";
import { adminApi } from "./Api/Admin";
import { paymentsApi } from "./Api/Payments";
import { discountApi } from "./Api/Discount";
import { contactApi } from "./Api/Contact";
import { whyUsApi } from "./Api/WhySection";
import { featureApi } from "./Api/Feature";
import { ContactUsSecApi } from "./Api/ContactUsSec";
import { siteDetailsApi } from "./Api/SiteDetails";
import cartReducer from './cartSlice'
const store = configureStore({
  reducer: {
    cart: cartReducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [AboutUsApi.reducerPath]: AboutUsApi.reducer,
    [BannerApi.reducerPath]: BannerApi.reducer,
    [AdvertisingApi.reducerPath]: AdvertisingApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ReviewApi.reducerPath]: ReviewApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [discountApi.reducerPath]: discountApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [whyUsApi.reducerPath]: whyUsApi.reducer,
    [featureApi.reducerPath]: featureApi.reducer,
    [ContactUsSecApi.reducerPath]: ContactUsSecApi.reducer,
    [siteDetailsApi.reducerPath]: siteDetailsApi.reducer,
  },
  middleware: (gDM) =>
    gDM().concat(
        userApi.middleware,
        categoriesApi.middleware,
        servicesApi.middleware,
        AboutUsApi.middleware,
        BannerApi.middleware,
        AdvertisingApi.middleware,
        productsApi.middleware,
        ReviewApi.middleware,
        CartApi.middleware,
        adminApi.middleware,
        paymentsApi.middleware,
        discountApi.middleware,
        contactApi.middleware,
        whyUsApi.middleware,
        featureApi.middleware,
        ContactUsSecApi.middleware,
        siteDetailsApi.middleware,
    ),
});

export default store;