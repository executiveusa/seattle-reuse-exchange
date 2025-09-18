/**
 * AI-CHAT: Frontend email client for interacting with our Encore email service
 * Provides typed interfaces for all email operations in the platform
 */

import { useState } from 'react';

// AI-CHAT: Email API client configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// AI-CHAT: Type definitions matching backend structures
export interface EmailRequest {
  from: string;
  to: string[];
  subject: string;
  html?: string;
  text?: string;
  reply_to?: string;
}

export interface EmailResponse {
  id: string;
  success: boolean;
  message?: string;
}

export interface BatchEmailRequest {
  emails: EmailRequest[];
}

export interface BatchEmailResponse {
  data: EmailResponse[];
  success: boolean;
}

// AI-CHAT: Specialized email request types
export interface AuctionWinEmailRequest {
  winner_email: string;
  winner_name: string;
  auction_id: string;
  item_title: string;
  winning_bid: number;
  pickup_location: string;
  pickup_deadline: string;
  payment_link: string;
  environmental_impact: string;
}

export interface MagicLinkEmailRequest {
  email: string;
  name: string;
  login_url: string;
  expires_at: string;
}

export interface BidConfirmationEmailRequest {
  bidder_email: string;
  bidder_name: string;
  item_title: string;
  bid_amount: number;
  current_high: number;
  next_min_bid: number;
  auction_end_time: string;
  item_url: string;
}

// AI-CHAT: Email service client class
export class EmailService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // AI-CHAT: Send single email
  async sendEmail(request: EmailRequest): Promise<EmailResponse> {
    const response = await fetch(`${this.baseUrl}/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }

    return response.json();
  }

  // AI-CHAT: Send batch emails for bulk notifications
  async sendBatchEmails(request: BatchEmailRequest): Promise<BatchEmailResponse> {
    const response = await fetch(`${this.baseUrl}/email/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to send batch emails: ${response.statusText}`);
    }

    return response.json();
  }

  // AI-CHAT: Send auction win notification with pickup details
  async sendAuctionWinNotification(request: AuctionWinEmailRequest): Promise<EmailResponse> {
    const response = await fetch(`${this.baseUrl}/email/auction-win`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to send auction win notification: ${response.statusText}`);
    }

    return response.json();
  }

  // AI-CHAT: Send magic link for passwordless authentication
  async sendMagicLink(request: MagicLinkEmailRequest): Promise<EmailResponse> {
    const response = await fetch(`${this.baseUrl}/email/magic-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to send magic link: ${response.statusText}`);
    }

    return response.json();
  }

  // AI-CHAT: Send bid confirmation with current auction status
  async sendBidConfirmation(request: BidConfirmationEmailRequest): Promise<EmailResponse> {
    const response = await fetch(`${this.baseUrl}/email/bid-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to send bid confirmation: ${response.statusText}`);
    }

    return response.json();
  }
}

// AI-CHAT: Export singleton instance for use throughout the app
export const emailService = new EmailService();

// AI-CHAT: React hook for email operations with loading states
export function useEmailService() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmailWithState = async (request: EmailRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await emailService.sendEmail(request);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send email';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendAuctionWinNotificationWithState = async (request: AuctionWinEmailRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await emailService.sendAuctionWinNotification(request);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send auction win notification';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendMagicLinkWithState = async (request: MagicLinkEmailRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await emailService.sendMagicLink(request);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send magic link';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    sendEmail: sendEmailWithState,
    sendAuctionWinNotification: sendAuctionWinNotificationWithState,
    sendMagicLink: sendMagicLinkWithState,
  };
}

// AI-CHAT: Utility functions for email templates and validation
export const EmailTemplates = {
  // AI-CHAT: Generate welcome email for new users
  welcomeEmail: (name: string, loginUrl: string): EmailRequest => ({
    from: 'Seattle Reuse Exchange <welcome@seattlereuse.exchange>',
    to: [name],
    subject: 'Welcome to Seattle Reuse Exchange! 🌱',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Welcome to Seattle Reuse Exchange!</h1>
        <p>Hi there!</p>
        <p>Thank you for joining our mission to keep good stuff out of landfills while supporting local nonprofits.</p>
        <h2>What you can do:</h2>
        <ul>
          <li>🏷️ Bid on rescued office furniture and equipment</li>
          <li>💚 Support environmental sustainability</li>
          <li>🤝 Fund local nonprofit reuse programs</li>
          <li>🔍 Get AI-powered insights on every item</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${loginUrl}" style="background-color: #16a34a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Start Exploring Auctions
          </a>
        </div>
        <p>Happy bidding!</p>
        <p><em>The Seattle Reuse Exchange Team</em></p>
      </div>
    `,
  }),

  // AI-CHAT: Generate auction ending soon notification
  auctionEndingSoon: (itemTitle: string, timeLeft: string, currentBid: number, itemUrl: string): EmailRequest => ({
    from: 'Seattle Reuse Exchange <alerts@seattlereuse.exchange>',
    to: [], // Recipient added when sending
    subject: `⏰ Ending Soon: ${itemTitle} - Current bid $${currentBid}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>⏰ Auction Ending Soon!</h1>
        <h2>${itemTitle}</h2>
        <p><strong>Current High Bid:</strong> $${currentBid}</p>
        <p><strong>Time Remaining:</strong> ${timeLeft}</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${itemUrl}" style="background-color: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Place Your Bid Now
          </a>
        </div>
        <p>Don't miss out on this great find!</p>
      </div>
    `,
  }),
};

// AI-CHAT: Email validation utilities
export const EmailValidation = {
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validateEmailRequest: (request: EmailRequest): string[] => {
    const errors: string[] = [];
    
    if (!request.from) errors.push('From address is required');
    if (!request.to || request.to.length === 0) errors.push('At least one recipient is required');
    if (!request.subject) errors.push('Subject is required');
    if (!request.html && !request.text) errors.push('Either HTML or text content is required');
    
    // Validate email addresses
    if (request.from && !EmailValidation.validateEmail(request.from.split('<')[1]?.split('>')[0] || request.from)) {
      errors.push('Invalid from email address');
    }
    
    request.to.forEach((email, index) => {
      if (!EmailValidation.validateEmail(email)) {
        errors.push(`Invalid recipient email at index ${index}: ${email}`);
      }
    });

    return errors;
  },
};