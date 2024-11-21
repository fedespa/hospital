import { Specialty } from "@prisma/client";
import DoctorItem from "./DoctorItem";

interface Props {
  doctors: {
    id: string;
    specialty: Specialty;
    availability: string;
    userId: string;
    isVerified: boolean;
    user: {
        image: string | null
        name: string
        email: string
        createdAt: Date
    }
  }[];
}

function DoctorsList({doctors} : Props) {
  return (
    <table>
      <thead>
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Specialty</th>
          <th className="border p-2">Availability</th>
          <th className="border p-2">Is Verified</th>
          <th className="border p-2">Visitar</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doc) => (
          <DoctorItem {...doc} key={doc.id} />
        ))}
      </tbody>
    </table>
  );
}

export default DoctorsList;
