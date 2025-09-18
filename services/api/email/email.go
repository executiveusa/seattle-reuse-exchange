// AI-CHAT: Email service powered by Resend for auction notifications, magic links, and receipts
package email

import (
	"context"
	"encoding/json"
	"fmt"
	"bytes"
	"net/http"
)

// AI-CHAT: Email configuration loaded from environment
// TODO: Replace with proper Encore secrets management
var secrets struct {
	ResendAPIKey string
}

// Initialize config at startup
func init() {
	// For now, we'll load from environment variables directly
	// TODO: Use Encore secrets manager when properly configured
	secrets.ResendAPIKey = "re_placeholder_key" // Will be replaced with actual secret management
}

// AI-CHAT: Email request structures matching Resend API format
type EmailRequest struct {
	From     string   `json:"from"`
	To       []string `json:"to"`
	Subject  string   `json:"subject"`
	HTML     string   `json:"html,omitempty"`
	Text     string   `json:"text,omitempty"`
	ReplyTo  string   `json:"reply_to,omitempty"`
}

type BatchEmailRequest struct {
	Emails []EmailRequest `json:"emails"`
}

type EmailResponse struct {
	ID      string `json:"id"`
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
}

type BatchEmailResponse struct {
	Data    []EmailResponse `json:"data"`
	Success bool            `json:"success"`
}

