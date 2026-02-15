import { Product, ProductWithOptionalId } from '@/lib/types';

/**
 * Checks if a product has hazardous materials based on safety_and_hazard data
 * @param product - The product to check
 * @returns true if the product has hazardous materials, false otherwise
 */
export const hasHazardousMaterials = (product?: Product | null): boolean => {
  if (!product?.safety_and_hazard) {
    return false;
  }

  if (!Array.isArray(product.safety_and_hazard)) {
    return false;
  }

  return product.safety_and_hazard.some(
    (item) =>
      item &&
      item.value &&
      (item.value.includes('hazardous') ||
        item.value.includes('Toxic') ||
        item.value.includes('Corrosive'))
  );
};

/**
 * Gets the product ID, handling both MongoDB _id and regular id fields
 * @param product - The product object
 * @returns The product ID as a string
 */
export const getProductId = (product: ProductWithOptionalId): string => {
  return product._id ?? product.id;
};
