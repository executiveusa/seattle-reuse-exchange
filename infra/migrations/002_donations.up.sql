-- Migration: Add donations schema enhancements
-- Support for expanded donation categories and tax receipt management

-- Add category types for new donation categories
ALTER TYPE category ADD VALUE IF NOT EXISTS 'electronics';
ALTER TYPE category ADD VALUE IF NOT EXISTS 'sports_cards';
ALTER TYPE category ADD VALUE IF NOT EXISTS 'comics';
ALTER TYPE category ADD VALUE IF NOT EXISTS 'art';

-- Add donation_receipts table for tax documentation
CREATE TABLE IF NOT EXISTS donation_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id UUID NOT NULL,
  receipt_number VARCHAR(50) UNIQUE NOT NULL,
  donor_name VARCHAR(255) NOT NULL,
  donor_email VARCHAR(255) NOT NULL,
  donor_address TEXT,
  items_description TEXT NOT NULL,
  estimated_value DECIMAL(10, 2) NOT NULL,
  receipt_date TIMESTAMP NOT NULL DEFAULT NOW(),
  tax_year INTEGER NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Add indexes for donation receipts
CREATE INDEX idx_donation_receipts_donation_id ON donation_receipts(donation_id);
CREATE INDEX idx_donation_receipts_receipt_number ON donation_receipts(receipt_number);
CREATE INDEX idx_donation_receipts_donor_email ON donation_receipts(donor_email);
CREATE INDEX idx_donation_receipts_tax_year ON donation_receipts(tax_year);

-- Add pickup/dropoff options to existing donations table if columns don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='donations' AND column_name='pickup_option') THEN
    ALTER TABLE donations ADD COLUMN pickup_option VARCHAR(50) DEFAULT 'pickup';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='donations' AND column_name='pickup_address') THEN
    ALTER TABLE donations ADD COLUMN pickup_address TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='donations' AND column_name='photos') THEN
    ALTER TABLE donations ADD COLUMN photos TEXT[] DEFAULT '{}';
  END IF;
END $$;
