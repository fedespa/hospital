import { AppointmentStatus, Specialty, Role } from "@prisma/client";
import { Card, CardHeader, CardTitle,CardFooter, CardDescription, CardContent } from "../ui/card";
import { formatDate } from "@/utils/time-date";
import Link from "next/link";

interface Props {
  date: Date;
  status: AppointmentStatus;
  notes: string | null;
  doctor: {
    id: string;
    userId: string;
    isVerified: boolean;
    specialty: Specialty;
    availability: string;
    isActive: boolean;
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
      role: Role;
      emailVerified: Date | null;
      password: string;
      createdAt: Date;
    };
  };
}

function AppointmentCardForPatient({date, status, notes, doctor} : Props) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cita: {status}</CardTitle>
          <CardDescription>
            <Link href={`/doctor/${doctor.id}`} className="hover:underline hover:text-gray-600 duration-100">Doctor: {doctor.user.name}</Link>
            <p>Especialidad: {doctor.specialty}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{`${formatDate(date)}`}</p>
        </CardContent>
        {notes && <CardFooter>{notes}</CardFooter>}
      </Card>
    );
}

export default AppointmentCardForPatient;