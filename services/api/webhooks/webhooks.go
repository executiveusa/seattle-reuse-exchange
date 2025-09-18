package webhooks

import (
	"net/http"
)

//encore:api public raw method=POST path=/v1/webhooks/stripe
func HandleStripeWebhook(w http.ResponseWriter, req *http.Request) {
	// AI-CHAT: Stripe webhook handler for payment confirmations
	// Processes successful payments and updates order status
	// Raw endpoint to handle arbitrary JSON data from Stripe
}

//encore:api public raw method=POST path=/v1/webhooks/givingblock  
func HandleGivingBlockWebhook(w http.ResponseWriter, req *http.Request) {
	// AI-CHAT: Crypto donation webhook handler (placeholder)
	// Raw endpoint to handle arbitrary JSON data from GivingBlock
}