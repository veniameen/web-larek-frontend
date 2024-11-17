import { Order } from "../buisness/order"
import { Form } from "./form"
import { AllModals } from "./modalUI"

export class ContactsUI extends Form {
   contactsInputs:NodeListOf<HTMLInputElement>

    constructor(public modal: AllModals, public order: Order, onSubmit: () => void){
        super()
        this.contactsInputs = this.contactsModal.querySelectorAll('.form__input')

        
        this.contactsInputs.forEach((input)=> {
            input.addEventListener('input', (event: Event)=> {

                const target = event.target as HTMLInputElement

                this.order.setParam(target.name, target.value)
            })
        })
            
        this.setSubmitHandler(this.contactsModal, onSubmit )
    }       
}