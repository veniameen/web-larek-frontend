import { BaseComponent } from '../base/BaseComponent';
import { IEvents } from '../base/events';
import { CDN_URL } from '../../utils/constants';
import { formatNumber, ensureElement } from '../../utils/utils';

export class ProductCard<T> extends BaseComponent<T> {
    protected events: IEvents;
    private categoryElement?: HTMLElement;
    private titleElement: HTMLElement;
    private imageElement?: HTMLImageElement;
    private priceElement: HTMLDivElement;
    protected productPrice: HTMLDivElement;
    private productId = '';
    private clickHandler: () => void;

    constructor(protected container: HTMLElement, events?: IEvents) {
        super(container);
        this.events = events;

        this.categoryElement = this.container.querySelector('.card__category');
        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.imageElement = this.container.querySelector('.card__image');
        this.priceElement = ensureElement<HTMLDivElement>('.card__price', this.container);

        this.clickHandler = this.handleClick(events);
        this.container.addEventListener('click', this.clickHandler);
    }

    private handleClick = (events?: IEvents) => () => {
        events?.emit('product:selected', { productId: this.productId });
    };

    public removeClickListener() {
        this.container.removeEventListener('click', this.clickHandler);
    }

    set price(price: number | null) {
        this.priceElement.textContent = formatNumber(price);
    }

    set image(imageUrl: string) {
        if (this.imageElement) {
            this.imageElement.src = CDN_URL + imageUrl;
        }
    }

    set title(productTitle: string) {
        this.titleElement.textContent = productTitle;
    }

    set category(categoryName: string) {
        if (this.categoryElement) {
            this.categoryElement.textContent = categoryName;
        }
    }

    set id(productId: string) {
        this.productId = productId;
    }

    get id() {
        return this.productId;
    }
}
