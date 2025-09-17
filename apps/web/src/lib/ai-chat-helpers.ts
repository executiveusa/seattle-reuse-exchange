// AI Chat Integration Helper Functions
// This module provides AI-enhanced product information and bidding insights

export interface ProductChatContext {
  itemId: string;
  title: string;
  description: string;
  condition: string;
  category: string;
  currentBid?: number;
  buyNowPrice?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
    units: string;
  };
  weight?: number;
  images: string[];
}

export interface BiddingChatContext {
  auctionId: string;
  currentBid: number;
  bidCount: number;
  timeRemaining: string;
  reservePrice: number;
  minIncrement: number;
  userBidHistory: number[];
}

export class AIProductAssistant {
  /**
   * AI-CHAT: Generates detailed product information for items
   * Provides context-aware descriptions based on item type and condition
   */
  static generateProductInsights(item: ProductChatContext): string[] {
    const insights: string[] = [];

    // Condition-specific insights
    switch (item.condition) {
      case 'like_new':
        insights.push("This item is in excellent condition with minimal signs of use. You're getting near-new quality at a fraction of the retail price.");
        break;
      case 'good':
        insights.push("This item shows normal wear from regular use but remains fully functional. A great balance of quality and value.");
        break;
      case 'fair':
        insights.push("This item has visible wear but is still functional. Perfect for budget-conscious buyers or those planning refurbishment.");
        break;
    }

    // Category-specific expertise
    if (item.category === 'Office Chairs') {
      insights.push(...this.getOfficeChairInsights(item));
    } else if (item.category === 'Desks') {
      insights.push(...this.getDeskInsights(item));
    } else if (item.category === 'Electronics') {
      insights.push(...this.getElectronicsInsights(item));
    }

    // Environmental impact
    insights.push(`By purchasing this item, you're helping divert furniture from landfills and reducing environmental waste. Every reused item makes a difference!`);

    return insights;
  }

  /**
   * AI-CHAT: Provides specialized insights for office chairs
   * Herman Miller Aeron chairs get special treatment with detailed ergonomic info
   */
  private static getOfficeChairInsights(item: ProductChatContext): string[] {
    const insights: string[] = [];

    if (item.title.toLowerCase().includes('herman miller')) {
      insights.push("Herman Miller chairs are considered the gold standard of office seating. Known for exceptional build quality and ergonomic design.");
      
      if (item.title.toLowerCase().includes('aeron')) {
        insights.push("The Aeron chair features revolutionary breathable mesh fabric that keeps you cool during long work sessions.");
        insights.push("Original retail price typically ranges from $1,200-$1,600 depending on size and features.");
        insights.push("Built to last 12+ years with proper care - this is an investment in your health and productivity.");
      }
    }

    // Size recommendations based on dimensions
    if (item.dimensions) {
      const width = item.dimensions.width;
      if (width < 25) {
        insights.push("This appears to be a Size A chair, suitable for users 5'0\" and under.");
      } else if (width >= 25 && width < 27) {
        insights.push("This appears to be a Size B chair, suitable for users 5'0\" to 6'2\".");
      } else if (width >= 27) {
        insights.push("This appears to be a Size C chair, suitable for users 6'2\" and taller.");
      }
    }

    insights.push("Pro tip: Test the chair's adjustments before the auction ends - good ergonomic chairs should feel comfortable immediately.");

    return insights;
  }

  /**
   * AI-CHAT: Provides insights for desk purchases
   */
  private static getDeskInsights(item: ProductChatContext): string[] {
    const insights: string[] = [];

    if (item.title.toLowerCase().includes('standing')) {
      insights.push("Standing desks promote better posture and can increase energy levels throughout the day.");
      insights.push("Look for desks with memory presets - they make transitioning between sitting and standing much easier.");
      insights.push("Consider the weight capacity if you plan to use multiple monitors or heavy equipment.");
    }

    if (item.dimensions) {
      const surface = item.dimensions.width * item.dimensions.depth;
      if (surface >= 1800) { // 60" x 30" = 1800 sq in
        insights.push("This desk provides ample space for dual monitor setups or spread-out work.");
      } else if (surface >= 1200) {
        insights.push("Perfect size for single monitor setup with room for paperwork and accessories.");
      } else {
        insights.push("Compact size ideal for small spaces or as a secondary workspace.");
      }
    }

    return insights;
  }

