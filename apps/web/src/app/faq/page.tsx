/**
 * FAQ Page
 * 
 * Comprehensive FAQ that is also callable via ChatGPT plugin.
 * Organized by topic for easy navigation.
 */

import { FAQJsonLd } from '@/components/seo/json-ld';

export const metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about auctions, donations, commissions, and more at The Last Collection.',
};

interface FAQItem {
  topic: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  // Bidding
  {
    topic: 'Bidding',
    question: 'How does bidding work?',
    answer: 'Place your bid on any active auction. If someone outbids you, you\'ll be notified. Auctions have anti-sniping protection - if a bid is placed in the last 60 seconds, the auction extends by another 60 seconds to ensure fair bidding.'
  },
  {
    topic: 'Bidding',
    question: 'Can I cancel a bid?',
    answer: 'You have 10 minutes after placing a bid to cancel it if it was placed accidentally. After that, bids are binding to ensure fairness to other bidders. Contact us immediately if you have concerns about a bid.'
  },
  {
    topic: 'Bidding',
    question: 'What happens if I win an auction?',
    answer: 'You\'ll receive an email with payment instructions and pickup details. Payment is due within 48 hours, and items must be collected within 7 days unless other arrangements are made.'
  },
  
  // Donations
  {
    topic: 'Donations',
    question: 'Are donations tax-deductible?',
    answer: 'Yes! The Last Collection is operated by New World Kids, a 501(c)(3) nonprofit organization. You\'ll receive a tax receipt for donated items. Consult your tax advisor for specific deduction amounts.'
  },
  {
    topic: 'Donations',
    question: 'What items do you accept?',
    answer: 'We accept furniture, electronics, sports cards, comics, and art in good condition. Items must be functional and clean. Visit our Donation Guidelines page for detailed acceptance criteria.'
  },
  {
    topic: 'Donations',
    question: 'How do I schedule a donation?',
    answer: 'You can submit items through our donation form, or contact us directly at donations@thelastcollection.org. For large items, we offer free pickup for donations valued over $100 within the Seattle metro area.'
  },

  // Pickup & Delivery
  {
    topic: 'Pickup',
    question: 'Do you offer pickup for donated items?',
    answer: 'Yes! We offer free pickup for items valued over $100 within the Seattle metro area. There\'s a $25 fee for smaller items. Small items can also be dropped off at our Seattle location Monday-Friday 9am-5pm.'
  },
  {
    topic: 'Pickup',
    question: 'How do I collect items I won?',
    answer: 'After winning an auction, you\'ll receive pickup instructions via email. Items are available at our Seattle warehouse Monday-Friday 9am-5pm. For larger items or bulk purchases, we can arrange delivery for an additional fee.'
  },
  {
    topic: 'Pickup',
    question: 'Where is your location?',
    answer: 'Our warehouse is located in Seattle, WA. The exact address will be provided to winning bidders and donors scheduling pickups. We serve the greater Seattle area including Tacoma, Bellevue, and surrounding communities.'
  },

  // Commission/Consignment
  {
    topic: 'Commission',
    question: 'How does consignment work?',
    answer: 'Submit your item for review through our dashboard or by contacting consignment@thelastcollection.org. If accepted, we handle professional photography, listing, and marketing. You receive 92% of the final sale price. Minimum item value is $100.'
  },
  {
    topic: 'Commission',
    question: 'When do I get paid for consigned items?',
    answer: 'Payment is processed within 5 business days after the item is picked up by the buyer. You can track earnings and payment status in your commission dashboard.'
  },
  {
    topic: 'Commission',
    question: 'What is the commission rate?',
    answer: 'We charge an 8% platform fee, meaning you receive 92% of the final sale price. This fee covers professional photography, listing optimization, marketing, secure payment processing, and supports our nonprofit mission.'
  },
  {
    topic: 'Commission',
    question: 'Can I set a reserve price for my items?',
    answer: 'Yes! When submitting items for consignment, you can set a minimum acceptable price. Items that don\'t meet the reserve won\'t be sold, and they can be returned to you or re-listed.'
  },

  // General
  {
    topic: 'General',
    question: 'What is The Last Collection?',
    answer: 'We\'re a circular economy marketplace that auctions quality used items to fund New World Kids\' nonprofit work. Every purchase and donation makes a difference in the Pacific Northwest community by keeping good items in use and supporting our mission.'
  },
  {
    topic: 'General',
    question: 'Is the platform available in Spanish?',
    answer: 'Yes! The entire platform is available in both English and Spanish. Use the language toggle in the header to switch between languages.'
  },
  {
    topic: 'General',
    question: 'How does this support sustainability?',
    answer: 'By keeping quality items in use, we divert thousands of pounds from landfills annually and prevent significant CO2 emissions. Each item listing shows its estimated environmental impact, including CO2 saved and landfill weight diverted.'
  },
  {
    topic: 'General',
    question: 'Can I use this from my phone?',
    answer: 'Absolutely! Our platform is fully responsive and works great on mobile devices. We also have PWA (Progressive Web App) capabilities, allowing you to install it on your phone for an app-like experience.'
  },
  {
    topic: 'General',
    question: 'Do you have a ChatGPT plugin?',
    answer: 'Yes! You can interact with The Last Collection through ChatGPT. Ask about available auctions, donation guidelines, commission information, or get help with anything related to sustainable reuse in the Pacific Northwest.'
  }
];

// Group FAQs by topic
const faqsByTopic = faqs.reduce((acc, faq) => {
  if (!acc[faq.topic]) {
    acc[faq.topic] = [];
  }
  acc[faq.topic].push(faq);
  return acc;
}, {} as Record<string, FAQItem[]>);

export default function FAQPage() {
  return (
    <>
      <FAQJsonLd 
        faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} 
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to common questions about auctions, donations, commissions, and more.
          </p>

          {/* Search hint */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8">
            <p className="text-sm">
              <strong>💡 Tip:</strong> You can also ask these questions through our ChatGPT plugin for conversational help!
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(faqsByTopic).map(([topic, topicFaqs]) => (
              <div key={topic}>
                <h2 className="text-2xl font-bold mb-4 text-primary">{topic}</h2>
                <div className="space-y-4">
                  {topicFaqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              We're here to help! Reach out through any of these channels:
            </p>
            <div className="space-y-2 text-sm">
              <p>📧 Email: <a href="mailto:support@thelastcollection.org" className="text-primary hover:underline">support@thelastcollection.org</a></p>
              <p>💬 Ask via ChatGPT plugin for instant answers</p>
              <p>📍 Visit us: Seattle, WA (appointment required)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
