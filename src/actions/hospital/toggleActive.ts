"use server"

import { prisma } from "@/lib/prisma"



export default async function toggleActive (id: string, isActive: boolean) {
    if (!id || isActive === null || isActive === undefined) return { error: "No se envio el ID, o el estado"}

    await prisma.doctor.update({
        where: { id },
        data: {
            isActive: !isActive
        }
    })

    return { success: "Actualizado correctamente!"}
}
