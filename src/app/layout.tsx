import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

// Optimize font loading with proper settings
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Syntara | Transform Your Global Trade Operations',
  description:
    'Connect to our global network and leverage cutting-edge technology for operational efficiency in chemical and pharmaceutical trading.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
          <Toaster position="bottom-left" richColors />
        </Providers>
      </body>
    </html>
  );
}
