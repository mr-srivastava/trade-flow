import { headers } from 'next/headers';

const getBaseUrl = () => {
  const host = headers().get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  return `${protocol}://${host}`;
};

const urlMap = {
  getProducts: () => `${getBaseUrl()}/api/products`,
  getProduct: (productId: string) => `${getBaseUrl()}/api/products/${productId}`,
};

export default urlMap;
