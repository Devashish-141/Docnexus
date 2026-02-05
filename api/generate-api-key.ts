import type { Handler } from '@netlify/functions';
import { supabase } from './lib/supabase';
import { verifyToken } from './lib/auth';
import crypto from 'crypto';

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" })
        };
    }

    try {
        const authHeader = event.headers.authorization;
        if (!authHeader) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "No token provided" })
            };
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);

        if (!decoded) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Invalid token" })
            };
        }

        // Get user from Supabase
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', decoded.userId)
            .single();

        if (userError || !user) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "User not found" })
            };
        }

        // Generate a new secure API Key
        const newKey = 'dn_' + crypto.randomBytes(24).toString('hex');

        // Update user's API key
        const { error: updateError } = await supabase
            .from('users')
            .update({ api_key: newKey })
            .eq('id', user.id);

        if (updateError) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: updateError.message })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ apiKey: newKey })
        };

    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};


