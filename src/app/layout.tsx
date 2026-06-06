import type { Metadata } from 'next';
import { Montserrat, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
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
    <html lang='en' suppressHydrationWarning>
      <body className={`${montserrat.className} ${jetbrainsMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
