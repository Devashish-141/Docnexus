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
        const { email, password } = JSON.parse(event.body || '{}');

        if (!email || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Email and password required" })
            };
        }

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (!user || (await bcrypt.compare(password, user.password)) === false) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Invalid credentials" })
            };
        }

        const token = signToken(user.id);

        return {
            statusCode: 200,
            body: JSON.stringify({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    company: user.company
                }
            })
        };
    } catch (error: any) {
        console.error('[AUTH-LOGIN] Error:', error);

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
            body: JSON.stringify({ error: error.message })
        };
    }
};


