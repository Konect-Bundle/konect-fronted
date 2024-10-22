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
exports.UserService = void 0;
var object_to_formdata_1 = require("object-to-formdata");
var User_1 = require("@/app/_core/models/User");
var functions_1 = require("@/app/_core/api/functions");
var Konect_1 = require("../../models/Konect");
var Order_1 = require("../../models/Order");
var KoGadgetItem_1 = require("../../models/KoGadgetItem");
var functions_2 = require("../../utils/functions");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.buildObjectParser = function (data) {
        var user = new User_1.User();
        var konects = [];
        var orders = [];
        var gadgets = [];
        var base = data.data ? data.data : data;
        // console.log(data.data);
        if (base.konects) {
            base.konects.forEach(function (konect) {
                konects.push(new Konect_1.Konect(konect.ko_ip_konect, JSON.parse(konect.ko_ip_locations), konect.ko_social_clicked, konect.ko_phone_clicked, konect.user_id, konect.konect_category_id, konect.created_at, JSON.parse(konect.ko_user_info)));
            });
        }
        // console.log(data.data);
        if (base.gadgets) {
            base.gadgets.forEach(function (gadget) {
                var order = gadget.order;
                var ga = gadget.gadget;
                var customs = {
                    name: JSON.parse(gadget.custom_details).name,
                    title: JSON.parse(gadget.custom_details).title,
                    firstname: JSON.parse(gadget.custom_details).firstname,
                    quantity: JSON.parse(gadget.custom_details).quantity,
                    file: JSON.parse(gadget.custom_details).file
                };
                orders.push(new Order_1.Order(order.id, order.created_at, order.paymentMethod, JSON.parse(order.payload), !order.is_active));
                gadgets.push(new KoGadgetItem_1.KoGadgetItem(JSON.parse(ga.kg_details).name, ga.kg_code, JSON.parse(ga.kg_details).description, JSON.parse(ga.kg_details).price, JSON.parse(ga.kg_details).weightDimensions, JSON.parse(ga.kg_details).color, JSON.parse(ga.kg_details).material, JSON.parse(ga.kg_details).type, JSON.parse(ga.kg_details).imageURL, customs));
            });
        }
        //  console.log(base.companies)
        user.uuid = base.uuid;
        user.name = base.name;
        user.firstname = base.firstname;
        user.email = base.email;
        user.vinfo = base.vinfo;
        user.vconfig = base.vconfig;
        user.profile_photo_url = base.profile_photo_path;
        user.konects_count = base.konects_count;
        user.konects = konects;
        user.orders = orders;
        user.gadgets = gadgets;
        user.points = functions_2.formatNumber(base.kpoint);
        user.referal_code = base.referal_code;
        return user;
    };
    UserService.getUser = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, functions_1.fetchData("/api/user/uuid/" + uuid)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.getGadget = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, functions_1.fetchData("/api/kogadget/" + uuid)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, functions_1.fetchData("/api/auth/login", object_to_formdata_1.serialize({ email: email, password: password }), {}, "POST")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.register = function (name, firstname, email, password, referal_code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, functions_1.fetchData("/api/auth/register", object_to_formdata_1.serialize({
                            name: name,
                            firstname: firstname,
                            email: email,
                            password: password,
                            referal_from: referal_code
                        }), {}, "POST")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.resetPassword = function (email, password, co_password, token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, functions_1.fetchData("/api/auth/password-reset", object_to_formdata_1.serialize({
                            email: email,
                            password: password,
                            password_confirmation: co_password,
                            token: token
                        }), {}, "POST")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.sendResetEmailLink = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, functions_1.fetchData("/api/auth/password-email", object_to_formdata_1.serialize({
                            email: email
                        }), {}, "POST")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.sendEmail = function (name, firstname, email, content) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, functions_1.fetchData("/api/app/contact", object_to_formdata_1.serialize({
                            name: name,
                            firstname: firstname,
                            email: email,
                            content: content
                        }), {}, "POST")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.getLoggedUser = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, functions_1.fetchData("/api/auth/user", "", {}, "GET", token)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.logout = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, functions_1.fetchData("/api/auth/logout", "", {}, "GET", token)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.searchUser = function (search) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, functions_1.fetchData("/api/search-user?search=" + search)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.updatePassword = function (newPassword, oldPassword, token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, functions_1.fetchData("/api/user/custom-update", object_to_formdata_1.serialize({
                            passwords: {
                                oldPassword: oldPassword,
                                newPassword: newPassword
                            }
                        }), {}, "POST", token)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.updateVcard = function (data, token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, functions_1.fetchData("/api/user/update-vcard", data, {}, "POST", token, true)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.addScore = function (score, token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, functions_1.fetchData("/api/user/score/" + score, {}, {}, "POST", token, true)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.getOrders = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, functions_1.fetchData("/api/gadget", null, {}, "GET", token)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
