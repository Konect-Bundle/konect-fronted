"use client";
"use strict";
exports.__esModule = true;
var TextSkeleton_1 = require("@/app/_components/Common/Skeleton/TextSkeleton");
var KuserFeedback_1 = require("@/app/_components/Inc/KuserFeedback");
var KonectService_1 = require("@/app/_core/api/services/KonectService");
var UserService_1 = require("@/app/_core/api/services/UserService");
var constants_1 = require("@/app/_core/config/constants");
var UserVcard_1 = require("@/app/_core/models/vcard/UserVcard");
var VcardConfig_1 = require("@/app/_core/models/vcard/VcardConfig");
var functions_1 = require("@/app/_core/utils/functions");
var button_1 = require("@/app/_styles/flowbite/button");
var flowbite_react_1 = require("flowbite-react");
var framer_motion_1 = require("framer-motion");
var next_intl_1 = require("next-intl");
var image_1 = require("next/image");
var link_1 = require("next/link");
var react_1 = require("react");
var md_1 = require("react-icons/md");
var tb_1 = require("react-icons/tb");
var CardBlock_1 = require("../Common/CardBlock");
var DesactivatedCard_1 = require("../Common/DesactivatedCard");
var LinkPreview_1 = require("../Common/LinkPreview");
var enums_1 = require("@/app/_core/utils/enums");
var KuserHeader_1 = require("../Common/Headers/KuserHeader");
var libphonenumber_js_1 = require("libphonenumber-js");
function KuserBlock(_a) {
    var _b, _c;
    var kuser = _a.kuser,
        _d = _a.isLoading,
        isLoading = _d === void 0 ? false : _d;
    var aRef = react_1.useRef(null);
    var _e = react_1.useState(false),
        isCompleted = _e[0],
        setIsCompleted = _e[1];
    var user = UserService_1.UserService.buildObjectParser(kuser);
    var vinfo = user && new UserVcard_1["default"](user.vinfo);
    var vconfig = user && new VcardConfig_1["default"](user.vconfig);
    var __ = next_intl_1.useTranslations("Text");
    var _f = react_1.useState(user.konects_count),
        konectsCount = _f[0],
        setKonectCount = _f[1];
    var kpZoom =
        (_b = functions_1.stringToEnum(
            enums_1.KPreviewZoom,
            vconfig.configTheme.kpZoom,
        )) !== null && _b !== void 0
            ? _b
            : enums_1.KPreviewZoom.NORMAL;
    var kpTheme =
        (_c = functions_1.stringToEnum(
            enums_1.KPreviewThemeMode,
            vconfig.configTheme.themeMode,
        )) !== null && _c !== void 0
            ? _c
            : enums_1.KPreviewThemeMode.LIGHT;
    var _g = react_1.useState(0),
        offsetY = _g[0],
        setOffsetY = _g[1];
    var _h = react_1.useState(0),
        scrollPercent = _h[0],
        setScrollPercent = _h[1];
    var _j = functions_1.generateColorVariants(
            vconfig.configTheme.primaryColor,
        ),
        base = _j.base,
        text = _j.text;
    var handleScroll = function () {
        var totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        var scrollPosition = window.scrollY;
        var percentScrolled = (scrollPosition / totalHeight) * 100;
        setScrollPercent(percentScrolled);
        setOffsetY(scrollPosition);
    };
    react_1.useEffect(function () {
        window.addEventListener("scroll", handleScroll);
        return function () {
            return window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    var handleShareContact = function (e) {
        e.preventDefault();
        if (navigator.share) {
            navigator
                .share({
                    url: window.location.href,
                })
                .then(function () {
                    return console.log("Successful share");
                })
                ["catch"](function (error) {
                    return console.log("Error sharing:", error);
                });
        } else {
            console.log("Can not share");
        }
    };
    var handleSaveContact = function (e) {
        e.preventDefault();
        if (kuser) {
            KonectService_1.KonectService.makeConnect(user.uuid, 1)
                .then(function (rs) {
                    var _a;
                    if (rs.state) {
                        setKonectCount(user.konects_count + 1);
                        var int_1 = setInterval(function () {
                            setIsCompleted(true);
                            clearInterval(int_1);
                        }, 2000);
                    }
                    window.location.href =
                        (_a = aRef.current) === null || _a === void 0
                            ? void 0
                            : _a.href;
                })
                ["catch"](function (err) {
                    console.log(err);
                });
        }
        // aRef.current?.click();
        // setIsSaved(true)
    };
    return vconfig.isCardActivated
        ? React.createElement(
              "div",
              {
                  className: "h-screen",
                  style: {
                      backgroundColor: vconfig.configTheme.primaryColor,
                  },
              },
              isCompleted && _buildKuserFeedback(),
              React.createElement(
                  "div",
                  null,
                  React.createElement(KuserHeader_1["default"], null),
                  scrollPercent > 5 && _buildStickyHeader(),
                  _buildImageCard(),
                  _builBottomContent(),
              ),
          )
        : React.createElement(DesactivatedCard_1["default"], null);
    function _buildStickyHeader() {
        var _a, _b;
        return React.createElement(
            "header",
            {
                className:
                    "transition-opacity uration-1000 sticky top-0 w-full flex -space-y-1 justify-between items-center  bg-white shadow-md py-3 px-6 z-50",
                style: {
                    minHeight: (scrollPercent > 25 ? 100 : 0) + "px",
                    opacity: scrollPercent > 25 ? 1 : 0,
                    borderBottom:
                        "5px solid " + vconfig.configTheme.primaryColor,
                },
            },
            React.createElement(
                "span",
                { className: "flex flex-col -space-y-1 justify-center" },
                React.createElement(
                    "h3",
                    {
                        className:
                            "flex " +
                            (kpZoom == enums_1.KPreviewZoom.NORMAL
                                ? "text-xl"
                                : "text-2xl") +
                            " font-semibold text leading-tight space-x-2 mb-2",
                    },
                    React.createElement(
                        "span",
                        { className: "truncate" },
                        functions_1.ucfirst(vinfo.names.givenName),
                    ),
                    React.createElement(
                        "span",
                        { className: "truncate" },
                        functions_1.ucfirst(vinfo.names.familyName),
                    ),
                ),
                React.createElement(
                    "span",
                    { className: "flex justify-between items-center" },
                    React.createElement(
                        "span",
                        { className: "flex flex-col space-y-2" },
                        React.createElement(
                            "span",
                            { className: "text-sm text-gray-400" },
                            ((_a = vinfo.location.state) === null ||
                            _a === void 0
                                ? void 0
                                : _a.toLocaleUpperCase()) +
                                ", " +
                                ((_b = vinfo.location.iso_code) === null ||
                                _b === void 0
                                    ? void 0
                                    : _b.toLocaleUpperCase()),
                        ),
                    ),
                ),
            ),
            React.createElement(
                flowbite_react_1.Button,
                {
                    color: "dark",
                    theme: button_1.customButtonTheme,
                    size: "mds",
                    onClick: handleSaveContact,
                    style: {
                        background: base,
                        color: text,
                    },
                    className: "h-min",
                },
                React.createElement(tb_1.TbDownload, {
                    className: "mr-3 h-4 w-4",
                }),
                "Save",
            ),
        );
    }
    function _builBottomContent() {
        var _a, _b;
        return React.createElement(
            "div",
            {
                className: "px-4 bg-white flex flex-col space-y-5",
                style: {
                    borderTop: "5px solid " + vconfig.configTheme.primaryColor,
                },
            },
            React.createElement(
                "span",
                { className: "relative py-12" },
                React.createElement(
                    flowbite_react_1.Card,
                    {
                        theme: {
                            root: {
                                children:
                                    "flex flex-col  space-y-6 justify-center p-6",
                            },
                        },
                        className: "w-full flex py-2 absolute -top-24",
                    },
                    React.createElement(
                        "span",
                        {
                            className:
                                "flex h-full items-center space-x-4 truncate",
                        },
                        React.createElement("span", {
                            className:
                                "min-w-28 h-28 bg-cover rounded-lg bg-center",
                            style: {
                                backgroundImage:
                                    "url('" +
                                    (constants_1.ROOT_FILES_URL +
                                        "/" +
                                        user.profile_photo_url) +
                                    "')",
                            },
                        }),
                        React.createElement(
                            "span",
                            {
                                className:
                                    "p-2 text-black-bold flex-col space-y-3",
                            },
                            React.createElement(
                                "h3",
                                {
                                    className:
                                        "flex text-2xl font-bold leading-tight " +
                                        (vinfo.names.familyName.length > 8 ||
                                        vinfo.names.givenName.length > 8
                                            ? "flex-col"
                                            : "space-x-3"),
                                },
                                React.createElement(
                                    "span",
                                    { className: "truncate" },
                                    functions_1.ucfirst(vinfo.names.givenName),
                                ),
                                React.createElement(
                                    "span",
                                    { className: "truncate" },
                                    functions_1.ucfirst(vinfo.names.familyName),
                                ),
                            ),
                            vconfig.showKonects &&
                                React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        "span",
                                        {
                                            className:
                                                "my-1 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded flex items-center bg-gray-50 border w-max",
                                        },
                                        React.createElement(
                                            "span",
                                            { className: "px-1 text-white" },
                                            React.createElement(
                                                md_1.MdOutlineConnectWithoutContact,
                                                {
                                                    className:
                                                        "w-4 h-4 text-gray-700",
                                                },
                                            ),
                                        ),
                                        isLoading
                                            ? React.createElement(
                                                  TextSkeleton_1["default"],
                                                  {
                                                      className: "w-16",
                                                      bgClass: "bg-gray-300/25",
                                                  },
                                              )
                                            : React.createElement(
                                                  "span",
                                                  {
                                                      className:
                                                          "text-sm text-gray-700 space-x-1 flex",
                                                  },
                                                  React.createElement(
                                                      framer_motion_1.motion
                                                          .div,
                                                      {
                                                          initial: {
                                                              opacity: 0,
                                                              scale: 0.5,
                                                          },
                                                          animate: {
                                                              opacity: 1,
                                                              scale: 1,
                                                          },
                                                          transition: {
                                                              duration: 0.2,
                                                              ease: [
                                                                  0, 0.71, 0.2,
                                                                  1.01,
                                                              ],
                                                              scale: {
                                                                  type: "spring",
                                                                  damping: 7,
                                                                  stiffness: 100,
                                                                  restDelta: 0.001,
                                                              },
                                                          },
                                                      },
                                                      React.createElement(
                                                          "span",
                                                          { id: "konect-stat" },
                                                          konectsCount,
                                                      ),
                                                  ),
                                                  React.createElement(
                                                      "span",
                                                      null,
                                                      functions_1.esser(
                                                          "konect",
                                                          konectsCount,
                                                      ),
                                                  ),
                                              ),
                                    ),
                                ),
                            React.createElement(
                                "span",
                                { className: "flex flex-col" },
                                React.createElement(
                                    "span",
                                    { className: "text-sm text-gray-400" },
                                    ((_a = vinfo.location.state) === null ||
                                    _a === void 0
                                        ? void 0
                                        : _a.toLocaleUpperCase()) +
                                        ", " +
                                        ((_b = vinfo.location.iso_code) ===
                                            null || _b === void 0
                                            ? void 0
                                            : _b.toLocaleUpperCase()),
                                ),
                            ),
                        ),
                    ),
                ),
            ),
            React.createElement(
                flowbite_react_1.Button.Group,
                { className: "w-full grid grid-cols-2" },
                React.createElement(
                    flowbite_react_1.Button,
                    {
                        color: "dark",
                        theme: button_1.customButtonTheme,
                        size: "mdm",
                        onClick: handleSaveContact,
                    },
                    React.createElement(tb_1.TbDownload, {
                        className: "mr-3 h-4 w-4",
                    }),
                    "Save",
                ),
                React.createElement(link_1["default"], {
                    href: kuser
                        ? constants_1.ROOT_FILES_URL +
                          "/vcards/" +
                          user.uuid +
                          ".vcf"
                        : "",
                    ref: aRef,
                    className: "hidden opacity-0 invisible",
                }),
                React.createElement(
                    flowbite_react_1.Button,
                    {
                        color: "gray",
                        theme: button_1.customButtonTheme,
                        size: "mdm",
                        onClick: handleShareContact,
                    },
                    React.createElement(tb_1.TbShare2, {
                        className: "mr-3 h-4 w-4",
                    }),
                    "Exchange",
                ),
            ),
            React.createElement(
                "p",
                { className: "line-clamp-4 text-center" },
                functions_1.ucfirst(vinfo.note.text),
            ),
            SocialMediaBloc({
                title: __("social_networks"),
                socialProfils: vinfo.socialProfils,
            }),
            React.createElement(
                CardBlock_1["default"],
                { title: __("contact_informations") },
                React.createElement(
                    "div",
                    { className: " w-full md:pb-0 pb-3" },
                    React.createElement(
                        "ul",
                        { className: "flex flex-col space-y-3 py-2 px-3" },
                        vinfo.email.text &&
                            React.createElement(
                                "li",
                                {
                                    className:
                                        "flex space-x-3 items-center overflow-hidden py-3",
                                },
                                React.createElement(
                                    "span",
                                    {
                                        className:
                                            "bg-gray-200/75 min-w-14 h-14 rounded-xl flex justify-center items-center border",
                                    },
                                    React.createElement(tb_1.TbMail, {
                                        className:
                                            "text-xl text-gray-800 hover:text-gray-800 cursor-pointer",
                                    }),
                                ),
                                React.createElement(
                                    "div",
                                    {
                                        className:
                                            "inline-flex flex-col justify-center w-[inherit]",
                                    },
                                    React.createElement(
                                        "span",
                                        {
                                            className:
                                                "font-bold text-sm text-gray-400 uppercase",
                                        },
                                        __("email"),
                                    ),
                                    isLoading
                                        ? React.createElement(
                                              "span",
                                              null,
                                              React.createElement(
                                                  TextSkeleton_1["default"],
                                                  {
                                                      className: "w-56 mt-1",
                                                      bgClass: "bg-gray-300/20",
                                                  },
                                              ),
                                          )
                                        : React.createElement(
                                              link_1["default"],
                                              {
                                                  href:
                                                      "mailto:" +
                                                      vinfo.email.text,
                                                  className:
                                                      "text-lg hover:underline text-gray-700 break-words",
                                              },
                                              vinfo.email.text,
                                          ),
                                ),
                            ),
                        React.createElement(
                            "li",
                            null,
                            React.createElement(
                                "span",
                                {
                                    className:
                                        "flex space-x-5 items-start overflow-hidden",
                                },
                                React.createElement(
                                    "span",
                                    {
                                        className:
                                            "bg-gray-200/75 min-w-14 h-14 rounded-xl flex justify-center items-center border",
                                    },
                                    React.createElement(tb_1.TbPhone, {
                                        className:
                                            "text-xl text-gray-800 hover:text-gray-800 cursor-pointer",
                                    }),
                                ),
                                React.createElement(
                                    "span",
                                    { className: "flex flex-col" },
                                    React.createElement(
                                        "span",
                                        {
                                            className:
                                                "font-semibold text-sm text-gray-500 uppercase",
                                        },
                                        React.createElement(
                                            "span",
                                            null,
                                            __("phone_number"),
                                        ),
                                    ),
                                    React.createElement(
                                        "ul",
                                        {
                                            className:
                                                "flex flex-col space-y-0 px-0",
                                        },
                                        vinfo.phones.map(function (phone, i) {
                                            var _a, _b;
                                            return (
                                                phone.text &&
                                                React.createElement(
                                                    "li",
                                                    {
                                                        key: i,
                                                        className:
                                                            "flex space-x-3 py-2 justify-start items-center overflow-hidden",
                                                    },
                                                    React.createElement(
                                                        "div",
                                                        {
                                                            className:
                                                                "flex flex-col justify-center",
                                                        },
                                                        React.createElement(
                                                            "span",
                                                            {
                                                                className:
                                                                    "font-normal text-md text-gray-400",
                                                            },
                                                            functions_1.ucfirst(
                                                                phone.type,
                                                            ),
                                                        ),
                                                        isLoading
                                                            ? React.createElement(
                                                                  "span",
                                                                  null,
                                                                  React.createElement(
                                                                      TextSkeleton_1[
                                                                          "default"
                                                                      ],
                                                                      {
                                                                          className:
                                                                              "w-40 mt-1",
                                                                          bgClass:
                                                                              "bg-gray-300/20",
                                                                      },
                                                                  ),
                                                              )
                                                            : React.createElement(
                                                                  link_1[
                                                                      "default"
                                                                  ],
                                                                  {
                                                                      href:
                                                                          "tel:" +
                                                                          ((_a =
                                                                              libphonenumber_js_1
                                                                                  .parsePhoneNumberFromString(
                                                                                      "+" +
                                                                                          phone.text,
                                                                                  )
                                                                                  .formatInternational()) !==
                                                                              null &&
                                                                          _a !==
                                                                              void 0
                                                                              ? _a
                                                                              : phone.text),
                                                                      className:
                                                                          "text-lg hover:underline text-md text-gray-700",
                                                                  },
                                                                  (_b =
                                                                      libphonenumber_js_1
                                                                          .parsePhoneNumberFromString(
                                                                              "+" +
                                                                                  phone.text,
                                                                          )
                                                                          .formatInternational()) !==
                                                                      null &&
                                                                      _b !==
                                                                          void 0
                                                                      ? _b
                                                                      : phone.text,
                                                              ),
                                                    ),
                                                )
                                            );
                                        }),
                                    ),
                                ),
                            ),
                        ),
                        vconfig.showLocalization &&
                            React.createElement(
                                "li",
                                {
                                    className:
                                        "flex space-x-3 items-center overflow-hidden py-3",
                                },
                                React.createElement(
                                    "span",
                                    {
                                        className:
                                            "bg-gray-200/75 min-w-14 h-14 rounded-xl flex justify-center items-center border",
                                    },
                                    React.createElement(tb_1.TbMapPin, {
                                        className:
                                            "text-xl text-gray-800 hover:text-gray-800 cursor-pointer",
                                    }),
                                ),
                                React.createElement(
                                    "div",
                                    {
                                        className:
                                            "inline-flex flex-col justify-center w-[inherit]",
                                    },
                                    React.createElement(
                                        "span",
                                        {
                                            className:
                                                "font-bold text-sm text-gray-400",
                                        },
                                        "Location",
                                    ),
                                    isLoading
                                        ? React.createElement(
                                              "span",
                                              null,
                                              React.createElement(
                                                  TextSkeleton_1["default"],
                                                  {
                                                      className: "w-52 mt-1",
                                                      bgClass: "bg-gray-300/20",
                                                  },
                                              ),
                                          )
                                        : React.createElement(
                                              link_1["default"],
                                              {
                                                  href:
                                                      "https://www.google.com/maps/search/?api=1&query=" +
                                                      vinfo.location.state,
                                                  target: "_blank",
                                                  className:
                                                      "text-lg hover:underline text-gray-700 break-words",
                                              },
                                              vinfo.location.state +
                                                  ", " +
                                                  vinfo.location.iso_code,
                                          ),
                                ),
                            ),
                    ),
                ),
            ),
            React.createElement(
                "div",
                { className: "flex flex-col space-y-8 rounded-lg" },
                vinfo.urls.length > 0 &&
                    React.createElement(
                        CardBlock_1["default"],
                        { title: __("external_links") },
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                {
                                    className:
                                        "grid gap-3 md:grid-cols-2 grid-cols-1",
                                },
                                vinfo.urls.map(function (url, i) {
                                    return React.createElement(
                                        LinkPreview_1["default"],
                                        { key: i, url: url },
                                    );
                                }),
                            ),
                        ),
                    ),
                vinfo.urls.length > 0 &&
                    React.createElement(
                        CardBlock_1["default"],
                        { title: __("videos_links") },
                        React.createElement(
                            "div",
                            { className: "pb-28" },
                            React.createElement(
                                "div",
                                {
                                    className:
                                        "grid md:grid-cols-2 grid-cols-1 gap-3",
                                },
                                vinfo.videoLinks.map(function (video, i) {
                                    return React.createElement(
                                        "div",
                                        {
                                            className:
                                                "flex flex-col items-center space-y-3",
                                            key: i,
                                        },
                                        React.createElement("iframe", {
                                            src: functions_1.convertYouTubeLinkToEmbed(
                                                video.uri,
                                            ),
                                            title: "W3Schools Free Online Web Tutorials",
                                            className: "w-full h-52",
                                            loading: "lazy",
                                        }),
                                        React.createElement(
                                            "span",
                                            {
                                                className:
                                                    "text-gray-400 text-lg",
                                            },
                                            video.type,
                                        ),
                                    );
                                }),
                                " ",
                            ),
                        ),
                    ),
            ),
        );
    }
    function _buildImageCard() {
        return React.createElement(
            "div",
            { className: "bg-cover bg-center " },
            React.createElement(
                "div",
                {
                    className:
                        "relative py-28 overflow-hidden flex justify-center items-end",
                },
                React.createElement("div", {
                    className: "absolute inset-0 bg-cover bg-center",
                    style: {
                        transform: "translateY(" + offsetY * 0.5 + "px)",
                        scale: "1.5",
                        backgroundImage:
                            "url('" +
                            (constants_1.ROOT_FILES_URL +
                                "/" +
                                user.profile_photo_url) +
                            "')",
                        filter: "blur(8px)",
                    },
                }),
                React.createElement("div", {
                    className: "absolute inset-0 bg-black-bold opacity-60",
                }),
                React.createElement("div", {
                    className: "absolute inset-0 bg-black-bold opacity-5",
                    style: {
                        backgroundColor: vconfig.configTheme.primaryColor,
                    },
                }),
                React.createElement("div", {
                    className:
                        "relative z-10 flex items-center justify-center text-white mx-4",
                }),
            ),
        );
    }
    function _buildKuserFeedback() {
        return React.createElement(KuserFeedback_1["default"], {
            callback: function () {
                setIsCompleted(false);
            },
            kuser: user,
        });
    }
}
exports["default"] = KuserBlock;
function SocialMediaBloc(_a) {
    var title = _a.title,
        socialProfils = _a.socialProfils;
    // console.log(title, socialProfils);
    function hasValidUrl(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var item = obj[key];
                if (item.uri.trim() !== "") {
                    return true; // Retourne true si au moins une URL est remplie
                }
            }
        }
        return false; // Retourne false si aucune URL n'est remplie
    }
    if (hasValidUrl(socialProfils)) {
        return React.createElement(
            CardBlock_1["default"],
            { title: title },
            React.createElement(
                "div",
                { className: "flex float-start flex-wrap gap-3" },
                Object.keys(socialProfils).map(function (so, i) {
                    if (socialProfils[so].uri) {
                        return React.createElement(
                            "span",
                            { className: "", key: i },
                            socialProfils[so].type == "instagram" &&
                                React.createElement(
                                    link_1["default"],
                                    {
                                        href: socialProfils[so].uri,
                                        target: "_blank",
                                        className:
                                            "border h-20 w-20 rounded-md flex items-center justify-center",
                                    },
                                    React.createElement(image_1["default"], {
                                        className: "w-16 rounded",
                                        src: "https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg",
                                        alt: "instagram",
                                        loading: "lazy",
                                        width: 500,
                                        height: 500,
                                    }),
                                ),
                            socialProfils[so].type == "facebook" &&
                                React.createElement(
                                    link_1["default"],
                                    {
                                        href: socialProfils[so].uri,
                                        target: "_blank",
                                        className:
                                            "border h-20 w-20 rounded-md flex items-center justify-center",
                                    },
                                    React.createElement(image_1["default"], {
                                        className: "w-16 rounded",
                                        src: "https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg",
                                        alt: "facebook",
                                        loading: "lazy",
                                        width: 500,
                                        height: 500,
                                    }),
                                ),
                            socialProfils[so].type == "linkedin" &&
                                React.createElement(
                                    link_1["default"],
                                    {
                                        href: socialProfils[so].uri,
                                        target: "_blank",
                                        className:
                                            "border h-20 w-20 rounded-md flex items-center justify-center",
                                    },
                                    React.createElement(image_1["default"], {
                                        className: "w-9 rounded",
                                        src: "https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg",
                                        alt: "linkedin",
                                        loading: "lazy",
                                        width: 500,
                                        height: 500,
                                    }),
                                ),
                            socialProfils[so].type == "youtube" &&
                                React.createElement(
                                    link_1["default"],
                                    {
                                        href: socialProfils[so].uri,
                                        target: "_blank",
                                        className:
                                            "border h-20 w-20 rounded-md flex items-center justify-center",
                                    },
                                    React.createElement(image_1["default"], {
                                        className: "w-8 rounded",
                                        src: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
                                        alt: "youtube",
                                        loading: "lazy",
                                        width: 500,
                                        height: 500,
                                    }),
                                ),
                            socialProfils[so].type == "tiktok" &&
                                React.createElement(
                                    link_1["default"],
                                    {
                                        href: socialProfils[so].uri,
                                        target: "_blank",
                                        className:
                                            "border h-20 w-20 rounded-md flex items-center justify-center",
                                    },
                                    React.createElement(image_1["default"], {
                                        className: "w-16 rounded",
                                        src: "https://www.logo.wine/a/logo/TikTok/TikTok-Icon-Logo.wine.svg",
                                        alt: "tiktok",
                                        loading: "lazy",
                                        width: 500,
                                        height: 500,
                                    }),
                                ),
                            socialProfils[so].type == "twitter" &&
                                React.createElement(
                                    link_1["default"],
                                    {
                                        href: socialProfils[so].uri,
                                        target: "_blank",
                                        className:
                                            "border h-20 w-20 rounded-md flex items-center justify-center",
                                    },
                                    React.createElement(image_1["default"], {
                                        className: "w-8 rounded",
                                        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553",
                                        alt: "twitter",
                                        loading: "lazy",
                                        width: 500,
                                        height: 500,
                                    }),
                                ),
                        );
                    }
                }),
            ),
        );
    } else {
        return React.createElement("span", { className: "hidden" });
    }
}
