export default function DmcaPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
        <h1 className="text-4xl font-bold mb-6">DMCA Copyright Policy</h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          <strong>Effective Date:</strong> October 12, 2024 | <strong>Last Updated:</strong> October 12, 2024
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p>
            The Last Collection respects the intellectual property rights of others and expects users to do the same. 
            This policy outlines our procedures for responding to claims of copyright infringement in accordance with 
            the Digital Millennium Copyright Act (17 U.S.C. § 512).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to File a DMCA Notice</h2>
          <p>
            If you believe that content on our platform infringes your copyright, please submit a written notification 
            containing the following information:
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Required Information</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Identification of the copyrighted work</strong>
              <ul className="list-disc pl-6 mt-2">
                <li>Detailed description of the work</li>
                <li>Registration number (if applicable)</li>
                <li>Representative list for multiple works</li>
              </ul>
            </li>
            <li>
              <strong>Identification of the infringing material</strong>
              <ul className="list-disc pl-6 mt-2">
                <li>URL or specific location on our platform</li>
                <li>Description sufficient to locate the material</li>
                <li>Screenshots or evidence (optional but helpful)</li>
              </ul>
            </li>
            <li>
              <strong>Your contact information</strong>
              <ul className="list-disc pl-6 mt-2">
                <li>Full legal name</li>
                <li>Mailing address</li>
                <li>Telephone number</li>
                <li>Email address</li>
              </ul>
            </li>
            <li>
              <strong>Good faith statement:</strong> "I have a good faith belief that use of the copyrighted material 
              described above is not authorized by the copyright owner, its agent, or the law."
            </li>
            <li>
              <strong>Accuracy statement:</strong> "I swear, under penalty of perjury, that the information in this 
              notification is accurate and that I am the copyright owner or authorized to act on behalf of the owner 
              of an exclusive right that is allegedly infringed."
            </li>
            <li>
              <strong>Physical or electronic signature</strong> of the copyright owner or authorized representative
            </li>
          </ol>
        </section>

        <section className="mb-8 bg-muted/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Submit Your Notice</h3>
          <p className="mb-4">
            <strong>Email:</strong> <a href="mailto:dmca@thelastcollection.org" className="text-primary hover:underline">dmca@thelastcollection.org</a>
          </p>
          <p className="mb-4">
            <strong>Subject Line:</strong> DMCA Takedown Notice
          </p>
          <p>
            <strong>Mail:</strong><br />
            DMCA Agent<br />
            The Last Collection<br />
            c/o New World Kids<br />
            [Address]
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Counter-Notification</h2>
          <p>
            If you believe your content was removed in error or misidentification, you may submit a counter-notification 
            with the following:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Your contact information (name, address, phone, email)</li>
            <li>Identification of the removed content and its location</li>
            <li>Statement under penalty of perjury that removal was a mistake or misidentification</li>
            <li>Consent to jurisdiction of Federal District Court</li>
            <li>Statement accepting service of process from the original complainant</li>
            <li>Physical or electronic signature</li>
          </ul>
          <p className="mt-4">
            Send counter-notifications to: <a href="mailto:dmca@thelastcollection.org" className="text-primary hover:underline">dmca@thelastcollection.org</a> 
            with subject line "DMCA Counter-Notification"
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Response Process</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Upon Receipt of Takedown Notice</h3>
              <ul className="list-disc pl-6">
                <li>Acknowledgment within 24 hours</li>
                <li>Review within 48 hours</li>
                <li>If valid: remove content, notify user, document action</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Upon Receipt of Counter-Notification</h3>
              <ul className="list-disc pl-6">
                <li>Forward to original complainant within 10 business days</li>
                <li>If no lawsuit filed within 10-14 days, content may be restored</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Repeat Infringer Policy</h2>
          <p>We maintain a three-strike policy:</p>
          <ol className="list-decimal pl-6 space-y-2 mt-4">
            <li><strong>First Offense:</strong> Warning and content removal</li>
            <li><strong>Second Offense:</strong> Temporary account suspension (7-30 days)</li>
            <li><strong>Third Offense:</strong> Permanent account termination</li>
          </ol>
          <p className="mt-4">
            Exceptions may apply for large-scale infringement, commercial piracy, or willful violations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Fair Use and Educational Resources</h2>
          <p>
            Certain uses of copyrighted material may be permitted under fair use doctrine (17 U.S.C. § 107), including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Commentary and criticism</li>
            <li>News reporting</li>
            <li>Teaching and scholarship</li>
            <li>Research</li>
            <li>Parody</li>
          </ul>
          <p className="mt-4">
            Fair use is determined on a case-by-case basis. Consult legal counsel if you're unsure.
          </p>
        </section>

        <section className="mb-8 border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p>
            <strong>DMCA Agent:</strong> <a href="mailto:dmca@thelastcollection.org" className="text-primary hover:underline">dmca@thelastcollection.org</a>
          </p>
          <p>
            <strong>General Legal:</strong> <a href="mailto:legal@thelastcollection.org" className="text-primary hover:underline">legal@thelastcollection.org</a>
          </p>
        </section>

        <footer className="text-sm text-muted-foreground mt-12 pt-6 border-t">
          <p><strong>Last Review Date:</strong> October 12, 2024</p>
          <p><strong>Next Scheduled Review:</strong> April 12, 2025</p>
          <p className="mt-4">
            <em>This policy is for informational purposes and does not constitute legal advice. For specific legal questions, consult an attorney.</em>
          </p>
        </footer>
      </div>
    </div>
  );
}
