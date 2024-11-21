import { AppointmentStatus } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  CardContent,
} from "../ui/card";
import { formatDate } from "@/utils/time-date";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface Props {
  date: Date;
  status: AppointmentStatus;
  notes: string | null;
  doctorId: string;
  patientId: string;
}

async function AppointmentCardForAdmin({
  date,
  status,
  notes,
  doctorId,
  patientId,
}: Props) {
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
    select: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!patient) return <p>Paciente no existe</p>;

  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: {
      id: true,
      specialty: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!doctor) return <p>Doctor no existe</p>;

  const { user } = patient;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cita: {status}</CardTitle>
        <CardDescription>
          <div>
            <Link
              href={`/doctor/${doctor.id}`}
              className="hover:underline hover:text-gray-600 duration-100"
            >
              Doctor: {doctor.user.name}
            </Link>
            <p>Especialidad: {doctor.specialty}</p>
            <p>{doctor.user.email}</p>
          </div>
          <div className="mt-4">
            <p>Paciente: {user.name}</p>
            <p>{user.email}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{`${formatDate(date)}`}</p>
      </CardContent>
      {notes && <CardFooter>{notes}</CardFooter>}
    </Card>
  );
}

export default AppointmentCardForAdmin;
