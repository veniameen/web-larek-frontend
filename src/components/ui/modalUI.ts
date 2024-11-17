import { Product } from "../../types"
import { Render } from "./render"
export class AllModals extends Render {
    modal: Element
    modalContent: HTMLElement
    modals: NodeListOf<Element>
    cardModal: Element
    basketModal: Element
    successModal: Element
    successModalButton: HTMLButtonElement
     categoryModal:Element
     titleModal:Element
     textModal:Element
     priceModal:Element
     buttonModal: HTMLButtonElement
     image:HTMLImageElement

    
    constructor() {
        super() 
        this.modal = document.querySelector('#modal-container')
        this.modals = document.querySelectorAll('.modal')
        this.cardModal = (document.querySelector('#card-preview') as HTMLTemplateElement).content.querySelector('.card_full')
        this.basketModal = (document.querySelector('#basket') as HTMLTemplateElement).content.querySelector('.basket')
        this.successModal = (document.querySelector ('#success') as HTMLTemplateElement).content.querySelector('.order-success')
        this.modalContent = this.modal.querySelector('.modal__content')
        this.successModalButton = this.successModal.querySelector('.order-success__close')

        this.categoryModal = this.cardModal.querySelector('.card__category')
        this.titleModal = this.cardModal.querySelector('.card__title')
        this.textModal = this.cardModal.querySelector('.card__text')
        this.priceModal = this.cardModal.querySelector('.card__price')
        this.buttonModal = this.cardModal.querySelector('.card__button') as HTMLButtonElement
        this.image = this.cardModal.querySelector('.card__image') as HTMLImageElement

    }

    setModal(product:Product) {
     
        this.categoryModal.textContent = product.category

        this.categoryModal.classList.add(this.getCategoryClass(product.category))

        this.titleModal.textContent = product.title
        this.textModal.textContent = product.description
        this.priceModal.textContent = this.setProductPrice(product.price)

        this.buttonModal.disabled = !(!!product.price)

        this.setSrcImage(this.image, product.image)
        
    }

    openModal(modal: Element){
        this.modalContent.innerHTML = ''
        this.modalContent.append(modal)
        this.modal.classList.add('modal_active')
    }
    
    setCloseListeners() {  
      
        this.modal.addEventListener('click', (event: Event)=> {

            const target = event.target as HTMLDivElement
    
            if(target.classList.contains('modal') || target.classList.contains('modal__close')) {
               this.modal.classList.remove('modal_active') 
            }
        })

        this.successModalButton.addEventListener('click', ()=> {
                this.modal.classList.remove('modal_active') 
            })
    }
}

