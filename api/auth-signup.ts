import type { Handler } from '@netlify/functions';
import { supabase } from './lib/supabase';
import bcrypt from 'bcryptjs';
import { signToken } from './lib/auth';

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" })
        };
    }

    try {
        const { email, password, name, company } = JSON.parse(event.body || '{}');

        if (!email || !password || !name) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Email, password, and name are required" })
            };
        }

        // Check if user already exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "User already exists" })
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into Supabase
        const { data: newUser, error } = await supabase
            .from('users')
            .insert({
                email,
                password: hashedPassword,
                name,
                credits: 50, // Sign up bonus
                company: company || "My Company"
            })
            .select()
            .single();

        if (error || !newUser) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error?.message || "Failed to create user" })
            };
        }

        const token = signToken(newUser.id);

        return {
            statusCode: 201,
            body: JSON.stringify({
                token,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    company: newUser.company
                }
            })
        };
    } catch (error: any) {
        console.error('[AUTH-SIGNUP] Error:', error);

        // Check if it's a configuration error
        if (error.message?.includes('environment variable')) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: 'Server configuration error. Please contact administrator.',
                    details: error.message
                })
            };
        }

        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Internal server error' })
        };
    }
};


