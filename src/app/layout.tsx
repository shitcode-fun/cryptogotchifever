import type { Metadata } from "next";
import "./globals.css";
import dynamic from 'next/dynamic';

const Providers = dynamic(() => import('./providers').then(mod => mod.Providers), { ssr: false });
const Navbar = dynamic(() => import('../components/Navbar').then(mod => mod.Navbar), { ssr: false });

export const metadata: Metadata = {
  title: "Web3 App Template",
  description: "Minimal Next.js web3 template.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
