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
      {faqs.map((faq, index) => (
        <FAQItem key={`faq-${index}`} faq={faq} index={index} />
      ))}
    </Accordion>
  );
}

function FAQItem({ faq, index }: { faq: Product['faq'][number]; index: number }) {
  return (
    <AccordionItem
      value={`faq-${index}`}
      className="border-b border-muted/70 py-2"
    >
      <AccordionTrigger className="text-base font-medium transition-colors py-2">
        {faq.question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground pt-2 pb-4 leading-relaxed">
        <p className="whitespace-pre-line">{faq.answer}</p>
      </AccordionContent>
    </AccordionItem>
  );
}
