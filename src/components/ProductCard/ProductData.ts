import { IEvents } from "../base/events";
import { Product, ProductsDataInterface } from "../../types";

export class ProductData implements ProductsDataInterface {
    private productList: Product[] = [];
    private activePreviewId: string | null = null;
    private IEvents: IEvents;

    constructor(IEvents: IEvents) {
        this.IEvents = IEvents;
    }

    set products(products: Product[]) {
        this.productList = products;
        this.IEvents.emit("products:changed");
    }

    get products() {
        return this.productList;
    }

    getProductById(productId: string): Product | undefined {
        return this.productList.find(item => item.id === productId);
    }

    set previewId(productId: string | null) {
        if (!productId) {
            this.activePreviewId = null;
            return;
        }
        const selectedProduct = this.getProductById(productId);
        if (selectedProduct) {
            this.activePreviewId = productId;
            this.IEvents.emit("previewId:changed", { previewId: this.previewId });
        }
    }

    get previewId() {
        return this.activePreviewId;
    }
}
