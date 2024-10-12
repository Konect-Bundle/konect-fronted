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
exports.metadata = void 0;
var StoreProvider_1 = require("@/app/_components/Store/StoreProvider");
var constants_1 = require("@/app/_core/config/constants");
var next_intl_1 = require("next-intl");
var server_1 = require("next-intl/server");
var google_1 = require("next/font/google");
var ReduxInit_1 = require("./_components/Layouts/ReduxInit");
require("./globals.scss");
var inter = google_1.Outfit({
    subsets: ["latin"]
});
exports.metadata = {
    title: "Konect - " + "A link for your value",
    description: "Networking tools and platform",
    authors: { name: "uziel mvuama", url: "https://www.mrlezi.com" },
    applicationName: "Konect",
    keywords: [
        "konect",
        "networking",
        "réseautage",
        "carte",
        "nfc",
        "nfc card",
        "cartes nfc",
        "social",
        "social network",
        "social media",
    ],
    twitter: {
        card: "summary_large_image",
        creator: "@_uziel_mvuama",
        images: constants_1.ROOT_ASSETS_URL + "/images/logo-yellow-bg.png",
        site: "https://www.ikonect.me",
        title: "Konect - " + "A link for your value",
        description: "Networking tools and  platform"
    },
    openGraph: {
        url: "https://www.ikonect.me",
        title: "Konect - " + "A link for your value",
        siteName: "https://www.ikonect.me/sitemap.xml",
        description: "Networking tools and platform",
        images: [constants_1.ROOT_ASSETS_URL + "/images/logo-yellow-bg.png"]
    }
};
function RootLayout(_a) {
    var children = _a.children;
    return __awaiter(this, void 0, void 0, function () {
        var locale, messages;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, server_1.getLocale()];
                case 1:
                    locale = _b.sent();
                    return [4 /*yield*/, server_1.getMessages()];
                case 2:
                    messages = _b.sent();
                    // console.log(`\nHOST NAME => ${process.env.NEXT_PUBLIC_BACKEND_URL}\n`);
                    return [2 /*return*/, (React.createElement("html", { lang: locale },
                            React.createElement("body", { className: inter.className },
                                React.createElement(next_intl_1.NextIntlClientProvider, { messages: messages },
                                    React.createElement(StoreProvider_1["default"], null,
                                        React.createElement(ReduxInit_1["default"], null,
                                            React.createElement("main", { className: "bg-gray-50 min-h-[100vh] w-full" }, children)))))))];
            }
        });
    });
}
exports["default"] = RootLayout;
