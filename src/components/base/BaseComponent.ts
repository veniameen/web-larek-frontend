/**
 * BaseComponent - Абстрактный базовый класс для компонентов
 */
export abstract class BaseComponent<T> {
    protected constructor(protected readonly container: HTMLElement) {
        // Код конструктора исполняется перед инициализацией дочерних классов
    }

    // Инструменты для работы с DOM в дочерних компонентах

    /**
     * Переключить класс
     * @param element - Элемент DOM
     * @param className - Название класса
     * @param force - Установить или удалить класс принудительно
     */
    toggleClass(element: HTMLElement, className: string, force?: boolean): void {
        element.classList.toggle(className, force);
    }

    /**
     * Установить текстовое содержимое элемента
     * @param element - Элемент DOM
     * @param value - Текстовое содержимое
     */
    setText(element: HTMLElement, value: unknown): void {
        if (element) {
            element.textContent = String(value);
        }
    }

    /**
     * Установить статус блокировки элемента
     * @param element - Элемент DOM
     * @param state - true для блокировки, false для снятия блокировки
     */
    setDisabled(element: HTMLElement, state: boolean): void {
        if (element) {
            state
                ? element.setAttribute('disabled', 'disabled')
                : element.removeAttribute('disabled');
        }
    }

    /**
     * Скрыть элемент
     * @param element - Элемент DOM
     */
    protected setHidden(element: HTMLElement): void {
        element.style.display = 'none';
    }

    /**
     * Показать элемент
     * @param element - Элемент DOM
     */
    protected setVisible(element: HTMLElement): void {
        element.style.removeProperty('display');
    }

    /**
     * Установить изображение с альтернативным текстом
     * @param element - Элемент изображения
     * @param src - URL изображения
     * @param alt - Альтернативный текст
     */
    protected setImage(element: HTMLImageElement, src: string, alt?: string): void {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    /**
     * Вернуть корневой DOM-элемент
     * @param data - Данные для обновления состояния компонента
     */
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}
