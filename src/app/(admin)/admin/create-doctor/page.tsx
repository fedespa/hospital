import DoctorCreateForm from "@/components/admin/DoctorCreateForm";


export const metadata = {
 title: 'Create Doctor',
 description: 'Create Doctor',
};

export default function CreateDoctorPage() {
  return (
    <div className="flex items-center justify-center h-dvh p-4">
        <DoctorCreateForm/>
    </div>
  );
}