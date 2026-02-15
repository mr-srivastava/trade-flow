import React from 'react';
import Link from 'next/link';
import { renderIcon } from '@/lib/utils/icons';

interface FooterData {
  logo: string;
  description: string;
  quickLinks: Record<'name' | 'href', string>[];
  products: Record<'name' | 'href', string>[];
  socials: Record<'name' | 'href' | 'icon', string>[];
  contact: (Record<'key' | 'icon' | 'content', string> &
    Partial<Record<'href', string>>)[];
}

const footerData: FooterData = {
  logo: 'Syntara',
  description:
    'Bridging markets and building partnerships in the global chemical and pharmaceutical trade industry.',
  quickLinks: [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Contact', href: '/contact' },
  ],
  products: [
    { name: 'Pharmaceutical Intermediates', href: '#' },
    { name: 'API & Bulk Drugs', href: '#' },
    { name: 'Fine Chemicals', href: '#' },
    { name: 'Specialty Chemicals', href: '#' },
  ],
  socials: [
    { name: 'Linkedin', href: '#linkedin', icon: 'Linkedin' },
    { name: 'Twitter', href: '#twitter', icon: 'Twitter' },
    { name: 'Facebook', href: '#facebook', icon: 'Facebook' },
  ],
  contact: [
    { key: 'location', icon: 'Globe', content: 'Mumbai, India' },
    { key: 'mail', icon: 'Mail', content: 'contact@syntara.com', href: '#' },
    { key: 'phone', icon: 'Phone', content: '+91 (123) 456-7890', href: '#' },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer className='bg-card dark:bg-syntara-darker pt-16 pb-8 border-t border-border/50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
          <div>
            <h3 className='text-xl font-bold text-foreground mb-6'>
              {footerData.logo}
            </h3>
            <p className='text-syntara-light/70 mb-6 text-sm'>
              {footerData.description}
            </p>
            <div className='flex space-x-4'>
              {footerData.socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-muted dark:bg-syntara-darker hover:bg-syntara-primary/20 p-2 rounded-full transition-colors duration-200'
                >
                  {renderIcon(
                    social.icon,
                    'h-5 w-5 text-syntara-light hover:text-syntara-primary'
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className='text-lg font-medium text-foreground mb-4'>Quick Links</h4>
            <ul className='space-y-3'>
              {footerData.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-syntara-light/70 hover:text-syntara-primary transition-colors duration-200'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='text-lg font-medium text-foreground mb-4'>Products</h4>
            <ul className='space-y-3'>
              {footerData.products.map((product) => (
                <li key={product.name}>
                  <Link
                    href={product.href}
                    className='text-syntara-light/70 hover:text-syntara-primary transition-colors duration-200'
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='text-lg font-medium text-foreground mb-4'>Contact</h4>
            <ul className='space-y-3'>
              {footerData.contact.map(({ key, icon, content, href }) => (
                <li key={key} className='flex items-center gap-3'>
                  {renderIcon(icon, 'h-5 w-5 text-syntara-primary')}
                  {href ? (
                    <Link
                      href={href}
                      className='text-syntara-light/70 hover:text-syntara-primary transition-colors duration-200'
                    >
                      {content}
                    </Link>
                  ) : (
                    <span className='text-syntara-light/70'>{content}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='border-t border-border/30 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-syntara-light/60 text-sm'>
              © {new Date().getFullYear()} Syntara. All rights reserved.
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <Link
                href='#'
                className='text-sm text-syntara-light/60 hover:text-syntara-primary transition-colors duration-200'
              >
                Privacy Policy
              </Link>
              <Link
                href='#'
                className='text-sm text-syntara-light/60 hover:text-syntara-primary transition-colors duration-200'
              >
                Terms of Service
              </Link>
              <Link
                href='#'
                className='text-sm text-syntara-light/60 hover:text-syntara-primary transition-colors duration-200'
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
