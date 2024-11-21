import { auth } from "@/auth";
import FormAppointment from "@/components/patient/FormAppointment";
import { prisma } from "@/lib/prisma";
import { generateIntervalTime } from "@/utils/time-date";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const awaitedParams = await params;
  const id = awaitedParams.id;

  const doctor = await prisma.doctor.findUnique({
    where: { id },
    select: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!doctor) {
    return {
      title: "Doctor no encontrado",
      description: "El doctor solicitado no existe en la base de datos.",
    };
  }

  const { name } = doctor.user;

  return {
    title: `Doctor: ${name}`,
    description: `Información detallada sobre el doctor ${name}.`,
  };
}

export default async function DoctorPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const idUser = session?.user.id

  const awaitedParams = await params;
  const id = awaitedParams.id;

  if (!id) {
    return <p className="text-2xl">Doctor no existe</p>;
  }

  if (!idUser) {
    return <p className="text-2xl">Usuario no existe</p>
  }

  const patient = await prisma.patient.findUnique({
    where: { userId: idUser},
    select: {
      id: true
    }
  })

  const idPatient = patient?.id

  if (!idPatient) {
      return <p className="text-2xl">Paciente no existe</p>;
  }

  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          createdAt: true,
          name: true,
          image: true,
          email: true,
        },
      },
    },
  });

  if (!doctor) {
    return <p className="text-2xl">Doctor no existe</p>;
  }

  const { specialty, availability, isActive } = doctor
  const { name,image,email,createdAt } = doctor.user

  const startHour = availability.split(" ")[0]
  const endHour = availability.split(" ")[3]

  const intervalTime = generateIntervalTime(startHour, endHour)

  return (
    <div className={`${!isActive && "opacity-30"}`}>
      {!isActive && (
        <p className="text-red-600">No disponible en estos momentos!</p>
      )}
      <h3 className="text-2xl">{name}</h3>
      <div className="mt-6 flex flex-col gap-1 w-fit">
        {image && <Image src={image} alt="Foto del doctor" />}
        <p>Disponibilidad: {availability}</p>
        <p>Especialidad: {specialty}</p>
        <p>Correo: {email}</p>
        <p>Trabaja desde el {createdAt.toLocaleDateString()}</p>
        <FormAppointment intervalTime={intervalTime} idDoctor={doctor.id} idPatient={idPatient}/>
      </div>
    </div>
  );
}
