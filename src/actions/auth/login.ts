"use server"

import { signIn } from "@/auth"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { loginSchema } from "@/schemas"
import { getUserByEmail } from "@/utils/auth/user"
import { z } from "zod"
import bycript from "bcryptjs"
import { AuthError } from "next-auth"


export const login = async (values: z.infer<typeof loginSchema>) => {
    const validatedFields = loginSchema.safeParse(values)
    if (!validatedFields.success) return { error: "Invalid Fields!" }

    const { email, password } = validatedFields.data
    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email || !existingUser.password){
        return { error: "Invalid Credentials" }
    }

    const isCorrectPassword = await bycript.compare(password, existingUser.password)
    if (!isCorrectPassword) return { error: "Contraseña incorrecta"}

    if (!existingUser.emailVerified && isCorrectPassword) {
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token, existingUser.name)
        return { success: "Confirmation Email Sent" }
    }

    

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
        return { success: "Inicio sesion correctamente!" }
    }
    catch (error) {
        if (error instanceof AuthError){
            console.log("ERROR:", error)
            return { error: "Something went wrong!"}
        }
        // TODO
        throw error
    }


}