import { NextRequest, NextResponse } from "next/server"
import { verify } from "utils/jwt_sign_verify"
import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "constants/auth"
import { PROTECTED_ROUTES } from "constants/protectedRoutes"

const secret = process.env.SECRET_KEY_JWT as string

export default async function middleware(req: NextRequest) {
  try {
    const rawToken = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value
    const rawUser = req.cookies.get(USER_COOKIE)?.value
    const { pathname } = req.nextUrl

    if (pathname === "/") {
      return NextResponse.next()
    }
    //* cookies didn't exist
    if (!rawToken || rawToken === "" || !rawUser) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    //* check authentication for protected routes
    if (PROTECTED_ROUTES.includes(pathname)) {
      const user = JSON.parse(rawUser)
      const { email: userEmail } = user

      const tokenDecoded = await verify(rawToken, secret)
      const { email: tokenEmail } = tokenDecoded

      if (tokenEmail === userEmail) {
        //* login again when already logged in
        if (pathname === "/auth/signin") {
          return NextResponse.redirect(new URL("/home", req.url))
        }
        return NextResponse.next()
      }
    }

    return NextResponse.next()
  } catch (err) {
    console.log(err)

    return NextResponse.redirect(new URL("/", req.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
}
