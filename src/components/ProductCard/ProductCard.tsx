import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { AlertTriangle, Beaker, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "@/lib/types";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  // Check if product has hazard warnings
  const hasHazards =
    product.safety_and_hazard &&
    product.safety_and_hazard.some(
      (item) =>
        item.value.includes("hazardous") ||
        item.value.includes("Toxic") ||
        item.value.includes("Corrosive")
    );

  return (
    <Card
      className={cn(
        "overflow-hidden flex flex-col h-full group transition-all duration-300 hover:shadow-md border-muted/60 hover:border-primary/20",
        className
      )}
    >
      <Link
        href={`/products/${product.id}`}
        className="relative overflow-hidden"
      >
        <div className="relative aspect-square bg-muted/50">
          {product.product_images && product.product_images.length > 0 ? (
            <Image
              src={product.product_images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Beaker className="h-16 w-16 text-muted-foreground/50" />
            </div>
          )}

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.is_exclusive && (
              <Badge className="bg-primary text-primary-foreground font-medium shadow-sm">
                Exclusive
              </Badge>
            )}
            {hasHazards && (
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-700 border-amber-200"
              >
                <AlertTriangle className="h-3 w-3 mr-1" />
                Hazardous
              </Badge>
            )}
          </div>
        </div>
      </Link>

      <CardContent className="p-5 flex-grow flex flex-col">
        <div className="space-y-3 flex-grow">
          <div>
            <Link
              href={`/products/${product.id}`}
              className="hover:underline decoration-primary decoration-1 underline-offset-4"
            >
              <h3 className="font-medium text-lg line-clamp-2 leading-tight">
                {product.name}
              </h3>
            </Link>

            <div className="flex flex-wrap gap-1.5 mt-2">
              {product.industries.map((industry, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="text-xs font-normal bg-secondary/50"
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          <div className="text-sm text-muted-foreground space-y-1.5 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-foreground/80">CAS:</span>
              <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                {product.cas_number}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-foreground/80">Formula:</span>
              <span className="font-mono text-xs">
                {product.molecular_formula}
              </span>
            </div>
          </div>

          <p className="text-sm line-clamp-2 text-muted-foreground">
            {product.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="px-5 py-4 border-t bg-muted/20">
        <div className="w-full flex items-center justify-between">
          {product.certificates && product.certificates.length > 0 && (
            <div className="flex gap-2">
              {product.certificates.map((cert, i) => (
                <Link
                  key={i}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <FileText className="h-3 w-3 mr-1" />
                  {cert.name}
                </Link>
              ))}
            </div>
          )}
          <Button className="ml-auto" size="sm" variant="default" asChild>
            <Link href={`/products/${product.id}`} className="font-medium">
              View Details
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
