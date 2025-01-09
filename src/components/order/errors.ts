import { OrderFormData } from "../../types";

export const ValidationErrorMessages: Record<keyof OrderFormData, string> = {
    payment: "Требуется указать способ оплаты.",
    address: "Требуется указать адрес доставки.",
    email: "Требуется указать адрес электронной почты.",
    phone: "Требуется указать номер телефона.",
};
