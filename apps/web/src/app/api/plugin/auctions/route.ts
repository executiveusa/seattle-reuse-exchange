import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/plugin/auctions
 * Returns list of active auctions for ChatGPT plugin
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  // TODO: Replace with actual database query
  // For now, return mock data
  const mockAuctions = [
    {
      id: 'auction-001',
      title: 'Herman Miller Aeron Chair',
      description: 'Ergonomic office chair in excellent condition',
      category: 'furniture',
      current_bid: 450.00,
      starting_bid: 300.00,
      bid_count: 12,
      time_remaining: '2 days 5 hours',
      ends_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'open',
      image_url: '/images/chairs/herman-miller.jpg',
      condition: 'Excellent - minimal wear, fully functional',
      location: 'Seattle, WA'
    },
    {
      id: 'auction-002',
      title: 'Vintage Pokemon Card Collection',
      description: 'First edition holographic cards from base set',
      category: 'sports-cards',
      current_bid: 1200.00,
      starting_bid: 800.00,
      bid_count: 28,
      time_remaining: '5 hours 32 minutes',
      ends_at: new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString(),
      status: 'open',
      image_url: '/images/cards/pokemon-collection.jpg',
      condition: 'Near Mint - professionally graded',
      location: 'Seattle, WA'
    },
    {
      id: 'auction-003',
      title: 'Apple MacBook Pro 2020',
      description: '16-inch, Intel i9, 32GB RAM, 1TB SSD',
      category: 'electronics',
      current_bid: 950.00,
      starting_bid: 700.00,
      bid_count: 15,
      time_remaining: '1 day 8 hours',
      ends_at: new Date(Date.now() + 1.3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'open',
      image_url: '/images/electronics/macbook-pro.jpg',
      condition: 'Good - minor cosmetic wear, fully functional',
      location: 'Seattle, WA'
    }
  ];

  let filteredAuctions = mockAuctions;
  if (category) {
    filteredAuctions = mockAuctions.filter(a => a.category === category);
  }

  const limitedAuctions = filteredAuctions.slice(0, Math.min(limit, 50));

  return NextResponse.json({
    auctions: limitedAuctions,
    total: filteredAuctions.length,
    meta: {
      category: category || 'all',
      limit,
      generated_at: new Date().toISOString()
    }
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
    }
  });
}
