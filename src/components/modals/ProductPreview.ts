import { ensureElement } from "../../utils/utils";
import { ProductCard } from "../ProductCard/ProductCard";
import { formatNumber } from "../../utils/utils";

type ProductInfo = {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    buttonState: boolean;
};

interface PreviewActions {
    onAddToBasket: () => void;
}

export class ProductPreview extends ProductCard<ProductInfo> {
    private addToBasketButton: HTMLElement;
    private descriptionElement: HTMLElement;

    constructor(container: HTMLElement, actions: PreviewActions) {
        super(container);
    
        try {
            this.addToBasketButton = ensureElement<HTMLElement>('.button', this.container);
            this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        } catch (error) {
            console.error(error);
            throw new Error('ProductPreview initialization failed due to missing elements.');
        }
    
        this.removeClickListener();
        if (actions.onAddToBasket) {
            this.addToBasketButton.addEventListener('click', actions.onAddToBasket);
        }
    }
    
    set buttonState(isAdded: boolean) {
        if (this.addToBasketButton) {
            this.addToBasketButton.textContent = isAdded ? 'Удалить из корзины' : 'Добавить в корзину';
        }
    }
    
    set price(price: number | null) {
        if (price === null) {
            this.setDisabled(this.addToBasketButton, true);
        } else {
            if (this.productPrice) {
                this.productPrice.textContent = formatNumber(price);
            }
            this.setDisabled(this.addToBasketButton, false);
        }
    }
    
    set description(description: string) {
        if (this.descriptionElement) {
            this.descriptionElement.textContent = description;
        }
    }    
}
