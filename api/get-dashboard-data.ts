import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './lib/supabase';
import { verifyToken } from './lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
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

        // Fetch usage logs for chart
        const { data: usageLogs, error: logsError } = await supabase
            .from('usage_logs')
            .select('*')
            .eq('user_id', user.id)
            .order('timestamp', { ascending: true })
            .limit(100);

        return res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
                credits: user.credits,
                company: user.company,
                apiKey: user.api_key
            },
            usageLogs: usageLogs || []
        });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
