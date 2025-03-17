import Header from "@/components/Header/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { extendedProducts } from "@/lib/data";
import { AlertTriangle, Beaker, ChevronLeft, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { PropertyList } from "@/components/PropertyList/PropertyList";
import { Separator } from "@/components/ui/separator";
import { ProductRecommendations } from "@/components/ProductRecommendation/ProductRecommendation";
import { CTABanner } from "@/components/CTABanner/CTABanner";

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
    <>
      <Header isFixed={false} />
      <main className="container px-4 py-8 mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium mb-6 hover:underline"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to products
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                {product.product_images && product.product_images.length > 0 ? (
                  <Image
                    src={product.product_images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Beaker className="h-24 w-24 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {product.industries.map((industry, i) => (
                    <Badge key={i} variant="outline">
                      {industry}
                    </Badge>
                  ))}
                  {product.categories.map((category, i) => (
                    <Badge key={i} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                  {product.is_exclusive && (
                    <Badge className="bg-primary">Exclusive</Badge>
                  )}
                </div>

                {product.certificates && product.certificates.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Certificates</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.certificates.map((cert, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="h-8"
                          asChild
                        >
                          <Link
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1.5" />
                            {cert.name}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  {/* <ContactForm product={product} /> */}
                  {/* <RequestQuoteForm product={product} /> */}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  {product.iupac_name && (
                    <p className="text-muted-foreground">
                      {product.iupac_name}
                    </p>
                  )}
                </div>
                {hasHazards && (
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">CAS Number</p>
                  <p className="font-medium">{product.cas_number}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Molecular Formula</p>
                  <p className="font-medium">{product.molecular_formula}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">EINECS</p>
                  <p className="font-medium">{product.einecs_number || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">HSN Code</p>
                  <p className="font-medium">{product.hsn_no || "—"}</p>
                </div>
              </div>

              <div>
                <h2 className="font-medium mb-2">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              <Tabs defaultValue="properties" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="properties">Properties</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="safety">Safety & Hazards</TabsTrigger>
                  <TabsTrigger value="storage">Storage</TabsTrigger>
                </TabsList>

                <TabsContent value="properties" className="space-y-4">
                  <PropertyList properties={product.properties} />
                </TabsContent>

                <TabsContent value="applications" className="space-y-4">
                  <PropertyList properties={product.applications} />
                </TabsContent>

                <TabsContent value="safety" className="space-y-4">
                  <PropertyList properties={product.safety_and_hazard} />
                </TabsContent>

                <TabsContent value="storage" className="space-y-4">
                  <PropertyList properties={product.storage} />
                </TabsContent>
              </Tabs>

              {product.faq && product.faq.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">
                    Frequently Asked Questions
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {product.faq.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger>{faq.key}</AccordionTrigger>
                        <AccordionContent>
                          <p className="whitespace-pre-line">{faq.value}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          </div>
        </div>

        <CTABanner />

        <Separator className="my-12" />

        <ProductRecommendations currentProductId={product.id} />
      </main>
    </>
  );
}
