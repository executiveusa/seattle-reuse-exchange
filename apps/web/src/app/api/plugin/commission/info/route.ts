import { NextResponse } from 'next/server';

/**
 * GET /api/plugin/commission/info
 * Returns commission/consignment information for ChatGPT plugin
 */
export async function GET() {
  const commissionInfo = {
    commission_rate: 0.08,
    minimum_value: 100,
    currency: 'USD',
    process: [
      'Submit item details and photos through our dashboard or contact us',
      'Our team reviews and appraises the item within 2 business days',
      'If accepted, we photograph, list, and market your item',
      'Item is featured in auctions with professional descriptions',
      'When sold, you receive 92% of the final sale price',
      'Payment processed within 5 business days after pickup'
    ],
    benefits: [
      'Professional photography and listing optimization',
      'Marketing to our engaged bidder community',
      'Secure payment processing',
      'Pickup coordination with buyers',
      'Support for New World Kids nonprofit mission'
    ],
    contact_info: 'consignment@thelastcollection.org',
    store_dashboard: {
      available: true,
      url: '/dashboard/commission',
      features: [
        'Track your consigned items',
        'View real-time bidding activity',
        'Monitor earnings and payment status',
        'Access sales analytics',
        'Upload new items for consideration'
      ]
    },
    revenue_split: {
      seller_percentage: 92,
      platform_fee: 8,
      supports_nonprofit: true,
      nonprofit_name: 'New World Kids'
    },
    item_categories_accepted: [
      'High-value furniture ($100+)',
      'Vintage electronics',
      'Collectible sports cards and memorabilia',
      'Comics and graphic novels',
      'Original artwork and prints'
    ],
    regional_note: 'Commission program available for Pacific Northwest region sellers'
  };

  return NextResponse.json(commissionInfo, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    }
  });
}
