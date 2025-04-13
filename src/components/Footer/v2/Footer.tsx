import React from 'react';
import { Globe, Mail, Phone, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className='bg-syntara-darker pt-16 pb-8 border-t border-border/50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
          <div>
            <h3 className='text-xl font-bold text-white mb-6'>Syntara</h3>
            <p className='text-syntara-light/70 mb-6 text-sm'>
              Bridging markets and building partnerships in the global chemical and pharmaceutical
              trade industry.
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='bg-syntara-darker hover:bg-syntara-primary/20 p-2 rounded-full transition-colors duration-200'
              >
                <Linkedin className='h-5 w-5 text-syntara-light hover:text-syntara-primary' />
              </a>
              <a
                href='#'
                className='bg-syntara-darker hover:bg-syntara-primary/20 p-2 rounded-full transition-colors duration-200'
              >
                <Twitter className='h-5 w-5 text-syntara-light hover:text-syntara-primary' />
              </a>
              <a
                href='#'
                className='bg-syntara-darker hover:bg-syntara-primary/20 p-2 rounded-full transition-colors duration-200'
              >
                <Facebook className='h-5 w-5 text-syntara-light hover:text-syntara-primary' />
              </a>
            </div>
          </div>

          <div>
            <h4 className='text-lg font-medium text-white mb-4'>Quick Links</h4>
            <ul className='space-y-3'>
              <li>
                <a
                  href='#'
                  className='text-syntara-light/70 hover:text-syntara-primary transition-colors duration-200'
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href='#about'
                  className='text-syntara-light/70 hover:text-syntara-primary transition-colors duration-200'
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href='#products'
                  className='text-syntara-light/70 hover:text-syntara-primary transition-colors duration-200'
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href='#capabilities'
                  className='text-syntara-light/70 hover:text-syntara-primary transition-colors duration-200'
                >
                  Capabilities
                </a>
              </li>
              <li>
                <a
                  href='#contact'
                  className='text-syntara-light/70 hover:text-syntara-primary transition-colors duration-200'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-lg font-medium text-white mb-4'>Products</h4>
            <ul className='space-y-3'>
              <li>
                <a
                  href='#'
                  className='text-syntara-light/70 hover:text-syntara-primary transition-colors duration-200'
                >
                  Pharmaceutical Intermediates
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-syntara-light/70 hover:text-syntara-primary transition-colors duration-200'
                >
                  API & Bulk Drugs
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-syntara-light/70 hover:text-syntara-primary transition-colors duration-200'
                >
                  Fine Chemicals
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-syntara-light/70 hover:text-syntara-primary transition-colors duration-200'
                >
                  Specialty Chemicals
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-lg font-medium text-white mb-4'>Contact</h4>
            <ul className='space-y-3'>
              <li className='flex items-center gap-3'>
                <Globe className='h-5 w-5 text-syntara-primary' />
                <span className='text-syntara-light/70'>Mumbai, India</span>
              </li>
              <li className='flex items-center gap-3'>
                <Mail className='h-5 w-5 text-syntara-primary' />
                <a
                  href='mailto:contact@syntara.com'
                  className='text-syntara-light/70 hover:text-syntara-primary transition-colors duration-200'
                >
                  contact@syntara.com
                </a>
              </li>
              <li className='flex items-center gap-3'>
                <Phone className='h-5 w-5 text-syntara-primary' />
                <a
                  href='tel:+911234567890'
                  className='text-syntara-light/70 hover:text-syntara-primary transition-colors duration-200'
                >
                  +91 (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-border/30 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-syntara-light/60 text-sm'>
              © {new Date().getFullYear()} Syntara. All rights reserved.
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <a
                href='#'
                className='text-sm text-syntara-light/60 hover:text-syntara-primary transition-colors duration-200'
              >
                Privacy Policy
              </a>
              <a
                href='#'
                className='text-sm text-syntara-light/60 hover:text-syntara-primary transition-colors duration-200'
              >
                Terms of Service
              </a>
              <a
                href='#'
                className='text-sm text-syntara-light/60 hover:text-syntara-primary transition-colors duration-200'
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
