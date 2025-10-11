-- Migration: Add artwork-specific fields
-- Support for art, comics, and collectibles categories

-- Add artwork_metadata table for detailed tracking of collectibles
CREATE TABLE IF NOT EXISTS artwork_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL,
  item_type VARCHAR(50) NOT NULL, -- 'sports_card', 'comic', 'art', 'other'
  artist_name VARCHAR(255),
  year_created INTEGER,
  edition VARCHAR(100),
  grade VARCHAR(50), -- PSA, CGC, raw, etc.
  authentication_status VARCHAR(50), -- 'authenticated', 'pending', 'none'
  authentication_provider VARCHAR(100),
  certificate_number VARCHAR(100),
  dimensions VARCHAR(100), -- e.g., "12x16 inches"
  medium VARCHAR(100), -- e.g., "oil on canvas", "digital print"
  is_signed BOOLEAN DEFAULT false,
  provenance TEXT,
  condition_notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_artwork_metadata_item_id ON artwork_metadata(item_id);
CREATE INDEX idx_artwork_metadata_item_type ON artwork_metadata(item_type);
CREATE INDEX idx_artwork_metadata_artist_name ON artwork_metadata(artist_name);
CREATE INDEX idx_artwork_metadata_authentication_status ON artwork_metadata(authentication_status);

-- Add collectibles table for sports cards and comics
CREATE TABLE IF NOT EXISTS collectibles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL,
  collectible_type VARCHAR(50) NOT NULL, -- 'sports_card', 'comic', 'trading_card'
  sport VARCHAR(50), -- for sports cards
  player_name VARCHAR(255), -- for sports cards
  team VARCHAR(100), -- for sports cards
  card_number VARCHAR(50),
  set_name VARCHAR(255),
  publisher VARCHAR(100), -- for comics
  issue_number VARCHAR(50), -- for comics
  series_name VARCHAR(255), -- for comics
  grade_company VARCHAR(50), -- PSA, BGS, CGC
  grade_value VARCHAR(20),
  is_rookie BOOLEAN DEFAULT false,
  is_autographed BOOLEAN DEFAULT false,
  is_graded BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Add indexes for collectibles
CREATE INDEX idx_collectibles_item_id ON collectibles(item_id);
CREATE INDEX idx_collectibles_collectible_type ON collectibles(collectible_type);
CREATE INDEX idx_collectibles_player_name ON collectibles(player_name);
CREATE INDEX idx_collectibles_is_graded ON collectibles(is_graded);
