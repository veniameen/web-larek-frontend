import { ProductCard } from "../ProductCard/ProductCard";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

export interface BasketProductData {
    title: string;
    price: number;
    index: number;
}

export class BasketItem extends ProductCard<BasketProductData> {
    private indexElement: HTMLElement;
    private deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, IEvents: IEvents) {
        super(container, IEvents);

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        this.removeClickListener();

        this.deleteButton.addEventListener('click', () => {
            IEvents.emit('product:delete', { productId: this.id });
        });
    }

    set index(index: number) {
        this.indexElement.textContent = String(index + 1);
    }
}