  /**
   * AI-CHAT: Provides insights for electronics
   */
  private static getElectronicsInsights(item: ProductChatContext): string[] {
    const insights: string[] = [];

    if (item.title.toLowerCase().includes('macbook')) {
      insights.push("MacBooks hold their value exceptionally well. Check the battery cycle count if possible.");
      insights.push("Ensure you can sign out of the previous owner's Apple ID before completing purchase.");
      
      if (item.title.includes('2019')) {
        insights.push("The 2019 MacBook Pro was the last model with the controversial butterfly keyboard. Consider this if typing comfort is important.");
      }
    }

    insights.push("Always verify functionality before bidding on electronics - ask for proof of working condition.");
    insights.push("Factor in potential software licensing costs when calculating your maximum bid.");

    return insights;
  }

  /**
   * AI-CHAT: Provides strategic bidding advice
   */
  static generateBiddingStrategy(context: BiddingChatContext): string[] {
    const strategies: string[] = [];

    // Time-based strategy
    const timeLeft = this.parseTimeRemaining(context.timeRemaining);
    if (timeLeft <= 2) { // Less than 2 hours
      strategies.push("⏰ Auction ending soon! Be prepared for increased bidding activity.");
      strategies.push("💡 Pro tip: Our anti-sniping protection extends auctions by 2 minutes if bids are placed in the final moments.");
    } else if (timeLeft <= 24) { // Less than 24 hours
      strategies.push("📈 Consider placing a competitive bid soon - bidding activity typically increases in the final 24 hours.");
    } else {
      strategies.push("⏱️ Plenty of time left. You might want to wait and watch the bidding patterns.");
    }

    // Bid count analysis
    if (context.bidCount < 3) {
      strategies.push("🎯 Low bidding activity so far - you might have a good chance at this item.");
    } else if (context.bidCount > 10) {
      strategies.push("🔥 High interest item with lots of bidding activity. Set your maximum and stick to it!");
    }

    // Reserve price guidance
    if (context.currentBid < context.reservePrice) {
      strategies.push(`💰 Bidding hasn't reached the reserve price of $${context.reservePrice} yet.`);
    }

    // User-specific insights
    if (context.userBidHistory.length > 0) {
      const avgBid = context.userBidHistory.reduce((a, b) => a + b, 0) / context.userBidHistory.length;
      if (context.currentBid > avgBid * 1.5) {
        strategies.push("📊 This bid is significantly higher than your usual range. Make sure you're comfortable with the amount.");
      }
    }

    strategies.push("🎯 Remember: Set your maximum bid based on the item's value to you, not on beating other bidders.");

    return strategies;
  }

  /**
   * AI-CHAT: Calculates environmental impact of purchase
   */
  static calculateEnvironmentalImpact(item: ProductChatContext): {
    co2Saved: number;
    landfillDiverted: number;
    treesEquivalent: number;
  } {
    let weight = item.weight || this.estimateWeight(item);
    
    // Rough estimates based on lifecycle analysis studies
    const co2PerPound = 2.5; // kg CO2 equivalent per pound of furniture
    const treesPerTon = 16; // trees saved per ton of waste diverted
    
    return {
      co2Saved: weight * co2PerPound,
      landfillDiverted: weight,
      treesEquivalent: Math.round((weight / 2000) * treesPerTon * 100) / 100
    };
  }

  private static estimateWeight(item: ProductChatContext): number {
    // Estimate weight based on category and dimensions
    if (item.category === 'Office Chairs') return 35;
    if (item.category === 'Desks') return 80;
    if (item.category === 'Electronics') return 5;
    return 25; // Default
  }

  private static parseTimeRemaining(timeStr: string): number {
    // Parse time remaining string and return hours
    // Simple implementation - would need more robust parsing in production
    if (timeStr.includes('day')) {
      const days = parseInt(timeStr.match(/(\d+)\s*day/)?.[1] || '0');
      return days * 24;
    }
    if (timeStr.includes('hour')) {
      return parseInt(timeStr.match(/(\d+)\s*hour/)?.[1] || '0');
    }
    return 0;
  }
}

/**
 * AI-CHAT: React hook for integrating AI insights into components
 */
export function useAIProductInsights(item: ProductChatContext) {
  const insights = AIProductAssistant.generateProductInsights(item);
  const environmentalImpact = AIProductAssistant.calculateEnvironmentalImpact(item);
  
  return {
    insights,
    environmentalImpact,
    hasAIInsights: insights.length > 0
  };
}

/**
 * AI-CHAT: React hook for bidding strategy insights
 */
export function useAIBiddingStrategy(context: BiddingChatContext) {
  const strategies = AIProductAssistant.generateBiddingStrategy(context);
  
  return {
    strategies,
    hasBiddingTips: strategies.length > 0
  };
}