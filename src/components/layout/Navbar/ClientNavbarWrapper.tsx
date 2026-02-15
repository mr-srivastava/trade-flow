'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { NavBarContent } from './Navbar';
import { ThemeToggle } from '@/components/theme-toggle';

const ClientNavbarWrapper: React.FC = () => {
  const pathname = usePathname();
  const contactHref = pathname === '/' ? '#contact' : '/contact';

  return (
    <NavBarContent contactHref={contactHref} rightSlot={<ThemeToggle />} />
  );
};

export default React.memo(ClientNavbarWrapper); 