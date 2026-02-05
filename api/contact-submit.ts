import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    const { name, email, subject, message } = JSON.parse(event.body || '{}');

    if (!name || !email || !message) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing required fields' })
        };
    }

    // TODO: Integrate with an email service (Resend, SendGrid, etc.)
    // For now, we simulate a successful submission.
    console.log(`[Contact Form] New Message from ${email}: ${subject} - ${message.substring(0, 50)}...`);

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true,
            message: 'Message received successfully. We will get back to you shortly.'
        })
    };
};
