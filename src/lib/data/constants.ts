/**
 * Shared key names and labels used across all products.
 * Order matches the value arrays in slim product data.
 */

export const PROPERTY_KEYS = [
  'Appearance',
  'Solubility',
  'Melting Point',
  'Stability',
  'Reactivity',
  'Decomposition',
] as const;

export const SAFETY_KEYS = [
  'GHS Classification',
  'Precautionary Statement',
] as const;

export const APPLICATION_KEY = 'General Use' as const;

export const CERTIFICATE_NAMES = [
  'GMP',
  'WHO-GMP',
  'ISO 9001:2015',
  'ISO 14001',
  'FSSAI',
  'HACCP',
  'KOSHER',
  'HALAL',
  'REACH',
  'CEP',
] as const;

export const FAQ_QUESTIONS = [
  'Preferred Grade for Export',
  'Minimum Order Quantity (MOQ)',
  'Certifications Available',
  'What is it used for',
] as const;

export const CERTIFICATE_DEFAULTS = {
  issued_date: null as null,
  url: '',
} as const;
