import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const useForm = <T>(initialState: T) => {
    const { toast } = useToast();
    const [formDetails, setFormDetails] = useState<T>(initialState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const validate = (validateFields: (values: T) => { [key: string]: string }) => {
        const tempErrors = validateFields(formDetails);
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleValueChange = (value: any, key: keyof T) => {
        setFormDetails(prev => ({ ...prev, [key]: value }));
    };

    const handleCheckboxChange = (value: boolean, id: string, key: keyof T) => {
        setFormDetails(prev => ({
            ...prev,
            [key]: {
                ...(prev[key] as any),
                [id]: value
            }
        }));
    };

    const handleDateTimeChange = (value: any, key: keyof T) => {
        setFormDetails(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, validateFields: (values: T) => { [key: string]: string }) => {
        e.preventDefault();
        if (validate(validateFields)) {
            console.log("Form Details:", formDetails);
            // toast({
            //     title: "Form Submitted",
            //     description: JSON.stringify(formDetails),
            //     duration: 5000
            // });
            setIsModalOpen(true)
            console.clear();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
      };

    return {
        formDetails,
        errors,
        handleChange,
        handleCheckboxChange,
        handleSubmit,
        handleValueChange,
        handleDateTimeChange,
        isModalOpen,
        closeModal,
    };
};

export default useForm;
