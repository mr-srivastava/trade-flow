/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Property {
    key: string
    value: string
  }
  
  export interface Certificate {
    name: string
    issued_date: string | null
    url: string
  }
  
  export interface Product {
    id: string
    created_at: string
    updated_at: string
    name: string
    pubchem_cid: string
    hsn_no: string
    description: string
    industries: string[]
    categories: string[]
    sub_categories: string[]
    cas_number: string
    product_images: string[]
    certificates: Certificate[]
    synonyms: string | null
    molecular_formula: string
    iupac_name: string
    properties: Property[]
    safety_and_hazard: Property[]
    pictogram: string | null
    applications: Property[]
    storage: Property[]
    variants: any[]
    is_variant: boolean
    is_product: boolean
    derived_from: any[]
    active_in_catalog: boolean
    is_combination_of_products: boolean
    combination_product_base_compounds: any[]
    canonical_smiles: string
    inchi_key: string
    inchi: string
    is_exclusive: boolean
    einecs_number: string
    fema_number: string
    shelf_life: string
    odor_profile: string | null
    manufacturers_certificates: any[]
    uses: string[]
    end_use_api: string[]
    export_countries: any[]
    product_sales_pitch: string
    material_sold: string
    analytical_report: string | null
    three_batch_reports: string | null
    purity_report: string | null
    highlights: any[]
    mdl_number: string
    unspsc_code: string
    eclass: string
    nacres: string
    opinion: any[]
    valid_product: boolean
    faq: Property[]
    faq_description: string
    available_as: string | null
    slug_name: string
  }
  
  export interface ProductsResponse {
    total_products: number
    products: Product[]
  }
  
  