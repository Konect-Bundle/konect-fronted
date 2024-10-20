"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.setUser = exports.getUserCompanies = exports.logout = exports.getCurrentUser = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var UserService_1 = require("@/app/_core/api/services/UserService");
var constants_1 = require("@/app/_core/config/constants");
var toolkit_2 = require("@reduxjs/toolkit");
var cookies_next_1 = require("cookies-next");
var CompanyService_1 = require("@/app/_core/api/services/CompanyService");
var initialState = {
    currentUser: undefined,
    isLoading: true
};
exports.getCurrentUser = toolkit_2.createAsyncThunk("auth/current", function (_, thunkAPI) { return __awaiter(void 0, void 0, void 0, function () {
    var token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = cookies_next_1.getCookie(constants_1.AUTH_TOKEN_NAME);
                if (!token) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, UserService_1.UserService.getLoggedUser(token)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, thunkAPI.rejectWithValue(error_1.response.data.message)];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.logout = toolkit_2.createAsyncThunk("auth/logout", function (_, thunkAPI) { return __awaiter(void 0, void 0, void 0, function () {
    var token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = cookies_next_1.getCookie(constants_1.AUTH_TOKEN_NAME);
                if (!token) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                cookies_next_1.deleteCookie(constants_1.AUTH_TOKEN_NAME);
                return [4 /*yield*/, UserService_1.UserService.logout(token)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, thunkAPI.rejectWithValue(error_2.response.data.message)];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.getUserCompanies = toolkit_2.createAsyncThunk("user/companies", function (_, thunkAPI) { return __awaiter(void 0, void 0, void 0, function () {
    var token, companiesObj, companies, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = cookies_next_1.getCookie(constants_1.AUTH_TOKEN_NAME);
                if (!token) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                companiesObj = [];
                return [4 /*yield*/, CompanyService_1.CompanyService.getCompanies(token)];
            case 2:
                companies = _a.sent();
                companies.data.forEach(function (company) {
                    companiesObj.push(CompanyService_1.CompanyService.buildObjectParser(company));
                });
                return [2 /*return*/, companiesObj];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, thunkAPI.rejectWithValue(error_3.response.data.message)];
            case 4: return [2 /*return*/];
        }
    });
}); });
var authSlice = toolkit_1.createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: function (state, action) {
            // state.email = action.payload.email;
            // state.name = action.payload.name;
            // state.firstname = action.payload.firstname;
            // state.uuid = action.payload.uuid;
            // state.vinfo = action.payload.vinfo;
            // state.vconfig = action.payload.vconfig;
            // state.profile_photo_url = action.payload.profile_photo_url;
        }
    },
    extraReducers: function (builder) {
        builder
            .addCase(exports.getCurrentUser.pending, function (state, _) {
            state.isLoading = true;
        })
            .addCase(exports.getCurrentUser.fulfilled, function (state, action) {
            if (action.payload) {
                state.currentUser = UserService_1.UserService.buildObjectParser(action.payload);
            }
            state.isLoading = false;
        })
            .addCase(exports.logout.pending, function (state, _) {
            state.isLoading = true;
        })
            // ### ### Get user Companies #### ###
            .addCase(exports.getUserCompanies.pending, function (state, _) {
            state.isLoading = true;
        })
            .addCase(exports.getUserCompanies.fulfilled, function (state, action) {
            if (action.payload) {
                var companies = action.payload;
                state.currentUser.companies = companies;
            }
            state.isLoading = false;
        })
            .addCase(exports.logout.fulfilled, function (state, _) {
            state.currentUser = undefined;
            state.isLoading = false;
        });
    }
});
exports.setUser = authSlice.actions.setUser;
exports["default"] = authSlice.reducer;
