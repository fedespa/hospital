import NewVerificationForm from "@/components/auth/NewVerificationForm";
import { Suspense } from "react";

export const metadata = {
 title: 'Verification Page',
 description: 'Verification Page',
};

export default function NewVerificationPage() {
  return (
    <div className="flex items-center justify-center h-dvh p-3">
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </div>
  );
}