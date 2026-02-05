import type { Handler } from '@netlify/functions';
import { supabase } from './lib/supabase';
import { verifyToken } from './lib/auth';

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'GET') {
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

        // Fetch usage logs for chart
        const { data: usageLogs } = await supabase
            .from('usage_logs')
            .select('*')
            .eq('user_id', user.id)
            .order('timestamp', { ascending: true })
            .limit(100);

        return {
            statusCode: 200,
            body: JSON.stringify({
                user: {
                    name: user.name,
                    email: user.email,
                    credits: user.credits,
                    company: user.company,
                    apiKey: user.api_key
                },
                usageLogs: usageLogs || []
            })
        };

    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};


