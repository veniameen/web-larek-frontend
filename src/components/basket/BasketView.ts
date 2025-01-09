import { BaseComponent } from "../base/BaseComponent";
import { createElement, ensureElement, formatBasketTotal } from "../../utils/utils";
import { IEvents } from "../base/events";

interface BasketViewState {
    items: HTMLElement[];
    total: number;
}

export class BasketView extends BaseComponent<BasketViewState> {
    private listElement: HTMLElement;
    private totalElement: HTMLElement | null;
    private confirmButton: HTMLButtonElement | null;

    constructor(container: HTMLElement, protected IEvents: IEvents) {
        super(container);

        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.totalElement = this.container.querySelector('.basket__price');
        this.confirmButton = this.container.querySelector('.basket__button');

        if (this.confirmButton) {
            this.confirmButton.addEventListener('click', () => {
                this.IEvents.emit('order:open');
            });
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this.listElement.replaceChildren(...items);
            this.setDisabled(this.confirmButton, false);
        } else {
            this.listElement.replaceChildren(
                createElement<HTMLParagraphElement>('p', { textContent: 'В корзине пусто(' })
            );
            this.setDisabled(this.confirmButton, true);
        }
    }

    set total(total: number) {
        if (this.totalElement) {
            this.setText(this.totalElement, formatBasketTotal(total));
        }
    }

    public setDisabled(button: HTMLButtonElement | null, isDisabled: boolean) {
        if (button) {
            button.disabled = isDisabled;
        }
    }

    public setText(element: HTMLElement | null, text: string) {
        if (element) {
            element.textContent = text;
        }
    }
}
