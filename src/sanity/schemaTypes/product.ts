import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({
      name: "slug_name",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({ name: "description", title: "Description", type: "text" }),

    defineField({ name: "pubchem_cid", title: "PubChem CID", type: "string" }),
    defineField({ name: "cas_number", title: "CAS Number", type: "string" }),
    defineField({ name: "hsn_no", title: "HSN Code", type: "string" }),
    defineField({ name: "mdl_number", title: "MDL Number", type: "string" }),
    defineField({
      name: "einecs_number",
      title: "EINECS Number",
      type: "string",
    }),
    defineField({ name: "fema_number", title: "FEMA Number", type: "string" }),
    defineField({ name: "iupac_name", title: "IUPAC Name", type: "string" }),
    defineField({
      name: "molecular_formula",
      title: "Molecular Formula",
      type: "string",
    }),
    defineField({
      name: "canonical_smiles",
      title: "Canonical SMILES",
      type: "string",
    }),
    defineField({ name: "inchi_key", title: "InChI Key", type: "string" }),
    defineField({ name: "inchi", title: "InChI", type: "string" }),

    defineField({ name: "unspsc_code", title: "UNSPSC Code", type: "string" }),
    defineField({ name: "eclass", title: "ECLASS", type: "string" }),
    defineField({ name: "nacres", title: "NACRES", type: "string" }),

    defineField({
      name: "industries",
      title: "Industries",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "sub_categories",
      title: "Sub Categories",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({ name: "synonyms", title: "Synonyms", type: "text" }),
    defineField({ name: "odor_profile", title: "Odor Profile", type: "text" }),

    defineField({
      name: "product_images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({ name: "pictogram", title: "Pictogram", type: "image" }),

    defineField({
      name: "certificates",
      title: "Certificates",
      type: "array",
      of: [{ type: "certificate" }],
    }),
    defineField({
      name: "manufacturers_certificates",
      title: "Manufacturer Certificates",
      type: "array",
      of: [{ type: "file" }],
    }),

    defineField({
      name: "properties",
      title: "Properties",
      type: "array",
      of: [{ type: "property" }],
    }),
    defineField({
      name: "safety_and_hazard",
      title: "Safety & Hazard",
      type: "array",
      of: [{ type: "property" }],
    }),
    defineField({
      name: "applications",
      title: "Applications",
      type: "array",
      of: [{ type: "property" }],
    }),
    defineField({
      name: "storage",
      title: "Storage Info",
      type: "array",
      of: [{ type: "property" }],
    }),
    defineField({
      name: "faq",
      title: "FAQs",
      type: "array",
      of: [{ type: "property" }],
    }),
    defineField({
      name: "faq_description",
      title: "FAQ Description",
      type: "text",
    }),

    defineField({
      name: "product_sales_pitch",
      title: "Product Sales Pitch",
      type: "text",
    }),
    defineField({
      name: "material_sold",
      title: "Material Sold",
      type: "string",
    }),
    defineField({ name: "shelf_life", title: "Shelf Life", type: "string" }),

    defineField({
      name: "analytical_report",
      title: "Analytical Report",
      type: "file",
    }),
    defineField({
      name: "three_batch_reports",
      title: "Three Batch Report",
      type: "file",
    }),
    defineField({
      name: "purity_report",
      title: "Purity Report",
      type: "file",
    }),

    defineField({
      name: "uses",
      title: "Uses",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "end_use_api",
      title: "End Use APIs",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "export_countries",
      title: "Export Countries",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "used_in_manufacturing",
      title: "Used in Manufacturing",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "manufactured_form",
      title: "Manufactured Forms",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "available_as",
      title: "Available As",
      type: "string",
    }),

    defineField({
      name: "is_exclusive",
      title: "Is Exclusive",
      type: "boolean",
    }),
    defineField({ name: "is_product", title: "Is Product", type: "boolean" }),
    defineField({ name: "is_variant", title: "Is Variant", type: "boolean" }),
    defineField({
      name: "active_in_catalog",
      title: "Active in Catalog",
      type: "boolean",
    }),
    defineField({
      name: "is_combination_of_products",
      title: "Is Combination of Products",
      type: "boolean",
    }),

    defineField({
      name: "variants",
      title: "Variants",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "derived_from",
      title: "Derived From",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "combination_product_base_compounds",
      title: "Combination Base Compounds",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),

    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "opinion",
      title: "Opinion",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "valid_product",
      title: "Valid Product",
      type: "boolean",
    }),
  ],
});

export const property = defineType({
  name: "property",
  title: "Property",
  type: "object",
  fields: [
    defineField({ name: "key", title: "Key", type: "string" }),
    defineField({ name: "value", title: "Value", type: "string" }),
  ],
});

export const certificate = defineType({
  name: "certificate",
  title: "Certificate",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({
      name: "issued_date",
      title: "Issued Date",
      type: "datetime",
    }),
    defineField({ name: "url", title: "Certificate URL", type: "url" }),
  ],
});
