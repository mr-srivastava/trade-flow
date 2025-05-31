"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { Suspense, useState } from "react";
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
import { ProductFilters } from "../ProductFilters/ProductFilters";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

function ListingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const pathname = usePathname();

  // Get current page from URL or default to 1
  const currentPage = Number(searchParams.get("page") || 1);
  const searchQuery = searchParams.get("q") || "";
  const industry = searchParams.get("industry") || "";

  // Filter products based on search and industry
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

    return matchesSearch && matchesIndustry;
  });

  // Pagination
  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
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
  };

  // Handle pagination
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container px-8 py-8 mx-auto bg-neutral-900">
      <div className="flex flex-col gap-6">
        <Header
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          isFiltersOpen={isFiltersOpen}
          setIsFiltersOpen={setIsFiltersOpen}
        />
        <ProductGrid
          isFiltersOpen={isFiltersOpen}
          paginatedProducts={paginatedProducts}
          filteredProducts={filteredProducts}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
        <div className="text-xs text-neutral-400 text-center">
          Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
          products
        </div>
      </div>
    </div>
  );
}

function ListingContentSkeleton() {
  return (
    <div className="container px-8 py-8 mx-auto bg-neutral-900">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full max-w-sm">
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 h-fit">
            <div className="p-6 bg-gray-200 rounded"></div>
          </div>
          <div className="grid gap-6 md:col-span-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="h-10 bg-gray-200 rounded w-10"></div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 rounded w-10"></div>
            ))}
          </div>
          <div className="h-10 bg-gray-200 rounded w-10"></div>
        </div>
        <div className="text-sm text-muted-foreground text-center">
          <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

function Header({
  handleSearch,
  searchQuery,
  isFiltersOpen,
  setIsFiltersOpen,
}: {
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  searchQuery: string;
  isFiltersOpen: boolean;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold tracking-tight text-neutral-50">
        Products Catalog
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

        <Button
          className="bg-transparent border border-neutral-500 text-neutral-50 hover:bg-transparent hover:border-white hover:text-white"
          variant="outline"
          size="sm"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Toggle Filters
        </Button>
      </div>
    </div>
  );
}

function ProductGrid({
  isFiltersOpen,
  paginatedProducts,
  // filteredProducts,
}: {
  isFiltersOpen: boolean;
  paginatedProducts: Product[];
  filteredProducts: Product[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {isFiltersOpen && (
        <Card className="md:col-span-1 h-fit bg-white">
          <CardContent className="p-6">
            <ProductFilters />
          </CardContent>
        </Card>
      )}

      <div
        className={`grid gap-6 ${
          isFiltersOpen ? "md:col-span-3" : "md:col-span-4"
        } grid-cols-1 sm:grid-cols-2 lg:grid-cols-${isFiltersOpen ? "3" : "4"}`}
      >
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product: Product) => (
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
  );
}

function Pagination({
  currentPage,
  totalPages,
  goToPage,
}: {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}) {
  return (
    totalPages > 1 && (
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
                  variant={"outline"}
                  className={cn(
                    "border border-white bg-transparent text-white",
                    currentPage === pageToShow && "bg-white text-neutral-900"
                  )}
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
    )
  );
}

export default function Listing() {
  return (
    <Suspense fallback={<ListingContentSkeleton />}>
      <ListingContent />
    </Suspense>
  );
}
