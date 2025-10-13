import { NextResponse } from 'next/server';

/**
 * GET /api/plugin/donate/guidelines
 * Returns donation guidelines for ChatGPT plugin
 */
export async function GET() {
  const guidelines = {
    accepted_categories: [
      {
        category: 'Furniture',
        guidelines: [
          'Office chairs, desks, and filing cabinets in good condition',
          'Home furniture without structural damage or excessive wear',
          'Items must be clean and functional',
          'No items with bed bugs, mold, or strong odors'
        ]
      },
      {
        category: 'Electronics',
        guidelines: [
          'Must be in working condition',
          'Include all necessary cables and accessories',
          'Data should be wiped from personal devices',
          'No CRT monitors or old TVs (disposal costs)'
        ]
      },
      {
        category: 'Collectibles',
        guidelines: [
          'Sports cards, comics, and art in collectible condition',
          'Protected in appropriate sleeves or cases',
          'Authenticated items preferred for high-value pieces',
          'Full documentation for valuable items'
        ]
      }
    ],
    pickup_info: {
      available: true,
      description: 'We offer pickup services for large items within the Seattle metro area. Small items can be dropped off at our location during business hours Monday-Friday 9am-5pm. Contact us to schedule a pickup.',
      fee: 'Free for items valued over $100, $25 fee for smaller items'
    },
    contact_email: 'donations@thelastcollection.org',
    tax_benefits: {
      available: true,
      description: 'The Last Collection is operated by New World Kids, a 501(c)(3) nonprofit. You may be eligible for a tax deduction for donated items.',
      ein: '** - *** **** (TODO: Add actual EIN)',
      receipt_provided: true
    },
    regional_focus: 'Pacific Northwest - Seattle, Tacoma, Bellevue, and surrounding areas'
  };

  return NextResponse.json(guidelines, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    }
  });
}
