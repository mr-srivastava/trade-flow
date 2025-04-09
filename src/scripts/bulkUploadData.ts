/* eslint-disable @typescript-eslint/no-explicit-any */
// bulkUploadData.ts
const sanityClient = require('@sanity/client')
const dotenv = require('dotenv')
const productsData = require('./products.json') // You might need the full path here

dotenv.config()

const client = sanityClient.createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function uploadProducts() {
  for (const product of productsData) {
    try {
      const doc = {
        _type: 'product',
        name: product.name,
        slug_name: {
          _type: 'slug',
          current: product.slug_name || product.name.toLowerCase().replace(/\s+/g, '-'),
        },
        description: product.description,
        cas_number: product.cas_number,
        hsn_no: product.hsn_no,
        pubchem_cid: product.pubchem_cid,
        industries: product.industries,
        categories: product.categories,
        sub_categories: product.sub_categories,
        synonyms: product.synonyms,
        molecular_formula: product.molecular_formula,
        iupac_name: product.iupac_name,
        canonical_smiles: product.canonical_smiles,
        inchi_key: product.inchi_key,
        inchi: product.inchi,
        einecs_number: product.einecs_number,
        fema_number: product.fema_number,
        shelf_life: product.shelf_life,
        odor_profile: product.odor_profile,
        product_sales_pitch: product.product_sales_pitch,
        material_sold: product.material_sold,
        available_as: product.available_as,
        used_in_manufacturing: product.used_in_manufacturing,
        manufactured_form: product.manufactured_form,
        is_exclusive: product.is_exclusive,
        is_product: product.is_product,
        is_variant: product.is_variant,
        active_in_catalog: product.active_in_catalog,
        is_combination_of_products: product.is_combination_of_products,
        valid_product: product.valid_product,

        properties: product.properties?.map((p: { key: any; value: any }) => ({ _type: 'property', key: p.key, value: p.value })),
        storage: product.storage?.map((p: { key: any; value: any }) => ({ _type: 'property', key: p.key, value: p.value })),
        safety_and_hazard: product.safety_and_hazard?.map((p: { key: any; value: any }) => ({ _type: 'property', key: p.key, value: p.value })),
        applications: product.applications?.map((p: { key: any; value: any }) => ({ _type: 'property', key: p.key, value: p.value })),
        faq: product.faq?.map((p: { key: any; value: any }) => ({ _type: 'property', key: p.key, value: p.value })),
        faq_description: product.faq_description,

        certificates: product.certificates?.map((c: { name: any; issued_date: any; url: any }) => ({
          _type: 'certificate',
          name: c.name,
          issued_date: c.issued_date,
          url: c.url,
        })),
      }

      const res = await client.createIfNotExists({
        ...doc,
        _id: `product-${product.id}`,
      })

      console.log(`✅ Created product: ${res.name}`)
    } catch (err) {
      console.error(`❌ Error creating product: ${product.name}`, err)
    }
  }
}

uploadProducts()
