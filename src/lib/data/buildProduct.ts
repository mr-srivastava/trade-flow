import {
  APPLICATION_KEY,
  CERTIFICATE_DEFAULTS,
  CERTIFICATE_NAMES,
  FAQ_QUESTIONS,
  PROPERTY_KEYS,
  SAFETY_KEYS,
} from './constants';

/** MongoDB-style ID wrapper */
export type Oid = { $oid: string };
/** MongoDB-style date wrapper */
export type DateWrap = { $date: string };

/** Full product shape (current API) */
export interface FullProduct {
  _id: Oid;
  name: string;
  slug_name: string;
  hsn_no: string;
  cas_number: string;
  iupac_name: string;
  molecular_formula: string;
  description: string;
  industries: string[];
  properties: Array<{ key: string; value: string; _id: Oid }>;
  safety_and_hazard: Array<{ key: string; value: string; _id: Oid }>;
  applications: Array<{ key: string; value: string; _id: Oid }>;
  certificates: Array<{ name: string; issued_date: null; url: string; _id: Oid }>;
  faq: Array<{ question: string; answer: string; _id: Oid }>;
  __v: number;
  createdAt: DateWrap;
  updatedAt: DateWrap;
}

/** Slim product: only varying data; keys/labels come from constants */
export interface SlimProduct {
  _id: string;
  name: string;
  slug_name: string;
  hsn_no: string;
  cas_number: string;
  iupac_name: string;
  molecular_formula: string;
  description: string;
  industries: string[];
  propertyValues: string[];
  propertyIds: string[];
  safetyValues: [string, string];
  safetyIds: [string, string];
  applicationValue: string;
  applicationId: string;
  certificateIds: string[];
  faqAnswers: string[];
  faqIds: string[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}

function oid(id: string): Oid {
  return { $oid: id };
}
function dateWrap(s: string): DateWrap {
  return { $date: s };
}

/**
 * Build one full product from slim data using shared constants.
 * Preserves all _ids and values; MONTELUKAST-style 5 properties are supported.
 */
export function buildProduct(slim: SlimProduct): FullProduct {
  const propertyKeys = PROPERTY_KEYS.slice(0, slim.propertyValues.length);
  return {
    _id: oid(slim._id),
    name: slim.name,
    slug_name: slim.slug_name,
    hsn_no: slim.hsn_no,
    cas_number: slim.cas_number,
    iupac_name: slim.iupac_name,
    molecular_formula: slim.molecular_formula,
    description: slim.description,
    industries: slim.industries,
    properties: propertyKeys.map((key, i) => ({
      key,
      value: slim.propertyValues[i],
      _id: oid(slim.propertyIds[i]),
    })),
    safety_and_hazard: SAFETY_KEYS.map((key, i) => ({
      key,
      value: slim.safetyValues[i],
      _id: oid(slim.safetyIds[i]),
    })),
    applications: [
      {
        key: APPLICATION_KEY,
        value: slim.applicationValue,
        _id: oid(slim.applicationId),
      },
    ],
    certificates: CERTIFICATE_NAMES.map((name, i) => ({
      name,
      ...CERTIFICATE_DEFAULTS,
      _id: oid(slim.certificateIds[i]),
    })),
    faq: FAQ_QUESTIONS.map((question, i) => ({
      question,
      answer: slim.faqAnswers[i],
      _id: oid(slim.faqIds[i]),
    })),
    __v: slim.__v,
    createdAt: dateWrap(slim.createdAt),
    updatedAt: dateWrap(slim.updatedAt),
  };
}

export function buildProducts(slimList: SlimProduct[]): FullProduct[] {
  return slimList.map(buildProduct);
}

/** Extract slim representation from a full product (for one-time migration). */
export function fullProductToSlim(full: FullProduct): SlimProduct {
  return {
    _id: full._id.$oid,
    name: full.name,
    slug_name: full.slug_name,
    hsn_no: full.hsn_no,
    cas_number: full.cas_number,
    iupac_name: full.iupac_name,
    molecular_formula: full.molecular_formula,
    description: full.description,
    industries: full.industries,
    propertyValues: full.properties.map((p) => p.value),
    propertyIds: full.properties.map((p) => p._id.$oid),
    safetyValues: [full.safety_and_hazard[0].value, full.safety_and_hazard[1].value],
    safetyIds: [full.safety_and_hazard[0]._id.$oid, full.safety_and_hazard[1]._id.$oid],
    applicationValue: full.applications[0].value,
    applicationId: full.applications[0]._id.$oid,
    certificateIds: full.certificates.map((c) => c._id.$oid),
    faqAnswers: full.faq.map((f) => f.answer),
    faqIds: full.faq.map((f) => f._id.$oid),
    __v: full.__v,
    createdAt: full.createdAt.$date,
    updatedAt: full.updatedAt.$date,
  };
}
