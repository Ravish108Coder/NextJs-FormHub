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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import useForm from "@/hooks/useForm"; // Adjust the import path as needed
import CustomSelect from "./CustomSelect";
import FormDetailsModal from "./DisplayModal";

// Define the form details interface
interface SurveyFormDetails {
    fullName: string;
    email: string;
    surveyTopic: "Technology" | "Health" | "Education" | "";
    favoriteProgrammingLanguage?: "JavaScript" | "Python" | "Java" | "C#";
    yearsOfExperience?: number | string;
    exerciseFrequency?: "Daily" | "Weekly" | "Monthly" | "Rarely";
    dietPreference?: "Vegetarian" | "Vegan" | "Non-Vegetarian";
    highestQualification?: "High School" | "Bachelor's" | "Master's" | "PhD";
    fieldOfStudy?: string;
    feedback: string;
}

// Initial form details
const initialFormDetails: SurveyFormDetails = {
    fullName: '',
    email: '',
    surveyTopic: '',
    feedback: ''
};

// Validation logic
const validateFields = (values: SurveyFormDetails) => {
    let tempErrors: { [key: string]: string } = {};
    if (!values.fullName) tempErrors.fullName = "Full Name is required.";
    if (!values.email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(values.email)) tempErrors.email = "Email is not valid.";
    if (!values.surveyTopic) tempErrors.surveyTopic = "Survey Topic is required.";

    if (values.surveyTopic === "Technology") {
        if (!values.favoriteProgrammingLanguage) tempErrors.favoriteProgrammingLanguage = "Favorite Programming Language is required.";
        if (!values.yearsOfExperience) tempErrors.yearsOfExperience = "Years of Experience is required.";
        else if (isNaN(Number(values.yearsOfExperience)) || Number(values.yearsOfExperience) < 0) tempErrors.yearsOfExperience = "Years of Experience must be a positive number.";
    } else if (values.surveyTopic === "Health") {
        if (!values.exerciseFrequency) tempErrors.exerciseFrequency = "Exercise Frequency is required.";
        if (!values.dietPreference) tempErrors.dietPreference = "Diet Preference is required.";
    } else if (values.surveyTopic === "Education") {
        if (!values.highestQualification) tempErrors.highestQualification = "Highest Qualification is required.";
        if (!values.fieldOfStudy) tempErrors.fieldOfStudy = "Field of Study is required.";
    }
    if (values.feedback.length < 50) {
        tempErrors.feedback = "Please give feedback of at least 50 characters"
    }
    return tempErrors;
};

