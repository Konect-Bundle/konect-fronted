"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var flowbite_react_1 = require("flowbite-react");
var react_1 = require("react");
var InputWithLabel = function (_a) {
    var _b = _a.disabled, disabled = _b === void 0 ? false : _b, labelFor = _a.labelFor, labelTitle = _a.labelTitle, _c = _a.className, className = _c === void 0 ? "" : _c, _d = _a.labelClassName, labelClassName = _d === void 0 ? "" : _d, _e = _a.isInline, isInline = _e === void 0 ? false : _e, name = _a.name, _f = _a.isRequired, isRequired = _f === void 0 ? false : _f, children = _a.children, props = __rest(_a, ["disabled", "labelFor", "labelTitle", "className", "labelClassName", "isInline", "name", "isRequired", "children"]);
    return (react_1["default"].createElement("div", { className: (isInline ? "flex space-x-3" : "") + (" " + className) },
        react_1["default"].createElement("div", { className: isInline ? "" : "mb-2" },
            react_1["default"].createElement("div", { className: isInline ? "" : "flex mb-2" },
                react_1["default"].createElement(flowbite_react_1.Label, { htmlFor: labelFor, value: labelTitle, className: " " + labelClassName }),
                isRequired && react_1["default"].createElement("span", { className: "text-red-600" }, "*"))),
        children));
};
exports["default"] = InputWithLabel;
