import { RouteNameInterface } from "../types/routesTypes";

/* =======================
 Guest Routes
========================= */
export const homeRoute: RouteNameInterface = {
    name: "home",
    path: "/",
};

export const kuserRoute: RouteNameInterface = {
    name: "kuser",
    path: "/ku",
};

export const howItRoute: RouteNameInterface = {
    name: "how-it",
    path: "/how-it",
};

// Auth proccess
export const loginRoute: RouteNameInterface = {
    name: "login",
    path: "/login",
};

export const registerRoute: RouteNameInterface = {
    name: "register",
    path: "/register",
};

export const productsRoute: RouteNameInterface = {
    name: "products",
    path: "/products",
};

export const productItemRoute: RouteNameInterface = {
    name: "product-item",
    path: "/product-item",
};

/* =======================
 Auth Routes
========================= */

/* =======================
 Profil Routes
========================= */
export const dashboardRoute: RouteNameInterface = {
    name: "dashboard",
    path: "/account/dashboard",
};

export const vcardRoute: RouteNameInterface = {
    name: "vcard",
    path: "/account/vcard",
};

export const passwordResetRoute: RouteNameInterface = {
    name: "password-reset",
    path: "/account/password-reset",
};
