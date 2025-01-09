import { BaseComponent } from "../base/BaseComponent";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

interface ModalData {
    content: HTMLElement | null;
}

export class ModalView extends BaseComponent<ModalData> {
    private closeButton: HTMLButtonElement;
    private contentElement: HTMLElement;

    constructor(container: HTMLElement, protected IEvents: IEvents) {
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', container);

        this.setupEventListeners();
    }

    private setupEventListeners() {
        this.closeButton.addEventListener('click', this.close.bind(this));
        
        // Clicks outside the modal content close the modal
        this.container.addEventListener('mousedown', (event: MouseEvent) => {
            if (event.target === this.container) {
                this.close();
            }
        });
    }

    set content(value: HTMLElement | null) {
        if (value) {
            this.contentElement.replaceChildren(value);
        } else {
            this.contentElement.innerHTML = ''; // Clear content when null is set
        }
    }

    open() {
        this.container.classList.add('modal_active');
        this.IEvents.emit('modal:open');
    }

    close() {
        this.container.classList.remove('modal_active');
        this.content = null;
        this.IEvents.emit('modal:close');
    }

    render(data: ModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}
