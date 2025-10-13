export default function ProhibitedItemsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
        <h1 className="text-4xl font-bold mb-6">Prohibited Items Policy</h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          <strong>Effective Date:</strong> October 12, 2024 | <strong>Last Updated:</strong> October 12, 2024
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p>
            The Last Collection is committed to maintaining a safe, legal, and ethical marketplace. This policy outlines 
            items and activities that are strictly prohibited on our platform. Violations may result in listing removal, 
            account suspension, or permanent ban.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Guiding Principles</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Safety First:</strong> Protecting our community from dangerous items</li>
            <li><strong>Legal Compliance:</strong> Adhering to federal, state, and local laws</li>
            <li><strong>Ethical Standards:</strong> Preventing harmful or exploitative content</li>
            <li><strong>Mission Alignment:</strong> Supporting our nonprofit values</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Strictly Prohibited Categories</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-danger pl-4">
              <h3 className="text-xl font-semibold mb-2">1. Weapons and Dangerous Items</h3>
              <p className="font-semibold">Prohibited:</p>
              <ul className="list-disc pl-6 mb-3">
                <li>Firearms, ammunition, and explosives</li>
                <li>Knives marketed as weapons</li>
                <li>Stun guns, tasers, pepper spray</li>
                <li>Brass knuckles and martial arts weapons</li>
              </ul>
              <p className="font-semibold">Allowed with Restrictions:</p>
              <ul className="list-disc pl-6">
                <li>Kitchen knives (clear functional purpose)</li>
                <li>Collectible swords (blunted, display-only)</li>
                <li>Sporting equipment with verification</li>
              </ul>
            </div>

            <div className="border-l-4 border-danger pl-4">
              <h3 className="text-xl font-semibold mb-2">2. Drugs and Controlled Substances</h3>
              <p className="font-semibold">Prohibited:</p>
              <ul className="list-disc pl-6">
                <li>Illegal drugs and controlled substances</li>
                <li>Drug paraphernalia</li>
                <li>Prescription medications</li>
                <li>Vaping products and e-cigarettes</li>
                <li>CBD and marijuana products</li>
              </ul>
            </div>

            <div className="border-l-4 border-danger pl-4">
              <h3 className="text-xl font-semibold mb-2">3. Adult Content and Services</h3>
              <p className="font-semibold">Prohibited:</p>
              <ul className="list-disc pl-6">
                <li>Pornography and explicit sexual content</li>
                <li>Adult toys and intimate products</li>
                <li>Services of a sexual nature</li>
                <li>Dating or escort services</li>
              </ul>
            </div>

            <div className="border-l-4 border-danger pl-4">
              <h3 className="text-xl font-semibold mb-2">4. Hate, Violence, and Extremism</h3>
              <p className="font-semibold">Prohibited:</p>
              <ul className="list-disc pl-6">
                <li>Items promoting hate groups or extremist organizations</li>
                <li>Nazi memorabilia and hate symbols (except historical/educational)</li>
                <li>Content glorifying violence or terrorism</li>
                <li>Items targeting protected groups</li>
              </ul>
            </div>

            <div className="border-l-4 border-danger pl-4">
              <h3 className="text-xl font-semibold mb-2">5. Counterfeit and Stolen Goods</h3>
              <p className="font-semibold">Prohibited:</p>
              <ul className="list-disc pl-6">
                <li>Counterfeit products (fake designer items)</li>
                <li>Knockoffs sold as authentic</li>
                <li>Stolen property</li>
                <li>Items with altered serial numbers</li>
                <li>Pirated media and cracked software</li>
              </ul>
              <p className="mt-3 text-sm">
                <strong>Detection Methods:</strong> Logo recognition, duplicate image hashing, price anomaly detection, 
                manual review for high-value items
              </p>
            </div>

            <div className="border-l-4 border-warning pl-4">
              <h3 className="text-xl font-semibold mb-2">6. Hazardous Materials</h3>
              <p className="font-semibold">Prohibited:</p>
              <ul className="list-disc pl-6">
                <li>Toxic or poisonous substances</li>
                <li>Radioactive materials</li>
                <li>Asbestos-containing materials</li>
                <li>Lead paint or lead-containing items</li>
                <li>Recalled products (CPSC recalls)</li>
              </ul>
            </div>

            <div className="border-l-4 border-warning pl-4">
              <h3 className="text-xl font-semibold mb-2">7. Medical Devices</h3>
              <p className="font-semibold">Prohibited:</p>
              <ul className="list-disc pl-6 mb-3">
                <li>Prescription medical devices</li>
                <li>Contact lenses</li>
                <li>Surgical instruments for unlicensed use</li>
                <li>Products making unsubstantiated health claims</li>
              </ul>
              <p className="font-semibold">Allowed:</p>
              <ul className="list-disc pl-6">
                <li>Over-the-counter health monitors</li>
                <li>Mobility aids (wheelchairs, walkers)</li>
                <li>Eyeglasses and reading glasses</li>
              </ul>
            </div>

            <div className="border-l-4 border-warning pl-4">
              <h3 className="text-xl font-semibold mb-2">8. Wildlife and Animal Products</h3>
              <p className="font-semibold">Prohibited:</p>
              <ul className="list-disc pl-6">
                <li>Live animals (except approved rescue programs)</li>
                <li>Endangered species products (ivory, exotic skins)</li>
                <li>Items violating CITES</li>
                <li>Dog and cat fur products</li>
              </ul>
            </div>

            <div className="border-l-4 border-warning pl-4">
              <h3 className="text-xl font-semibold mb-2">9. Alcohol and Tobacco</h3>
              <p className="font-semibold">Prohibited:</p>
              <ul className="list-disc pl-6">
                <li>Alcoholic beverages</li>
                <li>Tobacco products</li>
                <li>Vaping products and e-liquids</li>
              </ul>
              <p className="font-semibold mt-3">Allowed:</p>
              <ul className="list-disc pl-6">
                <li>Collectible bottles (empty, cleaned)</li>
                <li>Vintage advertising</li>
              </ul>
            </div>

            <div className="border-l-4 border-warning pl-4">
              <h3 className="text-xl font-semibold mb-2">10. Financial and Identity Items</h3>
              <p className="font-semibold">Prohibited:</p>
              <ul className="list-disc pl-6">
                <li>Currency (except collectible numismatics)</li>
                <li>Credit/debit cards, gift cards with balances</li>
                <li>Identity documents (passports, licenses)</li>
                <li>Fake IDs</li>
                <li>Pyramid schemes and MLM</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8 bg-muted/50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Category-Specific Guidelines</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Electronics</h3>
              <ul className="list-disc pl-6 text-sm">
                <li>Must not be locked or activation-locked</li>
                <li>Must disclose defects or damage</li>
                <li>Must be factory reset (data removed)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Sports Cards and Collectibles</h3>
              <ul className="list-disc pl-6 text-sm">
                <li>Authenticity verification required for high-value items</li>
                <li>Clear photos showing condition</li>
                <li>No trimmed or altered cards</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Comics and Books</h3>
              <ul className="list-disc pl-6 text-sm">
                <li>No stolen library books</li>
                <li>Condition accurately described</li>
                <li>No bootleg reproductions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Art</h3>
              <ul className="list-disc pl-6 text-sm">
                <li>Provenance required for valuable works</li>
                <li>Artist verification for signed pieces</li>
                <li>No unauthorized copies sold as originals</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Furniture</h3>
              <ul className="list-disc pl-6 text-sm">
                <li>Must meet safety standards</li>
                <li>No recalled items</li>
                <li>Disclosure of damage or repairs required</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Reporting Violations</h2>
          <p className="mb-4">
            If you see a prohibited item or policy violation:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Click "Report" on the listing</li>
            <li>Select violation category</li>
            <li>Provide details and evidence</li>
            <li>Submit report</li>
          </ol>
          <p className="mt-4">
            Reports are reviewed within 24-48 hours. Action will be taken if violation is confirmed.
          </p>
          <p className="mt-4">
            <strong>Email:</strong> <a href="mailto:report@thelastcollection.org" className="text-primary hover:underline">report@thelastcollection.org</a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Consequences of Violations</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold">First Offense (Unintentional)</h3>
              <p className="text-sm">Listing removed, educational warning, opportunity to appeal</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Second Offense</h3>
              <p className="text-sm">Temporary suspension (7-30 days), mandatory policy review</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Third Offense / Severe Violations</h3>
              <p className="text-sm">Permanent account termination, potential legal action</p>
            </div>
            <div className="border-l-4 border-danger pl-4">
              <h3 className="text-lg font-semibold">Immediate Termination</h3>
              <p className="text-sm">
                Certain violations result in immediate ban: illegal activity, counterfeit goods at scale, 
                stolen property, child exploitation, violent threats
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Appeals Process</h2>
          <p>If your listing was removed:</p>
          <ol className="list-decimal pl-6 space-y-2 mt-4">
            <li>Review removal notification (includes reason)</li>
            <li>Submit appeal with explanation and evidence</li>
            <li>Appeals reviewed within 72 hours</li>
            <li>Decision communicated via email</li>
            <li>Further appeal to senior team if needed</li>
          </ol>
        </section>

        <section className="mb-8 border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            <strong>Policy Questions:</strong> <a href="mailto:policy@thelastcollection.org" className="text-primary hover:underline">policy@thelastcollection.org</a>
          </p>
          <p>
            <strong>Report Prohibited Items:</strong> <a href="mailto:report@thelastcollection.org" className="text-primary hover:underline">report@thelastcollection.org</a>
          </p>
          <p>
            <strong>Legal Inquiries:</strong> <a href="mailto:legal@thelastcollection.org" className="text-primary hover:underline">legal@thelastcollection.org</a>
          </p>
        </section>

        <footer className="text-sm text-muted-foreground mt-12 pt-6 border-t">
          <p><strong>Last Review Date:</strong> October 12, 2024</p>
          <p><strong>Next Scheduled Review:</strong> April 12, 2025</p>
          <p className="mt-4">
            <em>This policy is subject to change. Sellers and buyers are responsible for staying informed of current policies and applicable laws.</em>
          </p>
        </footer>
      </div>
    </div>
  );
}
