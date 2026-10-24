import React from 'react';
import { renderIcon } from '@/lib/icon-util';
import ContactForm from '../ContactForm/ContactForm';
import { Reveal } from '@/components/ui/Reveal';

const contactDetails = [
  {
    icon: 'Mail',
    title: 'Email',
    content: 'mmg.exim30@gmail.com',
  },
  {
    icon: 'Phone',
    title: 'Phone',
    content: '+91 9804835919',
  },
  {
    icon: 'MapPin',
    title: 'Headquarters',
    content: 'Kolkata, India',
    subContent: '1st floor, 121, Chittaranjan Avenue, Kolkata-700073',
  },
];

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-4 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="eyebrow">Get in touch</span>
          <h2 className="mt-3 mb-4 text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink">
            Contact Us
          </h2>
          <p className="text-slate max-w-2xl mx-auto leading-relaxed">
            Our team is ready to assist you with any inquiries about our products and services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-2 space-y-6">
            <div className="surface-card p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-ink">Get in Touch</h3>

              <div className="space-y-4">
                {contactDetails.map((detail, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-brand-50 text-brand p-2 rounded-lg">
                      {renderIcon(detail.icon, 'h-5 w-5')}
                    </div>
                    <div>
                      <span className="eyebrow">{detail.title}</span>
                      <p className="mt-1 text-ink">{detail.content}</p>
                      {detail.subContent && (
                        <p className="text-sm text-slate">{detail.subContent}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
