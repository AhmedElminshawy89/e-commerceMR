import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./Api/Users";
import { categoriesApi } from "./Api/Categories";
import { servicesApi } from "./Api/Services";
import { AboutUsApi } from "./Api/AboutUs";
import { BannerApi } from "./Api/Banner";
import { AdvertisingApi } from "./Api/Advertising";
const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [AboutUsApi.reducerPath]: AboutUsApi.reducer,
    [BannerApi.reducerPath]: BannerApi.reducer,
    [AdvertisingApi.reducerPath]: AdvertisingApi.reducer,
  },
  middleware: (gDM) =>
    gDM().concat(
        userApi.middleware,
        categoriesApi.middleware,
        servicesApi.middleware,
        AboutUsApi.middleware,
        BannerApi.middleware,
        AdvertisingApi.middleware,
    ),
});

export default store;