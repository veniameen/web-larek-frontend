import { OrderFormData } from "../../types";

export const ValidationErrorMessages: Record<keyof OrderFormData, string> = {
    payment: "Payment method is required.",
    address: "Delivery address is required.",
    email: "Email address is required.",
    phone: "Phone number is required.",
};
