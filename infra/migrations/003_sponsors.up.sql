-- Migration: Add sponsors table
-- Support sponsor showcase and contributor tracking

CREATE TABLE IF NOT EXISTS sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  tier VARCHAR(50) DEFAULT 'standard', -- platinum, gold, silver, standard
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_sponsors_is_active ON sponsors(is_active);
CREATE INDEX idx_sponsors_display_order ON sponsors(display_order);
CREATE INDEX idx_sponsors_tier ON sponsors(tier);

-- Add contributors table for tracking individual contributors
CREATE TABLE IF NOT EXISTS contributors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  contribution_type VARCHAR(50) NOT NULL, -- 'donation', 'volunteer', 'sponsor'
  total_items_donated INTEGER DEFAULT 0,
  total_value_donated DECIMAL(10, 2) DEFAULT 0,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Add indexes for contributors
CREATE INDEX idx_contributors_email ON contributors(email);
CREATE INDEX idx_contributors_contribution_type ON contributors(contribution_type);
CREATE INDEX idx_contributors_is_public ON contributors(is_public);
