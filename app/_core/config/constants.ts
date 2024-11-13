export const ROOT_ASSETS_URL = "https://ikonect.info/assets";
export const ROOT_FILES_PROD = "https://ikonect.info";
export const ROOT_FILES_URL =
    process.env.NEXT_PUBLIC_ENV == "production"
        ? ROOT_FILES_PROD
        : "http://localhost:8000/storage";
export const AUTH_TOKEN_NAME = "konectAuthToken";
export const INTENT_COOKIE_NAME = "konectIntent";
