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
import {
  AlertTriangle,
  Beaker,
  ChevronLeft,
  ExternalLink,
  FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { PropertyList } from "@/components/PropertyList/PropertyList";
import { Separator } from "@/components/ui/separator";
import { ProductRecommendations } from "@/components/ProductRecommendation/ProductRecommendation";
import { CTABanner } from "@/components/CTABanner/CTABanner";
import { RequestQuoteForm } from "@/components/RequestQuoteForm/RequestQuoteForm";
import { ContactForm } from "@/components/ContactForm/ContactForm";

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
          href="/products"
          className="inline-flex items-center text-sm font-medium mb-8 hover:text-primary transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to products
        </Link>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="relative aspect-square bg-muted/30 rounded-xl overflow-hidden mb-4 shadow-sm">
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
                    <Beaker className="h-24 w-24 text-muted-foreground/50" />
                  </div>
                )}
              </div>

              <div className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  {product.industries.map((industry, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="rounded-md py-1 px-2"
                    >
                      {industry}
                    </Badge>
                  ))}
                  {product.categories.map((category, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="rounded-md py-1 px-2"
                    >
                      {category}
                    </Badge>
                  ))}
                  {product.is_exclusive && (
                    <Badge className="bg-primary rounded-md py-1 px-2">
                      Exclusive
                    </Badge>
                  )}
                </div>

                {product.certificates && product.certificates.length > 0 && (
                  <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium">
                      Certificates & Documentation
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.certificates.map((cert, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="h-8 rounded-md"
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
              <div>
                {product.iupac_name && (
                  <p className="text-muted-foreground mt-1">
                    {product.iupac_name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-muted/20 p-5 rounded-lg">
                <div className="space-y-1.5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    CAS Number
                  </p>
                  <p className="font-mono text-sm bg-background/80 px-2 py-1 rounded border border-border/50 inline-block">
                    {product.cas_number}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Molecular Formula
                  </p>
                  <p className="font-mono text-sm">
                    {product.molecular_formula}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    EINECS
                  </p>
                  <p className="font-mono text-sm">
                    {product.einecs_number || "—"}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    HSN Code
                  </p>
                  <p className="font-mono text-sm">{product.hsn_no || "—"}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className="flex pt-2 space-x-2">
                <ContactForm product={product} />
                <RequestQuoteForm product={product} />
              </div>
            </div>
          </div>
        </div>
        <div className="py-2 space-y-2 bg-primary/5 rounded-xl p-8 md:p-10 mt-16 border border-primary/10">
          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 bg-muted/30 p-1 rounded-lg h-auto">
              <TabsTrigger
                value="properties"
                className="py-2.5 rounded-md data-[state=active]:bg-background"
              >
                Properties
              </TabsTrigger>
              <TabsTrigger
                value="applications"
                className="py-2.5 rounded-md data-[state=active]:bg-background"
              >
                Applications
              </TabsTrigger>
              <TabsTrigger
                value="safety"
                className="py-2.5 rounded-md data-[state=active]:bg-background"
              >
                Safety & Hazards
              </TabsTrigger>
              <TabsTrigger
                value="storage"
                className="py-2.5 rounded-md data-[state=active]:bg-background"
              >
                Storage
              </TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="space-y-4 mt-2">
              <PropertyList properties={product.properties} />
            </TabsContent>

            <TabsContent value="applications" className="space-y-4 mt-2">
              <PropertyList properties={product.applications} />
            </TabsContent>

            <TabsContent value="safety" className="space-y-4 mt-2">
              <PropertyList properties={product.safety_and_hazard} />
            </TabsContent>

            <TabsContent value="storage" className="space-y-4 mt-2">
              <PropertyList properties={product.storage} />
            </TabsContent>
          </Tabs>
        </div>

        {product.faq && product.faq.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-semibold">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {product.faq.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-b border-muted/70 py-2"
                >
                  <AccordionTrigger className="text-base font-medium hover:text-primary transition-colors py-2">
                    {faq.key}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2 pb-4 leading-relaxed">
                    <p className="whitespace-pre-line">{faq.value}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        <CTABanner />

        <Separator className="my-12" />

        <ProductRecommendations currentProductId={product.id} />
      </main>
    </>
  );
}
