import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { SessionProvider } from '@/components/providers/session-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: {
    default: 'Seattle Reuse Exchange',
    template: '%s | Seattle Reuse Exchange',
  },
  description: 'Auctions that keep good stuff in use. Bid on rescued office furniture & gear while funding local reuse.',
  keywords: [
    'auction',
    'reuse',
    'recycling',
    'furniture',
    'seattle',
    'nonprofit',
    'sustainability',
    'office equipment'
  ],
  authors: [
    {
      name: 'Seattle Reuse Exchange',
    },
  ],
  creator: 'Seattle Reuse Exchange',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://seattlereuse.exchange',
    title: 'Seattle Reuse Exchange',
    description: 'Auctions that keep good stuff in use',
    siteName: 'Seattle Reuse Exchange',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seattle Reuse Exchange',
    description: 'Auctions that keep good stuff in use',
    creator: '@seattlereuse',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}