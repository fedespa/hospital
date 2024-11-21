import DoctorsList from "@/components/admin/DoctorsList";
import { prisma } from "@/lib/prisma";

export default async function ListDoctorsPage() {

    const doctors = await prisma.doctor.findMany({
      take: 10,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
            createdAt: true
          }
        }
      }
    })

  return (
    <section className="p-5">
      <DoctorsList doctors={doctors}/>
    </section>
  );
}