import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserService } from "@/app/_core/api/services/UserService";
import { AUTH_TOKEN_NAME } from "@/app/_core/config/constants";
import { User } from "@/app/_core/models/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "cookies-next";
import { homeRoute } from "@/app/_core/config/routes";

type userType = {
    currentUser: User | undefined;
    isLoading: boolean;
};
const initialState: userType = {
    currentUser: undefined,
    isLoading: true,
};

export const getCurrentUser = createAsyncThunk(
    "auth/current",
    async (_, thunkAPI) => {
        var token = getCookie(AUTH_TOKEN_NAME);
        if (token) {
            try {
                return await UserService.getLoggedUser(token);
            } catch (error: any) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
        }
    },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    var token = getCookie(AUTH_TOKEN_NAME);

    if (token) {
        try {
            deleteCookie(AUTH_TOKEN_NAME);
            return await UserService.logout(token);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            // state.email = action.payload.email;
            // state.name = action.payload.name;
            // state.firstname = action.payload.firstname;
            // state.uuid = action.payload.uuid;
            // state.vinfo = action.payload.vinfo;
            // state.vconfig = action.payload.vconfig;
            // state.profile_photo_url = action.payload.profile_photo_url;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getCurrentUser.pending, (state, _) => {
                state.isLoading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                if (action.payload) {
                    state.currentUser = UserService.buildObjectParser(
                        action.payload,
                    );
                }
                state.isLoading = false;
            })
            .addCase(logout.pending, (state, _) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, _) => {
                state.currentUser = undefined;
                state.isLoading = false;
            });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
