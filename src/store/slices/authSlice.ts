import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserService } from "@/core/api/services/UserService";
import { AUTH_TOKEN_NAME } from "@/core/config/constants";
import { User } from "@/core/models/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "cookies-next";
import { homeRoute } from "@/core/config/routes";
import { CompanyService } from "@/core/api/services/CompanyService";
import Company from "@/core/models/Company";
type userType = {
    currentUser: User | undefined;
    isLoading: boolean;
};
const initialState: userType = {
    currentUser: undefined,
    isLoading: true,
};

export const getUserCompanies = createAsyncThunk(
    "user/companies",
    async (_, thunkAPI) => {
        var token = getCookie(AUTH_TOKEN_NAME);

        if (token) {
            try {
                var companiesObj: Array<Company> = [];
                var companies = await CompanyService.getCompanies(token);
                companies.data.forEach((company: any) => {
                    companiesObj.push(
                        CompanyService.buildObjectParser(company),
                    );
                });
                return companiesObj;
            } catch (error: any) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
        }
    },
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
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
            // ### ### Get user Companies #### ###
            .addCase(getUserCompanies.pending, (state, _) => {
                state.isLoading = true;
            })

            .addCase(getUserCompanies.fulfilled, (state, action) => {
                if (action.payload) {
                    var companies = action.payload;
                    state.currentUser!.companies = companies;
                }
                state.isLoading = false;
            });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
