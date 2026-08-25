import React from 'react';
import Link from 'next/link';
import { renderIcon } from '@/lib/icon-util';
import Logo from '@/components/Logo/Logo';

interface FooterData {
  description: string;
  quickLinks: Record<'name' | 'href', string>[];
  products: Record<'name' | 'href', string>[];
  socials: Record<'name' | 'href' | 'icon', string>[];
  contact: (Record<'key' | 'icon' | 'content', string> & Partial<Record<'href', string>>)[];
}

const footerData: FooterData = {
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
    { key: 'location', icon: 'Globe', content: 'Kolkata, India' },
    { key: 'mail', icon: 'Mail', content: 'mmg.exim30@gmail.com', href: 'mailto:mmg.exim30@gmail.com' },
    { key: 'phone', icon: 'Phone', content: '+91 9804835919', href: 'tel:+91 9804835919' },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer className='bg-mist border-t border-line pt-16 pb-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
          <div>
            <div className='mb-6 -ml-2'>
              <Logo size={28} />
            </div>
            <p className='text-slate mb-6 text-sm'>{footerData.description}</p>
            <div className='flex space-x-4'>
              {footerData.socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-white border border-line rounded-full p-2 text-slate transition-colors duration-150 hover:border-brand hover:text-brand'
                >
                  {renderIcon(social.icon, 'h-5 w-5')}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className='eyebrow mb-4 block'>Quick Links</h4>
            <ul className='space-y-3'>
              {footerData.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-slate transition-colors duration-150 hover:text-brand'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='eyebrow mb-4 block'>Products</h4>
            <ul className='space-y-3'>
              {footerData.products.map((product) => (
                <li key={product.name}>
                  <Link
                    href={product.href}
                    className='text-slate transition-colors duration-150 hover:text-brand'
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='eyebrow mb-4 block'>Contact</h4>
            <ul className='space-y-3'>
              {footerData.contact.map(({ key, icon, content, href }) => (
                <li key={key} className='flex items-center gap-3'>
                  {renderIcon(icon, 'h-5 w-5 shrink-0 text-brand')}
                  {href ? (
                    <Link
                      href={href}
                      className='text-ink transition-colors duration-150 hover:text-brand'
                    >
                      {content}
                    </Link>
                  ) : (
                    <span className='text-ink'>{content}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='border-t border-line pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-sm text-slate'>
              © {new Date().getFullYear()} Syntaraa. All rights reserved.
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <Link
                href='#'
                className='text-sm text-slate transition-colors duration-150 hover:text-brand'
              >
                Privacy Policy
              </Link>
              <Link
                href='#'
                className='text-sm text-slate transition-colors duration-150 hover:text-brand'
              >
                Terms of Service
              </Link>
              <Link
                href='#'
                className='text-sm text-slate transition-colors duration-150 hover:text-brand'
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

export default Footer;
