import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Integrate with an email service (Resend, SendGrid, etc.)
    // For now, we simulate a successful submission.
    console.log(`[Contact Form] New Message from ${email}: ${subject} - ${message.substring(0, 50)}...`);

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return res.status(200).json({
        success: true,
        message: 'Message received successfully. We will get back to you shortly.'
    });
}
