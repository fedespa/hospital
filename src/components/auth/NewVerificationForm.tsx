'use client'
import { newVerification } from "@/actions/auth/new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners"
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import Link from "next/link";


function NewVerificationForm() {
    const [success, setSuccess] = useState<string>()
    const [error, setError] = useState<string>()
    const searchParams = useSearchParams()

    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
      if (!token) {
            return setError("No existe el token");
      }
      newVerification(token)
        .then((data) => {
          setSuccess(data.success)
          setError(data.error)
        })
    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-400">Confirming your Verification</p>
          {!success && !error && <BeatLoader />}
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Link href={'/auth/login'} className="text-sm text-blue-600">Back to login</Link>
      </div>
    );
}

export default NewVerificationForm;