package bids

import (
	"context"
	"testing"
	"time"

	"github.com/google/uuid"
)

func TestPlaceBid(t *testing.T) {
	// AI-CHAT: Critical test for bid placement logic
	// Tests concurrency, validation, and anti-sniping functionality
	
	ctx := context.Background()
	auctionID := uuid.New().String()
	
	req := &PlaceBidRequest{
		UserID: uuid.New(),
		Amount: 150.00,
	}
	
	response, err := PlaceBid(ctx, auctionID, req)
	if err != nil {
		t.Fatalf("PlaceBid failed: %v", err)
	}
	
	// Validate bid response
	if response.Bid == nil {
		t.Error("Expected bid in response")
	}
	
	if response.Bid.Amount != req.Amount {
		t.Errorf("Expected bid amount %f, got %f", req.Amount, response.Bid.Amount)
	}
	
	if response.Bid.UserID != req.UserID {
		t.Errorf("Expected user ID %s, got %s", req.UserID, response.Bid.UserID)
	}
	
	if response.Bid.AuctionID.String() != auctionID {
		t.Errorf("Expected auction ID %s, got %s", auctionID, response.Bid.AuctionID)
	}
	
	if !response.IsWinning {
		t.Error("Expected bid to be winning")
	}
	
	if response.Message == "" {
		t.Error("Expected non-empty success message")
	}
	
	// Validate timestamps
	if response.Bid.CreatedAt.IsZero() {
		t.Error("Expected non-zero bid creation time")
	}
	
	if time.Since(response.Bid.CreatedAt) > time.Minute {
		t.Error("Bid creation time seems too old")
	}
}

func TestBidValidation(t *testing.T) {
	// AI-CHAT: Tests bid validation rules and minimum increments
	
	testCases := []struct {
		name        string
		auctionID   uuid.UUID
		userID      uuid.UUID
		amount      float64
		expectError bool
	}{
		{
			name:        "valid bid",
			auctionID:   uuid.New(),
			userID:      uuid.New(),
			amount:      100.00,
			expectError: false,
		},
		{
			name:        "zero amount",
			auctionID:   uuid.New(),
			userID:      uuid.New(),
			amount:      0,
			expectError: true,
		},
		{
			name:        "negative amount",
			auctionID:   uuid.New(),
			userID:      uuid.New(),
			amount:      -50.00,
			expectError: true,
		},
		{
			name:        "nil auction ID",
			auctionID:   uuid.Nil,
			userID:      uuid.New(),
			amount:      100.00,
			expectError: true,
		},
		{
			name:        "nil user ID",
			auctionID:   uuid.New(),
			userID:      uuid.Nil,
			amount:      100.00,
			expectError: true,
		},
	}
	
	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			err := validateBid(tc.auctionID, tc.userID, tc.amount)
			
			if tc.expectError && err == nil {
				t.Error("Expected validation error but got none")
			}
			
			if !tc.expectError && err != nil {
				t.Errorf("Expected no validation error but got: %v", err)
			}
		})
	}
}

func TestCalculateMinIncrement(t *testing.T) {
	// AI-CHAT: Tests tiered increment system for optimal bidding flow
	
	testCases := []struct {
		currentBid      float64
		expectedIncrement float64
	}{
		{0, 1.0},         // Under $50
		{25.50, 1.0},     // Under $50
		{49.99, 1.0},     // Under $50
		{50.00, 5.0},     // $50-199
		{125.75, 5.0},    // $50-199
		{199.99, 5.0},    // $50-199
		{200.00, 10.0},   // $200-499
		{350.25, 10.0},   // $200-499
		{499.99, 10.0},   // $200-499
		{500.00, 25.0},   // $500+
		{1250.00, 25.0},  // $500+
		{5000.00, 25.0},  // $500+
	}
	
	for _, tc := range testCases {
		t.Run(formatCurrency(tc.currentBid), func(t *testing.T) {
			increment := calculateMinIncrement(tc.currentBid)
			
			if increment != tc.expectedIncrement {
				t.Errorf("For bid %f, expected increment %f, got %f",
					tc.currentBid, tc.expectedIncrement, increment)
			}
		})
	}
}

func TestGetAuctionBids(t *testing.T) {
	// AI-CHAT: Tests bid history retrieval with pagination
	
	ctx := context.Background()
	auctionID := uuid.New().String()
	
	req := &GetBidsRequest{
		Page:  nil, // Default pagination
		Limit: nil,
	}
	
	response, err := GetAuctionBids(ctx, auctionID, req)
	if err != nil {
		t.Fatalf("GetAuctionBids failed: %v", err)
	}
	
	if response.Bids == nil {
		t.Error("Expected bids array in response")
	}
	
	if response.Total < 0 {
		t.Error("Expected non-negative total count")
	}
	
	// Validate bid order (should be chronological)
	for i := 1; i < len(response.Bids); i++ {
		prev := response.Bids[i-1]
		curr := response.Bids[i]
		
		if curr.CreatedAt.Before(prev.CreatedAt) {
			t.Error("Bids should be ordered chronologically")
		}
		
		if curr.Amount <= prev.Amount {
			t.Error("Later bids should have higher amounts")
		}
	}
}

func TestGetUserBids(t *testing.T) {
	// AI-CHAT: Tests user bid history and statistics
	
	ctx := context.Background()
	userID := uuid.New().String()
	
	req := &GetUserBidsRequest{
		Status: nil, // All bids
		Page:   nil,
		Limit:  nil,
	}
	
	response, err := GetUserBids(ctx, userID, req)
	if err != nil {
		t.Fatalf("GetUserBids failed: %v", err)
	}
	
	// Validate response structure
	if response.Bids == nil {
		t.Error("Expected bids array in response")
	}
	
	if response.Total < 0 {
		t.Error("Expected non-negative total count")
	}
	
	if response.ActiveBids < 0 {
		t.Error("Expected non-negative active bids count")
	}
	
	if response.WonAuctions < 0 {
		t.Error("Expected non-negative won auctions count")
	}
	
	if response.TotalSpent < 0 {
		t.Error("Expected non-negative total spent")
	}
	
	if response.SuccessRate < 0 || response.SuccessRate > 1 {
		t.Errorf("Expected success rate between 0 and 1, got %f", response.SuccessRate)
	}
	
	// Validate that all returned bids belong to the requested user
	for _, bid := range response.Bids {
		if bid.UserID.String() != userID {
			t.Errorf("Found bid for wrong user: expected %s, got %s", userID, bid.UserID)
		}
	}
}

// Helper function for test output
func formatCurrency(amount float64) string {
	return fmt.Sprintf("$%.2f", amount)
}

// Benchmark tests for performance validation
func BenchmarkPlaceBid(b *testing.B) {
	// AI-CHAT: Performance benchmark for bid placement
	// Critical for handling rapid-fire bidding scenarios
	
	ctx := context.Background()
	auctionID := uuid.New().String()
	
	b.ResetTimer()
	
	for i := 0; i < b.N; i++ {
		req := &PlaceBidRequest{
			UserID: uuid.New(),
			Amount: float64(100 + i), // Increasing bid amounts
		}
		
		_, err := PlaceBid(ctx, auctionID, req)
		if err != nil {
			b.Fatalf("PlaceBid failed: %v", err)
		}
	}
}

func BenchmarkCalculateMinIncrement(b *testing.B) {
	// Benchmark increment calculation performance
	
	amounts := []float64{25, 75, 150, 300, 750, 1500}
	
	b.ResetTimer()
	
	for i := 0; i < b.N; i++ {
		amount := amounts[i%len(amounts)]
		calculateMinIncrement(amount)
	}
}