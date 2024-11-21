"use server"

import { registerSchema } from "@/schemas"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { getUserByEmail } from "@/utils/auth/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const register = async (values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values)
    if (!validatedFields.success) return { error: "Invalid Fields!" }

    const {email, name, password} = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) return {error: "Email already in use"}

    const newUser = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    await prisma.patient.create({
        data: {
            userId: newUser.id,
            contactInfo: newUser.email,
            isVerified: false
        }
    })

    const verificationToken = await generateVerificationToken(email)
    sendVerificationEmail(verificationToken.email,verificationToken.token, name)

    return { success: "Confirmation Email Sent" }
}