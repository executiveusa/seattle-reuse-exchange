package api

import (
	"context"
	"log"
)

func init() {
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