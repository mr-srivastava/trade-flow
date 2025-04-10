import React from 'react';
import { AlertTriangle, Crown, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

export interface Product {
  id: string;
  name: string;
  image: string;
  cas: string;
  formula: string;
  category: string;
  description: string;
  exclusive: boolean;
  hasWarning: boolean;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Polysorbate 80',
    image: '/lovable-uploads/791d3981-5e36-46ec-890f-614b5c34ec72.png',
    cas: '9005-65-6',
    formula: '(C64H124O26)n-multiple grades',
    category: 'Pharmaceutical Actives & Precursors',
    description:
      'Polysorbate 80 is a nonionic surfactant and emulsifier widely used in pharmaceuticals, food production, and cosmetics. It stabilizes emulsions, enhances solubility of active ingredients, and reduces surface tension.',
    exclusive: false,
    hasWarning: true,
  },
  {
    id: '2',
    name: 'Phosphorus Oxychloride (POCl₃)',
    image: '/lovable-uploads/901bb4df-ad61-435b-844f-db4e7135d459.png',
    cas: '10025-87-3',
    formula: 'Cl3OP',
    category: 'Inorganic Chemicals',
    description:
      'Phosphorus Oxychloride is a colorless to pale yellow liquid with a pungent odor. It is used as a chlorinating agent, catalyst, and in the production of phosphate esters and flame retardants.',
    exclusive: true,
    hasWarning: true,
  },
  {
    id: '3',
    name: 'Phosphorus Pentachloride',
    image: '/lovable-uploads/da22e4d7-07e2-462d-831d-35fbfddcc0fd.png',
    cas: '10026-13-8',
    formula: 'Cl5P',
    category: 'Inorganic Chemicals',
    description:
      'Phosphorus Pentachloride is a yellowish-white crystalline solid with a sharp odor. It is used as a chlorinating agent in organic synthesis, pharmaceutical manufacture, and as a catalyst.',
    exclusive: false,
    hasWarning: true,
  },
  {
    id: '4',
    name: 'EVAFLEX - EV40LW',
    image: '',
    cas: '24937-78-8',
    formula: '(C2H4)n(C4H6O2)m',
    category: 'Thermoplastic Polymers',
    description:
      'Ethylene-Vinyl Acetate (EVA) is a flexible, transparent copolymer used in packaging films, solar cell encapsulation, hot melt adhesives, and medical devices.',
    exclusive: false,
    hasWarning: false,
  },
  {
    id: '5',
    name: 'Topramezone',
    image: '/lovable-uploads/54b8dcb4-19bb-4800-9717-fe7f3ce793b9.png',
    cas: '210631-68-8',
    formula: 'C16H17N3O5S',
    category: 'Crop Protection & Pest Control',
    description:
      'Topramezone is a selective post-emergence herbicide used to control broadleaf and grass weeds in corn and other crops. It inhibits HPPD enzymes in susceptible plants.',
    exclusive: true,
    hasWarning: true,
  },
  {
    id: '6',
    name: 'THIOANISOLE',
    image: '/lovable-uploads/7eb06e7a-8dba-4b31-a2d0-83cbad2a92cf.png',
    cas: '100-68-5',
    formula: 'C7H8S',
    category: 'Pharmaceutical Actives & Precursors',
    description:
      'Thioanisole is a colorless to light yellow liquid with an unpleasant odor. It is used as a building block in pharmaceutical synthesis and as a flavoring agent.',
    exclusive: true,
    hasWarning: true,
  },
  {
    id: '7',
    name: 'Pyraclostrobin Technical',
    image: '',
    cas: '175013-18-0',
    formula: 'C19H18ClN3O4',
    category: 'Crop Protection & Pest Control',
    description:
      'Pyraclostrobin is a broad-spectrum fungicide that inhibits mitochondrial respiration. It is used to control various fungal diseases in crops like cereals, fruits, and vegetables.',
    exclusive: true,
    hasWarning: true,
  },
  {
    id: '8',
    name: 'CYCLOHEXANE',
    image: '',
    cas: '110-82-7',
    formula: 'C6H12',
    category: 'Pharmaceutical Actives & Precursors',
    description:
      'Cyclohexane is a colorless, flammable liquid with a mild sweet odor. It is used as a solvent in chemical synthesis, extraction processes, and as a raw material for nylon production.',
    exclusive: true,
    hasWarning: true,
  },
];

const ProductGrid: React.FC = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <Card className='h-full overflow-hidden bg-syntara-darker/80 border border-border/40 hover:border-syntara-primary/50 transition-all duration-300 group'>
            <div className='relative h-40 bg-syntara-darker/70 flex items-center justify-center p-4'>
              {product.exclusive && (
                <Badge
                  variant='secondary'
                  className='absolute top-2 right-2 flex items-center gap-1 bg-syntara-primary/20 text-syntara-primary'
                >
                  <Crown className='h-3 w-3' /> Exclusive
                </Badge>
              )}
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={150}
                  className='max-h-full max-w-full object-contain'
                />
              ) : (
                <div className='text-syntara-light/30 font-medium'>No image available</div>
              )}
            </div>

            <CardContent className='p-4'>
              <h3 className='text-xl font-semibold text-white mb-2 group-hover:text-syntara-primary transition-colors'>
                {product.name}
              </h3>

              <div className='inline-flex items-center px-2.5 py-1 mb-3 rounded-full text-xs font-medium bg-secondary/80 text-syntara-light/90'>
                {product.category}
              </div>

              {product.hasWarning && (
                <div className='flex items-center text-amber-500/90 mb-3'>
                  <AlertTriangle className='h-4 w-4 mr-1' />
                  <span className='text-xs'>Hazardous Material</span>
                </div>
              )}

              <div className='space-y-2 mt-3'>
                <div className='flex'>
                  <span className='text-syntara-light/70 w-24 text-sm'>CAS:</span>
                  <span className='text-syntara-light font-mono text-sm'>{product.cas}</span>
                </div>

                <div className='flex'>
                  <span className='text-syntara-light/70 w-24 text-sm'>Formula:</span>
                  <span className='text-syntara-light font-mono text-sm'>{product.formula}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className='p-4 pt-0 flex justify-between items-center'>
              <p className='text-xs text-syntara-light/70 line-clamp-1'>{product.description}</p>
              <ChevronRight className='h-4 w-4 text-syntara-primary shrink-0 ml-2 group-hover:translate-x-1 transition-transform' />
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
export { products };
