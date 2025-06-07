'use client';

import React from 'react';
import { Product } from '@/lib/types';
import ProductDetailModal from './ProductDetailModal';
import ProductStats from './ProductStats';
import ProductList from './ProductList';

interface AdminProductManagerProps {
  products: Product[];
}

export default function AdminProductManager({ products }: AdminProductManagerProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [detailedProduct, setDetailedProduct] = React.useState<Product | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);

  const handleView = async (product: Product) => {
    setIsLoading(true);
    setIsEditMode(false); // Start in view mode
    setIsModalOpen(true); // Open sheet immediately
    try {
      // Fetch detailed product data using the product ID
      const response = await fetch(`/api/products/${product.id}`);
      if (response.ok) {
        const detailedData = await response.json();
        setDetailedProduct(detailedData);
      } else {
        console.error('Failed to fetch product details');
        // Fallback to basic product data
        setDetailedProduct(product);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      // Fallback to basic product data
      setDetailedProduct(product);
    }
    setIsLoading(false);
  };

  const handleEdit = async (product: Product) => {
    setIsLoading(true);
    setIsEditMode(true); // Start in edit mode
    setIsModalOpen(true); // Open sheet immediately
    try {
      // Fetch detailed product data using the product ID
      const response = await fetch(`/api/products/${product.id}`);
      if (response.ok) {
        const detailedData = await response.json();
        setDetailedProduct(detailedData);
      } else {
        console.error('Failed to fetch product details');
        // Fallback to basic product data
        setDetailedProduct(product);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      // Fallback to basic product data
      setDetailedProduct(product);
    }
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDetailedProduct(null);
    setIsEditMode(false);
  };

  const handleEditModeChange = (editMode: boolean) => {
    setIsEditMode(editMode);
  };

  return (
    <>
      <div className="space-y-4">
        <ProductStats count={products.length} />
        <ProductList products={products} onView={handleView} onEdit={handleEdit} />
      </div>

      <ProductDetailModal 
        product={detailedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isEditMode={isEditMode}
        onEditModeChange={handleEditModeChange}
        isLoading={isLoading}
      />
    </>
  );
}
