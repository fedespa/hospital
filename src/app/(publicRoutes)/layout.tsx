import NavBarPatient from "@/components/patient/NavBarPatient";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="p-5">
        <NavBarPatient/>
        {children}
    </section>
  );
}
