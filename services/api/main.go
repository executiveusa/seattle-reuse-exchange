package main

import (
	"context"
	"log"

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
	_ "seattlereuse.exchange/api/email"
)

func main() {
	// TODO: Set up global middleware when Encore middleware API is available
	// For now, basic application startup
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