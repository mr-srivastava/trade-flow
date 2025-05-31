import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Product } from '@/lib/types';

export default function FAQ({ faqs }: { faqs: Product['faq'] }) {
  return (
    <Accordion type="single" collapsible className="w-full px-10">
      {faqs.map((faq) => (
        <FAQItem key={faq.key} faq={faq} />
      ))}
    </Accordion>
  );
}

function FAQItem({ faq }: { faq: Product['faq'][number] }) {
  return (
    <AccordionItem
      value={`faq-${faq.key}`}
      className="border-b border-muted/70 py-2"
    >
      <AccordionTrigger className="text-base font-medium transition-colors py-2">
        {faq.key}
      </AccordionTrigger>
      <AccordionContent className="text-neutral-300 pt-2 pb-4 leading-relaxed">
        <p className="whitespace-pre-line">{faq.value}</p>
      </AccordionContent>
    </AccordionItem>
  );
}
