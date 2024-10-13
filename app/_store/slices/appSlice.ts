import Company from "@/app/_core/models/Company";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type appType = {
    darkMode: boolean;
    currentCompany: Company | undefined;
};
const initialState: appType = {
    darkMode: false,
    currentCompany: undefined,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
        },
        setCurrentCompany: (state, action: PayloadAction<Company>) => {
            state.currentCompany = action.payload;
        },
    },
});

export const { toggleTheme, setCurrentCompany } = appSlice.actions;
export default appSlice.reducer;
