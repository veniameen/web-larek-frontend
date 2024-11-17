import { Render } from "./render"
export class Form extends Render{
    orderModal:HTMLFormElement
    contactsModal: HTMLFormElement

    constructor() {
        super()
        this.orderModal = (document.querySelector('#order') as HTMLTemplateElement).content.querySelector('.form') 
        this.contactsModal = (document.querySelector('#contacts') as HTMLTemplateElement).content.querySelector('.form')  
    }

    setSubmitHandler(form:HTMLFormElement, onSubmit:() => void) {
        form.addEventListener('submit',(evt)=>{
            evt.preventDefault()
            onSubmit()
        })
    }
}