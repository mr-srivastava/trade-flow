import { Quote, Star } from 'lucide-react';
import React from 'react';

const TESTIMONIALS = [
  {
    content:
      'ExportBridge has been instrumental in expanding our market reach. Their expertise in international trade and commitment to quality service is unmatched.',
    author: {
      name: 'Sarah Johnson',
      about: 'Procurement Director, US Trade Co.',
    },
  },
  {
    content:
      'Their deep understanding of international markets and regulatory requirements has made our export operations seamless and efficient.',
    author: {
      name: 'Raj Patel',
      about: 'CEO, Indian Exports Ltd.',
    },
  },
  {
    content:
      'Working with ExportBridge has opened new opportunities for our business. Their professional approach and global network are truly valuable.',
    author: {
      name: 'Hans Muller',
      about: 'Operations Manager, German Tech GmbH',
    },
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-50 mb-4">
            Client Testimonials
          </h2>
          <div className="w-24 h-1 bg-brand mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            What our global partners say about working with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.author.name}
              className="bg-white p-8 rounded-xl shadow-sm relative"
            >
              <div className="absolute top-0 right-0 -mt-3 -mr-3 w-12 h-12 bg-brand rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>
              <blockquote className="text-gray-600 mb-6">
                &quot;{testimonial.content}&quot;
              </blockquote>
              <div className="flex items-center">
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.author.about}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-brand">
            <span className="font-medium">
              Trusted by 500+ companies worldwide
            </span>
            <div className="flex space-x-1">
              <Star strokeWidth={1.5} className="w-5 h-5 text-yellow-400" />
              <Star strokeWidth={1.5} className="w-5 h-5 text-yellow-400" />
              <Star strokeWidth={1.5} className="w-5 h-5 text-yellow-400" />
              <Star strokeWidth={1.5} className="w-5 h-5 text-yellow-400" />
              <Star strokeWidth={1.5} className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
