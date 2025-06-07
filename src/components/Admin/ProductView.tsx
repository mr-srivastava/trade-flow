'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { KeyValueDisplay, FAQDisplay } from './DynamicFields';

interface ProductViewProps {
  product: Product;
}

export default function ProductView({ product }: ProductViewProps) {
  return (
    <div className="space-y-6">
      {/* Basic Information & Industries Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Basic Information */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold border-b pb-2 mb-3">Basic Information</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Name:</span> {product.name}
              </p>
              <p>
                <span className="font-medium">Slug:</span> {product.slug_name}
              </p>
              <p>
                <span className="font-medium">HSN No:</span> {product.hsn_no}
              </p>
              <p>
                <span className="font-medium">CAS Number:</span> {product.cas_number}
              </p>
              <p>
                <span className="font-medium">IUPAC Name:</span> {product.iupac_name}
              </p>
              <p>
                <span className="font-medium">Molecular Formula:</span> {product.molecular_formula}
              </p>
              <p>
                <span className="font-medium">Created:</span>{' '}
                {new Date(product.created_at).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Updated:</span>{' '}
                {new Date(product.updated_at).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Industries */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold border-b pb-2 mb-3">Industries</h3>
            <div className="flex flex-wrap gap-2">
              {product.industries.map((industry, index) => (
                <Badge key={index} variant="secondary">
                  {industry}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
        </CardContent>
      </Card>

      {/* Properties - Now using display component */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">Properties</h3>
          <KeyValueDisplay
            items={product.properties || []}
            emptyMessage="No properties available"
          />
        </CardContent>
      </Card>

      {/* Safety and Hazard - Now using display component */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">Safety & Hazard</h3>
          <KeyValueDisplay
            items={product.safety_and_hazard || []}
            variant="safety"
            emptyMessage="No safety information available"
          />
        </CardContent>
      </Card>

      {/* Applications - Now using display component */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">Applications</h3>
          <KeyValueDisplay
            items={product.applications || []}
            variant="application"
            emptyMessage="No applications available"
          />
        </CardContent>
      </Card>

      {/* FAQ - Now using display component */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">FAQ</h3>
          <FAQDisplay items={product.faq || []} />
        </CardContent>
      </Card>
    </div>
  );
}
