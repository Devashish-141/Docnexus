import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './lib/supabase';
import bcrypt from 'bcryptjs';
import { signToken } from './lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    console.log('Auth-login called, method:', req.method);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { email, password } = req.body || {};
        console.log('Login attempt for email:', email);

        if (!email || !password) {
            console.log('Missing email or password');
            return res.status(400).json({ error: "Email and password required" });
        }

        // Query user from Supabase
        console.log('Querying user from Supabase...');
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error) {
            console.error('Supabase query error:', error);
        }

        if (!user) {
            console.log('User not found for email:', email);
            return res.status(400).json({ error: "Invalid credentials" });
        }

        console.log('User found, checking password...');
        // console.log('Stored password hash:', user.password.substring(0, 20) + '...');

        const isValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isValid);

        if (!isValid) {
            console.log('Invalid password for user:', email);
            return res.status(400).json({ error: "Invalid credentials" });
        }

        console.log('Login successful for user:', user.id);
        const token = signToken(user.id);

        return res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                company: user.company
            }
        });
    } catch (error: any) {
        console.error('Unexpected error in auth-login:', error);
        return res.status(500).json({ error: error.message });
    }
}
