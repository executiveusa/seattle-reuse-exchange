package hello

import (
	"context"
)

// Health check endpoint for the Seattle Reuse Exchange API
//encore:api public method=GET path=/health
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