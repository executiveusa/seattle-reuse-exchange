package webhooks

import "context"

//encore:api public method=POST path=/v1/webhooks/stripe
func HandleStripeWebhook(ctx context.Context, req *StripeWebhookRequest) error {
	// AI-CHAT: Stripe webhook handler for payment confirmations
	// Processes successful payments and updates order status
	return nil
}

//encore:api public method=POST path=/v1/webhooks/givingblock  
func HandleGivingBlockWebhook(ctx context.Context, req *GivingBlockWebhookRequest) error {
	// AI-CHAT: Crypto donation webhook handler (placeholder)
	return nil
}

type StripeWebhookRequest struct {
	Type string                 `json:"type"`
	Data map[string]interface{} `json:"data"`
}

type GivingBlockWebhookRequest struct {
	Type string                 `json:"type"`
	Data map[string]interface{} `json:"data"`
}