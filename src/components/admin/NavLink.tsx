"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    href: string
    title: string
}


function NavLink({href,title} : Props) {
    const pathName = usePathname()
    return ( 
        <Link href={href} className={`${pathName === href && "text-sky-600"} underline`}>
            {title}
        </Link>
     );
}

export default NavLink;