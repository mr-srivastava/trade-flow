// import Footer from '@/components/Footer/Footer';
// import Header from '@/components/Header/Header';
// import ProductDetails from '@/components/ProductDetails/ProductDetails';
import ProductDetail from '@/components/ProductDetails/v2/ProductDetails';
import { extendedProducts } from '@/lib/data';
import { notFound } from 'next/navigation';
import React from 'react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = extendedProducts.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const recommendedProducts = extendedProducts
    .filter(
      (p) =>
        p.id !== params.id &&
        (p.categories.some((cat) => product.categories.includes(cat)) ||
          p.industries.some((ind) => product.industries.includes(ind))),
    )
    .slice(0, 4);

  return (
    <>
      <ProductDetail product={product} recommendations={recommendedProducts} />
    </>
  );
}
