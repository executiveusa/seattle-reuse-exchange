// AI-CHAT: Database service configuration for Seattle Reuse Exchange
// Provides centralized database connection management for all services
package database

import (
	"encore.dev/storage/sqldb"
)

// AI-CHAT: Database instance automatically provisioned by Encore
// This will create a PostgreSQL database with migrations applied
// AI-CHAT: Database instance automatically provisioned by Encore
// This will create a PostgreSQL database with migrations applied
// AI-CHAT: Database instance automatically provisioned by Encore
// This will create a PostgreSQL database with migrations applied
// AI-CHAT: Database instance automatically provisioned by Encore
// This will create a PostgreSQL database with migrations applied
// AI-CHAT: Database instance automatically provisioned by Encore
// This will create a PostgreSQL database with migrations applied
var DB = sqldb.NewDatabase("seattle_reuse", sqldb.DatabaseConfig{
	Migrations: "./migrations",
})

// AI-CHAT: Database connection getter for use across services
func GetDB() *sqldb.Database {
	return DB
}