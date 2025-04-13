'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

interface MenuItem {
  name: string;
  href: string;
}

export const MobileMenu: React.FC<{ menuItems: Array<MenuItem> }> = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className='md:hidden'>
      <div className='flex items-center'>
        <button
          onClick={toggleMenu}
          className='inline-flex items-center justify-center p-2 rounded-md text-syntara-light hover:text-white focus:outline-none'
        >
          {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </button>
      </div>
      {isMenuOpen && (
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-syntara-darker border-t border-border/50'>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className='block px-3 py-2 text-base font-medium text-syntara-light hover:text-white'
              onClick={closeMenu}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href='#about'
            className='block px-3 py-2 text-base font-medium text-syntara-light hover:text-white'
            onClick={closeMenu}
          >
            About Us
          </Link>
          <Link
            href='#contact'
            className='block px-3 py-2 text-base font-medium text-syntara-primary hover:text-white'
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};
