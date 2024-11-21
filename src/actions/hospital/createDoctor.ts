"use server"

import { doctorRegisterSchema } from "@/schemas"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { getUserByEmail } from "@/utils/auth/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const createDoctor = async (values: z.infer<typeof doctorRegisterSchema>) => {
    const validatedFields = doctorRegisterSchema.safeParse(values)
    if (!validatedFields.success) return { error: "Invalid Fields!" }

    const { email, name, password, specialty, availability } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) return { error: "Ya existe un doctor" }

    const newUser = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
            role: "doctor"
        }
    })

    await prisma.doctor.create({
        data: {
            userId: newUser.id,
            specialty,
            availability,
            isVerified: false
        }
    })

    const verificationToken = await generateVerificationToken(email, "doctor")
    sendVerificationEmail(verificationToken.email, verificationToken.token, name)

    return { success: "Confirmation Email Sent" }
}