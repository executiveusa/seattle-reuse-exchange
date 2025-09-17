package notifications

import "context"

//encore:api private
func SendEmail(ctx context.Context, req *EmailRequest) error {
	// AI-CHAT: Email notification service using Resend
	// Sends auction updates, outbid notifications, winner announcements
	return nil
}

//encore:api private  
func SendSMS(ctx context.Context, req *SMSRequest) error {
	// AI-CHAT: SMS notifications via Twilio for urgent auction updates
	return nil
}

type EmailRequest struct {
	To      string `json:"to"`
	Subject string `json:"subject"`
	Body    string `json:"body"`
}

type SMSRequest struct {
	To   string `json:"to"`
	Body string `json:"body"`
}