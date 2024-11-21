import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
});

export const registerSchema = z.object({
    email: z.string().email("Debe ser un correo electrónico válido"),
    password: z
        .string()
        .min(5, "La contraseña debe tener al menos 5 caracteres")
        .max(20, "La contraseña no puede tener más de 20 caracteres")
        .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
        .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula"),
    name: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(30, "El nombre no puede tener más de 30 caracteres"),
});

const SpecialtyEnum = z.enum(["Cardiologist", "Dermatologist", "Neurologist", "Pediatrician", "Psychiatrist", "Oncologist", "Gynecologist","Ophthalmologist"])

export const doctorRegisterSchema = z.object({
    email: z.string().email("Debe ser un correo electrónico válido"),
    password: z
        .string()
        .min(5, "La contraseña debe tener al menos 5 caracteres")
        .max(20, "La contraseña no puede tener más de 20 caracteres")
        .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
        .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula"),
    name: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(30, "El nombre no puede tener más de 30 caracteres"),
    specialty: SpecialtyEnum,
    availability: z.string().min(11, "Minimo 11 caracteres")
})
