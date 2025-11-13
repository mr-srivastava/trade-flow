import React from 'react';
import ContactSection from '@/components/sections/Contact/Contact';
import Footer from '@/components/layout/Footer/Footer';

import NavBar from '@/components/layout/Navbar/Navbar';

export default function ContactUs() {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
