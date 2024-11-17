import { Basket } from "./basket"

export class Order {
    payment: string
    address: string
    email: string
    phone: string

    constructor(public basket: Basket){
        this.payment = ''
        this.address = ''
        this.email = ''
        this.phone = ''
        
    }

    setParam(key:string, value: string) { // key: payment, address, email, phone
        //@ts-ignore
        this[key] = value
    }

    returnOrder() {      // {total, items, adress,email}
        return {
            payment: this.payment,
            address: this.address,
            email: this.email,
            phone: this.phone,
            items: this.basket.basketItems.map((product) => product.id),
            total: this.basket.calculateTotalPrice()
        }
    }
    
}