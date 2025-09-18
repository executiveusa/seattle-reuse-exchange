package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/google/uuid"
)

func main() {
	// Simple HTTP server for testing
	http.HandleFunc("/health", healthHandler)
	http.HandleFunc("/test", testHandler)
	
	fmt.Println("🌱 Seattle Reuse Exchange API (Simple Version) starting on :8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"status":  "healthy",
		"message": "Seattle Reuse Exchange API is running",
		"version": "1.0.0",
		"id":      uuid.New().String(),
	}
	json.NewEncoder(w).Encode(response)
}

func testHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"message": "Go installation is working correctly!",
		"context": context.Background(),
		"uuid":    uuid.New().String(),
	}
	json.NewEncoder(w).Encode(response)
}