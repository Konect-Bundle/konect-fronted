import { configureStore } from "@reduxjs/toolkit";
import appSlice from "@/store/slices/appSlice";
import authSlice from "./slices/authSlice";

export const makeStore = () => {
    return configureStore({
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                //   thunk: {
                //     extraArgument: myCustomApiService,
                //   },
                serializableCheck: false,
            }),
        reducer: {
            // Define your reducers here
            auth: authSlice,
            app: appSlice,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
