import { headers } from 'next/headers';

const getBaseUrl = () => {
  const host = headers().get('host');
  const protocol = host?.startsWith('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  return baseUrl;
};

const urlMap = {
  getProducts: () => `${getBaseUrl()}/api/products`,
  getProduct: (productId: string) => `${getBaseUrl()}/api/products/${productId}`,
};

export default urlMap;
