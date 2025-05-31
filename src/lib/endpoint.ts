const urlMap = {
  getProduct: (productId: string) => `/api/products/${productId}`,
  getProducts: () => `/api/products`,
  getProductsByIndustry: (industry: string) => `/api/products/industries/${industry}`,
  getIndustriesProductCount: () => `/api/products/industries/count`,
};

export default urlMap;
