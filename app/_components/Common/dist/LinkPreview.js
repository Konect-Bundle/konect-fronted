"use strict";
exports.__esModule = true;
var React = require("react");
var tb_1 = require("react-icons/tb");
var ExternalsPlatformDetector_1 = require("@/app/_core/utils/classes/ExternalsPlatformDetector");
var fa6_1 = require("react-icons/fa6");
function LinkPreviewBlock(_a) {
    var url = _a.url;
    var icon = React.createElement(tb_1.TbExternalLink, null);
    var platform = ExternalsPlatformDetector_1["default"].detectPlatform(
        url.uri,
    );
    var iconClass = "w-6";
    if (
        (platform === null || platform === void 0 ? void 0 : platform.name) ==
        "Facebook"
    ) {
        icon = React.createElement(fa6_1.FaFacebook, { className: iconClass });
    } else if (
        (platform === null || platform === void 0 ? void 0 : platform.name) ==
        "Twitter"
    ) {
        icon = React.createElement(fa6_1.FaTwitter, { className: iconClass });
    } else if (
        (platform === null || platform === void 0 ? void 0 : platform.name) ==
        "Instagram"
    ) {
        icon = React.createElement(fa6_1.FaSquareInstagram, {
            className: iconClass,
        });
    } else if (
        (platform === null || platform === void 0 ? void 0 : platform.name) ==
        "Google"
    ) {
        icon = React.createElement(fa6_1.FaGoogle, { className: iconClass });
    } else if (
        (platform === null || platform === void 0 ? void 0 : platform.name) ==
        "Tiktok"
    ) {
        icon = React.createElement(fa6_1.FaTiktok, { className: iconClass });
    } else if (
        (platform === null || platform === void 0 ? void 0 : platform.name) ==
        "X"
    ) {
        icon = React.createElement(fa6_1.FaXTwitter, { className: iconClass });
    } else if (
        (platform === null || platform === void 0 ? void 0 : platform.name) ==
        "Youtube"
    ) {
        icon = React.createElement(fa6_1.FaYoutube, { className: iconClass });
    } else if (
        (platform === null || platform === void 0 ? void 0 : platform.name) ==
        "LinkedIn"
    ) {
        icon = React.createElement(fa6_1.FaLinkedin, { className: iconClass });
    } else if (
        (platform === null || platform === void 0 ? void 0 : platform.name) ==
        "Github"
    ) {
        icon = React.createElement(fa6_1.FaGithub, { className: iconClass });
    } else if (
        (platform === null || platform === void 0 ? void 0 : platform.name) ==
        "Spotify"
    ) {
        icon = React.createElement(fa6_1.FaSpotify, { className: iconClass });
    } else if (
        (platform === null || platform === void 0 ? void 0 : platform.name) ==
        "Soundcloud"
    ) {
        icon = React.createElement(fa6_1.FaSoundcloud, {
            className: iconClass,
        });
    }
    return React.createElement(
        "div",
        {
            className:
                "flex justify-start bg-slate-50 rounded-md border  items-center p-4 overflow-hidden",
        },
        React.createElement(
            "span",
            { className: "bg-white text-xl p-4 border rounded-md" },
            icon,
        ),
        React.createElement(
            "div",
            { className: "flex flex-col px-4" },
            React.createElement(
                "span",
                { className: "font-bold text-md" },
                url.type,
            ),
            React.createElement(
                "span",
                null,
                React.createElement(
                    "a",
                    {
                        className: "text-gray-500 text-md underline truncate",
                        target: "__blank",
                        href: url.uri,
                    },
                    url.uri,
                ),
            ),
        ),
    );
}
exports["default"] = LinkPreviewBlock;
