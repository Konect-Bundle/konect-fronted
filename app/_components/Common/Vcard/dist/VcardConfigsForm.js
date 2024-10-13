"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var flowbite_react_1 = require("flowbite-react");
var InputWithLabel_1 = require("../Form/InputWithLabel");
var form_1 = require("@/app/_styles/flowbite/form");
var formik_1 = require("formik");
var next_intl_1 = require("next-intl");
var react_colorful_1 = require("react-colorful");
var functions_1 = require("@/app/_core/utils/functions");
var VcardConfigsForm = function (_a) {
    var toggleClass = "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-600 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-800";
    // const [switch1, setSwitch1] = useState(true);
    var __ = next_intl_1.useTranslations("Text");
    var setFieldValue = formik_1.useFormikContext().setFieldValue; // Access Formik context
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4" },
            react_1["default"].createElement("div", { className: "h-14" },
                react_1["default"].createElement(InputWithLabel_1["default"], { isInline: true, labelFor: "showKonects", labelTitle: __("profile_color"), className: "h-full items-center" },
                    react_1["default"].createElement(formik_1.Field, { name: "config.configTheme.primaryColor", type: "hidden", className: "sr-only peer h-12" }, function (_a) {
                        var field = _a.field;
                        return (react_1["default"].createElement(flowbite_react_1.Popover, { "aria-labelledby": "default-popover", content: react_1["default"].createElement("div", { className: "flex-col space-y-2 items-center bg-white p-2 rounded-lg" },
                                react_1["default"].createElement(react_colorful_1.HexColorPicker, { color: field.value, onChange: function (color) {
                                        return setFieldValue("config.configTheme.primaryColor", color);
                                    } }),
                                react_1["default"].createElement(flowbite_react_1.TextInput, { theme: form_1.customTextInputTheme, value: field.value, onChange: function (e) {
                                        return setFieldValue("config.configTheme.primaryColor", e.target.value);
                                    } })) },
                            react_1["default"].createElement("div", { className: "py-1 px-1 border rounded-md border-gray-300/45 h-max" },
                                react_1["default"].createElement("div", { style: {
                                        backgroundColor: field.value,
                                        color: functions_1.generateColorVariants(field.value).text
                                    }, className: "w-full h-10 rounded-sm px-2 flex justify-center items-center" }, field.value))));
                    }))),
            react_1["default"].createElement("div", { className: "" },
                react_1["default"].createElement(InputWithLabel_1["default"], { isInline: true, labelFor: 'activatedCard', labelTitle: __("enable_card") },
                    react_1["default"].createElement("label", { className: 'inline-flex items-center mb-5 cursor-pointer' },
                        react_1["default"].createElement(formik_1.Field, { name: 'config.isCardActivated', type: 'checkbox', className: 'sr-only peer' }),
                        react_1["default"].createElement("div", { className: toggleClass })))),
            react_1["default"].createElement("div", { className: '' },
                react_1["default"].createElement(InputWithLabel_1["default"], { isInline: true, labelFor: 'showLocation', labelTitle: __("enable_localization") },
                    react_1["default"].createElement("label", { className: 'inline-flex items-center mb-5 cursor-pointer' },
                        react_1["default"].createElement(formik_1.Field, { name: 'config.showLocalization', type: 'checkbox', className: 'sr-only peer' }),
                        react_1["default"].createElement("div", { className: toggleClass })))),
            react_1["default"].createElement("div", { className: '' },
                react_1["default"].createElement(InputWithLabel_1["default"], { isInline: true, labelFor: 'showKonects', labelTitle: __("enable_show_konects") },
                    react_1["default"].createElement("label", { className: 'inline-flex items-center mb-5 cursor-pointer' },
                        react_1["default"].createElement(formik_1.Field, { name: 'config.showKonects', type: 'checkbox', className: 'sr-only peer' }),
                        react_1["default"].createElement("div", { className: toggleClass })))))));
};
exports["default"] = VcardConfigsForm;
