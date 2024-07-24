import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    darkMode: false,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
        },
    },
});

export const { toggleTheme } = appSlice.actions;
export default appSlice.reducer;
