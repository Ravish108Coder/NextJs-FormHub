'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import JobApplicationCheckbox from "./JobApplicationCheckbox"
import DateTimePickerComponent from "./DateTimePicker"
import useForm from "@/hooks/useForm"
import dayjs from "dayjs"
import CustomSelect from "./CustomSelect"
import FormDetailsModal from "./DisplayModal"

export type TJobPosition = "Developer" | "Manager" | "Designer" | undefined

export interface JobApplicationFormDetails {
    name: string;
    email: string;
    phoneNo: string;
    position: TJobPosition;
    relevantExperience: string;
    portFolioUrl: string;
    managementExperience: string;
    additionalSkills: { [key: string]: boolean };
    interviewTime: dayjs.Dayjs | null | undefined;
}

const JobApplicationFormInitialDetails: JobApplicationFormDetails = {
    name: '',
    email: '',
    phoneNo: '',
    position: undefined,
    relevantExperience: '',
    portFolioUrl: '',
    managementExperience: '',
    additionalSkills: {
        javascript: false,
        css: false,
        python: false,
        typescript: false,
        react: false,
        nodejs: false
    },
    interviewTime: undefined
}


const JobApplicationForm = () => {



    const validateFields = (values: JobApplicationFormDetails) => {
        let tempErrors: { [key: string]: string } = {};

        // Validate Name
        if (!values.name.trim()) {
            tempErrors.name = "Name is required.";
        }

        // Validate Email
        if (!values.email.trim()) {
            tempErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            tempErrors.email = "Email is not valid.";
        }

        // Validate Phone Number
        if (!values.phoneNo.trim()) {
            tempErrors.phoneNo = "Phone Number is required.";
        } else if (!/^\d{10}$/.test(values.phoneNo)) {
            tempErrors.phoneNo = "Phone Number is not valid (must be 10 digits).";
        }

        // Validate Position
        if (values.position === undefined) {
            tempErrors.position = "Position is required.";
        }

        // Validate Relevant Experience
        if ((values.position === "Developer" || values.position === "Designer") && !values.relevantExperience.trim()) {
            tempErrors.relevantExperience = "Relevant Experience is required.";
        } else if ((values.position === "Developer" || values.position === "Designer") && (!/^\d+$/.test(values.relevantExperience) || Number(values.relevantExperience) <= 0)) {
            tempErrors.relevantExperience = "Relevant Experience must be a number greater than 0.";
        }

        // Validate Portfolio URL
        if (values.position === "Designer" && !values.portFolioUrl.trim()) {
            tempErrors.portFolioUrl = "Portfolio URL is required.";
        } else if (values.portFolioUrl && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(values.portFolioUrl)) {
            tempErrors.portFolioUrl = "Portfolio URL is not valid.";
        }

        // Validate Management Experience
        if (values.position === "Manager" && !values.managementExperience.trim()) {
            tempErrors.managementExperience = "Management Experience is required.";
        }

        // Validate Additional Skills
        const selectedSkills = Object.values(values.additionalSkills).some(skill => skill);
        if (!selectedSkills) {
            tempErrors.additionalSkills = "At least one skill must be selected.";
        }

        // Validate Preferred Interview Time
        if (!values.interviewTime) {
            tempErrors.interviewTime = "Preferred Interview Time is required.";
        }

        return tempErrors;
    };



    const { formDetails, errors, handleChange, handleDateTimeChange, handleValueChange, handleCheckboxChange, handleSubmit, isModalOpen, closeModal } = useForm<JobApplicationFormDetails>(JobApplicationFormInitialDetails);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Job Application Form</CardTitle>
                <CardDescription>
                    Please fill out the job application form below.
                </CardDescription>
            </CardHeader>
            <form onSubmit={(e) => handleSubmit(e, validateFields)}>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formDetails.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="abc@mail.com"
                            value={formDetails.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="phoneNo">Phone Number</Label>
                        <Input
                            id="phoneNo"
                            name="phoneNo"
                            type="number"
                            placeholder="9876XXXXXX"
                            value={formDetails.phoneNo}
                            onChange={handleChange}
                        />
                        {errors.phoneNo && <p className="error">{errors.phoneNo}</p>}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="position">Select Position</Label>
                        <CustomSelect<JobApplicationFormDetails>
                            name="position"
                            value={formDetails.position || ""}
                            options={[
                                { label: "Developer", value: "Developer" },
                                { label: "Designer", value: "Designer" },
                                { label: "Manager", value: "Manager" }
                            ]}
                            placeholder="Applying For Position"
                            onValueChange={handleValueChange}
                            errors={errors}
                        />
                    </div>

                    {(formDetails.position === "Developer" || formDetails.position === "Designer") && (
                        <div className="space-y-1">
                            <Label htmlFor="relevantExperience">Relevant Experience</Label>
                            <Input
                                id="relevantExperience"
                                name="relevantExperience"
                                type="number"
                                placeholder="Years of experience"
                                value={formDetails.relevantExperience}
                                onChange={handleChange}
                            />
                            {errors.relevantExperience && <p className="error">{errors.relevantExperience}</p>}
                        </div>
                    )}
                    {(formDetails.position === "Designer") && (
                        <div className="space-y-1">
                            <Label htmlFor="portFolioUrl">Portfolio Url</Label>
                            <Input
                                id="portFolioUrl"
                                name="portFolioUrl"
                                type="string"
                                placeholder="www.example.com"
                                value={formDetails.portFolioUrl}
                                onChange={handleChange}
                            />
                            {errors.portFolioUrl && <p className="error">{errors.portFolioUrl}</p>}
                        </div>
                    )}
                    {(formDetails.position === "Manager") && (
                        <div className="space-y-1">
                            <Label htmlFor="managementExperience">Management Experience</Label>
                            <Input
                                id="managementExperience"
                                name="managementExperience"
                                type="text"
                                placeholder="Describe your management experience"
                                value={formDetails.managementExperience}
                                onChange={handleChange}
                            />
                            {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
                        </div>
                    )}
                    <div className="space-y-1">
                        <JobApplicationCheckbox
                            formDetails={formDetails}
                            handleCheckboxChange={handleCheckboxChange}
                            errors={errors}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="interviewTime">Preferred Interview Time</Label>
                        <div className="w-2/3">
                            <DateTimePickerComponent
                                formDetails={formDetails}
                                handleDateTimeChange={handleDateTimeChange}
                            />
                        </div>
                        {errors.interviewTime && <p className="error">{errors.interviewTime}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Submit</Button>
                </CardFooter>
            </form>
            <FormDetailsModal isOpen={isModalOpen} onClose={closeModal} formDetails={formDetails} />
        </Card>
    )
}

export default JobApplicationForm