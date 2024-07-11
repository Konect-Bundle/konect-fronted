export const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL
// export const SERVER_URL = 'http://localhost:8000';

export const SERVER_API_URL = SERVER_URL + "/api";

export const apiHeaders = {
    "Content-type": "application/json",
}