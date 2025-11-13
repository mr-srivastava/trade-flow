import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

import { Product } from '@/lib/types';
import { renderIcon } from '@/lib/utils';

const TabContent = ({ data }: { data: { key: string; value: string }[] }) => (
  <Card className='border border-border/40 bg-syntara-darker/40'>
    <CardContent className='p-6'>
      <div className='divide-y divide-border/30'>
        {data.map((item, index) => (
          <div key={index} className='flex py-4 px-6'>
            <div className='w-1/2 text-syntara-light/80'>{item.key}</div>
            <div className='w-1/2 text-white'>{item.value}</div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function PropertyList({ product }: { product: Product }) {
  const tabs = [
    {
      value: 'properties',
      label: 'PROPERTIES',
      icon: 'Info',
      data: product.properties,
    },
    {
      value: 'applications',
      label: 'APPLICATIONS',
      icon: 'Beaker',
      data: product.applications,
    },
    {
      value: 'safety',
      label: 'SAFETY AND HAZARD',
      icon: 'AlertTriangle',
      data: product.safety_and_hazard,
    },
  ];

  return (
    <Tabs defaultValue='properties' className='w-full'>
      <TabsList className='w-full bg-syntara-darker border border-border/50 rounded-lg p-1 mb-6'>
        {tabs.map(({ value, label, icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            className='flex items-center gap-2 flex-1'
          >
            {renderIcon(icon, 'h-4 w-4')} {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map(({ value, data }) => (
        <TabsContent key={value} value={value}>
          <TabContent data={data} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
