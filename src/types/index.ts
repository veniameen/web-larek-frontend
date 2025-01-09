export type ApiGetResponse<T> = {
    total: number; // Total number of items
    items: T[];    // List of items
};

export type ApiOrderResponse<T> = {
    id: T;        // Order ID
    total: number; // Total cost of the order
};

export interface Product {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface ProductsDataInterface {
    products: Product[];
    previewId: string | null;
    getProductById(productId: string): Product | undefined;
}

export interface OrderFormData {
    payment: string;
    address: string;
    email: string;
    phone: string;
}

export interface OrderDetails extends OrderFormData {
    items: string[]; // List of product IDs
    total: number;   // Total cost of the order
}

export interface OrderRepositoryInterface extends OrderFormData {
    order: OrderDetails;
    getBasketItems(): BasketProductInfo[];
    removeBasketItem(productId: string): void;
    calculateBasketTotal(): number;
    clearBasket(): void;
    isProductInBasket(productId: string): boolean;
    updateOrderField(field: keyof OrderFormData, value: string, fieldsToValidate?: Array<keyof OrderFormData>): void;
    validateOrderFields(fieldsToValidate?: Array<keyof OrderFormData>): void;
}

export interface OrderResult {
    id: string;
    total: number;
}

export interface ShopApiInterface {
    getProducts: () => Promise<Product[]>;
    createOrder: (order: OrderDetails) => Promise<OrderResult>;
}

export type ProductInfo = Pick<Product, 'description' | 'image' | 'title' | 'category' | 'price'>;

export type BasketProductInfo = Pick<Product, 'id' | 'title' | 'price'>;

export type OrderCost = Pick<OrderDetails, 'total'>;
