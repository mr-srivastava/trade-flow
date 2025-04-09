import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

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
                <div className='flex items-start gap-4'>
                  <div className='bg-syntara-primary/10 p-2 rounded-full'>
                    <Mail className='h-5 w-5 text-syntara-primary' />
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-syntara-light'>Email</h4>
                    <p className='text-white'>contact@syntara.com</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='bg-syntara-primary/10 p-2 rounded-full'>
                    <Phone className='h-5 w-5 text-syntara-primary' />
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-syntara-light'>Phone</h4>
                    <p className='text-white'>+91 (123) 456-7890</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='bg-syntara-primary/10 p-2 rounded-full'>
                    <MapPin className='h-5 w-5 text-syntara-primary' />
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-syntara-light'>Headquarters</h4>
                    <p className='text-white'>Mumbai, India</p>
                    <p className='text-syntara-light/80 text-sm'>
                      With offices in USA, Germany, and Singapore
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='lg:col-span-3'>
            <div className='glass-card p-6'>
              <h3 className='text-xl font-medium mb-6 text-white'>Send us a Message</h3>

              <form>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-syntara-light mb-2'
                    >
                      Your Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      className='w-full bg-syntara-darker border border-border rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-syntara-primary focus:border-syntara-primary'
                      placeholder='John Doe'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-syntara-light mb-2'
                    >
                      Email Address
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='w-full bg-syntara-darker border border-border rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-syntara-primary focus:border-syntara-primary'
                      placeholder='johndoe@example.com'
                    />
                  </div>
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='subject'
                    className='block text-sm font-medium text-syntara-light mb-2'
                  >
                    Subject
                  </label>
                  <input
                    type='text'
                    id='subject'
                    className='w-full bg-syntara-darker border border-border rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-syntara-primary focus:border-syntara-primary'
                    placeholder='How can we help you?'
                  />
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-syntara-light mb-2'
                  >
                    Message
                  </label>
                  <textarea
                    id='message'
                    rows={4}
                    className='w-full bg-syntara-darker border border-border rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-syntara-primary focus:border-syntara-primary'
                    placeholder='Your message...'
                  ></textarea>
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
