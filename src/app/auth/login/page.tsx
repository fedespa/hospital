import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
 title: 'Login',
 description: 'Login',
};

export default function LoginPage() {
  return (
    <section className="p-4 flex justify-center items-center h-dvh from-sky-500 to-sky-800 bg-gradient-to-b">
      <LoginForm/>
    </section>
  );
}