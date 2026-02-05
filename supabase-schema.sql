-- DocNexus Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to create the necessary tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  credits INTEGER DEFAULT 50,
  company TEXT,
  api_key TEXT UNIQUE,
  subscription_status TEXT DEFAULT 'free', -- 'free', 'active', 'past_due'
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Usage Logs Table
CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  endpoint TEXT,
  cost NUMERIC(10, 2) DEFAULT 0,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Contact Form Submissions
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- 'new', 'read', 'archived'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_api_key ON users(api_key);
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_timestamp ON usage_logs(timestamp);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES
-- NOTE: Since the backend API currently runs with the client-side ANON KEY,
-- we must temporarily allow public access for the API to function.
-- IN PRODUCTION: Use the SERVICE_ROLE_KEY in your backend environment variables
-- to bypass RLS, and lock these policies down to "auth.uid() = id".

-- Users Policies
DROP POLICY IF EXISTS "Public CRUD access on users" ON users;
CREATE POLICY "Public CRUD access on users" ON users
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Usage Logs Policies
DROP POLICY IF EXISTS "Public CRUD access on usage_logs" ON usage_logs;
CREATE POLICY "Public CRUD access on usage_logs" ON usage_logs
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Contacts Policies
DROP POLICY IF EXISTS "Public insert access on contacts" ON contacts;
CREATE POLICY "Public insert access on contacts" ON contacts
  FOR INSERT
  WITH CHECK (true);
  
DROP POLICY IF EXISTS "Public read access on contacts" ON contacts;
CREATE POLICY "Public read access on contacts" ON contacts
  FOR SELECT
  USING (true);

-- Utility Function to update 'updated_at' column
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW; 
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_modtime ON users;
CREATE TRIGGER update_users_modtime 
BEFORE UPDATE ON users 
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
