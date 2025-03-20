import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { extendedProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import React from "react";

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

  return (
    <>
      <Header isFixed={false} />
      <ProductDetails product={product} />
      <Footer />
    </>
  );
}
