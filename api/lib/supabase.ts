import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL) {
  throw new Error('Please define the SUPABASE_URL environment variable inside .env');
}

if (!SUPABASE_ANON_KEY) {
  throw new Error('Please define the SUPABASE_ANON_KEY environment variable inside .env');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database types for TypeScript support
export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  credits: number;
  company?: string;
  api_key?: string;
  created_at: string;
}

export interface UsageLog {
  id: string;
  user_id: string;
  endpoint?: string;
  cost?: number;
  timestamp: string;
}
