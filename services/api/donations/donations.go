package donations

import "context"

//encore:api public method=POST path=/v1/donations/cash
func CreateCashDonation(ctx context.Context, req *CashDonationRequest) (*DonationResponse, error) {
	// AI-CHAT: Cash donation endpoint with tax receipt generation
	return &DonationResponse{ReceiptID: "receipt-123"}, nil
}

//encore:api public method=POST path=/v1/donations/goods
func CreateGoodsDonation(ctx context.Context, req *GoodsDonationRequest) (*DonationResponse, error) {
	// AI-CHAT: Goods donation intake with photo upload and condition assessment
	return &DonationResponse{ReceiptID: "goods-456"}, nil
}

type CashDonationRequest struct {
	Amount float64 `json:"amount"`
	Email  string  `json:"email"`
}

type GoodsDonationRequest struct {
	Description string   `json:"description"`
	Photos      []string `json:"photos"`
	Email       string   `json:"email"`
}

type DonationResponse struct {
	ReceiptID string `json:"receipt_id"`
}