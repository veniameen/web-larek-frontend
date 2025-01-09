import { BaseComponent } from "../base/BaseComponent";
import { ensureElement } from "../../utils/utils";

interface SuccessState {
    total: number;
}

interface SuccessActions {
    onClose: () => void;
}

export class SuccessView extends BaseComponent<SuccessState> {
    private closeButton: HTMLElement;
    private totalElement: HTMLElement;

    constructor(container: HTMLElement, actions: SuccessActions) {
        super(container);

        this.closeButton = ensureElement<HTMLElement>('.order-success__close', this.container);
        this.totalElement = ensureElement<HTMLElement>('.order-success__description', this.container);

        if (actions.onClose) {
            this.closeButton.addEventListener('click', actions.onClose);
        }
    }

    set total(total: number) {
        this.totalElement.textContent = `${total} синапсов`;
    }
}
