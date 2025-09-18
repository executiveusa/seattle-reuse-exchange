/**
 * AI-CHAT: Example React component demonstrating email service integration
 * Shows how to use email service in auction workflows
 */

'use client';

import React, { useState } from 'react';
import { useEmailService, EmailTemplates } from '@/lib/email-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

export function EmailTestComponent() {
  const { loading, error, sendEmail, sendAuctionWinNotification, sendMagicLink } = useEmailService();
  const [testEmail, setTestEmail] = useState('');

  // AI-CHAT: Test basic email sending
  const handleSendTestEmail = async () => {
    if (!testEmail) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await sendEmail({
        from: 'Seattle Reuse Exchange <test@seattlereuse.exchange>',
        to: [testEmail],
        subject: 'Test Email from Seattle Reuse Exchange',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>🧪 Test Email</h1>
            <p>This is a test email from your Seattle Reuse Exchange platform!</p>
            <p>If you're seeing this, your email integration is working perfectly.</p>
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>🤖 AI-Enhanced Features</h3>
              <ul>
                <li>Auction win notifications with pickup details</li>
                <li>Magic link authentication</li>
                <li>Bid confirmations with strategy suggestions</li>
                <li>Environmental impact reporting</li>
              </ul>
            </div>
            <p>Happy bidding! 🌱</p>
          </div>
        `,
      });

      if (result.success) {
        toast({
          title: 'Success!',
          description: `Test email sent successfully. ID: ${result.id}`,
        });
      } else {
        throw new Error(result.message || 'Failed to send email');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to send test email',
        variant: 'destructive',
      });
    }
  };

  // AI-CHAT: Test auction win notification
  const handleSendAuctionWinTest = async () => {
    if (!testEmail) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await sendAuctionWinNotification({
        winner_email: testEmail,
        winner_name: 'Test Winner',
        auction_id: 'AUC-12345',
        item_title: 'Ergonomic Office Chair - Herman Miller Aeron',
        winning_bid: 425.00,
        pickup_location: 'Seattle Reuse Exchange Warehouse, 123 Green St, Seattle WA',
        pickup_deadline: 'Friday, December 22, 2023 at 5:00 PM',
        payment_link: 'https://seattlereuse.exchange/payment/AUC-12345',
        environmental_impact: 'By purchasing this item, you prevented 45 lbs of furniture from entering landfills and saved approximately 23 lbs of CO2 emissions from manufacturing.',
      });

      if (result.success) {
        toast({
          title: 'Success!',
          description: `Auction win notification sent! ID: ${result.id}`,
        });
      } else {
        throw new Error(result.message || 'Failed to send notification');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to send auction win notification',
        variant: 'destructive',
      });
    }
  };

  // AI-CHAT: Test magic link authentication
  const handleSendMagicLinkTest = async () => {
    if (!testEmail) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await sendMagicLink({
        email: testEmail,
        name: 'Test User',
        login_url: 'https://seattlereuse.exchange/auth/magic-link?token=test-token-123',
        expires_at: 'December 21, 2023 at 6:00 PM PST',
      });

      if (result.success) {
        toast({
          title: 'Success!',
          description: `Magic link sent! ID: ${result.id}`,
        });
      } else {
        throw new Error(result.message || 'Failed to send magic link');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to send magic link',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">📧 Email Service Testing</h2>
        <p className="text-muted-foreground mb-6">
          Test the integrated Resend email service with various email types used throughout the platform.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="test-email" className="block text-sm font-medium mb-2">
              Test Email Address
            </label>
            <Input
              id="test-email"
              type="email"
              placeholder="your-email@example.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleSendTestEmail}
              disabled={loading || !testEmail}
              className="w-full"
            >
              {loading ? 'Sending...' : 'Send Test Email'}
            </Button>

            <Button
              onClick={handleSendAuctionWinTest}
              disabled={loading || !testEmail}
              variant="outline"
              className="w-full"
            >
              {loading ? 'Sending...' : 'Test Auction Win'}
            </Button>

            <Button
              onClick={handleSendMagicLinkTest}
              disabled={loading || !testEmail}
              variant="outline"
              className="w-full"
            >
              {loading ? 'Sending...' : 'Test Magic Link'}
            </Button>
          </div>

          {error && (
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">🤖 AI-Enhanced Email Features</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• <strong>Auction Win Notifications:</strong> Includes pickup details, payment links, and environmental impact</li>
          <li>• <strong>Magic Link Authentication:</strong> Passwordless login with security and UX best practices</li>
          <li>• <strong>Bid Confirmations:</strong> Real-time status updates with AI-powered bidding suggestions</li>
          <li>• <strong>Batch Notifications:</strong> Efficient bulk email sending for auction alerts</li>
          <li>• <strong>Environmental Impact:</strong> Each email includes sustainability metrics and impact data</li>
        </ul>
      </div>

      <div className="border rounded-lg p-6 bg-muted/50">
        <h3 className="text-lg font-semibold mb-4">⚙️ Setup Instructions</h3>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li>1. Get your Resend API key from <a href="https://resend.com/" target="_blank" className="text-blue-600 hover:underline">resend.com</a></li>
          <li>2. Update <code>RESEND_API_KEY</code> in your <code>.env</code> file</li>
          <li>3. Update <code>RESEND_API_KEY</code> in <code>services/api/.env.encore</code></li>
          <li>4. Restart your Encore backend: <code>cd services/api && encore run</code></li>
          <li>5. Test the email service using the buttons above</li>
        </ol>
      </div>
    </div>
  );
}