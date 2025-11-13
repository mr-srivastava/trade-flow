import { z } from 'zod';

/**
 * Validation schema for creating a new product
 * All fields are required unless explicitly marked optional
 */
export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug_name: z.string().min(1, 'Slug name is required'),
  hsn_no: z.string().min(1, 'HSN number is required'),
  cas_number: z.string().min(1, 'CAS number is required'),
  iupac_name: z.string().min(1, 'IUPAC name is required'),
  molecular_formula: z.string().min(1, 'Molecular formula is required'),
  description: z.string(),
  industries: z.array(z.string()),
  properties: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
  safety_and_hazard: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
  applications: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
  certificates: z.array(
    z.object({
      name: z.string(),
      issued_date: z.string().nullable(),
      url: z.string(),
    })
  ),
  faq: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
});

/**
 * Validation schema for updating an existing product
 * All fields are optional to support partial updates
 */
export const updateProductSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  slug_name: z.string().min(1, 'Slug name is required').optional(),
  hsn_no: z.string().min(1, 'HSN number is required').optional(),
  cas_number: z.string().min(1, 'CAS number is required').optional(),
  iupac_name: z.string().min(1, 'IUPAC name is required').optional(),
  molecular_formula: z
    .string()
    .min(1, 'Molecular formula is required')
    .optional(),
  description: z.string().optional(),
  industries: z.array(z.string()).optional(),
  properties: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  safety_and_hazard: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  applications: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  certificates: z
    .array(
      z.object({
        name: z.string(),
        issued_date: z.string().nullable(),
        url: z.string(),
      })
    )
    .optional(),
  faq: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .optional(),
});

/**
 * TypeScript types inferred from the schemas
 */
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
