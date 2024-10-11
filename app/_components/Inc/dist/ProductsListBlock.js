"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var flowbite_react_1 = require("flowbite-react");
var routes_1 = require("@/app/_core/config/routes");
var image_1 = require("next/image");
var link_1 = require("next/link");
var button_1 = require("@/app/_styles/flowbite/button");
var tb_1 = require("react-icons/tb");
var constants_1 = require("@/app/_core/config/constants");
var functions_1 = require("@/app/_core/utils/functions");
var badge_1 = require("@/app/_styles/flowbite/badge");
var KoGadgetItem_1 = require("@/app/_core/models/KoGadgetItem");
var dropdown_1 = require("@/app/_styles/flowbite/dropdown");
var ImageSkeleton_1 = require("@/app/_components/Common/Skeleton/ImageSkeleton");
var TextSkeleton_1 = require("@/app/_components/Common/Skeleton/TextSkeleton");
var NoResultFound_1 = require("@/app/_components/Common/NoResultFound");
function ProductsListBlock(_a) {
    var data = _a.data, isLoading = _a.isLoading;
    var _b = react_1.useState("all"), filter = _b[0], setFilter = _b[1];
    var gadgetFilters = ["all", "card", "ring", "watch"];
    var _c = react_1.useState([]), gadgets = _c[0], setGadgets = _c[1];
    react_1.useEffect(function () {
        var ga = [];
        data.map(function (gadget) {
            var g = new KoGadgetItem_1.KoGadgetItem(JSON.parse(gadget.kg_details).name, gadget.kg_code, JSON.parse(gadget.kg_details).description, JSON.parse(gadget.kg_details).price, JSON.parse(gadget.kg_details).weightDimensions, JSON.parse(gadget.kg_details).color, JSON.parse(gadget.kg_details).material, JSON.parse(gadget.kg_details).type, JSON.parse(gadget.kg_details).imageURL);
            ga.push(g);
        });
        setGadgets(ga);
    }, [data]);
    return (react_1["default"].createElement("div", { className: "" },
        react_1["default"].createElement("div", { className: "flex space-x-3 items-center pb-6" },
            react_1["default"].createElement("div", { className: "w-max space-x-1" },
                react_1["default"].createElement(flowbite_react_1.Badge, { size: "sm", icon: tb_1.TbFilterFilled, href: "#", className: "px-3 py-2", color: "dark", theme: badge_1.customBadgeTheme },
                    react_1["default"].createElement("span", null, "Filter"))),
            react_1["default"].createElement(flowbite_react_1.Dropdown, { label: functions_1.ucfirst(filter), theme: dropdown_1.customDropdownTheme, inline: true }, gadgetFilters.map(function (gadgetFilter, index) { return (react_1["default"].createElement(flowbite_react_1.Dropdown.Item, { onClick: function () {
                    setFilter(gadgetFilter);
                }, key: index }, functions_1.ucfirst(gadgetFilter))); }))),
        react_1["default"].createElement("div", { className: "" },
            react_1["default"].createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" }, !isLoading ? (gadgets != null && gadgets.length == 0 ? (react_1["default"].createElement("div", { className: "sm:col-span-2 lg:col-span-3" },
                react_1["default"].createElement(NoResultFound_1["default"], null))) : (gadgets === null || gadgets === void 0 ? void 0 : gadgets.map(function (gadget, index) {
                console.log((constants_1.ROOT_FILES_URL + gadget.imageURL[0]).toString());
                return (react_1["default"].createElement("span", { key: index, className: "mx-auto sm:mr-0 group cursor-pointer lg:mx-auto transition-all duration-500 rounded-xl p-3" },
                    react_1["default"].createElement("div", { className: "bg-white border rounded-3xl overflow-hidden border-noir-medium/25" },
                        react_1["default"].createElement(image_1["default"], { width: 500, height: 500, src: constants_1.ROOT_FILES_URL +
                                gadget.imageURL[0], alt: "face cream image", className: "" })),
                    react_1["default"].createElement("div", { className: "mt-5" },
                        react_1["default"].createElement("div", { className: "flex items-center justify-between" },
                            react_1["default"].createElement("h6", { className: "font-semibold text-md leading-8 text-black transition-all duration-500 group-hover:text-gray-800" }, functions_1.ucfirst(gadget.color.name) +
                                " " +
                                gadget.name),
                            react_1["default"].createElement("div", { className: "flex space-x-2 items-center" },
                                react_1["default"].createElement("h6", { className: "font-semibold text-md leading-8 text-gray-700" },
                                    "$",
                                    gadget.price),
                                react_1["default"].createElement("div", { className: "flex justify-end" },
                                    react_1["default"].createElement(link_1["default"], { href: routes_1.productItemRoute.path +
                                            "/" +
                                            gadget.code },
                                        react_1["default"].createElement(flowbite_react_1.Button, { size: "xs", color: "dark", className: "px-5 py-3", theme: button_1.customButtonTheme },
                                            react_1["default"].createElement("span", { className: "flex items-center space-x-1" },
                                                react_1["default"].createElement(tb_1.TbShoppingBag, { className: "text-lg" }),
                                                react_1["default"].createElement("span", null, "Get"))))))))));
            }))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("div", { className: "flex flex-col" },
                    react_1["default"].createElement(ImageSkeleton_1["default"], { className: "w-full h-52 rounded-xl mb-4" }),
                    react_1["default"].createElement("span", { className: "flex space-x-2 items-center justify-between px-4" },
                        react_1["default"].createElement(TextSkeleton_1["default"], { className: "w-1/3", height: 4 }),
                        react_1["default"].createElement(TextSkeleton_1["default"], { className: "w-24", height: 12 }))),
                react_1["default"].createElement("div", { className: "flex flex-col" },
                    react_1["default"].createElement(ImageSkeleton_1["default"], { className: "w-full h-52 rounded-xl mb-4" }),
                    react_1["default"].createElement("span", { className: "flex space-x-2 items-center justify-between px-4" },
                        react_1["default"].createElement(TextSkeleton_1["default"], { className: "w-1/3", height: 4 }),
                        react_1["default"].createElement(TextSkeleton_1["default"], { className: "w-24", height: 12 })))))))));
}
exports["default"] = ProductsListBlock;
