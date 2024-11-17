import { Product } from "../../types"

export class ProductList {
    products: Product[] = []

    constructor(products:Product[] = []) {
        this.products = products
    }

    getProducts() {
        return this.products 
    }
}
