import RegisterForm from "@/components/auth/RegisterForm";



export const metadata = {
 title: 'Register',
 description: 'Register',
};

export default function RegisterPage() {
  return (
    <section className="p-4 flex justify-center items-center h-dvh from-sky-500 to-sky-800 bg-gradient-to-b">
        <RegisterForm/>
    </section>
  );
}