/**
 * Analytics and Telemetry Module
 * 
 * Privacy-preserving event logging for measuring usage across ChatGPT app, web, and mobile.
 * No PII is collected without explicit consent.
 */

export type EventCategory = 
  | 'search'
  | 'auction'
  | 'donation'
  | 'commission'
  | 'navigation'
  | 'error'
  | 'plugin'
  | 'user';

export interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  context?: 'web' | 'mobile' | 'chatgpt' | 'unknown';
  timestamp?: number;
  sessionId?: string;
  metadata?: Record<string, any>;
}

class Analytics {
  private enabled: boolean = true;
  private events: AnalyticsEvent[] = [];
  private readonly maxQueueSize = 100;
  private flushInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Check for DNT (Do Not Track)
    if (typeof window !== 'undefined') {
      const dnt = navigator.doNotTrack || (window as any).doNotTrack || (navigator as any).msDoNotTrack;
      if (dnt === '1' || dnt === 'yes') {
        this.enabled = false;
        console.log('[Analytics] Do Not Track is enabled. Analytics disabled.');
      }
    }

    // Auto-flush every 30 seconds
    if (typeof window !== 'undefined') {
      this.flushInterval = setInterval(() => this.flush(), 30000);
    }
  }

  /**
   * Track an event
   */
  track(event: AnalyticsEvent): void {
    if (!this.enabled) return;

    const enrichedEvent: AnalyticsEvent = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      context: event.context || this.detectContext(),
      sessionId: event.sessionId || this.getSessionId(),
    };

    this.events.push(enrichedEvent);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', enrichedEvent);
    }

    // Auto-flush if queue is full
    if (this.events.length >= this.maxQueueSize) {
      this.flush();
    }
  }

  /**
   * Track search event
   */
  trackSearch(query: string, resultsCount: number, context?: string): void {
    this.track({
      category: 'search',
      action: 'search_performed',
      label: query,
      value: resultsCount,
      context: context as any,
      metadata: {
        query_length: query.length,
      }
    });
  }

  /**
   * Track auction view
   */
  trackAuctionView(auctionId: string, category?: string): void {
    this.track({
      category: 'auction',
      action: 'auction_viewed',
      label: auctionId,
      metadata: { category }
    });
  }

  /**
   * Track bid placement
   */
  trackBidPlaced(auctionId: string, bidAmount: number): void {
    this.track({
      category: 'auction',
      action: 'bid_placed',
      label: auctionId,
      value: bidAmount
    });
  }

  /**
   * Track donation submission
   */
  trackDonation(type: 'cash' | 'goods', value?: number): void {
    this.track({
      category: 'donation',
      action: 'donation_submitted',
      label: type,
      value
    });
  }

  /**
   * Track commission inquiry
   */
  trackCommissionInquiry(itemCategory?: string): void {
    this.track({
      category: 'commission',
      action: 'commission_inquiry',
      label: itemCategory
    });
  }

  /**
   * Track error
   */
  trackError(errorType: string, message: string, stack?: string): void {
    this.track({
      category: 'error',
      action: errorType,
      label: message,
      metadata: { stack }
    });
  }

  /**
   * Track plugin interaction
   */
  trackPluginInteraction(endpoint: string, method: string): void {
    this.track({
      category: 'plugin',
      action: 'api_call',
      label: `${method} ${endpoint}`,
      context: 'chatgpt'
    });
  }

  /**
   * Track language change
   */
  trackLanguageChange(from: string, to: string): void {
    this.track({
      category: 'user',
      action: 'language_changed',
      label: `${from}_to_${to}`
    });
  }

  /**
   * Flush events to server
   */
  private async flush(): Promise<void> {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    try {
      // TODO: Send to analytics backend
      if (typeof window !== 'undefined') {
        await fetch('/api/analytics/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ events: eventsToSend }),
          // Don't wait for response
          keepalive: true,
        }).catch(err => {
          console.warn('[Analytics] Failed to send events:', err);
          // Re-queue failed events
          this.events.push(...eventsToSend);
        });
      }
    } catch (error) {
      console.warn('[Analytics] Flush error:', error);
      // Re-queue failed events
      this.events.push(...eventsToSend);
    }
  }

  /**
   * Detect context (web, mobile, ChatGPT)
   */
  private detectContext(): 'web' | 'mobile' | 'chatgpt' | 'unknown' {
    if (typeof window === 'undefined') return 'unknown';

    // Check for ChatGPT user agent or referrer
    const userAgent = navigator.userAgent.toLowerCase();
    const referrer = document.referrer.toLowerCase();
    
    if (referrer.includes('chat.openai.com') || userAgent.includes('chatgpt')) {
      return 'chatgpt';
    }

    // Check for mobile
    if (/mobile|android|iphone|ipad|ipod/i.test(userAgent)) {
      return 'mobile';
    }

    return 'web';
  }

  /**
   * Get or create session ID
   */
  private getSessionId(): string {
    if (typeof window === 'undefined') return 'server';

    const key = 'analytics_session_id';
    let sessionId = sessionStorage.getItem(key);
    
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem(key, sessionId);
    }

    return sessionId;
  }

  /**
   * Disable analytics
   */
  disable(): void {
    this.enabled = false;
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
  }

  /**
   * Enable analytics
   */
  enable(): void {
    this.enabled = true;
    if (!this.flushInterval && typeof window !== 'undefined') {
      this.flushInterval = setInterval(() => this.flush(), 30000);
    }
  }
}

// Singleton instance
export const analytics = new Analytics();

// Export for use in components
export default analytics;
