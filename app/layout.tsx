import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en" className="dark bg-[#07090E]">
      <body className={`${inter.className} antialiased selection:bg-[#EB0028] selection:text-white`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
