import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

function ButtonLogout() {
    return (
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/auth/login" });
        }}
      >
        <Button type="submit" className="border">
          Sign Out
        </Button>
      </form>
    );
}

export default ButtonLogout;