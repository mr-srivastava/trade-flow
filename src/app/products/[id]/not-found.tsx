import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header/Header";

export default function ProductNotFound() {
  return (
    <>
      <Header isFixed={false} />
      <main className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed from our catalog.
        </p>
        <Button asChild>
          <Link href="/products">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </main>
    </>
  );
}
