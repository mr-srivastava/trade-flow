import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/lib/types";
import { PropertyList } from "../PropertyList/PropertyList";

export default function ProductProperties({ product }: { product: Product }) {
  const { properties, applications, safety_and_hazard } = product;
  const data = { properties, applications, safety_and_hazard };

  return (
    <div className="py-2 space-y-2 bg-neutral-700 rounded-xl p-8 md:p-10 mt-16 border border-primary/10">
      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6 bg-muted/30 p-1 rounded-lg h-auto">
          {Object.keys(data).map((key) => (
            <TabsTrigger
              value={key}
              key={key}
              className="py-2.5 rounded-md data-[state=active]:bg-background text-neutral-50"
            >
              {key.replace(/_/g, " ").toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(data).map(([key, value]) => (
          <TabsContent value={key} key={key} className="space-y-4 mt-2">
            <PropertyList properties={value} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
