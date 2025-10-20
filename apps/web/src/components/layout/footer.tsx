import Link from 'next/link';

import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-bold text-lg mb-4">The Last Collection</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Auctions and donations that fund New World Kids&apos; non-profit work.
            </p>
            <div className="flex gap-4">
              {siteConfig.social.offerup && (
                <Link
                  href={siteConfig.social.offerup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  OfferUp
                </Link>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/auctions" className="text-sm text-muted-foreground hover:text-foreground">
                  Auctions
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-sm text-muted-foreground hover:text-foreground">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/thanks" className="text-sm text-muted-foreground hover:text-foreground">
                  Sponsors
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-sm text-muted-foreground hover:text-foreground">
                  DMCA
                </Link>
              </li>
              <li>
                <Link href="/prohibited-items" className="text-sm text-muted-foreground hover:text-foreground">
                  Prohibited Items
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            &copy; 2024 The Last Collection. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}