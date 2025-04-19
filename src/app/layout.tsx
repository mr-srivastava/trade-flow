import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
});
export const metadata: Metadata = {
  title: 'SYntara | Transform Your Global Trade Operations',
  description:
    'Connect to our global network and leverage cutting-edge technology for operational efficiency in chemical and pharmaceutical trading.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
