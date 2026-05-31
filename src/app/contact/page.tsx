import ContactSection from '@/components/ContactUs/ContactUs';
import Footer from '@/components/Footer/v2/Footer';
import NavBar from '@/components/Navbar/Navbar';
import React from 'react';

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
