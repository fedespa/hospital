import EmailTemplate from "@/components/EmailTemplate"
import { Resend } from "resend"


const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string, name: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: "no-reply@federicospagnolo.online",
        to: `${email}`,
        subject: 'Email Verification',
        react: EmailTemplate({
            name: name,
            email: email,
            href: confirmLink
        })
    })
}   