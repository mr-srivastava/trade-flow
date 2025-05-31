import React from 'react';
import Link from 'next/link';
import { MobileMenu } from './MobileMenu';
import ClientNavbarWrapper from './ClientNavbarWrapper';

interface MenuItem {
  name: string;
  href: string;
}

const menuItems: Array<MenuItem> = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Our Solutions', href: '/#solutions' },
  // { name: 'Platform', href: '#platform' },
  // { name: 'Partners', href: '#partners' },
  // { name: 'Resources', href: '/#resources' },
];

const Logo: React.FC<{ text: string }> = ({ text }) => (
  <div className='flex-shrink-0'>
    <Link href='/' className='flex items-center group'>
      <span className='text-2xl font-bold  font-heading relative overflow-hidden'>
        <span className='inline-block transition-transform duration-500 group-hover:-translate-y-full'>
          {text}
        </span>
        <span className='absolute left-0 top-0 inline-block -translate-y-full text-syntara-primary transition-transform duration-500 group-hover:translate-y-0'>
          {text}
        </span>
      </span>
    </Link>
  </div>
);

const DesktopMenu: React.FC<{ menuItems: Array<MenuItem>; contactHref: string }> = ({ menuItems, contactHref }) => (
  <>
    <div className='hidden md:block'>
      <div className='ml-10 flex items-center space-x-8'>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className='text-syntara-light hover:text-white font-medium transition-colors link-hover py-1'
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
    <div className='hidden md:flex items-center space-x-4'>
      <Link
        href='/#about'
        className='px-4 py-2 text-syntara-light hover:text-white text-sm font-medium transition duration-150'
      >
        About Us
      </Link>
      <Link
        href={contactHref}
        className='btn-primary text-sm'
      >
        Contact
      </Link>
    </div>
  </>
);

// Server Component - most of the navbar
export const NavBarContent: React.FC<{ contactHref: string }> = ({ contactHref }) => {
  return (
    <nav className='sticky top-0 z-50 bg-syntara-darker/90 backdrop-blur-md border-b border-border/50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <Logo text='Syntara' />
          <DesktopMenu menuItems={menuItems} contactHref={contactHref} />
          <MobileMenu menuItems={menuItems} contactHref={contactHref} />
        </div>
      </div>
    </nav>
  );
};

// Main export with client wrapper for pathname detection
const NavBar: React.FC = () => {
  return <ClientNavbarWrapper />;
};

export default NavBar;
