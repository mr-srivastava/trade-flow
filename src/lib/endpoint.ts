interface UrlMap {
  getProducts: () => string;
  getProduct: (productId: string) => string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const urlMap: UrlMap = {
  getProducts: () => `${baseUrl}/api/products`,
  getProduct: (productId) => `${baseUrl}/api/products/${productId}`,
};

export default urlMap;
