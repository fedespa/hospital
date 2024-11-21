"use client";

import changeDoctor from "@/actions/hospital/changeDoctor";
import { SpecialtiesArray } from "@/utils/admin/verificateEnum";
import { startTransition, useState } from "react";
import AlertError from "../AlertError";
import AlertSuccess from "../AlertSuccess";


interface Props {
  initialValue: string;
  id: string;
  field: string
}

function EditableInput({ initialValue, id, field }: Props) {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [isFocus, setIsFocus] = useState(false);
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClick = () => {
    if (!id || !initialValue || !inputValue || inputValue === initialValue) {
        setError("Falta un campo")
        setInputValue(initialValue);
        return
    }
    // Specialty
    if (field === "specialty" &&!SpecialtiesArray.includes(inputValue)) {
        setError("Especialidad no válida")
        setInputValue(initialValue)
        return
    }
    // Availability
    if (field === "availability" && inputValue.length < 11){
      setError("Formato de fecha no válido")
      setInputValue(initialValue);
      return
    }
    startTransition(() => {
        changeDoctor(id, field, inputValue).then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
    })
  };

  return (
    <div className="flex">
      <input
        className={`outline-none bg-transparent focus:border-b box-border`}
        value={inputValue}
        onChange={(e) => handleChange(e)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      <button
        className={`min-w-6 ${
          isFocus ? "" : "opacity-25 duration-100"
        }`}
        onClick={onClick}
      >
        ✔️
      </button>
      <AlertError message={error}/>
      <AlertSuccess message={success}/>
    </div>
  );
}

export default EditableInput;
