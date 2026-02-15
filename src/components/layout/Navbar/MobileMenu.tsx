'use client';
import React, { useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

interface MenuItem {
  name: string;
  href: string;
}

export const MobileMenu: React.FC<{ menuItems: Array<MenuItem>; contactHref: string }> = React.memo(({ menuItems, contactHref }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <div className='md:hidden'>
      <div className='flex items-center'>
        <button
          onClick={toggleMenu}
          className='inline-flex items-center justify-center p-2 rounded-md text-syntara-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-syntara-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-offset-syntara-darker'
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </button>
      </div>
      {isMenuOpen && (
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card dark:bg-syntara-darker border-t border-border/50'>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className='block px-3 py-2 text-base font-medium text-syntara-light hover:text-foreground'
              onClick={closeMenu}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href='#about'
            className='block px-3 py-2 text-base font-medium text-syntara-light hover:text-foreground'
            onClick={closeMenu}
          >
            About Us
          </Link>
          <Link
            href={contactHref}
            className='block px-3 py-2 text-base font-medium text-syntara-primary hover:text-foreground'
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
});

MobileMenu.displayName = 'MobileMenu';
