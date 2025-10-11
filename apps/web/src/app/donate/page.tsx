import Link from 'next/link';

export default function DonatePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Donate to The Last Collection</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your donations help fund New World Kids&apos; non-profit work. We accept furniture, 
          electronics, sports cards, comics, and art.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass-panel p-6">
            <h2 className="text-2xl font-semibold mb-4">What We Accept</h2>
            <ul className="space-y-2">
              <li>✓ Furniture (office & home)</li>
              <li>✓ Electronics (working condition)</li>
              <li>✓ Sports cards & collectibles</li>
              <li>✓ Comics & graphic novels</li>
              <li>✓ Art & prints</li>
            </ul>
          </div>
          
          <div className="glass-panel p-6">
            <h2 className="text-2xl font-semibold mb-4">Tax Benefits</h2>
            <p className="text-sm text-muted-foreground mb-4">
              As a registered 501(c)(3) non-profit, your donations may be tax-deductible.
            </p>
            <Link 
              href="/donate/receipt" 
              className="text-primary hover:underline"
            >
              Learn about tax receipts →
            </Link>
          </div>
        </div>
        
        <div className="bg-card p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Ready to Donate?</h2>
          <p className="text-muted-foreground mb-6">
            Fill out our donation form and we&apos;ll coordinate pickup or drop-off.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/donate/guidelines" 
              className="btn-secondary px-6 py-3 rounded-2xl font-medium"
            >
              View Guidelines
            </Link>
            <button className="btn-primary px-6 py-3 rounded-2xl font-medium">
              Submit Donation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
