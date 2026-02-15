import type { FullProduct } from './buildProduct';
import { fullProductToSlim } from './buildProduct';
import { PRODUCTS_DATA_FULL } from './data-full';

/** Slim product list derived from full data; built at load time from reusable constants. */
export const SLIM_PRODUCTS = (PRODUCTS_DATA_FULL as FullProduct[]).map(
  fullProductToSlim
);
