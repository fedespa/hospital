import { Specialty } from "@prisma/client";
import DoctorCard from "./DoctorCard";

interface Props {
  doctors: {
    user: {
      name: string;
    };
    id: string;
    specialty: Specialty;
    availability: string;
    userId: string;
    isVerified: boolean;
    isActive: boolean;
  }[]
}

function CardLayout({doctors} : Props) {
  return (
    <section className="flex gap-5 flex-wrap mt-5">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} {...doctor} />
      ))}
    </section>
  );
}

export default CardLayout;
