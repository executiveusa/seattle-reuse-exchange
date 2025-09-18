'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function Header() {
  const t = useTranslations('Navigation');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Seattle Reuse Exchange
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              {t('home')}
            </Link>
            <Link
              href="/auctions"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('auctions')}
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('about')}
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('contact')}
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search will go here */}
          </div>
          <nav className="flex items-center">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium transition-colors hover:text-foreground/80"
            >
              {t('login')}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}