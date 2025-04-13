import { headers } from 'next/headers';

const getBaseUrl = () => {
  const host = headers().get('host');
  const protocol = host?.startsWith('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  return baseUrl;
};

const urlMap = {
  getProduct: (productId: string) => `${getBaseUrl()}/api/products/${productId}`,
  getProducts: () => `${getBaseUrl()}/api/products`,
  getIndustries: () => `${getBaseUrl()}/api/products/industries`,
};

export default urlMap;
