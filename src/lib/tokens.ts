import { getVerificationTokenByEmail } from "@/utils/auth/verificationToken"
import { v4 as uuid } from "uuid"
import { prisma } from "@/lib/prisma"

export const generateVerificationToken = async (email: string, role?: "admin" | "doctor") => {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken){
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await prisma.verificationToken.create({
        data: {
            email, token, expires, ...(role && { role })
        }
    })

    return verificationToken
}