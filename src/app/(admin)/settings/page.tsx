import { auth, signOut } from "@/auth";



export default async function SettingsPage() {
const session = await auth()
  return (
    <section className="p-4">
      <h1>Settings Page</h1>
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/auth/login" });
        }}
      >
        <button type="submit" className="border">
          Sign Out
        </button>
      </form>
    </section>
  );
}