const SurveyForm = () => {
    const {
        formDetails,
        errors,
        handleChange,
        handleSubmit,
        handleValueChange,
        isModalOpen,
        closeModal
    } = useForm<SurveyFormDetails>(initialFormDetails);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Survey Form</CardTitle>
                <CardDescription>
                    Please fill out the survey form below.
                </CardDescription>
            </CardHeader>
            <form onSubmit={(e) => handleSubmit(e, validateFields)}>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input name="fullName" id="fullName" type="text" value={formDetails.fullName} placeholder="John Doe" onChange={handleChange} />
                        {errors.fullName && <p className="error">{errors.fullName}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input name="email" id="email" type="email" value={formDetails.email} placeholder="abc@mail.com" onChange={handleChange} />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="surveyTopic">Survey Topic</Label>
                        <CustomSelect<SurveyFormDetails>
                            name="surveyTopic"
                            value={formDetails.surveyTopic || ""}
                            options={[
                                { label: "Technology", value: "Technology" },
                                { label: "Health", value: "Health" },
                                { label: "Education", value: "Education" }
                            ]}
                            placeholder="Select a topic"
                            onValueChange={(value) => handleValueChange(value as "Technology" | "Health" | "Education", "surveyTopic")}
                            errors={errors}
                        />

                    </div>
                    {formDetails.surveyTopic === "Technology" && (
                        <>
                            <div className="space-y-1">
                                <Label htmlFor="favoriteProgrammingLanguage">Favorite Programming Language</Label>
                                <CustomSelect<SurveyFormDetails>
                                    name="favoriteProgrammingLanguage"
                                    value={formDetails.favoriteProgrammingLanguage || ""}
                                    options={[
                                        { label: "JavaScript", value: "JavaScript" },
                                        { label: "Python", value: "Python" },
                                        { label: "Java", value: "Java" },
                                        { label: "C#", value: "C#" }
                                    ]}
                                    placeholder="Select a language"
                                    onValueChange={(value) => handleValueChange(value as "JavaScript" | "Python" | "Java" | "C#", "favoriteProgrammingLanguage")}
                                    errors={errors}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                                <Input name="yearsOfExperience" id="yearsOfExperience" type="number" value={formDetails.yearsOfExperience} placeholder="3" onChange={handleChange} />
                                {errors.yearsOfExperience && <p className="error">{errors.yearsOfExperience}</p>}
                            </div>
                        </>
                    )}
                    {formDetails.surveyTopic === "Health" && (
                        <>
                            <div className="space-y-1">
                                <Label htmlFor="exerciseFrequency">Exercise Frequency</Label>
                                <CustomSelect<SurveyFormDetails>
                                    name="exerciseFrequency"
                                    value={formDetails.exerciseFrequency || ""}
                                    options={[
                                        { label: "Daily", value: "Daily" },
                                        { label: "Weekly", value: "Weekly" },
                                        { label: "Monthly", value: "Monthly" },
                                        { label: "Rarely", value: "Rarely" }
                                    ]}
                                    placeholder="Select a frequency"
                                    onValueChange={(value) => handleValueChange(value as "Daily" | "Weekly" | "Monthly" | "Rarely", "exerciseFrequency")}
                                    errors={errors}
                                />

                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="dietPreference">Diet Preference</Label>
                                <CustomSelect<SurveyFormDetails>
                                    name="dietPreference"
                                    value={formDetails.dietPreference || ""}
                                    options={[
                                        { label: "Vegetarian", value: "Vegetarian" },
                                        { label: "Vegan", value: "Vegan" },
                                        { label: "Non-Vegetarian", value: "Non-Vegetarian" }
                                    ]}
                                    placeholder="Select a diet"
                                    onValueChange={(value) => handleValueChange(value as "Vegetarian" | "Vegan" | "Non-Vegetarian", "dietPreference")}
                                    errors={errors}
                                />

                            </div>
                        </>
                    )}
                    {formDetails.surveyTopic === "Education" && (
                        <>
                            <div className="space-y-1">
                                <Label htmlFor="highestQualification">Highest Qualification</Label>
                                <CustomSelect<SurveyFormDetails>
                                    name="highestQualification"
                                    value={formDetails.highestQualification || ""}
                                    options={[
                                        { label: "High School", value: "High School" },
                                        { label: "Bachelor's", value: "Bachelor's" },
                                        { label: "Master's", value: "Master's" },
                                        { label: "PhD", value: "PhD" }
                                    ]}
                                    placeholder="Select a qualification"
                                    onValueChange={(value) => handleValueChange(value as "High School" | "Bachelor's" | "Master's" | "PhD", "highestQualification")}
                                    errors={errors}
                                />

                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="fieldOfStudy">Field of Study</Label>
                                <Input name="fieldOfStudy" id="fieldOfStudy" type="text" value={formDetails.fieldOfStudy} placeholder="Computer Science" onChange={handleChange} />
                                {errors.fieldOfStudy && <p className="error">{errors.fieldOfStudy}</p>}
                            </div>
                        </>
                    )}
                    <div className="space-y-1">
                        <Label htmlFor="feedback">Feedback</Label>
                        <Textarea name="feedback" id="feedback" value={formDetails.feedback} placeholder="Your feedback" onChange={handleChange} />
                        {errors.feedback && <p className="error">{errors.feedback}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Submit</Button>
                </CardFooter>
            </form>
            <FormDetailsModal isOpen={isModalOpen} onClose={closeModal} formDetails={formDetails} />
        </Card>
    );
}

export default SurveyForm;
