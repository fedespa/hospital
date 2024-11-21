import CardLayout from "@/components/patient/CardLayout";
import { prisma } from "@/lib/prisma";

export const metadata = {
 title: 'Nuestros doctores',
 description: 'Nuestros doctores',
};

export default async function DoctoresPage() {
  const doctors = await prisma.doctor.findMany({
    take: 10,
    where: { isVerified: true},
    include: {
      user: {
        select: {
          name: true,
        }
      }
    },
  })

  return (
        <CardLayout doctors={doctors}/>
  );
}