// AI-CHAT: Send single email via Resend API
//encore:api public method=POST path=/email/send
func SendEmail(ctx context.Context, req *EmailRequest) (*EmailResponse, error) {
	// AI-CHAT: Validate email request
	if err := validateEmailRequest(req); err != nil {
		return &EmailResponse{
			Success: false,
			Message: fmt.Sprintf("Validation error: %v", err),
		}, nil
	}

	// AI-CHAT: Prepare Resend API request
	jsonData, err := json.Marshal(req)
	if err != nil {
		return &EmailResponse{
			Success: false,
			Message: "Failed to encode email data",
		}, err
	}

	// AI-CHAT: Call Resend API
	client := &http.Client{}
	httpReq, err := http.NewRequestWithContext(ctx, "POST", "https://api.resend.com/emails", bytes.NewBuffer(jsonData))
	if err != nil {
		return &EmailResponse{
			Success: false,
			Message: "Failed to create HTTP request",
		}, err
	}

	httpReq.Header.Set("Content-Type", "application/json")
	httpReq.Header.Set("Authorization", "Bearer "+secrets.ResendAPIKey)

	resp, err := client.Do(httpReq)
	if err != nil {
		return &EmailResponse{
			Success: false,
			Message: "Failed to send email via Resend",
		}, err
	}
	defer resp.Body.Close()

	// AI-CHAT: Parse Resend response
	var resendResp struct {
		ID    string `json:"id"`
		Error struct {
			Message string `json:"message"`
		} `json:"error"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&resendResp); err != nil {
		return &EmailResponse{
			Success: false,
			Message: "Failed to decode Resend response",
		}, err
	}

	if resp.StatusCode != 200 {
		return &EmailResponse{
			Success: false,
			Message: resendResp.Error.Message,
		}, nil
	}

	return &EmailResponse{
		ID:      resendResp.ID,
		Success: true,
		Message: "Email sent successfully",
	}, nil
}

// AI-CHAT: Send batch emails for auction notifications and bulk communications
//encore:api public method=POST path=/email/batch
func SendBatchEmails(ctx context.Context, req *BatchEmailRequest) (*BatchEmailResponse, error) {
	responses := make([]EmailResponse, len(req.Emails))
	
	// AI-CHAT: Process each email in the batch
	for i, email := range req.Emails {
		resp, err := SendEmail(ctx, &email)
		if err != nil {
			responses[i] = EmailResponse{
				Success: false,
				Message: fmt.Sprintf("Failed to send email %d: %v", i+1, err),
			}
		} else {
			responses[i] = *resp
		}
	}

	// AI-CHAT: Check if all emails were successful
	allSuccess := true
	for _, resp := range responses {
		if !resp.Success {
			allSuccess = false
			break
		}
	}

	return &BatchEmailResponse{
		Data:    responses,
		Success: allSuccess,
	}, nil
}

// AI-CHAT: Send auction win notification with bid details and pickup instructions
//encore:api public method=POST path=/email/auction-win
func SendAuctionWinNotification(ctx context.Context, req *AuctionWinEmailRequest) (*EmailResponse, error) {
	emailReq := &EmailRequest{
		From:    "Seattle Reuse Exchange <auctions@seattlereuse.exchange>",
		To:      []string{req.WinnerEmail},
		Subject: fmt.Sprintf("🎉 You won: %s - Auction #%s", req.ItemTitle, req.AuctionID),
		HTML:    generateAuctionWinHTML(req),
		ReplyTo: "support@seattlereuse.exchange",
	}

	return SendEmail(ctx, emailReq)
}

// AI-CHAT: Send magic link for passwordless authentication
//encore:api public method=POST path=/email/magic-link
func SendMagicLink(ctx context.Context, req *MagicLinkEmailRequest) (*EmailResponse, error) {
	emailReq := &EmailRequest{
		From:    "Seattle Reuse Exchange <auth@seattlereuse.exchange>",
		To:      []string{req.Email},
		Subject: "Your login link for Seattle Reuse Exchange",
		HTML:    generateMagicLinkHTML(req),
		ReplyTo: "support@seattlereuse.exchange",
	}

	return SendEmail(ctx, emailReq)
}

// AI-CHAT: Send bid confirmation with current status and next bid suggestion
//encore:api public method=POST path=/email/bid-confirmation
func SendBidConfirmation(ctx context.Context, req *BidConfirmationEmailRequest) (*EmailResponse, error) {
	emailReq := &EmailRequest{
		From:    "Seattle Reuse Exchange <bids@seattlereuse.exchange>",
		To:      []string{req.BidderEmail},
		Subject: fmt.Sprintf("Bid placed: %s - $%.2f", req.ItemTitle, req.BidAmount),
		HTML:    generateBidConfirmationHTML(req),
		ReplyTo: "support@seattlereuse.exchange",
	}

	return SendEmail(ctx, emailReq)
}

// AI-CHAT: Request structures for specialized email types
type AuctionWinEmailRequest struct {
	WinnerEmail     string  `json:"winner_email"`
	WinnerName      string  `json:"winner_name"`
	AuctionID       string  `json:"auction_id"`
	ItemTitle       string  `json:"item_title"`
	WinningBid      float64 `json:"winning_bid"`
	PickupLocation  string  `json:"pickup_location"`
	PickupDeadline  string  `json:"pickup_deadline"`
	PaymentLink     string  `json:"payment_link"`
	EnvironmentalImpact string `json:"environmental_impact"`
}

type MagicLinkEmailRequest struct {
	Email     string `json:"email"`
	Name      string `json:"name"`
	LoginURL  string `json:"login_url"`
	ExpiresAt string `json:"expires_at"`
}

type BidConfirmationEmailRequest struct {
	BidderEmail   string  `json:"bidder_email"`
	BidderName    string  `json:"bidder_name"`
	ItemTitle     string  `json:"item_title"`
	BidAmount     float64 `json:"bid_amount"`
	CurrentHigh   float64 `json:"current_high"`
	NextMinBid    float64 `json:"next_min_bid"`
	AuctionEndTime string `json:"auction_end_time"`
	ItemURL       string  `json:"item_url"`
}

// AI-CHAT: Email validation helper
func validateEmailRequest(req *EmailRequest) error {
	if req.From == "" {
		return fmt.Errorf("from address is required")
	}
	if len(req.To) == 0 {
		return fmt.Errorf("at least one recipient is required")
	}
	if req.Subject == "" {
		return fmt.Errorf("subject is required")
	}
	if req.HTML == "" && req.Text == "" {
		return fmt.Errorf("either HTML or text content is required")
	}
	return nil
}

// AI-CHAT: HTML template generators (simplified for demo)
func generateAuctionWinHTML(req *AuctionWinEmailRequest) string {
	return fmt.Sprintf(`
		<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;background-color: #ffffff;">
			<div style="background-color: #16a34a; color: white; padding: 20px; text-align: center;">
				<h1>🎉 Congratulations, %s!</h1>
				<p>You won the auction for: <strong>%s</strong></p>
			</div>
			<div style="padding: 20px;">
				<h2>Auction Details</h2>
				<p><strong>Winning Bid:</strong> $%.2f</p>
				<p><strong>Pickup Location:</strong> %s</p>
				<p><strong>Pickup Deadline:</strong> %s</p>
				
				<h3>🌱 Environmental Impact</h3>
				<p>%s</p>
				
				<div style="text-align: center; margin: 30px 0;">
					<a href="%s" style="background-color: #16a34a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
						Complete Payment
					</a>
				</div>
				
				<p><em>Thank you for keeping good stuff out of landfills!</em></p>
			</div>
		</div>
	`, req.WinnerName, req.ItemTitle, req.WinningBid, req.PickupLocation, req.PickupDeadline, req.EnvironmentalImpact, req.PaymentLink)
}

func generateMagicLinkHTML(req *MagicLinkEmailRequest) string {
	return fmt.Sprintf(`
		<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
			<h1>Welcome back, %s!</h1>
			<p>Click the link below to sign in to your Seattle Reuse Exchange account:</p>
			<div style="text-align: center; margin: 30px 0;">
				<a href="%s" style="background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
					Sign In to Your Account
				</a>
			</div>
			<p><small>This link expires at %s. If you didn't request this, you can safely ignore this email.</small></p>
		</div>
	`, req.Name, req.LoginURL, req.ExpiresAt)
}

func generateBidConfirmationHTML(req *BidConfirmationEmailRequest) string {
	status := "You're currently winning!"
	if req.BidAmount < req.CurrentHigh {
		status = "You've been outbid."
	}
	
	return fmt.Sprintf(`
		<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
			<h1>Bid Confirmation - %s</h1>
			<p><strong>%s</strong></p>
			<p><strong>Your Bid:</strong> $%.2f</p>
			<p><strong>Current High Bid:</strong> $%.2f</p>
			<p><strong>Next Minimum Bid:</strong> $%.2f</p>
			<p><strong>Auction Ends:</strong> %s</p>
			<div style="text-align: center; margin: 30px 0;">
				<a href="%s" style="background-color: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
					View Auction
				</a>
			</div>
		</div>
	`, req.ItemTitle, status, req.BidAmount, req.CurrentHigh, req.NextMinBid, req.AuctionEndTime, req.ItemURL)
}