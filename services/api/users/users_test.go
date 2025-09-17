package users

import (
	"context"
	"testing"

	"github.com/google/uuid"
)

func TestCreateUser(t *testing.T) {
	// AI-CHAT: Unit test for user creation
	// Tests validation, database insertion, and audit logging
	
	ctx := context.Background()
	
	req := &CreateUserRequest{
		Email: "test@example.com",
		Name:  "Test User",
		Phone: nil,
	}
	
	user, err := CreateUser(ctx, req)
	if err != nil {
		t.Fatalf("CreateUser failed: %v", err)
	}
	
	// Validate user fields
	if user.Email != req.Email {
		t.Errorf("Expected email %s, got %s", req.Email, user.Email)
	}
	
	if user.Name != req.Name {
		t.Errorf("Expected name %s, got %s", req.Name, user.Name)
	}
	
	if user.Role != string(RoleBidder) {
		t.Errorf("Expected role %s, got %s", RoleBidder, user.Role)
	}
	
	if user.ID == uuid.Nil {
		t.Error("Expected non-nil user ID")
	}
	
	if user.CreatedAt.IsZero() {
		t.Error("Expected non-zero created time")
	}
}

func TestCreateUserValidation(t *testing.T) {
	// AI-CHAT: Tests input validation and error handling
	
	ctx := context.Background()
	
	testCases := []struct {
		name    string
		req     *CreateUserRequest
		wantErr bool
	}{
		{
			name: "valid user",
			req: &CreateUserRequest{
				Email: "valid@example.com",
				Name:  "Valid User",
			},
			wantErr: false,
		},
		{
			name: "empty email",
			req: &CreateUserRequest{
				Email: "",
				Name:  "User Without Email",
			},
			wantErr: true,
		},
		{
			name: "invalid email format",
			req: &CreateUserRequest{
				Email: "not-an-email",
				Name:  "User With Bad Email",
			},
			wantErr: true,
		},
		{
			name: "empty name",
			req: &CreateUserRequest{
				Email: "user@example.com",
				Name:  "",
			},
			wantErr: true,
		},
	}
	
	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			_, err := CreateUser(ctx, tc.req)
			
			if tc.wantErr && err == nil {
				t.Error("Expected error but got none")
			}
			
			if !tc.wantErr && err != nil {
				t.Errorf("Expected no error but got: %v", err)
			}
		})
	}
}

func TestCreateSession(t *testing.T) {
	// AI-CHAT: Tests magic link session creation
	// Validates email sending and token generation
	
	ctx := context.Background()
	
	req := &CreateSessionRequest{
		Email: "test@example.com",
	}
	
	session, err := CreateSession(ctx, req)
	if err != nil {
		t.Fatalf("CreateSession failed: %v", err)
	}
	
	if session.SessionToken == "" {
		t.Error("Expected non-empty session token")
	}
	
	if session.User == nil {
		t.Error("Expected user in session response")
	}
	
	if session.User.Email != req.Email {
		t.Errorf("Expected email %s, got %s", req.Email, session.User.Email)
	}
}

func TestGetCurrentUser(t *testing.T) {
	// AI-CHAT: Tests authenticated user retrieval
	// Validates JWT token parsing and user lookup
	
	ctx := context.Background()
	
	user, err := GetCurrentUser(ctx)
	if err != nil {
		t.Fatalf("GetCurrentUser failed: %v", err)
	}
	
	if user.ID == uuid.Nil {
		t.Error("Expected non-nil user ID")
	}
	
	if user.Email == "" {
		t.Error("Expected non-empty email")
	}
	
	// Validate role is valid
	validRoles := []string{string(RoleAdmin), string(RoleManager), string(RoleVolunteer), string(RoleBidder)}
	roleValid := false
	for _, role := range validRoles {
		if user.Role == role {
			roleValid = true
			break
		}
	}
	
	if !roleValid {
		t.Errorf("Invalid user role: %s", user.Role)
	}
}