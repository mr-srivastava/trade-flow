import { buildProducts } from './buildProduct';
import { SLIM_PRODUCTS } from './products-slim';

/** Product list built from reusable constants + slim data. Same shape as before. */
export const PRODUCTS_DATA = buildProducts(SLIM_PRODUCTS);
