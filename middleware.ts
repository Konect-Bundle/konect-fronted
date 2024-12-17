import { UserService } from "@/core/api/services/UserService";
import { AUTH_TOKEN_NAME } from "@/core/config/constants";
import { settingsProfilRoute } from "@/core/config/routes";
import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set(
        "redirectTo",
        request.nextUrl.pathname + request.nextUrl.search,
    );
    // Example: Redirect all users trying to access `/admin` to `/login`
    //   if (pathname === '/admin') {
    //     return NextResponse.redirect(new URL('/login', req.url));
    //   }

    if (pathname === "/account/vcard") {
        return NextResponse.redirect(
            new URL(settingsProfilRoute.path, request.url),
        );
    }

    // let cookie = request.cookies;

    // if (cookie.has(AUTH_TOKEN_NAME)) {
    //     const user = await UserService.getLoggedUser(
    //         cookie.get(AUTH_TOKEN_NAME)?.value!,
    //     );
    //     if (user.state && user.data.email) {
    //         return NextResponse.next();
    //     } else {
    //         return NextResponse.redirect(redirectUrl);
    //     }
    //     return NextResponse.json(user);
    // }

    // return NextResponse.redirect(new URL(redirectUrl));

    // return NextResponse.redirect(new URL('/home', request.url))
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/account/:path*", "/payment/:path*"],
};
