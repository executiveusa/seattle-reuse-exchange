/**
 * Commission Dashboard Page
 * 
 * Allows stores/sellers to:
 * - List items on consignment
 * - Track earnings and sales
 * - View revenue splits
 * - Monitor inventory status
 */

export default function CommissionDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Commission Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Manage your consigned items and track earnings
        </p>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="rounded-lg border bg-card p-6">
            <div className="text-sm font-medium text-muted-foreground">Active Items</div>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">3 in auction</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="text-sm font-medium text-muted-foreground">Items Sold</div>
            <div className="text-3xl font-bold">45</div>
            <p className="text-xs text-muted-foreground mt-1">This month: 8</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="text-sm font-medium text-muted-foreground">Earnings (92%)</div>
            <div className="text-3xl font-bold">$8,234</div>
            <p className="text-xs text-muted-foreground mt-1">Pending: $1,450</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="text-sm font-medium text-muted-foreground">Commission Rate</div>
            <div className="text-3xl font-bold">8%</div>
            <p className="text-xs text-muted-foreground mt-1">Platform fee</p>
          </div>
        </div>

        {/* Commission Info */}
        <div className="rounded-lg border bg-muted/50 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">How Commission Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Revenue Split</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>✓ You receive 92% of final sale price</li>
                <li>✓ 8% platform fee covers marketing & operations</li>
                <li>✓ Supports New World Kids nonprofit mission</li>
                <li>✓ Payment within 5 business days after pickup</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">What We Provide</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>✓ Professional photography</li>
                <li>✓ Listing optimization & marketing</li>
                <li>✓ Secure payment processing</li>
                <li>✓ Buyer coordination & support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button className="rounded-lg border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 p-4 text-left">
            <div className="font-semibold mb-1">List New Item</div>
            <div className="text-sm opacity-90">Submit items for consignment review</div>
          </button>
          <button className="rounded-lg border-2 border-border hover:border-primary p-4 text-left">
            <div className="font-semibold mb-1">View Analytics</div>
            <div className="text-sm text-muted-foreground">Sales trends and performance</div>
          </button>
        </div>

        {/* Current Items Table */}
        <div className="rounded-lg border">
          <div className="border-b p-4">
            <h2 className="text-xl font-semibold">Your Consigned Items</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium">Item</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Current Bid</th>
                  <th className="text-left p-4 font-medium">Your Share (92%)</th>
                  <th className="text-left p-4 font-medium">Ends</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">
                    <div className="font-medium">Herman Miller Aeron Chair</div>
                    <div className="text-sm text-muted-foreground">Furniture</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Active Auction
                    </span>
                  </td>
                  <td className="p-4 font-medium">$450.00</td>
                  <td className="p-4 font-medium text-primary">$414.00</td>
                  <td className="p-4 text-sm text-muted-foreground">2 days</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">
                    <div className="font-medium">Vintage Pokemon Cards</div>
                    <div className="text-sm text-muted-foreground">Collectibles</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      In Review
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">—</td>
                  <td className="p-4 text-muted-foreground">—</td>
                  <td className="p-4 text-sm text-muted-foreground">Pending</td>
                </tr>
                <tr>
                  <td className="p-4">
                    <div className="font-medium">MacBook Pro 2020</div>
                    <div className="text-sm text-muted-foreground">Electronics</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Pending Pickup
                    </span>
                  </td>
                  <td className="p-4 font-medium">$950.00</td>
                  <td className="p-4 font-medium text-primary">$874.00</td>
                  <td className="p-4 text-sm text-muted-foreground">Sold</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TODO Note */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>TODO:</strong> This is a UI stub. Implementation needs:
          </p>
          <ul className="text-sm text-muted-foreground mt-2 ml-4 list-disc">
            <li>Backend API for commission management</li>
            <li>Item submission form with photo upload</li>
            <li>Real-time earnings tracking</li>
            <li>Payment processing integration</li>
            <li>Store dashboard analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
