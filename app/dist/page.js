"use client";
"use strict";
exports.__esModule = true;
var Container_1 = require("@/app/_components/Layouts/Container");
var routes_1 = require("@/app/_core/config/routes");
var button_1 = require("@/app/_styles/flowbite/button");
var aos_1 = require("aos");
require("aos/dist/aos.css"); // You can also use <link> for styles
var flowbite_react_1 = require("flowbite-react");
var next_intl_1 = require("next-intl");
var image_1 = require("next/image");
var link_1 = require("next/link");
var react_1 = require("react");
var md_1 = require("react-icons/md");
var tb_1 = require("react-icons/tb");
var Footer_1 = require("./_components/Common/Footers/Footer");
var Header_1 = require("./_components/Common/Headers/Header");
function Home() {
    var t = next_intl_1.useTranslations("Home");
    var tActions = next_intl_1.useTranslations("Actions");
    react_1.useEffect(function () {
        aos_1["default"].init();
    }, []);
    return (React.createElement("div", { className: "flex flex-col bg-gray-50" },
        React.createElement("div", { className: "flex flex-col h-min md:h-screen" },
            React.createElement(Header_1["default"], null),
            React.createElement(Container_1["default"], { className: "mt-6 md:mt-1 h-[inherit] flex items-center" },
                React.createElement("div", { className: " flex items-center bg-white  py-14 md:py-0 rounded-2xl h-full w-full overflow-hidden" },
                    React.createElement("section", { className: "flex items-center justify-center bg-white" },
                        React.createElement("div", { className: "bg-white dark:bg-gray-900 flex justify-between items-center" },
                            React.createElement("div", { className: "grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12" },
                                React.createElement("div", { className: "mr-auto place-self-center lg:col-span-6 md:ms-20 md:ms-4" },
                                    React.createElement("span", { className: "mb-8 inline-flex items-center space-x-2 rounded-full bg-gray-100 p-1 pe-6" },
                                        React.createElement("span", { className: "h-[48px] md:w-[48px] w-[60px] rounded-full bg-orange-700 flex justify-center items-center" },
                                            React.createElement(md_1.MdOutlineConnectWithoutContact, { className: "w-6 h-6 text-gray-50" })),
                                        React.createElement("span", null, t("label_01"))),
                                    React.createElement("h2", { className: "max-w-2xl mb-4 text-5xl font-extrabold tracking-tight leading-none md:text-6xl xl:text-7xl text-gray-900" }, t("bannerText01")),
                                    React.createElement("p", { className: "max-w-2xl mb-6 font-light text-gray-500  lg:mb-8 md:text-lg lg:text-xl " },
                                        t("bannerText02"),
                                        "."),
                                    React.createElement(link_1["default"], { href: routes_1.productsRoute.path, className: "" },
                                        React.createElement(flowbite_react_1.Button, { theme: button_1.customButtonTheme, outline: true, color: "gray", size: "md", className: "px-6 text-md uppercase" },
                                            React.createElement(tb_1.TbArrowForwardUpDouble, { className: "w-6 h-6 mr-2" }),
                                            tActions("order_now")))),
                                React.createElement("div", { "data-aos": "fade-up-left", "data-aos-duration": "1000", className: "hidden lg:mt-0 lg:col-span-6 lg:flex relative -right-54 top-20" },
                                    React.createElement(image_1["default"], { width: 500, height: 500, src: "https://ikonect.info/assets/images/app/cards/card-black.png", className: "lg:scale-90 xl:scale-90 w-[500px] absolute left-20 -top-24 rotate-[30deg] z-30 border-1 shadow-sm shadow-gray-500 border-zinc-600 rounded-[1.8rem]", alt: "mockup", loading: "lazy" }),
                                    React.createElement(image_1["default"], { width: 500, height: 500, src: "https://ikonect.info/assets/images/app/cards/card-white.png", className: "lg:scale-95 xl:scale-90 w-[500px] absolute left-10 top-16 z-0 border-2 rotate-[-35deg] shadow-md shadow-gray-100 border-gray-100 rounded-[1.8rem]", alt: "mockup", loading: "lazy" })))))))),
        React.createElement(Container_1["default"], { className: "max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" },
            React.createElement("div", { className: "max-w-2xl mx-auto" },
                React.createElement("div", { className: "grid gap-12" },
                    React.createElement("div", { "data-aos": "fade-up", "data-aos-duration": "800" },
                        React.createElement("h2", { "data-aos": "fade-up", "data-aos-duration": "800", className: "text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white" }, "Our vision"),
                        React.createElement("p", { className: "mt-3 text-gray-800 dark:text-neutral-400" }, t("index_vision_text"))),
                    React.createElement("div", { className: "space-y-6 lg:space-y-10" },
                        React.createElement("div", { "data-aos": "fade-up-right", "data-aos-duration": "700", className: "flex" },
                            React.createElement("svg", { className: "flex-shrink-0 mt-2 size-6 text-gray-800 dark:text-white", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                React.createElement("path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" }),
                                React.createElement("path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" }),
                                React.createElement("path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" }),
                                React.createElement("path", { d: "M10 6h4" }),
                                React.createElement("path", { d: "M10 10h4" }),
                                React.createElement("path", { d: "M10 14h4" }),
                                React.createElement("path", { d: "M10 18h4" })),
                            React.createElement("div", { className: "ms-5 sm:ms-8" },
                                React.createElement("h3", { className: "text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200" }, t("index_vision_title01")),
                                React.createElement("p", { className: "mt-1 text-gray-600 dark:text-neutral-400" }, t("index_vision_section01")))),
                        React.createElement("div", { "data-aos": "fade-left", "data-aos-duration": "700", className: "flex" },
                            React.createElement("svg", { className: "flex-shrink-0  size-6 text-gray-800 dark:text-white", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", fill: "none", viewBox: "0 0 24 24" },
                                React.createElement("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667" })),
                            React.createElement("div", { className: "ms-5 sm:ms-8" },
                                React.createElement("h3", { className: "text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200" }, t("index_vision_title02")),
                                React.createElement("p", { className: "mt-1 text-gray-600 dark:text-neutral-400" }, t("index_vision_section02")))),
                        React.createElement("div", { "data-aos": "fade-up-left", "data-aos-duration": "700", className: "flex" },
                            React.createElement("svg", { className: "flex-shrink-0 mt-2 size-6 text-gray-800 dark:text-white", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                React.createElement("path", { d: "M7 10v12" }),
                                React.createElement("path", { d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" })),
                            React.createElement("div", { className: "ms-5 sm:ms-8" },
                                React.createElement("h3", { className: "text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200" }, t("index_vision_title03")),
                                React.createElement("p", { className: "mt-1 text-gray-600 dark:text-neutral-400" }, t("index_vision_section03")))))))),
        React.createElement("div", { className: "h-screen w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" },
            React.createElement("div", { "data-aos": "fade-down", "data-aos-duration": "500", className: "=min-h-[35vh] h-full bg-[url('https://images.unsplash.com/photo-1665686374006-b8f04cf62d57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-center bg-cover bg-no-repeat relative rounded-xl md:min-h-[75vh]" },
                React.createElement("div", { className: "absolute\n            bottom-0 start-0 end-0 max-w-xs text-center mx-auto p-6 md:start-auto md:text-start md:mx-0" },
                    React.createElement("div", { className: "px-5 py-4 inline-block bg-white rounded-lg md:p-7 dark:bg-neutral-800" },
                        React.createElement("div", { className: "hidden md:block" },
                            React.createElement("h3", { className: "text-lg font-bold text-gray-800 sm:text-2xl dark:text-neutral-200" }, t("how_does_section")),
                            React.createElement("p", { className: "mt-2 text-gray-800 dark:text-neutral-200" }, t("learn_about_text"))),
                        React.createElement("div", { className: "md:mt-16" },
                            React.createElement("a", { className: "flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-gray-500 dark:text-white dark:hover:text-neutral-400", href: "#" },
                                React.createElement("svg", { className: "flex-shrink-0 size-4", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                    React.createElement("polygon", { points: "5 3 19 12 5 21 5 3" })),
                                t("watch_tutorial_text"))))))),
        React.createElement(Footer_1["default"], null)));
}
exports["default"] = Home;
