"use server"

import { prisma } from "@/lib/prisma"
import { getUserByEmail } from "@/utils/auth/user"
import { getVerificationTokenByToken } from "@/utils/auth/verificationToken"

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token)

    if (!existingToken){
        return { error: "Token does not exist!"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) {
        return { error: "Token has expired!"}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
        return { error: "Email does not exist!"}
    }

    await prisma.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    if (existingToken.role === "patient"){
        await prisma.patient.update({
            where: { userId: existingUser.id },
            data: {
                isVerified: true,
                contactInfo: existingToken.email
            }
        })
    }

    if (existingToken.role === "doctor"){
        await prisma.doctor.update({
            where: { userId: existingUser.id },
            data: {
                isVerified: true
            }
        })
    }


    await prisma.verificationToken.delete({
        where: {id: existingToken.id}
    })

    return { success: "Email verified!"}
}