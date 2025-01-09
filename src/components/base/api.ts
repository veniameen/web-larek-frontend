export type ApiListResponse<T> = {
    total: number; // Total number of items
    items: T[];    // List of items
};

export type ApiPostMethod = 'POST' | 'PATCH' | 'DELETE';

export class ApiService {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers ?? {})
            }
        };
    }

    /**
     * Handles the response from a fetch request.
     * @param response - The response object from fetch
     * @returns A promise resolving to the parsed JSON response or rejecting with an error message.
     */
    protected async handleResponse<T>(response: Response): Promise<T> {
        if (response.ok) {
            return response.json();
        } else {
            const errorData: { error?: string } | null = await response.json().catch((): { error?: string } | null => null);
            throw new Error(errorData?.error ?? response.statusText);
        }
    }     

    /**
     * Performs a GET request.
     * @param uri - The endpoint URI
     * @returns A promise resolving to the parsed JSON response.
     */
    async get<T>(uri: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${uri}`, {
            ...this.options,
            method: 'GET',
        });
        return this.handleResponse<T>(response);
    }

    /**
     * Performs a POST, PATCH, or DELETE request.
     * @param uri - The endpoint URI
     * @param data - The body of the request
     * @param method - The HTTP method (default: POST)
     * @returns A promise resolving to the parsed JSON response.
     */
    async post<T>(uri: string, data: object, method: ApiPostMethod = 'POST'): Promise<T> {
        const response = await fetch(`${this.baseUrl}${uri}`, {
            ...this.options,
            method,
            body: JSON.stringify(data),
        });
        return this.handleResponse<T>(response);
    }
}
