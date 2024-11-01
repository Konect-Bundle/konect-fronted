"use client";
"use strict";
exports.__esModule = true;
var constants_1 = require("@/app/_core/config/constants");
var routes_1 = require("@/app/_core/config/routes");
var functions_1 = require("@/app/_core/utils/functions");
var hooks_1 = require("@/app/_store/hooks");
var authSlice_1 = require("@/app/_store/slices/authSlice");
var avatar_1 = require("@/app/_styles/flowbite/avatar");
var badge_1 = require("@/app/_styles/flowbite/badge");
var button_1 = require("@/app/_styles/flowbite/button");
var navbar_1 = require("@/app/_styles/flowbite/navbar");
var flowbite_react_1 = require("flowbite-react");
var next_intl_1 = require("next-intl");
var image_1 = require("next/image");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var tb_1 = require("react-icons/tb");
function Header(props) {
    var router = navigation_1.useRouter();
    var pathname = navigation_1.usePathname();
    var tAction = next_intl_1.useTranslations("Actions");
    var tLinks = next_intl_1.useTranslations("Links");
    var __ = next_intl_1.useTranslations("Text");
    var dispatch = hooks_1.useAppDispatch();
    var user = hooks_1.useAppSelector(function (state) { return state.auth.currentUser; });
    var isLoading = hooks_1.useAppSelector(function (state) { return state.auth.isLoading; });
    return (isLoading === false && (React.createElement(flowbite_react_1.Navbar, { fluid: true, rounded: true, theme: navbar_1.customNavbarTheme },
        React.createElement("div", { className: 'flex md:flex-nowrap space-x-3 flex-nowrap justify-between mx-auto md:py-2 py-1 w-full md:items-center items-start' },
            React.createElement(flowbite_react_1.NavbarBrand, { href: routes_1.homeRoute.path },
                React.createElement("div", { className: 'md:h-[100%] h-[72px] bg-gray-900 rounded-xl py-3 px-6 flex items-center justify-center' },
                    React.createElement(image_1["default"], { width: 500, height: 500, src: constants_1.ROOT_ASSETS_URL + "/images/logo-yellow.png", className: 'md:w-8 w-12', alt: 'Flowbite React Logo', priority: true }))),
            React.createElement("div", { className: 'bg-gray-900 w-[inherit] py-3 rounded-xl flex md:items-center items-end justify-end md:order-2 md:flex-row flex-col space-x-4 rtl:space-x-reverse md:pe-6 pe-2' },
                React.createElement("div", { className: 'ml-4 flex items-center md:order-2 md:space-x-4 space-x-3' },
                    user && (React.createElement(flowbite_react_1.Badge, { icon: tb_1.TbDiamondFilled, theme: badge_1.customBadgeTheme, className: 'w-max', size: "md", color: 'bordered' },
                        React.createElement("span", null, user.points + " "),
                        " ")),
                    React.createElement(link_1["default"], { href: routes_1.productsRoute.path },
                        React.createElement(flowbite_react_1.Button, { theme: button_1.customButtonTheme, color: 'primary', size: 'md' }, tAction("get_card"))),
                    !user ? (React.createElement(React.Fragment, null,
                        React.createElement(link_1["default"], { href: routes_1.loginRoute.path },
                            React.createElement(flowbite_react_1.Button, { theme: button_1.customButtonTheme, color: 'primary-light', size: 'md' }, tAction("login"))),
                        React.createElement(flowbite_react_1.NavbarToggle, null))) : (React.createElement("div", { className: 'flex space-x-4 pe-3' },
                        React.createElement(flowbite_react_1.Dropdown, { arrowIcon: false, inline: true, label: user.profile_photo_url ? (React.createElement("span", { className: 'flex items-center space-x-1 rounded-full p-1 border-2 border-gray-500' },
                                React.createElement(flowbite_react_1.Avatar, { theme: avatar_1.customAvatarTheme, rounded: true, img: constants_1.ROOT_FILES_URL +
                                        "/" +
                                        user.profile_photo_url, className: 'w-full', size: 'md' }),
                                React.createElement(tb_1.TbChevronDown, { size: 28, className: 'text-gray-300' }))) : (React.createElement(flowbite_react_1.Avatar, { theme: avatar_1.customAvatarTheme, rounded: true, className: 'w-full', size: 'md' })) },
                            React.createElement(flowbite_react_1.Dropdown.Header, null,
                                React.createElement("span", { className: 'block text-sm' }, functions_1.ucwords(user.firstname + " " + user.name)),
                                React.createElement("span", { className: 'block truncate text-sm font-medium' }, user.email)),
                            React.createElement(flowbite_react_1.Dropdown.Item, null,
                                React.createElement(link_1["default"], { href: routes_1.dashboardRoute.path, className: 'w-full block' },
                                    React.createElement("span", { className: 'flex items-center space-x-1' },
                                        React.createElement(tb_1.TbLayoutDashboardFilled, null),
                                        React.createElement("span", null, tLinks("dashboard"))))),
                            React.createElement(flowbite_react_1.Dropdown.Item, null,
                                React.createElement(link_1["default"], { href: routes_1.vcardRoute.path, className: 'w-full block' },
                                    React.createElement("span", { className: 'flex items-center space-x-1' },
                                        React.createElement(tb_1.TbId, null),
                                        React.createElement("span", null, __("my_contact_sheet"))))),
                            React.createElement(flowbite_react_1.Dropdown.Item, null,
                                React.createElement(link_1["default"], { href: routes_1.konectsListRoute.path, className: 'w-full block' },
                                    React.createElement("span", { className: 'flex items-center space-x-1' },
                                        React.createElement(tb_1.TbUsers, null),
                                        React.createElement("span", null, __("my_connections"))))),
                            React.createElement(flowbite_react_1.Dropdown.Divider, null),
                            React.createElement(flowbite_react_1.Dropdown.Item, null,
                                React.createElement(link_1["default"], { href: routes_1.ordersHistoryRoute.path, className: 'w-full block' },
                                    React.createElement("span", { className: 'flex items-center space-x-1' },
                                        React.createElement(tb_1.TbHistory, null),
                                        React.createElement("span", null, __("order_history"))))),
                            React.createElement(flowbite_react_1.Dropdown.Item, null,
                                React.createElement(link_1["default"], { href: routes_1.shareProfilRoute.path, className: 'w-full block' },
                                    React.createElement("span", { className: 'flex items-center space-x-1' },
                                        React.createElement(tb_1.TbShare3, null),
                                        React.createElement("span", null, __("share_profil"))))),
                            React.createElement(flowbite_react_1.Dropdown.Divider, null),
                            React.createElement(flowbite_react_1.Dropdown.Item, null,
                                React.createElement(link_1["default"], { href: routes_1.settingsProfilRoute.path, className: 'w-full block' },
                                    React.createElement("span", { className: 'flex items-center space-x-1' },
                                        React.createElement(tb_1.TbSettings, null),
                                        React.createElement("span", null, __("account_settings"))))),
                            React.createElement(flowbite_react_1.Dropdown.Item, { onClick: function () {
                                    dispatch(authSlice_1.logout());
                                    router.replace(routes_1.homeRoute.path);
                                } },
                                React.createElement("span", { className: 'flex items-center space-x-1' },
                                    React.createElement(tb_1.TbPower, null),
                                    React.createElement("span", null, tLinks("logout")))))))),
                !user && (React.createElement(flowbite_react_1.NavbarCollapse, { className: '' },
                    React.createElement(flowbite_react_1.NavbarLink, { className: 'uppercase', href: routes_1.howItRoute.path, active: pathname == "/howit" ? true : false }, tLinks("how_it_works")),
                    React.createElement(flowbite_react_1.NavbarLink, { className: 'uppercase', href: '/contact', active: pathname == "/contact" ? true : false }, tLinks("contact_us")))))))));
}
exports["default"] = Header;
