import type { Metadata } from "next";
import "./globals.css";
import dynamic from 'next/dynamic';

const Providers = dynamic(() => import('./providers').then(mod => mod.Providers), { ssr: false });
const Navbar = dynamic(() => import('../components/Navbar').then(mod => mod.Navbar), { ssr: false });
const Footer = dynamic(() => import('../components/Footer').then(mod => mod.Footer), { ssr: false });

export const metadata: Metadata = {
  title: {
    default: 'CryptoGotchi',
    template: '%s | CryptoGotchi',
  },
  description: 'Hatch, raise, and trade unique CryptoGotchi pets on Base L2 blockchain.',
  keywords: ['CryptoGotchi', 'Base L2', 'virtual pets', 'blockchain', 'Web3'],
  authors: [{ name: 'CryptoGotchi Team', url: 'https://your-domain.com' }],
  creator: 'gtopolice',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    title: 'CryptoGotchi',
    description: 'Hatch, raise, and trade unique CryptoGotchi pets on Base L2 blockchain.',
    url: 'https://your-domain.com',
    siteName: 'CryptoGotchi',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoGotchi',
    description: 'Hatch, raise, and trade unique CryptoGotchi pets on Base L2 blockchain.',
    creator: '@gtopolice',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen pt-16 bg-background">
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
