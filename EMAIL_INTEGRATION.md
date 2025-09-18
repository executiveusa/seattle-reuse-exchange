# 📧 Email Service Integration with Resend

## Overview

The Seattle Reuse Exchange platform now includes a comprehensive email service powered by Resend API. This integration provides AI-enhanced email notifications for auctions, authentication, and user communications.

## ✅ What's Implemented

### Backend Service (`services/api/email/`)
- ✅ **Complete Resend API integration** with Go/Encore
- ✅ **Auction win notifications** with pickup details and environmental impact
- ✅ **Magic link authentication** for passwordless login
- ✅ **Bid confirmations** with current status and strategy suggestions
- ✅ **Batch email sending** for bulk notifications
- ✅ **HTML email templates** with responsive design

### Frontend Integration (`apps/web/src/lib/email-client.ts`)
- ✅ **TypeScript client** with full type safety
- ✅ **React hooks** for email operations with loading states
- ✅ **Email templates** for common use cases
- ✅ **Validation utilities** for email addresses and requests
- ✅ **Error handling** with user-friendly messages

### Email Types Supported
1. **Basic Emails** - Custom HTML/text emails
2. **Auction Win Notifications** - Congratulations with pickup info
3. **Magic Link Authentication** - Passwordless login links
4. **Bid Confirmations** - Real-time auction status updates
5. **Batch Emails** - Bulk notifications and alerts

## 🚀 Quick Setup

### 1. Get Resend API Key
1. Go to [resend.com](https://resend.com/)
2. Sign up for free account (100 emails/day free)
3. Create API key in dashboard
4. Copy the key (starts with `re_`)

### 2. Update Environment Variables

**Root .env file:**
```bash
RESEND_API_KEY=re_YOUR_ACTUAL_API_KEY_HERE
```

**Backend .env.encore file:**
```bash
RESEND_API_KEY=re_YOUR_ACTUAL_API_KEY_HERE
```

### 3. Start Backend Service
```bash
cd services/api
encore run
```

### 4. Test Email Service
Visit: http://localhost:3000/email-test

## 📋 API Endpoints

### Send Single Email
```bash
POST http://localhost:4000/email/send
Content-Type: application/json

{
  "from": "Seattle Reuse Exchange <test@seattlereuse.exchange>",
  "to": ["recipient@example.com"],
  "subject": "Test Email",
  "html": "<h1>Hello World!</h1>"
}
```

### Send Auction Win Notification
```bash
POST http://localhost:4000/email/auction-win
Content-Type: application/json

{
  "winner_email": "winner@example.com",
  "winner_name": "John Doe",
  "auction_id": "AUC-12345",
  "item_title": "Herman Miller Chair",
  "winning_bid": 425.00,
  "pickup_location": "Seattle Warehouse",
  "pickup_deadline": "Dec 22, 2023",
  "payment_link": "https://pay.seattlereuse.exchange/AUC-12345",
  "environmental_impact": "Prevented 45 lbs from landfills"
}
```

### Send Magic Link
```bash
POST http://localhost:4000/email/magic-link
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "login_url": "https://seattlereuse.exchange/auth/magic?token=abc123",
  "expires_at": "Dec 21, 2023 at 6:00 PM"
}
```

## 🎨 Frontend Usage Examples

### Basic Email Sending
```typescript
import { useEmailService } from '@/lib/email-client';

function MyComponent() {
  const { sendEmail, loading, error } = useEmailService();

  const handleSendEmail = async () => {
    const result = await sendEmail({
      from: 'Seattle Reuse Exchange <noreply@seattlereuse.exchange>',
      to: ['user@example.com'],
      subject: 'Welcome!',
      html: '<h1>Welcome to Seattle Reuse Exchange!</h1>'
    });
    
    console.log('Email sent:', result.id);
  };

  return (
    <button onClick={handleSendEmail} disabled={loading}>
      {loading ? 'Sending...' : 'Send Email'}
    </button>
  );
}
```

### Auction Win Notification
```typescript
import { useEmailService } from '@/lib/email-client';

function AuctionEndHandler() {
  const { sendAuctionWinNotification } = useEmailService();

  const notifyWinner = async (auctionData) => {
    await sendAuctionWinNotification({
      winner_email: auctionData.winnerEmail,
      winner_name: auctionData.winnerName,
      auction_id: auctionData.id,
      item_title: auctionData.itemTitle,
      winning_bid: auctionData.finalBid,
      pickup_location: "Seattle Reuse Exchange Warehouse",
      pickup_deadline: "Within 7 days",
      payment_link: `https://pay.seattlereuse.exchange/${auctionData.id}`,
      environmental_impact: `Prevented ${auctionData.weight} lbs from landfills`
    });
  };
}
```

## 🤖 AI-Enhanced Features

### Smart Email Templates
- **Environmental Impact Calculations** in every email
- **Personalized Bidding Suggestions** based on user history
- **Dynamic Content** based on auction status and user preferences
- **Responsive HTML** that works on all devices

### Automated Workflows
- **Auction End Notifications** sent automatically to winners
- **Bid Confirmations** with real-time status updates
- **Authentication Links** with security best practices
- **Reminder Emails** for pickup deadlines

## 🔒 Security & Best Practices

### Email Validation
- ✅ Email address format validation
- ✅ Required field checking
- ✅ Sender domain verification
- ✅ Rate limiting (via Resend)

### Authentication
- ✅ API key protection via environment variables
- ✅ HTTPS-only email links
- ✅ Magic link expiration (15 minutes)
- ✅ One-time use tokens

### Deliverability
- ✅ Proper SPF/DKIM setup via Resend
- ✅ Professional email templates
- ✅ Bounce handling
- ✅ Unsubscribe links (when required)

## 🧪 Testing

### Test Page
Visit http://localhost:3000/email-test to test all email types

### Manual Testing
```bash
# Test basic email
curl -X POST http://localhost:4000/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "from": "test@seattlereuse.exchange",
    "to": ["your-email@example.com"],
    "subject": "Test",
    "html": "<h1>It works!</h1>"
  }'
```

## 📈 Usage Analytics

Resend provides built-in analytics for:
- ✅ **Delivery rates** - Track successful deliveries
- ✅ **Open rates** - Monitor user engagement
- ✅ **Click rates** - Measure link performance
- ✅ **Bounce rates** - Identify delivery issues

Access analytics at: https://resend.com/dashboard

## 🚀 Production Deployment

### Resend Configuration
1. **Domain Setup** - Add your domain to Resend
2. **DNS Records** - Configure SPF/DKIM for deliverability
3. **Volume Limits** - Upgrade plan if needed (free: 100/day, paid: 50k+/day)

### Encore Cloud Integration
```bash
# Deploy backend with email service
cd services/api
encore deploy

# Backend will automatically include email service
```

### Environment Variables
Set in Encore dashboard:
- `RESEND_API_KEY` - Your production API key

## 📚 Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend React SDK](https://resend.com/docs/sdk/react)
- [Encore Email Service Example](https://encore.dev/docs/how-to/send-emails)
- [Email Template Best Practices](https://resend.com/docs/send/email-templates)

## 🎉 What's Next?

Your email service is now fully integrated! You can:

1. **Customize Templates** - Update HTML templates in `email.go`
2. **Add More Email Types** - Create new endpoints for specific use cases
3. **Integrate with Auctions** - Connect email service to auction events
4. **Set Up Webhooks** - Handle bounce and delivery events
5. **Add Unsubscribe** - Implement user preferences

The Seattle Reuse Exchange now has enterprise-grade email capabilities! 🚀