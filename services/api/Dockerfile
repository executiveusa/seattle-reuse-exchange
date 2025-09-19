# Build stage
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Install git (required for go mod download with private repos)
RUN apk add --no-cache git

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the binary
RUN go build -o main .

# Final stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the binary from builder stage
COPY --from=builder /app/main .

# Copy migrations
COPY --from=builder /app/database/migrations ./migrations

# Expose port
EXPOSE 8080

# Run the binary
CMD ["./main"]