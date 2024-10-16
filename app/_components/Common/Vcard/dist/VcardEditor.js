"use_client";
"use strict";
exports.__esModule = true;
var UserVcard_1 = require("@/app/_core/models/vcard/UserVcard");
var react_1 = require("react");
var flowbite_react_1 = require("flowbite-react");
var formik_1 = require("formik");
var VcardGeneralForm_1 = require("./VcardGeneralForm");
var VcardSocialForm_1 = require("./VcardSocialForm");
var tb_1 = require("react-icons/tb");
// import VcardJobForm from './VcardJobForm';
var VcardLinksForm_1 = require("./VcardLinksForm");
var VcardVideosForm_1 = require("./VcardVideosForm");
var button_1 = require("@/app/_styles/flowbite/button");
var VcardConfigsForm_1 = require("./VcardConfigsForm");
var tabs_1 = require("@/app/_styles/flowbite/tabs");
var VcardConfig_1 = require("@/app/_core/models/vcard/VcardConfig");
var constants_1 = require("@/app/_core/config/constants");
var UserService_1 = require("@/app/_core/api/services/UserService");
var cookies_next_1 = require("cookies-next");
var react_2 = require("react");
var sweetalert2_1 = require("sweetalert2");
var form_1 = require("@/app/_styles/flowbite/form");
var LoadingLayout_1 = require("../../Layouts/LoadingLayout");
var next_intl_1 = require("next-intl");
var avatar_1 = require("@/app/_styles/flowbite/avatar");
var functions_1 = require("@/app/_core/utils/functions");
var apiErrorsManagement_1 = require("@/app/_core/api/errors/apiErrorsManagement");
var ErrorsViewer_1 = require("../Errors/ErrorsViewer");
var VcardEditor = function (_a) {
    var user = _a.user;
    var vcard = new UserVcard_1["default"](user.vinfo);
    var vconfig = new VcardConfig_1["default"](user.vconfig);
    var urls = vcard.urls;
    var videos = vcard.videoLinks;
    var phones = vcard.phones;
    var _b = react_1.useState(null), selectedImage = _b[0], setSelectedImage = _b[1];
    var _c = react_1.useState(null), file = _c[0], setFile = _c[1];
    var _d = react_1.useState(false), isLoading = _d[0], setIsLoading = _d[1];
    var TAction = next_intl_1.useTranslations("Actions");
    var Ttext = next_intl_1.useTranslations("Text");
    var _e = react_1.useState(""), errors = _e[0], setErrors = _e[1];
    var initialValues = {
        names: {
            givenName: vcard.names.givenName,
            familyName: vcard.names.familyName,
            middleName: vcard.names.middleName,
            prefix: vcard.names.prefix,
            suffix: vcard.names.suffix
        },
        email: {
            type: vcard.email.type,
            text: vcard.email.text
        },
        socialProfils: {
            facebook: vcard.socialProfils.facebook.uri,
            instagram: vcard.socialProfils.instagram.uri,
            twitter: vcard.socialProfils.twitter.uri,
            youtube: vcard.socialProfils.youtube.uri,
            tiktok: vcard.socialProfils.tiktok.uri,
            linkedin: vcard.socialProfils.linkedin.uri
        },
        location: {
            state: vcard.location.state ? functions_1.ucfirst(vcard.location.state) : "",
            country: vcard.location.iso_code
                ? vcard.location.iso_code.toUpperCase()
                : "CA"
        },
        urls: urls,
        videoLinks: videos,
        note: {
            text: vcard.note.text
        },
        phones: phones,
        config: vconfig
    };
    var handleSubmitForm = function (values) {
        setIsLoading(true);
        var formData = new FormData();
        formData.append("data", JSON.stringify(values));
        if (file) {
            formData.append("img", file);
        }
        var token = cookies_next_1.getCookie(constants_1.AUTH_TOKEN_NAME);
        if (token) {
            UserService_1.UserService.updateVcard(formData, token)
                .then(function (rs) {
                setErrors("");
                sweetalert2_1["default"].fire({
                    position: "center",
                    icon: "success",
                    title: TAction("vcard_updated"),
                    showConfirmButton: false,
                    timer: 2500
                });
            })["catch"](function (error) {
                if (error.response) {
                    var res = new apiErrorsManagement_1["default"](error);
                    setErrors(res.proccess());
                }
            })["finally"](function () {
                setIsLoading(false);
            });
        }
    };
    react_2.useEffect(function () {
        // console.log(initialValues);
        if (file) {
            var reader_1 = new FileReader();
            reader_1.onloadend = function () {
                setSelectedImage(reader_1.result);
            };
            reader_1.readAsDataURL(file);
        }
    }, [file]);
    return (react_1["default"].createElement(LoadingLayout_1["default"], { isLoading: isLoading },
        react_1["default"].createElement(formik_1.Formik, { initialValues: initialValues, onSubmit: handleSubmitForm }, function (formProps) { return (react_1["default"].createElement(formik_1.Form, { className: 'flex flex-col items-end' },
            react_1["default"].createElement("div", { className: 'bg-white rounded-lg mb-6 w-full' },
                react_1["default"].createElement(flowbite_react_1.Tabs, { "aria-label": 'Tabs with icons', theme: tabs_1.customTabsTheme, variant: "underline" },
                    react_1["default"].createElement(flowbite_react_1.Tabs.Item, { active: true, title: Ttext("general_infos"), icon: tb_1.TbUserQuestion },
                        react_1["default"].createElement("div", { className: 'flex md:flex-row md:justify-start justify-center flex-col items-center md:space-x-8 space-x-0 px-8 pb-8 pt-5' },
                            react_1["default"].createElement("div", { className: 'w-40 h-40 flex justify-center rounded-xl overflow-hidden' }, user.profile_photo_url ||
                                selectedImage ? (react_1["default"].createElement(flowbite_react_1.Avatar, { img: selectedImage
                                    ? selectedImage
                                    : constants_1.ROOT_FILES_URL +
                                        "/" +
                                        user.profile_photo_url, size: "pxl", alt: 'Kuser Image', theme: avatar_1.customAvatarTheme })) : (react_1["default"].createElement(flowbite_react_1.Avatar, { theme: avatar_1.customAvatarTheme, size: "pxl" }))),
                            react_1["default"].createElement("div", { className: 'md:mt-0 mt-4' },
                                react_1["default"].createElement("div", { className: 'flex flex-col md:items-start items-center' },
                                    react_1["default"].createElement("div", { className: 'cursor-pointer rounded-md flex items-center space-x-1 bg-gray-50 text-gray-500 w-max px-4 py-1 border border-gray-300/40 hover:text-gray-600 transition-colors' },
                                        react_1["default"].createElement(tb_1.TbEdit, null),
                                        react_1["default"].createElement(flowbite_react_1.Label, { className: 'text-gray-500 font-normal cursor-pointer hover:text-gray-600 transition-colors', htmlFor: 'file-upload-helper-text', value: TAction("choose_image") })),
                                    react_1["default"].createElement(flowbite_react_1.FileInput, { className: 'hidden', accept: '.jpg,.jpeg,.png', theme: form_1.customFileInputTheme, color: "gray", id: 'file-upload-helper-text', helperText: 'PNG, JPG or GIF (MAX. 800x400px).', onChange: function (e) {
                                            setFile(e.target.files[0]);
                                            if (file) {
                                                formProps.setFieldValue("img", file);
                                            }
                                        } })))),
                        react_1["default"].createElement("div", { className: 'px-8 pb-8 md:pt-5 pt-2' },
                            react_1["default"].createElement("h2", { className: 'pb-6 font-semibold text-xl ' }, Ttext("general_infos")),
                            react_1["default"].createElement(VcardGeneralForm_1["default"], { formikValues: formProps.values }))),
                    react_1["default"].createElement(flowbite_react_1.Tabs.Item, { title: Ttext("social_networks"), icon: tb_1.TbBrandInstagram },
                        react_1["default"].createElement("div", { className: 'px-8 pb-8 pt-5' },
                            react_1["default"].createElement("h2", { className: 'pb-6 font-semibold text-xl ' }, Ttext("social_networks")),
                            react_1["default"].createElement(VcardSocialForm_1["default"], null))),
                    react_1["default"].createElement(flowbite_react_1.Tabs.Item, { title: Ttext("others_links"), icon: tb_1.TbLinkPlus },
                        react_1["default"].createElement("div", { className: 'px-8 pb-8 pt-5' },
                            react_1["default"].createElement("h2", { className: 'pb-6 font-semibold text-xl ' }, Ttext("external_links")),
                            react_1["default"].createElement(VcardLinksForm_1["default"], null))),
                    react_1["default"].createElement(flowbite_react_1.Tabs.Item, { title: Ttext("video") + "s", icon: tb_1.TbVideo },
                        react_1["default"].createElement("div", { className: 'px-8 pb-8 pt-5' },
                            react_1["default"].createElement("h2", { className: 'pb-6 font-semibold text-xl ' }, Ttext("video") + "s"),
                            react_1["default"].createElement(VcardVideosForm_1["default"], null))),
                    react_1["default"].createElement(flowbite_react_1.Tabs.Item, { title: Ttext("other_settings"), icon: tb_1.TbToggleLeft },
                        react_1["default"].createElement("div", { className: 'px-8 pb-8 pt-5' },
                            react_1["default"].createElement("h2", { className: 'font-semibold text-xl ' }, Ttext("other_settings")),
                            react_1["default"].createElement("p", { className: 'pb-6 text-gray-300/85 text-sm mt-2 font-light' }, Ttext("should_see")),
                            react_1["default"].createElement(VcardConfigsForm_1["default"], null))))),
            react_1["default"].createElement(ErrorsViewer_1["default"], { errors: errors }),
            react_1["default"].createElement(flowbite_react_1.Button, { type: 'submit', theme: button_1.customButtonTheme, color: 'dark', className: '' },
                react_1["default"].createElement(tb_1.TbEdit, { className: "text-lg" }),
                react_1["default"].createElement("span", { className: 'ml-1' }, "Save")))); })));
};
exports["default"] = VcardEditor;
