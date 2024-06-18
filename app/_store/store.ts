import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/app/_store/slices/userSlice";
import appSlice from "@/app/_store/slices/appSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            // Define your reducers here
            user: userSlice,
            app: appSlice,
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']