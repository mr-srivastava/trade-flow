'use client';

import React from 'react';
import { Product } from '@/lib/types';
import ProductDetailModal from './ProductDetailModal';
import ProductStats from './ProductStats';
import ProductList from './ProductList';

interface AdminProductManagerProps {
  products: Product[];
}

export default function AdminProductManager({ products: initialProducts }: AdminProductManagerProps) {
  const [products, setProducts] = React.useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [detailedProduct, setDetailedProduct] = React.useState<Product | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);

  // Update products when initial products change
  React.useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Function to refresh all products from the server
  const refreshProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      } else {
        console.error('Failed to refresh products');
      }
    } catch (error) {
      console.error('Error refreshing products:', error);
    }
  };

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

  const handleProductCreated = async (newProduct: Product) => {
    // Add the new product to the local state
    setProducts(prev => [...prev, newProduct]);
    // Also refresh from server to ensure data consistency
    await refreshProducts();
  };

  const handleProductUpdated = async (updatedProduct: Product) => {
    // Update the specific product in local state
    setProducts(prev => 
      prev.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    // Update the detailed product if it's the same one being viewed
    setDetailedProduct(updatedProduct);
    // Also refresh from server to ensure data consistency
    await refreshProducts();
  };

  const handleNewProduct = () => {
    setDetailedProduct(null);
    setIsEditMode(true);
    setIsModalOpen(true);
    setIsLoading(false);
  };

  return (
    <>
      <div className="space-y-4">
        <ProductStats count={products.length} onNewProduct={handleNewProduct} />
        <ProductList products={products} onView={handleView} onEdit={handleEdit} />
      </div>

      <ProductDetailModal 
        product={detailedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isEditMode={isEditMode}
        onEditModeChange={handleEditModeChange}
        isLoading={isLoading}
        mode={detailedProduct === null && isEditMode ? 'new' : isEditMode ? 'edit' : 'view'}
        onProductCreated={handleProductCreated}
        onProductUpdated={handleProductUpdated}
      />
    </>
  );
}
