export default function AdminOverviewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-panel p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Auctions</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Bids</h3>
          <p className="text-3xl font-bold">248</p>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Pending Donations</h3>
          <p className="text-3xl font-bold">5</p>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Users</h3>
          <p className="text-3xl font-bold">156</p>
        </div>
      </div>
      
      <div className="glass-panel p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="btn-primary px-4 py-2 rounded-xl">Create Auction</button>
          <button className="btn-secondary px-4 py-2 rounded-xl">Review Donations</button>
          <button className="border border-border px-4 py-2 rounded-xl hover:bg-muted">View Reports</button>
        </div>
      </div>
    </div>
  );
}
