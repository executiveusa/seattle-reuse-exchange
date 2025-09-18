package users

import (
	"context"
	"time"

	"encore.dev/storage/sqldb"
	"github.com/google/uuid"
)

// User represents a platform user
type User struct {
	ID        uuid.UUID `json:"id" db:"id"`
	Email     string    `json:"email" db:"email"`
	Name      string    `json:"name" db:"name"`
	Role      string    `json:"role" db:"role"`
	Phone     *string   `json:"phone,omitempty" db:"phone"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

// UserRole defines user permission levels
type UserRole string

const (
	RoleAdmin     UserRole = "admin"
	RoleManager   UserRole = "manager"
	RoleVolunteer UserRole = "volunteer"
	RoleBidder    UserRole = "bidder"
)

var db = sqldb.Named("seattle_reuse")

//encore:api public method=POST path=/v1/auth/session
func CreateSession(ctx context.Context, req *CreateSessionRequest) (*CreateSessionResponse, error) {
	// AI-CHAT: This endpoint handles magic link authentication
	// Users receive an email with a secure login link, no passwords needed
	// Integrates with NextAuth.js on the frontend

	// TODO: Implement magic link generation and email sending
	// TODO: Generate JWT session token
	// TODO: Set user role and permissions

	return &CreateSessionResponse{
		SessionToken: "temporary-token",
		User: &User{
			ID:    uuid.New(),
			Email: req.Email,
			Name:  "Demo User",
			Role:  string(RoleBidder),
		},
	}, nil
}

//encore:api public method=GET path=/v1/me
func GetCurrentUser(ctx context.Context) (*User, error) {
	// AI-CHAT: Returns current authenticated user information
	// Includes role, bidding history, and donation history
	// Used by frontend to show personalized dashboard

	// TODO: Get user from JWT token
	// TODO: Return full user profile with preferences

	return &User{
		ID:    uuid.New(),
		Email: "demo@example.com",
		Name:  "Demo User",
		Role:  string(RoleBidder),
	}, nil
}

//encore:api public method=POST path=/v1/users
func CreateUser(ctx context.Context, req *CreateUserRequest) (*User, error) {
	// AI-CHAT: Creates new user account
	// Assigns default "bidder" role, can be upgraded by admins
	// Sends welcome email with platform guidelines

	user := &User{
		ID:        uuid.New(),
		Email:     req.Email,
		Name:      req.Name,
		Role:      string(RoleBidder),
		Phone:     req.Phone,
		CreatedAt: time.Now(),
	}

	// TODO: Insert into database
	// TODO: Send welcome email
	// TODO: Log user creation in audit log

	return user, nil
}

type CreateSessionRequest struct {
	Email string `json:"email"`
}

type CreateSessionResponse struct {
	SessionToken string `json:"session_token"`
	User         *User  `json:"user"`
}

type CreateUserRequest struct {
	Email string  `json:"email"`
	Name  string  `json:"name"`
	Phone *string `json:"phone,omitempty"`
}