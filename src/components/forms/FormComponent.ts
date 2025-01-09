import { BaseComponent } from "../base/BaseComponent";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

interface FormState {
    valid: boolean;
    errors: string[];
}

export class FormComponent<T> extends BaseComponent<FormState> {
    private submitButton: HTMLButtonElement;
    private errorContainer: HTMLElement;
    private paymentButtons?: NodeListOf<HTMLButtonElement>;

    constructor(protected formElement: HTMLFormElement, protected IEvents: IEvents) {
        super(formElement);

        this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.formElement);
        this.errorContainer = ensureElement<HTMLElement>('.form__errors', this.formElement);
        this.paymentButtons = this.formElement.querySelectorAll('.order__buttons button');

        this.setupPaymentButtons();
        this.setupEventListeners();
    }

    private setupPaymentButtons() {
        if (this.paymentButtons) {
            this.paymentButtons.forEach(button => {
                button.addEventListener('click', (e: MouseEvent) => {
                    const target = e.target as HTMLButtonElement;
                    const field = 'payment' as keyof T;
                    const value = target.name;
                    this.handleInputChange(field, value);
                });
            });
        }
    }

    private setupEventListeners() {
        this.formElement.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.handleInputChange(field, value);
        });

        this.formElement.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.IEvents.emit(`${this.formElement.name}:submit`);
        });
    }

    handlePaymentToggle(selectedPayment: string) {
        this.paymentButtons?.forEach(button => {
            this.toggleClass(button, 'button_alt-active', button.name === selectedPayment);
        });
    }

    private handleInputChange(field: keyof T, value: string) {
        this.IEvents.emit(`${this.formElement.name}.${String(field)}:changed`, {
            field,
            value,
        });
    }

    set valid(isValid: boolean) {
        this.submitButton.disabled = !isValid;
    }

    set errors(errorMessages: string[]) {
        this.setText(this.errorContainer, errorMessages.join('\n'));
    }

    render(state: Partial<T> & FormState) {
        const { valid, errors, ...inputs } = state;
        super.render({ valid, errors });
        Object.assign(this, inputs);
        return this.formElement;
    }
}
