import { Check, Cog, Shirt, Tractor } from 'lucide-react';
import React from 'react';

const PRODUCT_CATEGORIES = [
  {
    icon: <Tractor className="h-6 w-6 text-brand" />,
    name: 'Agricultural Produce',
    description:
      'Rice, spices, tea, coffee, and other agricultural products sourced directly from premium farms.',
    products: ['Premium Quality Rice', 'Organic Spices', 'Fine Tea & Coffee'],
  },
  {
    icon: <Shirt className="h-6 w-6 text-brand" />,
    name: 'Textiles & Apparel',
    description:
      'High-quality fabrics and ready-made garments from leading manufacturers.',
    products: ['Cotton Textiles', 'Ready-made Garments', 'Fashion Accessories'],
  },
  {
    icon: <Cog className="h-6 w-6 text-brand" />,
    name: 'Industrial Machinery',
    description:
      'State-of-the-art machinery and equipment for various industries.',
    products: [
      'Manufacturing Equipment',
      'Processing Units',
      'Industrial Tools',
    ],
  },
];

export default function Products() {
  return (
    <section id="products" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-50 mb-4">
            Product Categories
          </h2>
          <div className="w-24 h-1 bg-brand mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover our diverse range of high-quality products from verified
            global suppliers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCT_CATEGORIES.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-brand/20 rounded-lg flex items-center justify-center mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <ul className="text-gray-600 space-y-2">
                  {category.products.map((product) => (
                    <li key={product} className="flex items-center">
                      <Check className="w-4 h-4 text-brand mr-2" />
                      {product}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-400 to-brand hover:from-blue-500 hover:to-[#0B8ED0] md:py-4 md:text-lg md:px-10"
          >
            Request Product Catalog
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
