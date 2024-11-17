import { AllModals } from "../ui/modalUI";
import { BasketUi } from "../ui/BasketUI";
import { Validation } from "./validation";
import { ProductList } from "../buisness/productList";
import { CatalogUI } from "../ui/catalogUI";
import { Api } from "./api";
import { ApiListResponse } from "./api";
import { Product } from "../../types";
import { Basket } from "../buisness/basket";
import { OrderUI } from "../ui/OrderUI";
import { Order } from "../buisness/order";

export class App {
    constructor(
        public modal: AllModals, 
        public basketUi: BasketUi, 
        public validation: Validation,
        public productList: ProductList,
        public catalog: CatalogUI,
        public api: Api,
        public basket: Basket,
        public orderUI: OrderUI,
        public order: Order
    ) {}

    initApp() {
        this.validation.initValidation()
        this.basketUi.initBasket()
        this.modal.setCloseListeners() 
        this.getProducts() 
    }

    getProducts() {
        this.api.get('product').then((productsResponse: ApiListResponse<Product>) => {
            this.productList.products = productsResponse.items
            this.catalog.renderCatalog(this.productList.products, (id: string) => this.openCardModal(id))
        }).catch(() => console.log('ошибка'))
        
    }


    openCardModal(id:string){
        this.api.get(`product/${id}`).then((product:Product)=>  {
            this.basket.selectedProduct = product
            this.modal.setModal(product)
            this.modal.openModal(this.modal.cardModal)
        }).catch((console.error))
    }

    createOrder() {
        this.api.post(`order`, this.order.returnOrder()).then((order: {id: string, total: number})=> {
        this.orderUI.successDiscription.textContent =  `Списано ${order.total} синапсов`
            this.modal.openModal(this.modal.successModal)
            this.basketUi.resetBasket()
        }).catch((console.error))
        
    }
}