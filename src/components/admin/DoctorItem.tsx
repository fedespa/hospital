"use client";

import { Specialty } from "@prisma/client";
import EditableInput from "./EditableInput";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { generateDoctorSlug } from "@/utils/slug";

interface Props {
  specialty: Specialty;
  availability: string;
  isVerified: boolean;
  id: string;
  user: {
    image: string | null;
    name: string;
    email: string;
    createdAt: Date;
  };
}

function DoctorItem({ specialty, availability, isVerified, user, id }: Props) {
  return (
    <tr>
      <td className="border p-1.5 hover:bg-gray-400 duration-150">
        {user.name}
      </td>
      <td className="border p-1.5 hover:bg-gray-400 duration-150">
        {user.email}
      </td>
      <td className="border p-1.5 hover:bg-violet-400 duration-150">
        <EditableInput initialValue={specialty} id={id} field="specialty" />
      </td>
      <td className="border p-1.5 hover:bg-violet-400 duration-150">
        <EditableInput
          initialValue={availability}
          id={id}
          field="availability"
        />
      </td>
      {isVerified ? (
        <td className="text-green-600 border p-1.5 hover:bg-gray-400 duration-150">
          Sí
        </td>
      ) : (
        <td className="text-red-600 border p-1.5 hover:bg-gray-400 duration-150">
          No
        </td>
      )}
      <td className="p-1.5 duration-150 hover:bg-green-500 border">
        <Link href={`/admin/doctor/${generateDoctorSlug({ id })}`} className="cursor-pointer">
          <ExternalLinkIcon />
        </Link>
      </td>
    </tr>
  );
}

export default DoctorItem;
