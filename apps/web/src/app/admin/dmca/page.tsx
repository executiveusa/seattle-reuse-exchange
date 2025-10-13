export default function AdminDmcaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">DMCA Takedown Management</h1>
      <div className="glass-panel p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p className="text-muted-foreground mb-4">
            Manage copyright infringement claims under the Digital Millennium Copyright Act (DMCA). 
            Process takedown notices, counter-notifications, and maintain compliance records.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">DMCA Workflow</h3>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">1. Notice Received</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Acknowledge receipt within 24 hours</li>
                <li>• Verify notice contains all required elements</li>
                <li>• Log in DMCA tracking system</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">2. Review & Validation</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Verify copyright ownership claims</li>
                <li>• Locate allegedly infringing content</li>
                <li>• Assess good faith of notice</li>
                <li>• Complete review within 48 hours</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">3. Action Taken</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Remove or disable access to content</li>
                <li>• Notify user who posted content</li>
                <li>• Document action and rationale</li>
                <li>• Update repeat infringer tracking</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">4. Counter-Notification</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Accept and validate counter-notice</li>
                <li>• Forward to original complainant within 10 days</li>
                <li>• Wait 10-14 days for lawsuit filing</li>
                <li>• Restore content if no lawsuit filed</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Required Notice Elements</h3>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm mb-3">A valid DMCA takedown notice must include:</p>
            <ol className="list-decimal pl-6 text-sm space-y-2 text-muted-foreground">
              <li>Identification of copyrighted work</li>
              <li>Identification of infringing material with URL/location</li>
              <li>Contact information (name, address, phone, email)</li>
              <li>Good faith belief statement</li>
              <li>Accuracy statement under penalty of perjury</li>
              <li>Physical or electronic signature</li>
            </ol>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Repeat Infringer Policy</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-warning pl-4">
              <h4 className="font-semibold mb-1">Strike 1</h4>
              <p className="text-sm text-muted-foreground">
                Warning issued, content removed, educational notice sent
              </p>
            </div>
            <div className="border-l-4 border-warning pl-4">
              <h4 className="font-semibold mb-1">Strike 2</h4>
              <p className="text-sm text-muted-foreground">
                Temporary suspension (7-30 days), mandatory policy review required
              </p>
            </div>
            <div className="border-l-4 border-danger pl-4">
              <h4 className="font-semibold mb-1">Strike 3</h4>
              <p className="text-sm text-muted-foreground">
                Permanent account termination, ban from creating new accounts
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Service Level Agreements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Response Times</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>Initial acknowledgment: 24 hours</li>
                <li>Takedown decision: 48 hours</li>
                <li>Content removal: Immediate upon decision</li>
                <li>Counter-notice forwarding: 10 business days</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Documentation Required</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>Original takedown notice</li>
                <li>Content screenshots (pre-removal)</li>
                <li>User notification records</li>
                <li>Action taken and date/time</li>
                <li>Counter-notice (if submitted)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
          <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
            <p><strong>DMCA Agent Email:</strong> dmca@thelastcollection.org</p>
            <p><strong>Legal Inquiries:</strong> legal@thelastcollection.org</p>
            <p><strong>Mailing Address:</strong> The Last Collection, c/o New World Kids, [Address]</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            DMCA management interface will include:
          </p>
          <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1 mt-2">
            <li>Intake form for logging new DMCA notices</li>
            <li>Validation checklist for required elements</li>
            <li>Timeline tracker for SLA compliance</li>
            <li>User account linking and strike tracking</li>
            <li>Email template generator for notifications</li>
            <li>Counter-notice processing workflow</li>
            <li>Audit log and compliance reporting</li>
            <li>Integration with Copyright Office registration database</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
