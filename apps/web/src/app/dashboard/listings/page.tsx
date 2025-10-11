export default function DashboardListingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <button className="btn-primary px-6 py-2 rounded-xl">
          Create New Listing
        </button>
      </div>
      
      <div className="glass-panel p-6 mb-6">
        <div className="flex gap-4 mb-4">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
            All
          </button>
          <button className="px-4 py-2 hover:bg-muted rounded-lg">
            Active
          </button>
          <button className="px-4 py-2 hover:bg-muted rounded-lg">
            Sold
          </button>
          <button className="px-4 py-2 hover:bg-muted rounded-lg">
            Draft
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="glass-panel p-6">
          <p className="text-muted-foreground text-center py-8">
            You don&apos;t have any listings yet. Create your first listing to get started!
          </p>
        </div>
      </div>
    </div>
  );
}
