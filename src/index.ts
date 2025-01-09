import { ECommerceApi } from './service/api';
import { API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ProductData } from './components/ProductCard/ProductData';
import { ProductPreview } from './components/modals/ProductPreview';
import { BasketView } from './components/basket/BasketView';
import { OrderManager } from './components/order/OrderManager';
import { ProductCard } from './components/ProductCard/ProductCard';
import { ModalView } from './components/modals/ModalView';
import { SuccessView } from './components/forms/SuccessView';
import { PageComponent } from './components/PageComponent';
import { cloneTemplate, ensureElement } from './utils/utils';
import { BasketItem } from './components/basket/BasketItem';
import { OrderForm } from './components/order/OrderForm';
import { BasketProductInfo, OrderFormData } from './types';
import './scss/styles.scss';

const events = new EventEmitter();
const api = new ECommerceApi(API_URL);

// Templates
const productTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketProductTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const detailsTemplate = ensureElement<HTMLTemplateElement>('#details');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#order');

// Containers
const modalContainer = ensureElement<HTMLElement>('#modal-container');

// Data Models
const productsRepository = new ProductData(events);
const orderManager = new OrderManager(events);

// Shared UI components
const page = new PageComponent(document.body, events);
const modal = new ModalView(modalContainer, events);
const detailsForm = new OrderForm(cloneTemplate(detailsTemplate), events);
const contactsForm = new OrderForm(cloneTemplate(contactsTemplate), events);
const basket = new BasketView(cloneTemplate(basketTemplate), events);

// Fetch products from the API
api.getProducts()
    .then(products => {
        productsRepository.products = products;
    })
    .catch(console.error);

// Render product catalog on data change
events.on('products:changed', () => {
    const productCards = productsRepository.products.map(product => {
        const productCard = new ProductCard(cloneTemplate(productTemplate), events);
        return productCard.render(product);
    });
    page.render({ catalogItems: productCards });
});

// Handle product selection for preview
events.on('product:selected', ({ productId }: { productId: string }) => {
    productsRepository.previewId = productId;
});

events.on('previewId:changed', ({ previewId }: { previewId: string }) => {
    const productPreview = new ProductPreview(cloneTemplate(previewTemplate), {
        onAddToBasket: () => {
            modal.close();
            if (orderManager.getBasketItems().some(item => item.id === previewId)) {
                orderManager.removeBasketItem(previewId);
            } else {
                const { id, title, price } = productsRepository.getProductById(previewId)!;
                orderManager.addBasketItem({ id, title, price });
            }
        }
    });
    modal.render({
        content: productPreview.render({
            ...productsRepository.getProductById(previewId)!,
            buttonState: orderManager.isProductInBasket(previewId)
        })
    });
});

// Open basket modal
events.on('basket:open', () => {
    basket.items = orderManager.getBasketItems().map((item, index) => {
        const basketItem = new BasketItem(cloneTemplate(basketProductTemplate), events);
        return basketItem.render({ ...item, index });
    });
    modal.render({ content: basket.render() });
});

// Handle product deletion from basket
events.on('product:delete', ({ productId }: { productId: string }) => {
    orderManager.removeBasketItem(productId);
});

// Update basket on change
events.on('basket:changed', ({ basketProducts }: { basketProducts: BasketProductInfo[] }) => {
    basket.items = basketProducts.map((item, index) => {
        const basketItem = new BasketItem(cloneTemplate(basketProductTemplate), events);
        return basketItem.render({ ...item, index });
    });
    const basketTotal = orderManager.calculateBasketTotal();
    basket.total = basketTotal;
    page.render({ basketItemCount: basketProducts.length });
    orderManager.setOrderTotal(basketTotal);
});

// Open order details form
events.on('order:open', () => {
    const { payment, address } = orderManager.formValidationErrors;
    modal.render({
        content: detailsForm.render({
            payment: orderManager.order.payment,
            address: orderManager.order.address,
            valid: !payment && !address,
            errors: [payment, address].filter(Boolean)
        })
    });
});

// Handle order details submission
events.on('details:submit', () => {
    const { email, phone } = orderManager.formValidationErrors;
    modal.render({
        content: contactsForm.render({
            email: orderManager.order.email,
            phone: orderManager.order.phone,
            valid: !email && !phone,
            errors: [email, phone].filter(Boolean)
        })
    });
});

// Submit order
events.on('order:submit', () => {
    api.createOrder(orderManager.order)
        .then(result => {
            const successView = new SuccessView(cloneTemplate(successTemplate), {
                onClose: () => modal.close()
            });
            page.render({ basketItemCount: orderManager.getBasketItems().length });
            orderManager.clearBasket();
            modal.render({
                content: successView.render({ total: result.total })
            });
        })
        .catch(console.error);
});

// Update form validation state
events.on('formErrors:changed', (errors: Partial<OrderFormData>) => {
    const { payment, address, email, phone } = errors;

    detailsForm.valid = !payment && !address;
    detailsForm.errors = [payment, address].filter(Boolean);

    contactsForm.valid = !email && !phone;
    contactsForm.errors = [email, phone].filter(Boolean);
});


// Update specific order fields
events.on(/^details\..*:changed/, (data: { field: keyof OrderFormData; value: string }) => {
    orderManager.updateOrderField(data.field, data.value, ['payment', 'address']);
});

events.on(/^order\..*:changed/, (data: { field: keyof OrderFormData; value: string }) => {
    orderManager.updateOrderField(data.field, data.value, ['email', 'phone']);
});

// Lock/unlock page scroll on modal state change
events.on('modal:open', () => {
    page.isLocked = true;
});

events.on('modal:close', () => {
    page.isLocked = false;
});
