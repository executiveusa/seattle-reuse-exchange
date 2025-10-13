import { NextResponse } from 'next/server';

/**
 * GET /api/plugin/region/info
 * Returns Pacific Northwest region information for ChatGPT plugin
 */
export async function GET() {
  const regionInfo = {
    region: 'Pacific Northwest',
    primary_location: 'Seattle, Washington',
    service_area: [
      'Seattle, WA',
      'Tacoma, WA',
      'Bellevue, WA',
      'Everett, WA',
      'Redmond, WA',
      'Kirkland, WA',
      'Renton, WA',
      'Federal Way, WA'
    ],
    local_impact: {
      items_diverted: 10247,
      co2_saved_kg: 52183,
      landfill_weight_kg: 23456,
      community_members_served: 2543,
      last_updated: '2025-10-01'
    },
    pickup_locations: [
      {
        name: 'The Last Collection - Seattle Warehouse',
        address: '1234 Reuse Way, Seattle, WA 98101',
        hours: 'Monday-Friday 9am-5pm',
        phone: '(206) 555-0100',
        coordinates: {
          lat: 47.6062,
          lng: -122.3321
        }
      }
    ],
    regional_initiatives: [
      {
        name: 'PNW Reuse Coalition',
        description: 'Partnership with local businesses to promote circular economy',
        participants: 45
      },
      {
        name: 'Seattle Tech Reuse Program',
        description: 'Specialized program for tech company surplus equipment',
        companies: 12
      },
      {
        name: 'Furniture Bank Partnership',
        description: 'Collaboration with local furniture banks for community distribution',
        items_donated: 856
      }
    ],
    sustainability_focus: {
      rainwater_harvesting: true,
      solar_powered: false,
      electric_vehicle_fleet: true,
      zero_waste_goal: true,
      local_sourcing: 'All items sourced within 50 miles of Seattle'
    },
    community_message: 'Support Seattle and the Pacific Northwest by choosing reuse! Every item keeps our region greener and supports New World Kids\' mission.',
    branding: {
      tagline: 'Keep Good Stuff Out of Pacific Northwest Landfills',
      regional_pride: 'Proudly serving the Emerald City and beyond'
    }
  };

  return NextResponse.json(regionInfo, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    }
  });
}
