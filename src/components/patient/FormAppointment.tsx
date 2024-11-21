'use client'

import * as React from "react";
import { DatePicker } from "@/components/patient/DatePicker";
import SelectComponent from "@/components/SelectComponent";
import { Button } from "@/components/ui/button";
import AlertError from "@/components/AlertError";
import generateAppointment from "@/actions/hospital/patient";
import AlertSuccess from "../AlertSuccess";


interface Props {
  intervalTime: string[];
  idDoctor: string
  idPatient: string
}

function FormAppointment({intervalTime, idDoctor, idPatient} : Props) {
    const [date, setDate] = React.useState<Date>();
    const [hour, setHour] = React.useState<string | undefined>();
    const [error, setError] = React.useState<string>()
    const [success, setSuccess] = React.useState<string>();
    const [notes, setNotes] = React.useState("")

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!date || typeof date !== "object"){ 
            setError("Día no seleccionado o no válido")
            return
        }
        if (!hour || typeof hour !== "string") {
            setError("Hora no seleccionada o no válida")
            return;
        }
        const [ hours, minutes ] = hour.split(":").map(Number)
        date.setHours(hours)
        date.setMinutes(minutes)
        await generateAppointment(date, idDoctor, idPatient, notes)
        .then(data => {
          setSuccess(data.success)
          setError(data.error)
        })
    };

    return (
      <form className="flex flex-col gap-2" onSubmit={(e) => onSubmit(e)}>
        <DatePicker date={date} setDate={setDate} />
        <div>
          <SelectComponent
            options={intervalTime}
            hour={hour}
            setHour={setHour}
          />
        </div>
        <div className="flex flex-col gap-1 mt-1">
          <label htmlFor="notes" className="text-xs">Notas(opcional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            name=""
            id="notes"
            className="border p-1 max-h-36 text-sm"
            placeholder="Notas.."
          ></textarea>
        </div>
        <Button type="submit">Agendar Cita</Button>
        <AlertError message={error} />
        <AlertSuccess message={success}/>
      </form>
    );
}

export default FormAppointment;