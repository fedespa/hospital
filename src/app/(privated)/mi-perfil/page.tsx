import { auth } from "@/auth";
import AppointmentCardForDoctor from "@/components/doctor/AppointmentCardForDoctor";
import AppointmentCardForPatient from "@/components/patient/AppointmentCardForPatient";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";

export default async function MyProfilePage() {
  const session = await auth();

  if (!session || !session.user)
    return <h4 className="text-2xl">Sesión no disponible</h4>;

  const { id, role } = session.user;

  if (role === "patient") {
    const patient = await prisma.patient.findUnique({
      where: { userId: id },
      include: {
        appointments: {
          include: {
            doctor: {
              include: { user: true },
            },
          },
        },
      },
    });
    if (!patient) {return <h4 className="text-2xl">Cuenta de paciente no disponible</h4>}
    const { appointments, contactInfo, allergies, medications } = patient;
    return (
      <section className="w-fit">
        <div className="py-1 px-3 text-sm">
          <h3 className="text-base">Contact Info:</h3>
          <p>{contactInfo}</p>
        </div>
        <Separator />
        <div className="py-1 px-3 text-sm">
          <h3 className="text-base">Alergias:</h3>
          <p>{allergies ? allergies : "Sin alergias"}</p>
        </div>
        <Separator />
        <div className="py-2 px-3">
          <p>Tus citas:</p>
          {appointments.length > 0 ? (
            appointments.map((el) => (
              <AppointmentCardForPatient {...el} key={el.id} />
            ))
          ) : (
            <p className="text-sm">No tienes citas</p>
          )}
        </div>
        <Separator />
        <div className="py-1 px-3 text-sm">
          <h3 className="text-base">Medicacion:</h3>
          <p>{medications ? medications : "Sin medicación asignada"}</p>
        </div>
        <Separator />
      </section>
    );
  }
  if (role === "doctor") {
    const doctor = await prisma.doctor.findUnique({
        where: { userId: id},
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    createdAt: true
                }
            },
            appointments: true
        }
    })
    if (!doctor) return <p className="text-3xl">Cuenta de doctor no existe</p>
    const { specialty,availability,user, isActive, appointments } = doctor

    return (
      <section className="w-fit">
        <div className="py-1 px-3 text-sm">
          <p className="text-base">Informacion personal:</p>
          <p>- {specialty}</p>
          <p>- {availability}</p>
          <p>- {user.email}</p>
          <p>- {user.name}</p>
        </div>
        <Separator />
        <div className="py-2 px-3">
          <p className="text-base">Tus citas:</p>
          {appointments.length < 1 ? (
            <p className="text-sm">Sin citas</p>
          ) : (
            appointments.map((appointment) => (
              <AppointmentCardForDoctor appointment={appointment} key={appointment.id}/>
            ))
          )}
        </div>
        <Separator />
        <div className="py-1 px-3 text-sm">
            <p>{isActive ? "Actualmente está disponible." : "No disponible."}</p>
        </div>
        <Separator />
      </section>
    );
  }
}
