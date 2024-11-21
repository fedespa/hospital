import { Specialty } from "@prisma/client";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

interface Props {
    user: {
        name: string;
    }
    id: string;
    specialty: Specialty;
    availability: string;
    isActive: boolean;
} 

function DoctorCard({user,id,specialty,availability,isActive} : Props) {
    return (
      <Card className={`${!isActive && "opacity-25"}`}>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{specialty}</p>
          <p>{availability}</p>
        </CardContent>
        <CardFooter>
          <Link href={`/doctor/${id}`}>
            <Button>Ver Doctor</Button>
          </Link>
        </CardFooter>
      </Card>
    );
}

export default DoctorCard;