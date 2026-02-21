import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Plus } from 'lucide-react';

interface ProductStatsProps {
  count: number;
  onNewProduct?: () => void;
}

export default function ProductStats({ count, onNewProduct }: ProductStatsProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <p className="text-2xl font-bold">{count}</p>
            </div>
          </div>
          {onNewProduct && (
            <Button onClick={onNewProduct} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Product
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
