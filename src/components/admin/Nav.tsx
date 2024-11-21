import NavLink from "./NavLink";

const navItems: {title: string, href: string}[] = [
    {
        title: "Create Doctor",
        href: "/admin/create-doctor"
    },
    {
        title: "List Doctors",
        href: "/admin/list-doctors"
    }
]

function Nav() {
    return ( 
        <nav className="flex gap-3 items-center border py-1.5 px-6">
            <p className="text-2xl bold">Admin</p>
            {navItems.map(item => <NavLink {...item} key={item.href}/>)}
        </nav>
    );
}

export default Nav;