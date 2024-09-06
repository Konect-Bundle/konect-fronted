import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { AUTH_TOKEN_NAME } from "./app/_core/config/constants";
import { homeRoute, loginRoute } from "./app/_core/config/routes";
import { UserService } from "./app/_core/api/services/UserService";
import { getCurrentUser } from "./app/_store/slices/authSlice";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Example: Redirect all users trying to access `/admin` to `/login`
    //   if (pathname === '/admin') {
    //     return NextResponse.redirect(new URL('/login', req.url));
    //   }
    let cookie = request.cookies;

    if (cookie.has(AUTH_TOKEN_NAME)) {
        const user = await UserService.getLoggedUser(
            cookie.get(AUTH_TOKEN_NAME)?.value!,
        );
        if (user.state && user.data.id) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL(loginRoute.path, request.url));
        }
        return NextResponse.json(user);
    }

    return NextResponse.redirect(new URL(loginRoute.path, request.url));

    // return NextResponse.redirect(new URL('/home', request.url))
    // return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/account/:path*"],
};
