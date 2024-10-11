"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var flowbite_react_1 = require("flowbite-react");
var button_1 = require("@/app/_styles/flowbite/button");
var alert_1 = require("@/app/_styles/flowbite/alert");
var routes_1 = require("@/app/_core/config/routes");
var link_1 = require("next/link");
var next_intl_1 = require("next-intl");
var KuserHeader = function (props) {
    var _a = react_1.useState(true), showAlert = _a[0], setShowAlert = _a[1];
    react_1.useEffect(function () {
        if (showAlert == false) {
            setTimeout(function () {
                setShowAlert(true);
            }, 6500);
        }
    });
    var dissmissAlert = function () {
        setShowAlert(false);
        console.log(showAlert);
    };
    var tActions = next_intl_1.useTranslations("Actions");
    var tKuser = next_intl_1.useTranslations("Kuser");
    return (react_1["default"].createElement("div", { className: "fixed z-40 top-0 left-0 w-screen flex " },
        react_1["default"].createElement(flowbite_react_1.Alert, { theme: alert_1.customAlertTheme, color: "dark", className: !showAlert ? "hidden " : "" + "w-full rounded-none p-0", onDismiss: dissmissAlert },
            react_1["default"].createElement("div", { className: "flex justify-between items-center p-3 text-gray-100  space-x-3 w-full" },
                react_1["default"].createElement("div", { className: "items-center text-gray-100 flex space-x-2 rounded-md md:text-md text-sm" },
                    react_1["default"].createElement("svg", { className: "flex-shrink-0 w-4 h-4", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 20 20" },
                        react_1["default"].createElement("path", { d: "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" })),
                    react_1["default"].createElement("span", { className: "sr-only" }, "Info"),
                    react_1["default"].createElement("div", { className: "ms-3 text-sm font-medium" },
                        tKuser("you_too"),
                        " ")),
                react_1["default"].createElement("div", { className: "md:space-x-4 space-x-2 flex items-center" },
                    react_1["default"].createElement(link_1["default"], { href: routes_1.productsRoute.path, className: "pl-1" },
                        react_1["default"].createElement(flowbite_react_1.Button, { theme: button_1.customButtonTheme, color: "primary", className: "w-max" }, tActions("get_card"))))))));
};
exports["default"] = KuserHeader;
