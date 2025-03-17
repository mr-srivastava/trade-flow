import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { AlertTriangle, Beaker, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "@/lib/types";
import { Badge } from "../ui/badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square bg-muted shadow-lg">
          {product.product_images && product.product_images.length > 0 ? (
            <Image
              src={product.product_images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform hover:scale-105 hover:shadow-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Beaker className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
          {product.is_exclusive && (
            <Badge className="absolute top-2 right-2 bg-primary">
              Exclusive
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4 flex-grow">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium line-clamp-2">{product.name}</h3>
            {product.safety_and_hazard &&
              product.safety_and_hazard.some(
                (item) =>
                  item.value.includes("hazardous") ||
                  item.value.includes("Toxic") ||
                  item.value.includes("Corrosive")
              ) && <AlertTriangle className="h-4 w-4 text-amber-500" />}
          </div>
          <div className="flex flex-wrap gap-1">
            {product.industries.map((industry, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {industry}
              </Badge>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="font-medium">CAS:</span> {product.cas_number}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">Formula:</span>{" "}
              {product.molecular_formula}
            </div>
          </div>
          <p className="text-sm line-clamp-2">{product.description}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="w-full flex gap-2">
          {product.certificates && product.certificates.length > 0 && (
            <div className="flex gap-1">
              {product.certificates.map((cert, i) => (
                <Link
                  key={i}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground"
                >
                  <FileText className="h-3 w-3 mr-1" />
                  {cert.name}
                </Link>
              ))}
            </div>
          )}
          <Button className="ml-auto" size="sm" asChild>
            <Link href={`/products/${product.id}`}>View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
