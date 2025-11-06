import type { Metadata } from "next";
import { Anton, Bebas_Neue, Share_Tech, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const share = Share_Tech({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-share',
  display: 'swap',
});

const shareMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-share-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "GHXSTSHIP Industries | Immersive Entertainment Production",
  description: "Global experiential production agency specializing in immersive entertainment, experiential marketing, creative media, and integrated technology. Design. Develop. Direct. Disrupt.",
  keywords: "experiential production, immersive entertainment, event production, brand activations, creative agency, Tampa",
  openGraph: {
    title: 'GHXSTSHIP Industries',
    description: 'We Create Beyond Reality',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GHXSTSHIP Industries',
    description: 'We Create Beyond Reality',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${anton.variable} ${bebas.variable} ${share.variable} ${shareMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
