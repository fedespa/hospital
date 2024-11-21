import { AppointmentStatus } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card";
import { formatDate } from "@/utils/time-date";
import { prisma } from "@/lib/prisma";

interface Props {
  appointment: {
    date: Date;
    status: AppointmentStatus;
    notes: string | null;
    patientId: string;
  };
}

async function AppointmentCardForDoctor({appointment} : Props) {
    const { date,status,notes,patientId  } = appointment

    const patient = await prisma.patient.findUnique({
        where: {id: patientId},
        select: {
            contactInfo: true,
            user: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    })

    if (!patient) return null

    const {contactInfo, user} = patient 

    return (
      <Card>
        <CardHeader>
          <CardTitle>Cita: {status}</CardTitle>
          <CardDescription>
            <h4 className="text-black">Paciente:</h4>
            <p>{user.name}</p>
            <p>{contactInfo}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h4 className="text-black">Detalles:</h4>
          <p>{formatDate(date)}</p>
        </CardContent>
        {notes && <CardFooter>{notes}</CardFooter>}
      </Card>
    );
}

export default AppointmentCardForDoctor;