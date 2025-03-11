import { type Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppSidebar } from './_components/AppSiderbar';
import { SearchDialog } from './_components/SearchDialog';
import { PokemonStore } from './_store';
import { getPokemon } from './_db';
import { PokemonDetailDialog } from './_components/PokemonDetailDialog';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mokepon!',
  description: 'Gotta catch em all...',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
