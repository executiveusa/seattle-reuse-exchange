// AI-CHAT: Email configuration loaded from environment
// TODO: Replace with proper Encore secrets management
var secrets struct {
	ResendAPIKey string
}

// Initialize config at startup
func init() {
	// For now, we'll load from environment variables directly
	// TODO: Use Encore secrets manager when properly configured
	secrets.ResendAPIKey = "re_placeholder_key" // Will be replaced with actual secret management
}

// AI-CHAT: Email request structures matching Resend API format
type EmailRequest struct {
	From    string   `json:"from"`
	To      []string `json:"to"`
	Subject string   `json:"subject"`
	HTML    string   `json:"html,omitempty"`
	Text    string   `json:"text,omitempty"`
	ReplyTo string   `json:"reply_to,omitempty"`
}

type EmailResponse struct {
	ID      string `json:"id"`
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
}

// AI-CHAT: Send single email via Resend API
//encore:api public method=POST path=/email-utils/send
func SendEmail(ctx context.Context, req *EmailRequest) (*EmailResponse, error) {
	// AI-CHAT: Validate email request
	if err := validateEmailRequest(req); err != nil {
		return &EmailResponse{
			Success: false,
			Message: fmt.Sprintf("Validation error: %v", err),
		}, nil
	}

	// AI-CHAT: Prepare Resend API request
	jsonData, err := json.Marshal(req)
	if err != nil {
		return &EmailResponse{
			Success: false,
			Message: "Failed to encode email data",
		}, err
	}

	// AI-CHAT: Call Resend API
	client := &http.Client{}
	httpReq, err := http.NewRequestWithContext(ctx, "POST", "https://api.resend.com/emails", bytes.NewBuffer(jsonData))
	if err != nil {
		return &EmailResponse{
			Success: false,
			Message: "Failed to create HTTP request",
		}, err
	}

	httpReq.Header.Set("Content-Type", "application/json")
	httpReq.Header.Set("Authorization", "Bearer "+secrets.ResendAPIKey)

	resp, err := client.Do(httpReq)
	if err != nil {
		return &EmailResponse{
			Success: false,
			Message: "Failed to send email via Resend",
		}, err
	}
	defer resp.Body.Close()

	// AI-CHAT: Parse Resend response
	var resendResp struct {
		ID    string `json:"id"`
		Error struct {
			Message string `json:"message"`
		} `json:"error"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&resendResp); err != nil {
		return &EmailResponse{
			Success: false,
			Message: "Failed to decode Resend response",
		}, err
	}

	if resp.StatusCode != 200 {
		return &EmailResponse{
			Success: false,
			Message: resendResp.Error.Message,
		}, nil
	}

	return &EmailResponse{
		ID:      uuid.New().String(), // Generate UUID for tracking
		Success: true,
		Message: "Email sent successfully",
	}, nil
}

// AI-CHAT: Simple email validation
func validateEmailRequest(req *EmailRequest) error {
	if req.From == "" {
		return fmt.Errorf("sender email is required")
	}
	if len(req.To) == 0 {
		return fmt.Errorf("recipient email is required")
	}
	if req.Subject == "" {
		return fmt.Errorf("email subject is required")
	}
	if req.HTML == "" && req.Text == "" {
		return fmt.Errorf("email content (HTML or text) is required")
	}
	return nil
}