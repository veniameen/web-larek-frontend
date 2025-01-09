const API_ORIGIN = process.env.API_ORIGIN || 'https://larek-api.nomoreparties.co'

export const API_URL = `${API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${API_ORIGIN}/content/weblarek`;

export const settings = {
    endpoints: {
        products: '/product/',
        order: '/order'
    }
};
