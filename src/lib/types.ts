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
  slug_name: string;
  hsn_no: string;
  cas_number: string;
  iupac_name: string;
  molecular_formula: string;
  description: string;
  industries: string[];
  properties: Property[];
  safety_and_hazard: Property[];
  applications: Property[];
  certificates: Certificate[];
  faq: Property[];
}

export interface ProductsResponse {
  total_products: number;
  products: Product[];
}

//v2
export interface HeroContent {
  heading: string;
  description: string;
  industries?: Array<string>;
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
