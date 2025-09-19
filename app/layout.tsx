import type { Metadata } from 'next';
import { Inter, Sora, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import JsonLdSchema from '@/components/JsonLdSchema';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Ajay Vigneshwar GB — Senior Software Engineer (Next.js, FastAPI, Azure, AI)',
  description: 'I ship AI-ready systems with real-world CI/CD discipline. 7+ years across Next.js, FastAPI, Azure. Cut release time by 80%, shipped AI assistants, and modernized enterprise stacks.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-text">
        <JsonLdSchema />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
