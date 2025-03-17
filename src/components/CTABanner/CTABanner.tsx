import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function CTABanner() {
  return (
    <div className="bg-primary/5 rounded-lg p-6 md:p-8 mt-12">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-bold">Need Help Finding the Right Chemical?</h2>
        <p className="text-muted-foreground">
          Our team of experts can help you source the exact chemical products you need for your application. Get
          personalized assistance and technical support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Button asChild>
            <Link href="/contact">
              Contact Our Experts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Browse Full Catalog</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

