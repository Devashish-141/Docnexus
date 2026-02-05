import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './lib/supabase';
import bcrypt from 'bcryptjs';
import { signToken } from './lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    console.log('Auth-signup called, method:', req.method);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        console.log('Parsing request body...');
        const { email, password, name, company } = req.body || {};
        console.log('Request data:', { email, name, company });

        if (!email || !password || !name) {
            console.log('Missing required fields');
            return res.status(400).json({ error: "Email, password, and name are required" });
        }

        console.log('Checking for existing user...');
        // Check if user already exists
        const { data: existingUser, error: checkError } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (checkError && checkError.code !== 'PGRST116') {
            console.error('Error checking user:', checkError);
        }

        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ error: "User already exists" });
        }

        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Inserting new user...');
        // Insert new user into Supabase
        const { data: newUser, error } = await supabase
            .from('users')
            .insert({
                email,
                password: hashedPassword,
                name,
                credits: 50, // Sign up bonus
                company: company || "My Company"
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase insert error:', error);
            return res.status(500).json({ error: error.message || "Failed to create user" });
        }

        if (!newUser) {
            console.error('No user returned from insert');
            return res.status(500).json({ error: "Failed to create user" });
        }

        console.log('User created successfully:', newUser.id);
        const token = signToken(newUser.id);

        return res.status(201).json({
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                company: newUser.company
            }
        });
    } catch (error: any) {
        console.error('Unexpected error in auth-signup:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
}
