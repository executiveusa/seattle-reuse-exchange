import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/plugin/faq
 * Returns FAQ for ChatGPT plugin
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const topic = searchParams.get('topic');

  const allFAQs = [
    {
      topic: 'bidding',
      question: 'How does bidding work?',
      answer: 'Place your bid on any active auction. If someone outbids you, you\'ll be notified. Auctions have anti-sniping protection - if a bid is placed in the last 60 seconds, the auction extends by another 60 seconds.'
    },
    {
      topic: 'bidding',
      question: 'Can I cancel a bid?',
      answer: 'You have 10 minutes after placing a bid to cancel it if it was placed accidentally. After that, bids are binding. Contact us immediately if you have concerns.'
    },
    {
      topic: 'donations',
      question: 'Are donations tax-deductible?',
      answer: 'Yes! The Last Collection is operated by New World Kids, a 501(c)(3) nonprofit. You\'ll receive a tax receipt for donated items. Consult your tax advisor for specific deduction amounts.'
    },
    {
      topic: 'donations',
      question: 'What items do you accept?',
      answer: 'We accept furniture, electronics, sports cards, comics, and art in good condition. Items must be functional and clean. See our full donation guidelines at /donate/guidelines.'
    },
    {
      topic: 'pickup',
      question: 'Do you offer pickup for donated items?',
      answer: 'Yes! We offer free pickup for items valued over $100 within the Seattle metro area. There\'s a $25 fee for smaller items. Contact us to schedule.'
    },
    {
      topic: 'pickup',
      question: 'How do I collect items I won?',
      answer: 'After winning an auction, you\'ll receive pickup instructions via email. Items are available at our Seattle warehouse Monday-Friday 9am-5pm, or we can arrange delivery for larger items.'
    },
    {
      topic: 'commission',
      question: 'How does consignment work?',
      answer: 'Submit your item for review. If accepted, we handle photography, listing, and marketing. You receive 92% of the final sale price. Minimum item value is $100.'
    },
    {
      topic: 'commission',
      question: 'When do I get paid for consigned items?',
      answer: 'Payment is processed within 5 business days after the item is picked up by the buyer. You can track earnings in your dashboard.'
    },
    {
      topic: 'general',
      question: 'What is The Last Collection?',
      answer: 'We\'re a circular economy marketplace that auctions quality used items to fund New World Kids\' nonprofit work. Every purchase and donation makes a difference in the Pacific Northwest community.'
    },
    {
      topic: 'general',
      question: 'Where are you located?',
      answer: 'We\'re based in Seattle, WA, and serve the Pacific Northwest region including Seattle, Tacoma, Bellevue, and surrounding areas.'
    },
    {
      topic: 'general',
      question: 'How does this support sustainability?',
      answer: 'By keeping quality items in use, we divert thousands of pounds from landfills and prevent CO2 emissions. Each item listing shows its environmental impact.'
    }
  ];

  let filteredFAQs = allFAQs;
  if (topic && topic !== 'general') {
    filteredFAQs = allFAQs.filter(faq => faq.topic === topic);
  }

  return NextResponse.json({
    faqs: filteredFAQs,
    total: filteredFAQs.length,
    topics: ['bidding', 'donations', 'pickup', 'commission', 'general']
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    }
  });
}
