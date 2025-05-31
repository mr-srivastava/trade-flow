'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { NavBarContent } from './Navbar';

const ClientNavbarWrapper: React.FC = () => {
  const pathname = usePathname();
  const contactHref = pathname === '/' ? '#contact' : '/contact';

  return <NavBarContent contactHref={contactHref} />;
};

export default React.memo(ClientNavbarWrapper); 