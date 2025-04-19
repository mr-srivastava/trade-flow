import React from 'react';
import { renderIcon } from '@/lib/icon-util';
import ContactForm from '../ContactForm/v2/ContactForm';

const contactDetails = [
  {
    icon: 'Mail',
    title: 'Email',
    content: 'contact@syntara.com',
  },
  {
    icon: 'Phone',
    title: 'Phone',
    content: '+91 (123) 456-7890',
  },
  {
    icon: 'MapPin',
    title: 'Headquarters',
    content: 'Mumbai, India',
    subContent: 'With offices in USA, Germany, and Singapore',
  },
];

const ContactSection: React.FC = () => {
  return (
    <section id='contact' className='py-4 bg-gradient-to-b from-syntara-darker to-syntara-dark'>
      <div className='section-container'>
        <div className='text-center mb-12'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-white'>Contact Us</h2>
          <p className='text-syntara-light/80 max-w-2xl mx-auto'>
            Our team is ready to assist you with any inquiries about our products and services
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
          <div className='lg:col-span-2 space-y-6'>
            <div className='glass-card p-6'>
              <h3 className='text-xl font-medium mb-6 text-white'>Get in Touch</h3>

              <div className='space-y-4'>
                {contactDetails.map((detail, index) => (
                  <div key={index} className='flex items-start gap-4'>
                    <div className='bg-syntara-primary/10 p-2 rounded-full'>
                      {renderIcon(detail.icon, 'h-5 w-5 text-syntara-primary')}
                    </div>
                    <div>
                      <h4 className='text-sm font-medium text-syntara-light'>{detail.title}</h4>
                      <p className='text-white'>{detail.content}</p>
                      {detail.subContent && (
                        <p className='text-syntara-light/80 text-sm'>{detail.subContent}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
