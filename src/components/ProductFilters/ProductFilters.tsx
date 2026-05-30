"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  getAllIndustries,
  getAllCategories,
  getAllSubCategories,
} from "@/lib/data";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentIndustry = searchParams.get("industry") || "";
  const currentCategory = searchParams.get("category") || "";

  const industries = getAllIndustries();
  const categories = getAllCategories();
  const subCategories = getAllSubCategories();

  const handleIndustryChange = (industryName: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (industryName === currentIndustry) {
      params.delete("industry");
    } else {
      params.set("industry", industryName);
    }

    // Reset to page 1 when changing filters
    params.set("page", "1");

    // router.push(`/?${params.toString()}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryName === currentCategory) {
      params.delete("category");
    } else {
      params.set("category", categoryName);
    }

    // Reset to page 1 when changing filters
    params.set("page", "1");

    // router.push(`/?${params.toString()}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("industry");
    params.delete("category");
    params.set("page", "1");

    // router.push(`/?${params.toString()}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-auto p-0 text-sm text-muted-foreground"
        >
          Clear all
        </Button>
      </div>

      <Separator />

      <Accordion type="multiple" defaultValue={["industries", "categories"]}>
        <AccordionItem value="industries">
          <AccordionTrigger>Industries</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center space-x-2">
                  <Checkbox
                    id={`industry-${industry}`}
                    checked={currentIndustry === industry}
                    onCheckedChange={() => handleIndustryChange(industry)}
                  />
                  <Label
                    htmlFor={`industry-${industry}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {industry}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={currentCategory === category}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {subCategories.length > 0 && (
          <AccordionItem value="subcategories">
            <AccordionTrigger>Sub-Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {subCategories.map((subCategory) => (
                  <div
                    key={subCategory}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox id={`subcategory-${subCategory}`} />
                    <Label
                      htmlFor={`subcategory-${subCategory}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {subCategory}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="properties">
          <AccordionTrigger>Properties</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="property-hazardous" />
                <Label
                  htmlFor="property-hazardous"
                  className="text-sm font-normal cursor-pointer"
                >
                  Hazardous Materials
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="property-exclusive" />
                <Label
                  htmlFor="property-exclusive"
                  className="text-sm font-normal cursor-pointer"
                >
                  Exclusive Products
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="property-certificates" />
                <Label
                  htmlFor="property-certificates"
                  className="text-sm font-normal cursor-pointer"
                >
                  With Certificates
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
