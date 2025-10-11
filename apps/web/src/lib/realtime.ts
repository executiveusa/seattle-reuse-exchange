/**
 * Real-time WebSocket client for bidding updates
 * Supports reconnection with exponential backoff
 */

type BidEvent = {
  type: 'bid:new' | 'bid:update' | 'auction:close';
  auctionId: string;
  bidId?: string;
  amount?: number;
  userId?: string;
  timestamp: string;
};

type RealtimeEventHandler = (event: BidEvent) => void;

export class RealtimeClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private baseDelay = 1000; // 1 second
  private eventHandlers: Map<string, RealtimeEventHandler[]> = new Map();
  private url: string;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  constructor(url?: string) {
    // Use environment variable or default to local WebSocket endpoint
    this.url = url || process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000/v1/realtime';
  }

  /**
   * Connect to WebSocket server
   */
  connect() {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('[Realtime] Connected to WebSocket');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as BidEvent;
          this.handleEvent(data);
        } catch (error) {
          console.error('[Realtime] Failed to parse message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('[Realtime] WebSocket error:', error);
      };

      this.ws.onclose = () => {
        console.log('[Realtime] WebSocket closed');
        this.scheduleReconnect();
      };
    } catch (error) {
      console.error('[Realtime] Failed to connect:', error);
      this.scheduleReconnect();
    }
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  /**
   * Subscribe to auction events
   */
  subscribe(auctionId: string, handler: RealtimeEventHandler) {
    const key = `auction:${auctionId}`;
    const handlers = this.eventHandlers.get(key) || [];
    handlers.push(handler);
    this.eventHandlers.set(key, handlers);

    // Send subscription message to server
    this.send({
      type: 'subscribe',
      auctionId,
    });

    // Return unsubscribe function
    return () => this.unsubscribe(auctionId, handler);
  }

  /**
   * Unsubscribe from auction events
   */
  private unsubscribe(auctionId: string, handler: RealtimeEventHandler) {
    const key = `auction:${auctionId}`;
    const handlers = this.eventHandlers.get(key) || [];
    const filtered = handlers.filter((h) => h !== handler);
    
    if (filtered.length === 0) {
      this.eventHandlers.delete(key);
      this.send({
        type: 'unsubscribe',
        auctionId,
      });
    } else {
      this.eventHandlers.set(key, filtered);
    }
  }

  /**
   * Send message to server
   */
  private send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  /**
   * Handle incoming events
   */
  private handleEvent(event: BidEvent) {
    const key = `auction:${event.auctionId}`;
    const handlers = this.eventHandlers.get(key) || [];
    handlers.forEach((handler) => handler(event));
  }

  /**
   * Reconnect with exponential backoff
   */
  private scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('[Realtime] Max reconnection attempts reached');
      return;
    }

    const delay = this.baseDelay * Math.pow(2, this.reconnectAttempts);
    this.reconnectAttempts++;

    console.log(`[Realtime] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);

    this.reconnectTimeout = setTimeout(() => {
      this.connect();
    }, delay);
  }
}

// Export singleton instance
let realtimeClient: RealtimeClient | null = null;

export function getRealtimeClient(): RealtimeClient {
  if (!realtimeClient) {
    realtimeClient = new RealtimeClient();
  }
  return realtimeClient;
}
