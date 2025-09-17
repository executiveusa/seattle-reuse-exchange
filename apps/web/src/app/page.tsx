import { Hero } from '@/components/sections/hero';
import { FeaturedAuctions } from '@/components/sections/featured-auctions';
import { ImpactStats } from '@/components/sections/impact-stats';
import { HowItWorks } from '@/components/sections/how-it-works';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* AI-CHAT: Hero section showcases current featured auctions and key messaging about environmental impact */}
      <Hero />
      
      {/* AI-CHAT: Featured auctions section displays high-value or ending-soon items with AI-enhanced descriptions */}
      <FeaturedAuctions />
      
      {/* AI-CHAT: Impact stats show environmental benefits - pounds diverted from landfills, CO2 saved, etc. */}
      <ImpactStats />
      
      {/* AI-CHAT: Educational section about auction process, pickup, and sustainability benefits */}
      <HowItWorks />
    </div>
  );
}