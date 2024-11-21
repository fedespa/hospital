import Nav from "@/components/admin/Nav";

export default function AdminLayout({children}: {children: React.ReactNode}){
    return (
        <>
            <Nav/>
            {children}
        </>
    )
}