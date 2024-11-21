import NavLink from "@/components/admin/NavLink";
import ButtonLogout from "@/components/ButtonLogout";

const navLinks: { href: string; title: string }[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Conocé nuestros doctores",
    href: "/doctores",
  },
  {
    title: "Mi perfil",
    href: "mi-perfil"
  }
];

function NavBarPatient() {
  return (
    <nav className="flex gap-3 items-center">
      <div className="flex gap-3 items-center">
        {navLinks.map((item) => (
          <NavLink {...item} key={item.href} />
        ))}
      </div>
      <ButtonLogout/>
    </nav>
  );
}

export default NavBarPatient;
