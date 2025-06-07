import React from 'react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
}

export default function ProductCard({ product, onView, onEdit }: ProductCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-bold text-lg text-blue-600">{product.name}</h3>
            <p className="text-sm text-muted-foreground">Slug: {product.slug_name}</p>
          </div>

          <div>
            <p className="text-sm">
              <span className="font-medium">HSN:</span> {product.hsn_no}
            </p>
            <p className="text-sm">
              <span className="font-medium">CAS:</span> {product.cas_number}
            </p>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm">
                <span className="font-medium">Formula:</span> {product.molecular_formula}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium">Industries:</span>
                <Badge variant="outline" className="text-xs">
                  {product.industries?.length || 0}
                </Badge>
              </div>
            </div>

            {/* Action Buttons using shadcn/ui Button component */}
            <div className="flex gap-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onView(product)}
                className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                title="View Details"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(product)}
                className="text-green-600 hover:bg-green-50 hover:text-green-700"
                title="Edit Product"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {product.description && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
