import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/plugin/search
 * Search endpoint for ChatGPT plugin
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const category = searchParams.get('category');

  if (!query) {
    return NextResponse.json(
      { error: 'Search query (q) is required' },
      { status: 400 }
    );
  }

  // TODO: Replace with actual Meilisearch integration
  // For now, return mock search results
  const mockResults = [
    {
      id: 'auction-001',
      title: 'Herman Miller Aeron Chair',
      description: 'Ergonomic office chair in excellent condition',
      category: 'furniture',
      current_bid: 450.00,
      match_score: 0.95,
      highlighted: 'Herman Miller Aeron <em>Chair</em>'
    },
    {
      id: 'auction-004',
      title: 'Steelcase Leap Chair',
      description: 'Premium office chair with LiveBack technology',
      category: 'furniture',
      current_bid: 350.00,
      match_score: 0.87,
      highlighted: 'Steelcase Leap <em>Chair</em>'
    }
  ];

  const searchTerm = query.toLowerCase();
  let filteredResults = mockResults.filter(item => 
    item.title.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm)
  );

  if (category) {
    filteredResults = filteredResults.filter(item => item.category === category);
  }

  return NextResponse.json({
    query,
    results: filteredResults,
    total: filteredResults.length,
    meta: {
      search_time_ms: 12,
      generated_at: new Date().toISOString()
    }
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
    }
  });
}
