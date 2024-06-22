import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps<T> {
  name: keyof T;
  value: string;
  options: Option[];
  placeholder: string;
  onValueChange: (value: string, name: keyof T) => void;
  errors?: { [key in keyof T]?: string };
}

function CustomSelect<T>({ name, value, options, placeholder, onValueChange, errors }: CustomSelectProps<T>) {
  return (
    <div>
      <Select name={name as string} value={value}
        onValueChange={(value) => onValueChange(value, name)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value as string}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors && errors[name] && <p className="error">{errors[name]}</p>}
    </div>
  );
}

export default CustomSelect;
