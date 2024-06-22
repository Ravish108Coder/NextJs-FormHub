'use client'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import EventRegistrationForm from "./EventRegistrationForm"
import JobApplicationForm from "./JobApplicationForm"
import SurveyForm from "./SurveyForm"

export default function FormsTabList() {

    return (
        <Tabs defaultValue="Form Level 1" className="min-w-[373px] md:min-w-[600px]">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="Form Level 1">Form Level 1</TabsTrigger>
                <TabsTrigger value="Form Level 2">Form Level 2</TabsTrigger>
                <TabsTrigger value="Form Level 3">Form Level 3</TabsTrigger>
            </TabsList>

            <TabsContent value="Form Level 1">
                <EventRegistrationForm />
            </TabsContent>

            <TabsContent value="Form Level 2">
                <JobApplicationForm />
            </TabsContent>

            <TabsContent value="Form Level 3">
                <SurveyForm />
            </TabsContent>

        </Tabs>
    )
}
