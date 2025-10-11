export default function SponsorsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Thank You to Our Sponsors</h1>
        <p className="text-lg text-muted-foreground text-center mb-12">
          These generous supporters help make our mission possible
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i} 
              className="glass-panel p-6 flex items-center justify-center h-32 hover:shadow-xl transition-all"
            >
              <div className="text-center text-muted-foreground">
                Sponsor {i + 1}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-card p-8 rounded-2xl shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Become a Sponsor</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Support The Last Collection and help us continue our mission to fund 
            New World Kids&apos; non-profit work. Your sponsorship makes a real difference 
            in our community.
          </p>
          <button className="btn-primary px-8 py-3 rounded-2xl font-medium">
            Contact Us About Sponsorship
          </button>
        </div>
        
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Contributors</h2>
          <div className="glass-panel p-8">
            <p className="text-center text-muted-foreground mb-6">
              We&apos;re grateful to everyone who has contributed items, time, or resources to our cause.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Top Donors</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Anonymous Donor - 50+ items</li>
                  <li>• Local Business Partner - Office furniture</li>
                  <li>• Community Member - Electronics</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Volunteers</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Pickup & delivery team</li>
                  <li>• Item photography & listing</li>
                  <li>• Administrative support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
