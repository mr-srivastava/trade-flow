import { Product } from '@/lib/types';
import { parseIndustryToSlug } from '@/lib/utils';

export interface FilterCriteria {
  searchQuery: string;
  industry: string;
}

export const filterProducts = (
  products: Product[],
  criteria: FilterCriteria
): Product[] => {
  return products.filter((product) => {
    try {
      const matchesSearch = [
        product.name,
        product.description,
        product.cas_number,
        product.molecular_formula,
      ].some((field) =>
        field.toLowerCase().includes(criteria.searchQuery.toLowerCase())
      );

      const matchesIndustry = criteria.industry
        ? product.industries
            .map(parseIndustryToSlug)
            .includes(criteria.industry)
        : true;

      return matchesSearch && matchesIndustry;
    } catch (error) {
      console.error('Error filtering product:', product, error);
      return false;
    }
  });
};

export const paginateProducts = (
  products: Product[],
  currentPage: number,
  productsPerPage: number
): Product[] => {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  return products.slice(startIndex, endIndex);
};
