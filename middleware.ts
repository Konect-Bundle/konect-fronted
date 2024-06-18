import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    let cookie = request.cookies.get('nextjs')
    console.log(cookie)
    // return NextResponse.redirect(new URL('/home', request.url))
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/about/:path*',
// }