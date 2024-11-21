"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



interface Props {
  options: string[];
  hour: string | undefined;
  setHour: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function SelectComponent({options, hour, setHour}: Props) {

  const handleChange = (value: string) => {
    setHour(value)
  }


  return (
    <Select onValueChange={(e) => handleChange(e)} value={hour}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a time" />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => <SelectItem value={option} key={option} >{option}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

export default SelectComponent;
