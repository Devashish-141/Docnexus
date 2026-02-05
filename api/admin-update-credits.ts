import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const adminKeyHeader = req.headers['x-admin-key'];
        const adminKey = Array.isArray(adminKeyHeader) ? adminKeyHeader[0] : adminKeyHeader;

        if (!adminKey || adminKey !== process.env.ADMIN_API_KEY) {
            return res.status(403).json({ error: "Forbidden: Invalid Admin Key" });
        }

        const { email, credits } = req.body || {};

        if (!email || typeof credits !== 'number') {
            return res.status(400).json({ error: "Email and credits (number) required" });
        }

        // Get user from Supabase
        const { data: user, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (fetchError || !user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user credits
        const newCredits = (user.credits || 0) + credits;
        const { error: updateError } = await supabase
            .from('users')
            .update({ credits: newCredits })
            .eq('id', user.id);

        if (updateError) {
            return res.status(500).json({ error: updateError.message });
        }

        // Log this admin action
        await supabase
            .from('usage_logs')
            .insert({
                user_id: user.id,
                endpoint: 'ADMIN_CREDIT_UPDATE',
                cost: -credits,
            });

        return res.status(200).json({
            message: "Credits updated successfully",
            user: { email: user.email, credits: newCredits }
        });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
