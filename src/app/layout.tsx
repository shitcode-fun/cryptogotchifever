import type { Metadata } from "next";
import "./globals.css";
import dynamic from 'next/dynamic';

const Providers = dynamic(() => import('./providers').then(mod => mod.Providers), { ssr: false });
const Navbar = dynamic(() => import('../components/Navbar').then(mod => mod.Navbar), { ssr: false });
const Footer = dynamic(() => import('../components/Footer').then(mod => mod.Footer), { ssr: false });

export const metadata: Metadata = {
  title: "CryptoGotchi",
  description: "Hatch, raise, and trade CryptoGotchi virtual pets on Base L2.",
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
