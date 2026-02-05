import type { Handler } from '@netlify/functions';
import { supabase } from './lib/supabase';

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" })
        };
    }

    try {
        const apiKey = event.headers['x-api-key'];

        if (!apiKey) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Missing x-api-key header" })
            };
        }

        // Find user by API key
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('api_key', apiKey)
            .single();

        if (userError || !user) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Invalid API Key" })
            };
        }

        if (user.credits <= 0) {
            return {
                statusCode: 402,
                body: JSON.stringify({ error: "Insufficient credits. Please recharge." })
            };
        }

        // Deduct Credit
        const newCredits = user.credits - 1;
        const { error: updateError } = await supabase
            .from('users')
            .update({ credits: newCredits })
            .eq('id', user.id);

        if (updateError) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: updateError.message })
            };
        }

        // Log Usage
        await supabase
            .from('usage_logs')
            .insert({
                user_id: user.id,
                endpoint: '/api/simulate-usage',
                cost: 1,
            });

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                remaining_credits: newCredits,
                message: "Usage simulated. 1 credit deducted."
            })
        };

    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
