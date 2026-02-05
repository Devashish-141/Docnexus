import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './lib/supabase';
import { verifyToken } from './lib/auth';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" });
        }

        // Get user from Supabase
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', decoded.userId)
            .single();

        if (userError || !user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate a new secure API Key
        const newKey = 'dn_' + crypto.randomBytes(24).toString('hex');

        // Update user's API key
        const { error: updateError } = await supabase
            .from('users')
            .update({ api_key: newKey })
            .eq('id', user.id);

        if (updateError) {
            return res.status(500).json({ error: updateError.message });
        }

        return res.status(200).json({ apiKey: newKey });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
