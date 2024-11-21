"use server"

import { prisma } from "@/lib/prisma";
import { formatDate } from "@/utils/time-date";

export default async function generateAppointment(date: Date, doctorId: string, patientId: string, notes?: string) {
    if (!date || typeof date !== "object") return { error: "No ingresó la fecha o no es válida"}

    const today = new Date()

    const fromDay = new Date()
    fromDay.setDate(today.getDate() + 1); // A partir de mañana
    fromDay.setHours(0,0,0,0)

    
    let year = today.getFullYear()
    let month = today.getMonth() + 5

    if (year > 11){
        year += Math.floor(month / 12)
        month = month % 12
    }

    const lastDay = new Date(year, month + 1, 0)
    lastDay.setHours(23)
    lastDay.setMinutes(59)
    
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return { error: "Día de la semana no válido" }
    }

    /* if (date.getTime() < fromDay.getTime() || date.getTime() > lastDay.getTime()) {

        return { error: "Fecha no válida" }
    } */
    

    const newAppointment = await prisma.appointment.create({
        data: {
            date,
            doctorId,
            patientId,
            status: "PENDING",
            ...(notes && {notes})
        }
    })



    return { success: `Cita agendada correctamente para el ${formatDate(newAppointment.date)}` } 
}