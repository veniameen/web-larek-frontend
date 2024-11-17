import { Product } from "../../types"
import { LocalStorage } from "../base/localstorage";

export class Basket  {
    basketItems: Product []
    selectedProduct: Product
    constructor(public storage: LocalStorage) {
    this.basketItems = []   // {id price title p category}
    }

    addBasket(){
        const foundBasketItem = this.basketItems.find((product) => product.id === this.selectedProduct.id)

        if(!foundBasketItem) {
            this.basketItems.push(this.selectedProduct)
            this.storage.set('products', this.basketItems)
            return this.selectedProduct
        }
        return false
    }

    removeBasket(productID: string, ){
        this.basketItems = this.basketItems.filter((product) => {
            
           return product.id !== productID
           
        })  
        this.storage.set('products', this.basketItems)
    }
    
    showBasketCounter(){
      return this.basketItems.length
    }

    calculateTotalPrice(){
        let total = 0
        this.basketItems.forEach((product:Product)=> {
          total = product.price+total
        })
        return total
    }


    cleanBasket() {
        this.basketItems = []
    }
}
