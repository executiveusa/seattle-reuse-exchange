import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/plugin/auctions/[id]
 * Returns specific auction details for ChatGPT plugin
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // TODO: Replace with actual database query
  // For now, return mock data
  const mockAuction = {
    id: id,
    title: 'Herman Miller Aeron Chair',
    description: 'Ergonomic office chair in excellent condition. Features adjustable lumbar support, breathable mesh back, and fully adjustable armrests. Size B (medium). This chair has been professionally cleaned and inspected.',
    category: 'furniture',
    current_bid: 450.00,
    starting_bid: 300.00,
    bid_count: 12,
    time_remaining: '2 days 5 hours',
    ends_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    image_url: '/images/chairs/herman-miller.jpg',
    condition: 'Excellent - minimal wear, fully functional',
    location: 'Seattle, WA',
    pickup_instructions: 'Pickup available at our Seattle warehouse Monday-Friday 9am-5pm',
    dimensions: '27" W x 27" D x 41" H',
    weight: '45 lbs',
    donor_story: 'Donated by a local tech company during office downsizing',
    environmental_impact: {
      co2_saved_kg: 42.5,
      landfill_diverted_kg: 20.4
    }
  };

  if (!id) {
    return NextResponse.json(
      { error: 'Auction ID is required' },
      { status: 400 }
    );
  }

  return NextResponse.json(mockAuction, {
    headers: {
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
    }
  });
}
