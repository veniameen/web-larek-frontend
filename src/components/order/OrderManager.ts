import { OrderFormData, OrderDetails, BasketProductInfo } from "../../types";
import { IEvents } from "../base/events";
import { ValidationErrorMessages } from "./errors";

export type FormValidationErrors = Partial<Record<keyof OrderDetails, string>>;

export class OrderManager implements OrderFormData {
    private paymentMethod = "";
    private deliveryAddress = "";
    private customerEmail = "";
    private customerPhone = "";
    order: OrderDetails;
    private basketItems: BasketProductInfo[] = [];
    private validationErrors: FormValidationErrors = {};
    private IEvents: IEvents;

    constructor(IEvents: IEvents) {
        this.IEvents = IEvents;
        this.resetOrder();
    }

    set basketItemsList(items: BasketProductInfo[]) {
        this.basketItems = items;
    }

    set payment(payment: string) {
        this.paymentMethod = payment;
    }

    set address(address: string) {
        this.deliveryAddress = address;
    }

    set email(email: string) {
        this.customerEmail = email;
    }

    set phone(phone: string) {
        this.customerPhone = phone;
    }

    get paymentDetails() {
        return this.order.payment;
    }

    get addressDetails() {
        return this.order.address;
    }

    get emailDetails() {
        return this.order.email;
    }

    get phoneDetails() {
        return this.order.phone;
    }

    get formValidationErrors() {
        return this.validationErrors;
    }

    getBasketItems() {
        return this.basketItems;
    }

    removeBasketItem(productId: string) {
        this.basketItems = this.basketItems.filter(item => item.id !== productId);
        this.order.items = this.order.items.filter(item => item !== productId);
        this.IEvents.emit("basket:changed", { basketProducts: this.basketItems ?? [] });
    }

    addBasketItem(item: BasketProductInfo) {
        this.basketItems = [...this.basketItems, item];
        this.order.items = [...this.order.items, item.id];
        this.IEvents.emit("basket:changed", { basketProducts: this.basketItems ?? [] });
    }

    calculateBasketTotal() {
        return this.basketItems.reduce((sum, item) => sum + item.price, 0);
    }

    setOrderTotal(total: number) {
        this.order.total = total;
    }

    clearBasket() {
        this.resetOrder();
        this.IEvents.emit("basket:changed", { basketProducts: this.basketItems ?? [] });
    }

    isProductInBasket(productId: string) {
        return this.basketItems.some(item => item.id === productId);
    }

    updateOrderField(field: keyof OrderFormData, value: string, fieldsToValidate?: Array<keyof OrderFormData>) {
        this.order[field] = value;
        const fields = fieldsToValidate ?? [field];
        this.validateOrderFields(fields);
    }

    validateOrderFields(fieldsToValidate?: Array<keyof OrderFormData>) {
        const errors: FormValidationErrors = { ...this.validationErrors };
        const fields = fieldsToValidate ?? (Object.keys(this.order) as Array<keyof OrderFormData>);
    
        fields.forEach(field => {
            if (!this.order[field]) {
                errors[field] = ValidationErrorMessages[field];
            } else {
                delete errors[field];
            }
        });
    
        this.validationErrors = errors;
        this.IEvents.emit("formErrors:changed", this.validationErrors);
    }

    private resetOrder() {
        this.basketItems = [];
        this.order = {
            payment: "",
            address: "",
            email: "",
            phone: "",
            items: [],
            total: 0,
        };
        this.validationErrors = {};
    }
}
