import { prisma } from "../lib/prisma"
import bycript from "bcryptjs"

async function main(){
    Promise.all([
        prisma.appointment.deleteMany(),
        prisma.doctor.deleteMany(),
        prisma.invoice.deleteMany(),
        prisma.medicalRecord.deleteMany(),
        prisma.patient.deleteMany(),
        prisma.user.deleteMany(),
        prisma.verificationToken.deleteMany()
    ])

    await prisma.user.create({
        data: {
            name: "admin",
            email: "admin@admin.com",
            password: bycript.hashSync("Admin", 10),
            role: "admin",
            emailVerified: new Date()
        }
    })
}

(() => {
    main()
})() 