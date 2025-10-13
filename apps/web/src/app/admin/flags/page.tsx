export default function AdminFlagsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Content Flags & Moderation</h1>
      <div className="glass-panel p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p className="text-muted-foreground mb-4">
            Review and manage user-reported content violations, including prohibited items, 
            inappropriate content, and policy violations.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Flag Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-danger mb-2">High Priority</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Weapons and dangerous items</li>
                <li>• Illegal drugs</li>
                <li>• Counterfeit goods</li>
                <li>• Hate speech</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-warning mb-2">Medium Priority</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Hazardous materials</li>
                <li>• Medical devices</li>
                <li>• Inaccurate descriptions</li>
                <li>• Spam listings</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-success mb-2">Low Priority</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Category misplacement</li>
                <li>• Minor policy violations</li>
                <li>• Duplicate listings</li>
                <li>• Photo quality issues</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Moderation Actions</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-success pl-4">
              <h4 className="font-semibold mb-1">Approve</h4>
              <p className="text-sm text-muted-foreground">
                Content is compliant. Close flag and notify reporter.
              </p>
            </div>
            <div className="border-l-4 border-warning pl-4">
              <h4 className="font-semibold mb-1">Request Changes</h4>
              <p className="text-sm text-muted-foreground">
                Minor violation. Ask seller to update listing (e.g., add disclosures).
              </p>
            </div>
            <div className="border-l-4 border-danger pl-4">
              <h4 className="font-semibold mb-1">Remove</h4>
              <p className="text-sm text-muted-foreground">
                Prohibited content. Remove listing, notify seller, apply strike.
              </p>
            </div>
            <div className="border-l-4 border-neutral pl-4">
              <h4 className="font-semibold mb-1">Escalate</h4>
              <p className="text-sm text-muted-foreground">
                Serious violation requiring legal review or law enforcement notification.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-3">Response Timeframes</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><strong>High Priority:</strong> Review within 4 hours</li>
            <li><strong>Medium Priority:</strong> Review within 24 hours</li>
            <li><strong>Low Priority:</strong> Review within 48 hours</li>
          </ul>
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            Content moderation interface will include:
          </p>
          <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1 mt-2">
            <li>Flagged listings queue with filtering and sorting</li>
            <li>Side-by-side view of listing and flag details</li>
            <li>Quick action buttons for common decisions</li>
            <li>Communication templates for seller notifications</li>
            <li>Audit trail of all moderation actions</li>
            <li>ML-powered risk scoring for prioritization</li>
            <li>Integration with policy documentation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
