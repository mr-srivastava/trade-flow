"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { extendedProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFilters } from "../ProductFilters/ProductFilters";
import ProductCard from "../ProductCard/ProductCard";

export default function Listing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const pathname = usePathname();

  // Get current page from URL or default to 1
  const currentPage = Number(searchParams.get("page") || 1);
  const searchQuery = searchParams.get("q") || "";
  const industry = searchParams.get("industry") || "";
  const category = searchParams.get("category") || "";
  const sortBy = searchParams.get("sort") || "name-asc";

  // Filter products based on search, industry and category
  const filteredProducts = extendedProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.cas_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.molecular_formula
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesIndustry = industry
      ? product.industries.includes(industry)
      : true;
    const matchesCategory = category
      ? product.categories.includes(category)
      : true;

    return matchesSearch && matchesIndustry && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    if (sortBy === "date-desc")
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    if (sortBy === "date-asc")
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    return 0;
  });

  // Pagination
  const productsPerPage = 12;
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Handle search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("search") as string;

    const params = new URLSearchParams(searchParams.toString());
    params.set("q", searchValue);
    params.set("page", "1"); // Reset to first page on new search
    router.push(`${pathname}?${params.toString()}`);
    // router.push(`/?${params.toString()}`);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    // router.push(`/?${params.toString()}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  // Handle pagination
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    // router.push(`?${params.toString()}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Chemical Products Catalog
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <form onSubmit={handleSearch} className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                name="search"
                placeholder="Search by name, CAS, formula..."
                className="pl-8"
                defaultValue={searchQuery}
              />
            </form>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                {isFiltersOpen ? "Hide Filters" : "Show Filters"}
              </Button>
              <Select defaultValue={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {isFiltersOpen && (
            <Card className="md:col-span-1 h-fit">
              <CardContent className="p-6">
                <ProductFilters />
              </CardContent>
            </Card>
          )}

          <div
            className={`grid gap-6 ${
              isFiltersOpen ? "md:col-span-3" : "md:col-span-4"
            } grid-cols-1 sm:grid-cols-2 lg:grid-cols-${
              isFiltersOpen ? "3" : "4"
            }`}
          >
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show first page, last page, current page, and pages around current
                let pageToShow: number | null = null;

                if (totalPages <= 5) {
                  pageToShow = i + 1;
                } else if (i === 0) {
                  pageToShow = 1;
                } else if (i === 4) {
                  pageToShow = totalPages;
                } else if (currentPage <= 2) {
                  pageToShow = i + 1;
                } else if (currentPage >= totalPages - 1) {
                  pageToShow = totalPages - 4 + i;
                } else {
                  pageToShow = currentPage - 1 + i;
                }

                if (pageToShow) {
                  return (
                    <Button
                      key={pageToShow}
                      variant={
                        pageToShow === currentPage ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => goToPage(pageToShow)}
                    >
                      {pageToShow}
                    </Button>
                  );
                }

                return null;
              })}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="text-sm text-muted-foreground text-center">
          Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
          products
        </div>
      </div>
    </div>
  );
}
