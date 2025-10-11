export default function DonationGuidelinesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Donation Guidelines</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">What We Accept</h2>
            <div className="prose prose-lg">
              <p className="text-muted-foreground">
                We accept gently used items in good working condition. Items should be clean 
                and functional.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Furniture</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Office chairs, desks, and filing cabinets</li>
              <li>Home furniture in good condition</li>
              <li>No items with structural damage or excessive wear</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Electronics</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Must be in working condition</li>
              <li>Include all necessary cables and accessories</li>
              <li>Data should be wiped from personal devices</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Collectibles</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Sports cards, comics, and art should be in collectible condition</li>
              <li>Protected in appropriate sleeves or cases</li>
              <li>Authenticated items preferred for high-value pieces</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Pickup & Drop-off</h2>
            <p className="text-muted-foreground mb-4">
              We offer pickup services for large items. Small items can be dropped off at 
              our location during business hours.
            </p>
            <p className="text-muted-foreground">
              Contact us to schedule: <a href="mailto:donations@example.com" className="text-primary hover:underline">donations@example.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
