import './globals.css';
import type { Metadata } from 'next';
// Temporarily disabled Google Fonts due to network restrictions
// import { Inter, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { SessionProvider } from '@/components/providers/session-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

// Using system fonts as fallback
// const inter = Inter({ 
//   subsets: ['latin'],
//   variable: '--font-inter'
// });

// const spaceGrotesk = Space_Grotesk({ 
//   subsets: ['latin'],
//   variable: '--font-space-grotesk'
// });

export const metadata: Metadata = {
  title: {
    default: 'The Last Collection',
    template: '%s | The Last Collection',
  },
  description: 'Auctions and donations that fund New World Kids\' non-profit work. Furniture, electronics, sports cards, comics, and art.',
  keywords: [
    'auction',
    'reuse',
    'recycling',
    'furniture',
    'electronics',
    'sports cards',
    'comics',
    'art',
    'donations',
    'nonprofit',
    'sustainability',
    'office equipment'
  ],
  authors: [
    {
      name: 'The Last Collection',
    },
  ],
  creator: 'The Last Collection',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://seattlereuse.exchange',
    title: 'The Last Collection',
    description: 'Auctions and donations that fund New World Kids\' non-profit work',
    siteName: 'The Last Collection',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Last Collection',
    description: 'Auctions and donations that fund New World Kids\' non-profit work',
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
      <body className="font-sans antialiased">
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