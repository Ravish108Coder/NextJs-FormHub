"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@radix-ui/react-label";
import {  JobApplicationFormDetails } from "./JobApplicationForm";

interface JobApplicationCheckboxProps {
  formDetails: JobApplicationFormDetails,
  handleCheckboxChange : (value: boolean, id: string, key: keyof JobApplicationFormDetails) => void,
  errors: { [key: string]: string }
}

const JobApplicationCheckItems = [
  {
      id: "javascript",
      label: "JavaScript",
  },
  {
      id: "css",
      label: "CSS",
  },
  {
      id: "python",
      label: "Python",
  },
  {
      id: "typescript",
      label: "TypeScript",
  },
  {
      id: "react",
      label: "React",
  },
  {
      id: "nodejs",
      label: "Node.js",
  },
] as const;

export default function JobApplicationCheckbox(
  {
    formDetails,
    handleCheckboxChange,
    errors
  }: JobApplicationCheckboxProps
) {
  return (
    <div className="mb-4">
      <p className="mb-2 font-semibold">Experience</p>
      {JobApplicationCheckItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-row items-center space-x-3 space-y-0"
        >
          <Checkbox
            id={item.id}
            name="additionalSkills"
            value={item.id}
            checked={formDetails.additionalSkills[item.id] || false}
            onCheckedChange={value => handleCheckboxChange(value as boolean, item.id, 'additionalSkills')}
          />

          <Label className="font-normal" htmlFor={item.id}>{item.label}</Label>
        </div>
      ))}
      {errors.additionalSkills && <p className="error">{errors.additionalSkills}</p>}
    </div>
  )
}
