import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const contactDetails = [
  {
    icon: <Mail className='h-5 w-5 text-syntara-primary' />,
    title: 'Email',
    content: 'contact@syntara.com',
  },
  {
    icon: <Phone className='h-5 w-5 text-syntara-primary' />,
    title: 'Phone',
    content: '+91 (123) 456-7890',
  },
  {
    icon: <MapPin className='h-5 w-5 text-syntara-primary' />,
    title: 'Headquarters',
    content: 'Mumbai, India',
    subContent: 'With offices in USA, Germany, and Singapore',
  },
];

const formFields = [
  {
    id: 'name',
    label: 'Your Name',
    type: 'text',
    placeholder: 'John Doe',
    colSpan: 'md:col-span-1',
  },
  {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'johndoe@example.com',
    colSpan: 'md:col-span-1',
  },
  {
    id: 'subject',
    label: 'Subject',
    type: 'text',
    placeholder: 'How can we help you?',
    colSpan: 'col-span-2',
  },
  {
    id: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Your message...',
    rows: 4,
    colSpan: 'col-span-2',
  },
];

const ContactSection: React.FC = () => {
  return (
    <section id='contact' className='py-16'>
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
                    <div className='bg-syntara-primary/10 p-2 rounded-full'>{detail.icon}</div>
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

          <div className='lg:col-span-3'>
            <div className='glass-card p-6'>
              <h3 className='text-xl font-medium mb-6 text-white'>Send us a Message</h3>

              <form>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                  {formFields.map((field, index) => (
                    <div key={index} className={`${field.colSpan ? field.colSpan : 'col-span-1'}`}>
                      <label
                        htmlFor={field.id}
                        className='block text-sm font-medium text-syntara-light mb-2'
                      >
                        {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          id={field.id}
                          rows={field.rows}
                          className='w-full bg-syntara-darker border border-border rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-syntara-primary focus:border-syntara-primary'
                          placeholder={field.placeholder}
                        ></textarea>
                      ) : (
                        <input
                          type={field.type}
                          id={field.id}
                          className='w-full bg-syntara-darker border border-border rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-syntara-primary focus:border-syntara-primary'
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type='button'
                  className='btn-primary flex items-center gap-2 w-full justify-center'
                >
                  Send Message <Send className='h-4 w-4' />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
