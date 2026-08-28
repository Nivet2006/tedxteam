import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'TEDxGCEM | A rough Sketch',
  description: 'Digital identity and badge QR profile platform for TEDxGCEM team members',
  icons: [
    { rel: 'icon', url: '/logo.png', type: 'image/png' },
    { rel: 'shortcut icon', url: '/logo.png', type: 'image/png' },
    { rel: 'apple-touch-icon', url: '/logo.png' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark bg-[#07090E] ${inter.variable} ${cormorant.variable}`}>
      <body className={`${inter.className} antialiased selection:bg-[#EB0028] selection:text-white`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

