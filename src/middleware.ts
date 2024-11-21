import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, adminRoutesPrefix, publicRoutes, privatedRoutes } from "./routes";



const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req) {
    const { nextUrl } = req
    const pathname = nextUrl.pathname
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.some(route => route === pathname)
    const isAuthRoute = authRoutes.some(route => route === pathname)

    const isAdminRoute = nextUrl.pathname.startsWith(adminRoutesPrefix)
    const isPrivatedRoute = isPublicRoute ? false : privatedRoutes.some(route => route === pathname || route.startsWith("/doctor"))

    const role = req.auth?.user.role

    if (role !== "admin" && isAdminRoute) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }

    if (role === "admin" && nextUrl.pathname === "/auth/new-verification") return

    if (isApiAuthRoute) return

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return
    }

    if (!isLoggedIn && isPrivatedRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl))
    }

    return
})

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
}

