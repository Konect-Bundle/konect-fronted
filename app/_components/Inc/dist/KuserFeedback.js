"use client";
"use strict";
exports.__esModule = true;
var framer_motion_1 = require("framer-motion");
var react_1 = require("react");
var constants_1 = require("@/app/_core/config/constants");
var routes_1 = require("@/app/_core/config/routes");
var image_1 = require("next/image");
var link_1 = require("next/link");
var tb_1 = require("react-icons/tb");
var md_1 = require("react-icons/md");
var functions_1 = require("@/app/_core/utils/functions");
var flowbite_react_1 = require("flowbite-react");
var form_1 = require("@/app/_styles/flowbite/form");
var button_1 = require("@/app/_styles/flowbite/button");
var CountryCode_1 = require("@/app/_components/Common/CountryCode");
var sweetalert2_1 = require("sweetalert2");
var jquery_1 = require("jquery");
var KonectService_1 = require("@/app/_core/api/services/KonectService");
form_1.customTextInputTheme["addon"] =
    "inline-flex items-center rounded-l-md border border-r-0 border-gray-300/45 bg-gray-200 px-1.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400";
function KuserFeedback(_a) {
    var kuser = _a.kuser, callback = _a.callback;
    var _b = react_1.useState(""), name = _b[0], setName = _b[1];
    var _c = react_1.useState(""), firstname = _c[0], setFirstname = _c[1];
    var _d = react_1.useState(""), email = _d[0], setEmail = _d[1];
    var _e = react_1.useState(""), phone = _e[0], setPhone = _e[1];
    var handleShareInfo = function (e) {
        e.preventDefault();
        if (name || firstname || email || phone) {
            var tel = jquery_1["default"]("#countryCode").val() + phone;
            KonectService_1.KonectService.makeFeed(kuser.uuid, name, firstname, email, phone).then(function (rs) {
                sweetalert2_1["default"].fire({
                    title: "Sent!",
                    text: "You successfully sent your informations",
                    icon: "success",
                    timer: 1500
                }).then(function () {
                    callback();
                });
            });
        }
    };
    return (React.createElement(framer_motion_1.motion.div, { animate: { x: 0 }, transition: {
            duration: 0.8,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01]
        }, className: "fixed top-0 left-0 z-[100] h-screen w-screen flex justify-center items-center" },
        React.createElement("div", { className: "bg-gray-700 opacity-30 h-full w-full" }),
        React.createElement("div", { className: "md:py-6 md:px-0 absolute w-full h-full md:w-3/4 flex justify-center items-center" },
            React.createElement("div", { className: "w-full h-full md:w-2/4 bg-white md:rounded-md min-w-fit overflow-hidden overflow-y-scroll p-8 md:p-14" },
                React.createElement("span", { className: "flex justify-between py-4  md:mb-24 mb-5" },
                    React.createElement(link_1["default"], { href: routes_1.homeRoute.path, className: "flex items-center space-x-1 rtl:space-x-reverse" },
                        React.createElement(image_1["default"], { src: constants_1.ROOT_ASSETS_URL + "/images/logo.png", width: 500, height: 500, className: "w-8", alt: "Flowbite Logo" }),
                        React.createElement("span", { className: "ml-1 font-semibold text-3xl" }, "nect")),
                    React.createElement("span", { className: "cursor-pointer", id: "closeSendContact", onClick: function () {
                            callback();
                        } },
                        React.createElement(tb_1.TbX, { className: "'w-7 h-7 text-gray-800'" }))),
                React.createElement("div", { className: "flex flex-col justify-center" },
                    React.createElement("h2", { className: " text-2xl font-bold mb-4 text-gray-800" }, "Tell me about you"),
                    React.createElement("div", { className: "text-gray-400 font-thin text-sm flex space-x-4 p-4 items-center bg-gray-200 rounded-md" },
                        React.createElement(md_1.MdOutlineConnectWithoutContact, { className: "w-6 h-6 text-gray-600" }),
                        React.createElement("p", null,
                            "Aidez",
                            " ",
                            React.createElement("span", { className: "font-bold text-gray-600" }, functions_1.ucfirst(kuser.firstname) + "!"),
                            " ",
                            "\u00E0 en savoir plus sur vous.")),
                    React.createElement("form", { className: "max-w-md mx-auto  md:mx-0 mt-6 w-full", method: "POST", onSubmit: handleShareInfo },
                        React.createElement("div", { className: "grid md:grid-cols-2 md:gap-6" },
                            React.createElement("div", { className: "mb-2" },
                                React.createElement("div", { className: "mb-2 block" },
                                    React.createElement(flowbite_react_1.Label, { htmlFor: "firstname", value: "Your firstname" })),
                                React.createElement(flowbite_react_1.TextInput, { theme: form_1.customTextInputTheme, color: "gray", defaultValue: firstname, id: "firstname", type: "text", placeholder: "", required: true, onChange: function (val) {
                                        setFirstname(val.target.value);
                                    } })),
                            React.createElement("div", { className: "mb-2" },
                                React.createElement("div", { className: "mb-2 block" },
                                    React.createElement(flowbite_react_1.Label, { htmlFor: "name", value: "Your name" })),
                                React.createElement(flowbite_react_1.TextInput, { theme: form_1.customTextInputTheme, type: "text", color: "gray", defaultValue: name, id: "name", required: true, onChange: function (val) {
                                        setName(val.target.value);
                                    } })),
                            React.createElement("div", { className: "mb-2" },
                                React.createElement("div", { className: "mb-2 block" },
                                    React.createElement(flowbite_react_1.Label, { htmlFor: "email", value: "Your email" })),
                                React.createElement(flowbite_react_1.TextInput, { theme: form_1.customTextInputTheme, color: "gray", defaultValue: email, id: "email", type: "email", required: true, onChange: function (val) {
                                        setEmail(val.target.value);
                                    } })),
                            React.createElement("div", { className: "mb-2" },
                                React.createElement("div", { className: "mb-2 block" },
                                    React.createElement(flowbite_react_1.Label, { htmlFor: "phone", value: "Phone" })),
                                React.createElement(flowbite_react_1.TextInput, { theme: form_1.customTextInputTheme, color: "gray", defaultValue: phone, onChange: function (val) {
                                        setPhone(val.target.value);
                                    }, id: "phone", type: "tel", placeholder: "xxxxxxxxxx", required: true, addon: React.createElement(CountryCode_1["default"], { callback: function () { } }) })),
                            React.createElement(flowbite_react_1.Button, { theme: button_1.customButtonTheme, color: "dark", type: "submit", className: "mt-4" }, "Send"))))))));
}
exports["default"] = KuserFeedback;
