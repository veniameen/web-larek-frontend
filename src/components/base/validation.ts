import { Order } from "../buisness/order";

export class Validation {
    constructor(public order:Order){}


    hasInvalidInput(inputList: HTMLInputElement[]){
        return inputList.some((inputElement)=> {
            return !inputElement.value
        })
    }

    toggleButtonState(inputList: HTMLInputElement[], buttonElement: HTMLButtonElement){
        if(this.hasInvalidInput(inputList) || !this.order.payment) {  
            buttonElement.disabled = true; 
        }
        else{
            buttonElement.disabled = false;
        }
    }

    setEvenListener(formElement:HTMLFormElement) {
        const inputList = Array.from(formElement.querySelectorAll('.form__input')) as HTMLInputElement[]
        const buttonElement = formElement.querySelector('.button[type=submit]') as HTMLButtonElement
        const errorElement = formElement.querySelector('.form__errors') as HTMLSpanElement
        const buttonsPay = formElement.querySelectorAll('.button_alt')
        
        inputList.forEach((inputElement)=> {
            inputElement.addEventListener('input',()=> {    // ввод в тэг инпута
                this.toggleButtonState(inputList, buttonElement)
                this.isValid(inputElement,errorElement)
            })
        })

        buttonsPay.forEach((button)=> {
            button.addEventListener('click', ()=> {
            this.toggleButtonState(inputList, buttonElement)
        })
        })
    }

    initValidation() {
        const templates = document.querySelectorAll('template')
        templates.forEach((template)=> {
            const form = template.content.querySelector('.form') as HTMLFormElement

            if(form) {
                this.setEvenListener(form)
            }
        }) 
 
    }

    isValid(inputElement:HTMLInputElement, errorElement: HTMLSpanElement){
        if(!inputElement.validity.valid) {
            this.showInputError(errorElement, inputElement.validationMessage) 
        } else {
            this.hideInputError(errorElement)
        }
    }

    showInputError(errorElement: HTMLSpanElement,  errorMessage: string) {
        errorElement.textContent = errorMessage
    }

    hideInputError(errorElement: HTMLSpanElement) {
        errorElement.textContent = ''
    }
    
}