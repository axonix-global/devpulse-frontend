import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'DevPulse SaaS - AI Portfolio & Resume Builder',
  description: 'AI-driven developer portfolio and interactive resume platform.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
