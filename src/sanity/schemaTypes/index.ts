import { type SchemaTypeDefinition } from "sanity";
import { landingType } from "./landingType";
import { certificate, product, property } from "./product";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [landingType, product, property, certificate],
};
