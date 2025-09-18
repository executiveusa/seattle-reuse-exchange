-- Initial schema for Seattle Reuse Exchange
-- Migration: 001_initial_schema.up.sql

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'bidder' CHECK (role IN ('admin', 'manager', 'volunteer', 'bidder')),
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

-- Create items table
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id),
    condition TEXT CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'parts')),
    images JSONB DEFAULT '[]',
    location TEXT,
    dimensions JSONB,
    weight DECIMAL,
    buy_now_price DECIMAL,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create auctions table
CREATE TABLE auctions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID REFERENCES items(id) UNIQUE,
    starts_at TIMESTAMPTZ,
    ends_at TIMESTAMPTZ,
    reserve_price DECIMAL,
    min_increment DECIMAL DEFAULT 5,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'open', 'closed', 'settled')),
    anti_sniping_window_sec INTEGER DEFAULT 120
);

-- Create bids table
CREATE TABLE bids (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auction_id UUID REFERENCES auctions(id),
    user_id UUID REFERENCES users(id),
    amount DECIMAL NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    item_id UUID REFERENCES items(id),
    auction_id UUID REFERENCES auctions(id),
    total DECIMAL,
    payment_provider TEXT CHECK (payment_provider IN ('stripe', 'crypto_placeholder')),
    status TEXT CHECK (status IN ('pending', 'paid', 'refunded', 'failed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create donations_cash table
CREATE TABLE donations_cash (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    amount DECIMAL NOT NULL,
    receipt_id TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create donations_goods table
CREATE TABLE donations_goods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    description TEXT,
    photos JSONB DEFAULT '[]',
    status TEXT CHECK (status IN ('submitted', 'approved', 'received', 'listed', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit_log table
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID,
    action TEXT,
    entity TEXT,
    entity_id UUID,
    meta JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_items_category ON items(category_id);
CREATE INDEX idx_items_condition ON items(condition);
CREATE INDEX idx_items_created_at ON items(created_at);
CREATE INDEX idx_auctions_status ON auctions(status);
CREATE INDEX idx_auctions_ends_at ON auctions(ends_at);
CREATE INDEX idx_bids_auction ON bids(auction_id);
CREATE INDEX idx_bids_user ON bids(user_id);
CREATE INDEX idx_bids_created_at ON bids(created_at);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_audit_log_entity ON audit_log(entity, entity_id);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);