import { auth } from "@/auth";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth()
  if (!session) return
  if (session.user.role !== "admin") {
    return (
      <div className="flex items-center justify-center p-2 h-dvh flex-col gap-1">
        <p className="text-3xl">No tienes acceso!</p>
        <Link href={'/'} className="border py-1.5 px-3 rounded-lg duration-300 hover:bg-black hover:text-white">Ir al Inicio</Link>
      </div>
    )
  }


  return (
    <section className="p-4">
    </section>
  );
}