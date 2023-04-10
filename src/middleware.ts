import { log } from "console"
import { NextRequest, NextResponse, NextFetchEvent } from "next/server"
import { verify } from "utils/jwt_sign_verify"
import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "constants/auth"
import { PROTECTED_ROUTES } from "constants/protectedRoutes"

const secret = process.env.SECRET_KEY_JWT as string

export default async function middleware(req: NextRequest) {
  try {
    const rawToken = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value as string
    const rawUser = req.cookies.get(USER_COOKIE)?.value as string
    const { pathname } = req.nextUrl
    console.log(rawToken)

    if (pathname === "/") {
      return NextResponse.next()
    }

    if (pathname === "/auth/signin") {
      if (!rawToken || rawToken === "") {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }
    //* check authentication for protected routes
    if (PROTECTED_ROUTES.includes(pathname) && pathname !== "/dashboard") {
      //* cookies didn't exist
      if (isTokensNotExist(rawToken)) {
        //* can only access public routes
        return NextResponse.redirect(new URL("/auth/signin", req.url))
      }
      const user = JSON.parse(rawUser)

      const { email: userEmail } = user

      const tokenDecoded = await verify(rawToken, secret)
      const { email: tokenEmail } = tokenDecoded

      if (tokenEmail === userEmail) {
        //* login again when already logged in
        if (pathname === "/auth/signin") {
          return NextResponse.redirect(new URL("/dashboard", req.url))
        }
        return NextResponse.next()
      }
    }

    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/signin", req.url))
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
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|banner-bottom.png|FPT.png|banner-top.png).*)"
  ]
}

function isTokensNotExist(...tokens: string[]) {
  return tokens.some((token) => token === undefined || token === "")
}
