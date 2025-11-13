import React from 'react';
import { ChevronLeft } from 'lucide-react';
import NavBar from '@/components/layout/Navbar/Navbar';
import Link from 'next/link';
import Footer from '@/components/layout/Footer/Footer';
import { Product } from '@/lib/types';
import ReadMore from '@/components/shared/ReadMore';
import PropertyList from '@/components/Features/product/PropertyList/PropertyList';
import { hasHazardousMaterials } from '@/lib/utils/productHelpers';
import ProductHeader from './ProductHeader';
import ProductSpecs from './ProductSpecs';
import ProductCertificates from './ProductCertificates';
import ProductActions from './ProductActions';
import RelatedProducts from './RelatedProducts';
import ProductFAQ from './ProductFAQ';
import HelpSection from './HelpSection';

interface ProductDetailProps {
  product: Product & { relatedProducts: Array<Product> };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const renderContent = () => {
    if (!product) {
      return (
        <div className='text-center py-16'>
          <h1 className='text-2xl font-bold text-white mb-4'>
            Product Not Found
          </h1>
          <p className='text-syntara-light/80 mb-6'>
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href='/products'
            className='text-syntara-primary hover:underline'
          >
            Back to Products
          </Link>
        </div>
      );
    }

    return (
      <>
        <Link
          href='/products'
          className='flex items-center text-syntara-light hover:text-syntara-primary transition mb-6'
        >
          <ChevronLeft className='h-4 w-4 mr-1' />
          Back to products
        </Link>

        <div className='mb-6'>
          <ProductHeader
            name={product.name}
            industries={product.industries || []}
          />

          <ProductSpecs
            casNumber={product.cas_number}
            molecularFormula={product.molecular_formula}
            hsnNo={product.hsn_no}
            isHazardous={hasHazardousMaterials(product)}
          />

          {product.description && product.description !== '#N/A' && (
            <div className='mb-6'>
              <h2 className='text-xl font-semibold text-white mb-3'>
                Description
              </h2>
              <ReadMore content={product.description} />
            </div>
          )}

          <ProductCertificates certificates={product.certificates} />

          <ProductActions product={product} />
        </div>

        <div className='mt-10'>
          <PropertyList product={product} />
        </div>

        <RelatedProducts products={product.relatedProducts || []} />

        <ProductFAQ faqs={product.faq} />

        <HelpSection />
      </>
    );
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <div className='section-container pt-8 pb-16'>{renderContent()}</div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
