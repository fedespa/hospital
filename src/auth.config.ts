import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "@/schemas"
import { getUserByEmail, getUserById } from "./utils/auth/user"
import bycript from "bcryptjs"

export default {
    providers: [
        Credentials({
            async authorize(credentials){{
                const validatedFields = loginSchema.safeParse(credentials)
                if (validatedFields.success){
                    const { email, password } = validatedFields.data
                    const user = await getUserByEmail(email)
                    if (!user || !user.password) return null
                    const passwordsMatch = await bycript.compare(password, user.password)
                    if (passwordsMatch) return user
                }
                return null
            }}
        }),
    ],
    callbacks: {
        async signIn({ user, account }){
            // Allow Oauth without email verification (google, github)
            if (account?.provider !== "credentials") return true
            // Prevent sign in without email verification
            const existingUser = await getUserById(user.id as string)
            if (!existingUser?.emailVerified) return false

            // TODO: ADD 2FA CHECK

            return true
        },
        async jwt({ token }){
            if (!token.sub) return token
            const user = await getUserById(token.sub)
            if (!user) return token

            token.role  = user.role
            return token
        },
        async session({session, token}){
            if (session.user && token.sub){
                session.user.id = token.sub 
            }
            if (session.user && token.role){
                session.user.role = token.role as string
            }
            return session
        }
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 7
    }
} satisfies NextAuthConfig