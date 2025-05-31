import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Beaker,
  ChevronLeft,
  ExternalLink,
  FileText,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { ProductRecommendations } from "@/components/ProductRecommendation/ProductRecommendation";
import { CTABanner } from "@/components/CTABanner/CTABanner";
import { RequestQuoteForm } from "@/components/RequestQuoteForm/RequestQuoteForm";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { Product } from "@/lib/types";
import FAQ from "../FAQ/FAQ";
import ProductProperties from "./ProductProperties";
import ReadMore from "../ReadMore/ReadMore";

export default function ProductDetails({ product }: { product: Product }) {
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
    <main className="container px-8 py-8 mx-auto bg-neutral-900 text-neutral-50">
      <Link
        href="/products"
        className="inline-flex items-center text-sm font-medium mb-8 hover:text-primary transition-colors"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to products
      </Link>

      <div className="grid md:grid-cols-3 gap-10 ">
        <div className="md:col-span-1">
          <div className="sticky top-8 space-y-6">
            <div className="relative aspect-square lg:aspect-video bg-muted rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Beaker className="h-24 w-24 text-muted-foreground/50" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {product.industries.map((industry, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="rounded-md py-1 px-2"
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <h1 className="text-3xl font-bold leading-tight">
                {product.name}
              </h1>
              {hasHazards && (
                <div className="mt-1.5 flex-shrink-0">
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 border-amber-200 rounded-md py-1 px-2"
                  >
                    <AlertTriangle className="h-4 w-4 mr-1.5" />
                    Hazardous Material
                  </Badge>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-5 rounded-lg bg-neutral-700">
              <div className="space-y-1.5">
                <p className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
                  CAS Number
                </p>
                <p className="font-mono text-sm">{product.cas_number}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
                  Molecular Formula
                </p>
                <p className="font-mono text-sm">{product.molecular_formula}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
                  HSN Code
                </p>
                <p className="font-mono text-sm">{product.hsn_no || "—"}</p>
              </div>
            </div>
            {/* 
        <div>
          {product.iupac_name && (
            <p className="text-neutral-300 mt-1">
              IUPAC Name: {product.iupac_name}
            </p>
          )}
        </div> */}

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Description</h2>
              <ReadMore content={product.description} />
            </div>
            {product.certificates && product.certificates.length > 0 && (
              <div className="space-y-3 bg-neutral-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium">
                  Certificates & Documentation
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.certificates.map((cert, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-md bg-transparent text-neutral-50 border-neutral-50"
                      asChild
                    >
                      <Link
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-3.5 w-3.5 mr-1.5" />
                        {cert.name}
                        <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex pt-2 space-x-2">
              <ContactForm
                product={product}
                buttonClassName="bg-white text-neutral-900"
              />
              <RequestQuoteForm
                product={product}
                buttonClassName="border border-neutral-50 text-neutral-50 bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      <ProductProperties product={product} />
      <Separator className="my-12" />

      <ProductRecommendations currentProductId={product.id} />

      <Separator className="my-12" />

      {product.faq && product.faq.length > 0 && (
        <div className="space-y-4 pt-4 flex justify-between">
          <div className="w-full flex items-center justify-center">
            <h2 className="max-w-2xl text-4xl font-black">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQ faqs={product.faq} />
        </div>
      )}

      <CTABanner />
    </main>
  );
}
