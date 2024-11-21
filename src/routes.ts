// RUTA PUBLICA
// RUTA ADMIN
// RUTA PRIVADA

export const publicRoutes = [
    "/",
    "/doctores"
]

export const privatedRoutes = [
    "/doctor",
    "/mi-perfil"
]


export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/new-verification"
]


export const adminRoutesPrefix = "/admin"

export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/"