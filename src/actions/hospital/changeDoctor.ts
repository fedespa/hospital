"use server"

import { prisma } from "@/lib/prisma"
import { SpecialtiesArray } from "@/utils/admin/verificateEnum"


export default async function changeDoctor(idDoctor: string, field: string, newValue: string){
    try {
        if (!idDoctor || !field || !newValue) return { error: "Falta un campo!" }
        console.log(field, newValue)
        if (field === "specialty" && !SpecialtiesArray.includes(newValue)) return { error: "Especialidad no valida" }

        if (field === "availability" && newValue.length < 11) return { error: "Formato de fecha no válido" }

        await prisma.doctor.update({
            where: {id: idDoctor},
            data: {
                [field]: newValue 
            }
        })
        return { success: "Modificado correctamente!" }
    }
    catch{
        return { error: "Ha sucedido un error!" }
    }
}