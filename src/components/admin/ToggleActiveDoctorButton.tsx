'use client'

import toggleActive from "@/actions/hospital/toggleActive"
import { useRouter } from "next/navigation"
import AlertError from "../AlertError"
import AlertSuccess from "../AlertSuccess"
import { useState } from "react"

interface Props {
    id: string
    isActive: boolean
}

function ToggleActiveDoctorButton({id, isActive} : Props) {
    const [error, setError] = useState<string>()
    const [success, setSuccess] = useState<string>()

    const router = useRouter()

    const onClick = async () => {
        await toggleActive(id, isActive)
        .then((res) => {
          setError(res.error)
          setSuccess(res.success)
        })
        setTimeout(() => {
          setSuccess(undefined)
          setError(undefined)
        }, 3000)
        router.refresh()
    }

    return (
      <>
        <button
          className="py-1 px-3 border rounded-xl duration-200 hover:bg-black hover:text-white"
          onClick={onClick}
        >
          {isActive ? "Marcar como inactivo" : "Marcar como activo"}
        </button>
        <AlertError message={error}/>
        <AlertSuccess message={success}/>
      </>
    );
}

export default ToggleActiveDoctorButton;