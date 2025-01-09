import { BaseComponent } from "./base/BaseComponent";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";

interface PageState {
    basketItemCount: number;
    catalogItems: HTMLElement[];
    isLocked: boolean;
}

export class PageComponent extends BaseComponent<PageState> {
    private basketCounterElement: HTMLElement;
    private catalogElement: HTMLElement;
    private wrapperElement: HTMLElement;
    private basketElement: HTMLElement;

    constructor(container: HTMLElement, protected IEvents: IEvents) {
        super(container);

        this.basketCounterElement = ensureElement<HTMLElement>('.header__basket-counter');
        this.catalogElement = ensureElement<HTMLElement>('.gallery');
        this.wrapperElement = ensureElement<HTMLElement>('.page__wrapper');
        this.basketElement = ensureElement<HTMLElement>('.header__basket');

        this.basketElement.addEventListener('click', () => {
            this.IEvents.emit('basket:open');
        });
    }

    set basketItemCount(count: number) {
        this.basketCounterElement.textContent = String(count);
    }

    set catalogItems(items: HTMLElement[]) {
        this.catalogElement.replaceChildren(...items);
    }

    set isLocked(locked: boolean) {
        this.toggleClass(this.wrapperElement, 'page__wrapper_locked', locked);
    }
}
