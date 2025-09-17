package main

import (
	"context"
	"log"

	"encore.dev"
	"encore.dev/middleware"

	// Import all services
	_ "seattlereuse.exchange/api/users"
	_ "seattlereuse.exchange/api/catalog"
	_ "seattlereuse.exchange/api/auctions"
	_ "seattlereuse.exchange/api/bids"
	_ "seattlereuse.exchange/api/orders"
	_ "seattlereuse.exchange/api/donations"
	_ "seattlereuse.exchange/api/notifications"
	_ "seattlereuse.exchange/api/webhooks"
	_ "seattlereuse.exchange/api/reports"
)

func main() {
	// Set up global middleware
	encore.Middleware(
		middleware.CORS(&middleware.CORSConfig{
			AllowedOrigins: []string{"http://localhost:3000", "https://*.vercel.app"},
			AllowedMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
			AllowedHeaders: []string{"*"},
		}),
		middleware.LogRequests(),
		middleware.RateLimit(&middleware.RateLimitConfig{
			Rate:   100,
			Burst:  200,
			Window: "1m",
		}),
	)

	log.Println("🌱 Seattle Reuse Exchange API starting...")
}

//encore:api public
func Health(ctx context.Context) (*HealthResponse, error) {
	return &HealthResponse{
		Status:  "healthy",
		Message: "Seattle Reuse Exchange API is running",
		Version: "1.0.0",
	}, nil
}

type HealthResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
	Version string `json:"version"`
}