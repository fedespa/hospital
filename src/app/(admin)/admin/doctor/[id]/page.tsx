import AppointmentCardForAdmin from "@/components/admin/AppointmentCardForAdmin";
import EditableInput from "@/components/admin/EditableInput";
import ToggleActiveDoctorButton from "@/components/admin/ToggleActiveDoctorButton";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ id: string}>}) {
   const awaitedParams = await params;
   const id = awaitedParams.id;

  const doctor = await prisma.doctor.findUnique({
    where: { id },
    select: {
      user: {
        select: {
          name: true,
        },
      }
    }
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

export default async function DoctorPage({ params }: { params: Promise<{ id: string}>}) {
  const awaitedParams = await params;
  const id = awaitedParams.id

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
      appointments: true
    },
  });

  if(!doctor){
    return (<p>Doctor no existe</p>)
  }

  const { isVerified, specialty, availability, isActive, appointments} = doctor
  const { name, createdAt } = doctor.user

  return (
    <section className="p-5">
      <h2 className="text-2xl mb-5">{name}</h2>
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex gap-1 items-center">
          <p>Especialidad:</p>
          <EditableInput id={id} initialValue={specialty} field="specialty" />
        </div>
        <p>
          Estado:
          {isVerified ? (
            <span className="text-green-500"> Verificado</span>
          ) : (
            <span className="text-red-500"> No verificado</span>
          )}
        </p>
        <div className="flex gap-2 items-center">
          <p className={`${!isActive && "opacity-20"} duration-300`}>
            Disponibilidad: {availability}
          </p>
          <ToggleActiveDoctorButton id={id} isActive={isActive} />
        </div>
        <p>Fecha de creación: {createdAt.toLocaleDateString()}</p>
        <hr />
        <div>
          <p>Citas:</p>
          {appointments.length > 0 ? (
            appointments.map(appointment => <AppointmentCardForAdmin {...appointment} key={appointment.id}/>)
          ) : <p className="text-sm">Sin citas.</p>}
        </div>
      </div>
      <Link
        href={"/admin/list-doctors"}
        className="border py-1 px-3 rounded-xl"
      >
        Ver todos los doctores
      </Link>
    </section>
  );
}
