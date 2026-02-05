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
        const adminKey = event.headers['x-admin-key'];

        if (!adminKey || adminKey !== process.env.ADMIN_API_KEY) {
            return {
                statusCode: 403,
                body: JSON.stringify({ error: "Forbidden: Invalid Admin Key" })
            };
        }

        const { email, credits } = JSON.parse(event.body || '{}');

        if (!email || typeof credits !== 'number') {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Email and credits (number) required" })
            };
        }

        // Get user from Supabase
        const { data: user, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (fetchError || !user) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "User not found" })
            };
        }

        // Update user credits
        const newCredits = (user.credits || 0) + credits;
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

        // Log this admin action
        await supabase
            .from('usage_logs')
            .insert({
                user_id: user.id,
                endpoint: 'ADMIN_CREDIT_UPDATE',
                cost: -credits,
            });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Credits updated successfully",
                user: { email: user.email, credits: newCredits }
            })
        };

    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
