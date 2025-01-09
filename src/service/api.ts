import { ApiService } from "../components/base/api";
import { settings } from "../utils/constants";
import { Product, OrderDetails, OrderResult, ApiGetResponse, ApiOrderResponse, ShopApiInterface } from "../types";

export class ECommerceApi extends ApiService implements ShopApiInterface {
    async getProducts(): Promise<Product[]> {
        const response = await this.get<ApiGetResponse<Product>>(settings.endpoints.products);
        return response.items;
    }

    async createOrder(order: OrderDetails): Promise<OrderResult> {
        const response = await this.post<ApiOrderResponse<string>>(settings.endpoints.order, order);
        return response;
    }
}
