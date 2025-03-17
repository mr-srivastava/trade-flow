import type { Property } from "@/lib/types";

interface PropertyListProps {
  properties: Property[];
}

export function PropertyList({ properties }: PropertyListProps) {
  if (!properties || properties.length === 0) {
    return <p className="text-muted-foreground">No information available</p>;
  }

  return (
    <div className="space-y-4">
      {properties.map((property, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="font-medium">{property.key}</div>
          <div className="md:col-span-2 whitespace-pre-line">
            {property.value}
          </div>
        </div>
      ))}
    </div>
  );
}
