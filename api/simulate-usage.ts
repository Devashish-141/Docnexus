import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const apiKeyHeader = req.headers['x-api-key'];
        const apiKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;

        if (!apiKey) {
            return res.status(401).json({ error: "Missing x-api-key header" });
        }

        // Find user by API key
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('api_key', apiKey)
            .single();

        if (userError || !user) {
            return res.status(401).json({ error: "Invalid API Key" });
        }

        if (user.credits <= 0) {
            return res.status(402).json({ error: "Insufficient credits. Please recharge." });
        }

        // Deduct Credit
        const newCredits = user.credits - 1;
        const { error: updateError } = await supabase
            .from('users')
            .update({ credits: newCredits })
            .eq('id', user.id);

        if (updateError) {
            return res.status(500).json({ error: updateError.message });
        }

        // Log Usage
        await supabase
            .from('usage_logs')
            .insert({
                user_id: user.id,
                endpoint: '/api/simulate-usage',
                cost: 1,
            });

        return res.status(200).json({
            success: true,
            remaining_credits: newCredits,
            message: "Usage simulated. 1 credit deducted."
        });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
