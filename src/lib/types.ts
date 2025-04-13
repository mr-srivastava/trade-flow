/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Property {
  key: string;
  value: string;
}

export interface Certificate {
  name: string;
  issued_date: string | null;
  url: string;
}

export interface Product {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  pubchem_cid: string;
  hsn_no: string;
  description: string;
  industries: string[];
  categories: string[];
  sub_categories: string[];
  cas_number: string;
  product_images: string[];
  certificates: Certificate[];
  synonyms: string | null;
  molecular_formula: string;
  iupac_name: string;
  properties: Property[];
  safety_and_hazard: Property[];
  pictogram: string | null;
  applications: Property[];
  storage: Property[];
  variants: any[];
  is_variant: boolean;
  is_product: boolean;
  derived_from: any[];
  active_in_catalog: boolean;
  is_combination_of_products: boolean;
  combination_product_base_compounds: any[];
  canonical_smiles: string;
  inchi_key: string;
  inchi: string;
  is_exclusive: boolean;
  einecs_number: string;
  fema_number: string;
  shelf_life: string;
  odor_profile: string | null;
  manufacturers_certificates: any[];
  uses: string[];
  end_use_api: string[];
  export_countries: any[];
  product_sales_pitch: string;
  material_sold: string;
  analytical_report: string | null;
  three_batch_reports: string | null;
  purity_report: string | null;
  highlights: any[];
  mdl_number: string;
  unspsc_code: string;
  eclass: string;
  nacres: string;
  opinion: any[];
  valid_product: boolean;
  faq: Property[];
  faq_description: string | null;
  available_as: string | null;
  slug_name: string;
  used_in_manufacturing: string[];
  manufactured_form: string[];
}

export interface ProductsResponse {
  total_products: number;
  products: Product[];
}

//v2
export interface HeroContent {
  heading: string;
  description: string;
  buttons: {
    contact: {
      text: string;
      href: string;
    };
    explore: {
      text: string;
      href: string;
    };
  };
  stats: {
    title: string;
    items: {
      value: string;
      description: string;
    }[];
  };
}

export interface Benefit {
  title: string;
  description: string;
  icon: string; // Optional for v2
}

interface Value {
  icon: string; // Optional for v2
  title: string;
  description: string;
}

export interface AboutContent {
  header: {
    title: string;
    subtitle: string;
  };
  description: {
    paragraphs: string[];
    links: Array<{
      href: string;
      text: string;
      className: string;
    }>;
  };
  values: Array<Value>;
}

export interface ProductCategoriesData {
  title: string;
  subtitle: string;
  buttonText: string;
}

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface SynFlowData {
  features: Feature[];
  sectionId: string;
  sectionTitle: string;
  sectionDescription: string;
  learnMoreText: string;
  learnMoreLink: string;
}

interface Resource {
  icon: string; // Optional for v2
  title: string;
  description: string;
  link: string;
}

export interface ResourcesData {
  title: string;
  subtitle: string;
  resources: Resource[];
}

export interface PageContent {
  hero: HeroContent;
  benefits: Array<Benefit>;
  about: AboutContent;
  productCategories: ProductCategoriesData;
  synFlowFeatures: SynFlowData;
  resourcesData: ResourcesData;
}

export interface IndustryProductCountMap {
  name: string;
  count: number;
}
