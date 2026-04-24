import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';

const heading = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '700', '900'],
  variable: '--font-heading' 
});

const body = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body' 
});

export const metadata: Metadata = {
  title: 'Timmy Signs | Creative Signage Experts Nigeria',
  description: 'Leading signage and branding experts delivering high-impact visual identity solutions across Nigeria.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}