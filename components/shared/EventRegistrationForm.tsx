'use client';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useForm from "@/hooks/useForm"; // Adjust the import path as needed
import { ChangeEvent, FormEvent } from "react";
import FormDetailsModal from "./DisplayModal";

export interface TFormDetails {
    name: string;
    email: string;
    age: number | string;
    attendingWithGuest: "Yes" | "No";
    guestName: string;
}

const initialFormDetails: TFormDetails = {
    name: '',
    email: '',
    age: '',
    attendingWithGuest: "No",
    guestName: ''
};

const validateFields = (values: TFormDetails) => {
    let tempErrors: { [key: string]: string } = {};
    if (!values.name) tempErrors.name = "Name is required.";
    if (!values.email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(values.email)) tempErrors.email = "Email is not valid.";
    if (!values.age) tempErrors.age = "Age is required.";
    else if (isNaN(Number(values.age)) || Number(values.age) <= 0) tempErrors.age = "Age must be a number greater than 0.";
    if (values.attendingWithGuest === 'Yes' && !values.guestName) tempErrors.guestName = "Guest Name is required.";
    return tempErrors;
};

const EventRegistrationForm = () => {
    const {
        formDetails,
        errors,
        handleChange,
        handleSubmit,
        handleValueChange,
        isModalOpen,
        closeModal
    } = useForm<TFormDetails>(initialFormDetails);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Event Registration Form</CardTitle>
                <CardDescription>
                Please fill out the event registration form below.
                </CardDescription>
            </CardHeader>
            <form onSubmit={(e) => handleSubmit(e, validateFields)}>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input name="name" id="name" type="text" value={formDetails.name} placeholder="John Doe" onChange={handleChange} />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input name="email" id="email" type="email" value={formDetails.email} placeholder="abc@mail.com" onChange={handleChange} />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="age">Age</Label>
                        <Input name="age" id="age" type="number" value={formDetails.age} placeholder="21" onChange={handleChange} />
                        {errors.age && <p className="error">{errors.age}</p>}
                    </div>
                    <p>Are you attending with a guest?</p>
                    <RadioGroup name="attendingWithGuest" onValueChange={value => handleValueChange(value as "Yes" | "No", "attendingWithGuest")} value={formDetails.attendingWithGuest}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" id="Yes" />
                            <Label htmlFor="Yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id="No" />
                            <Label htmlFor="No">No</Label>
                        </div>
                    </RadioGroup>
                    {formDetails.attendingWithGuest === "Yes" && (
                        <div className="space-y-1">
                            <Label htmlFor="guestName">Guest Name</Label>
                            <Input name="guestName" value={formDetails.guestName} onChange={handleChange} id="guestName" type="text" placeholder="Amir Khan" />
                            {errors.guestName && <p className="error">{errors.guestName}</p>}
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button type="submit">Submit</Button>
                </CardFooter>
            </form>
            <FormDetailsModal isOpen={isModalOpen} onClose={closeModal} formDetails={formDetails} />
        </Card>
    );
}

export default EventRegistrationForm;
