import { Order } from "../buisness/order";
import { Form } from "./form";
import { AllModals } from "./modalUI";


export class OrderUI extends Form {
   orderButtons: NodeListOf<HTMLButtonElement>
   inputAdress: Element
   successDiscription: Element

   payments = {
      'card': 'online',
      'cash': 'received'
   }
   constructor(public modal: AllModals, public order: Order){
      super()
      this.orderButtons = this.orderModal.querySelectorAll('.button_alt')
      this.inputAdress = this.orderModal.querySelector('.form__input')
      this.successDiscription = this.modal.successModal.querySelector('.order-success__description')
      
      this.orderButtons.forEach((button) => {
         button.addEventListener('click', (event: Event) => {

            const target = event.target as HTMLButtonElement

            const name = target.name  // 'card' || 'cash' || 'more'
            //@ts-ignore

            let payment = this.payments[name] 

            this.order.setParam('payment', payment )

            this.selectButton(target)
         })

      })

      this.setSubmitHandler(this.orderModal,  () => {
         this.modal.openModal(this.contactsModal)
      })

      this.inputAdress.addEventListener('input', (event: Event)=> {
         const target = event.target as HTMLInputElement

         this.order.setParam('address',target.value)
      })


      // this.modal.orderModal.addEventListener('submit', (event)=>{
      //    event.preventDefault()
      //    this.modal.openModal(this.modal.contactsModal)
      // })
   }

   selectButton(button: HTMLButtonElement) {
         this.orderButtons.forEach((orderButton )=> {
            if(orderButton.classList.contains('button_alt-active')) {
               orderButton.classList.remove('button_alt-active')
            }
         })
         button.classList.add('button_alt-active')

         
   }

 
}
