import { FormComponent } from "../forms/FormComponent";
import { OrderFormData } from "../../types";
import { IEvents } from "../base/events";

export class OrderForm extends FormComponent<OrderFormData> {
    private paymentMethod: string;

    constructor(formElement: HTMLFormElement, IEvents: IEvents) {
        super(formElement, IEvents);
    }

    set payment(selectedPayment: string) {
        this.handlePaymentToggle(selectedPayment);
    }

    set address(address: string) {
        (this.formElement.elements.namedItem('address') as HTMLInputElement).value = address;
    }

    set phone(phoneNumber: string) {
        (this.formElement.elements.namedItem('phone') as HTMLInputElement).value = phoneNumber;
    }

    set email(emailAddress: string) {
        (this.formElement.elements.namedItem('email') as HTMLInputElement).value = emailAddress;
    }
}
