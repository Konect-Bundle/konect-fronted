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
    path: "/howit",
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

export const konectsListRoute: RouteNameInterface = {
    name: "konects-list",
    path: "/account/konects",
};

export const passwordResetRoute: RouteNameInterface = {
    name: "password-reset",
    path: "/account/password-reset",
};

export const ordersHistoryRoute: RouteNameInterface = {
    name: "order-history",
    path: "/account/orders",
};

export const shareProfilRoute: RouteNameInterface = {
    name: "share-profil",
    path: "/account/share",
};
