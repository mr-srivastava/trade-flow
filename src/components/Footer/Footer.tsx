import { Facebook, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const PRODUCT_LINKS = [
  { name: 'Features', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Testimonials', href: '#' },
  { name: 'FAQ', href: '#' },
];

const COMPANY_LINKS = [
  { name: 'About', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Careers', href: '#' },
  { name: 'Contact', href: '#' },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative bg-secondary/95 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <a
              href="#"
              className="text-2xl font-bold group text-foreground transition-colors duration-300"
            >
              <span className="group-hover:text-primary">Trade</span>
              <span className="text-primary group-hover:text-foreground">Flow</span>
            </a>
            <p className="text-muted-foreground">
              Transforming global trade operations with innovative software
              solutions.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Facebook />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Twitter />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Linkedin />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-card-foreground mb-6">Product</h3>
            <ul className="space-y-4">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-card-foreground mb-6">Company</h3>
            <ul className="space-y-4">
              {COMPANY_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground mb-6">Stay Updated</h3>
            <form className="space-y-4">
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email…"
                className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-colors duration-300"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg text-primary-foreground bg-gradient-to-r from-primary to-brand font-semibold transition-all duration-300 hover:from-primary/90 hover:to-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-opacity-50 shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              © 2024 TradeFlow. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
