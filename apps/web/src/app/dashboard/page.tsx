import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/dashboard/listings" className="glass-panel p-6 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold mb-2">My Listings</h2>
          <p className="text-sm text-muted-foreground">Manage your auction items</p>
        </Link>
        
        <Link href="/dashboard/donations" className="glass-panel p-6 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold mb-2">My Donations</h2>
          <p className="text-sm text-muted-foreground">Track your contributions</p>
        </Link>
        
        <Link href="/dashboard/profile" className="glass-panel p-6 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-sm text-muted-foreground">Update your information</p>
        </Link>
      </div>
    </div>
  );
}
