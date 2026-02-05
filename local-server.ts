import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handler as authLogin } from './api/auth-login.ts';
import { handler as authSignup } from './api/auth-signup.ts';
import { handler as getDashboardData } from './api/get-dashboard-data.ts';
import { handler as generateApiKey } from './api/generate-api-key.ts';
import { handler as simulateUsage } from './api/simulate-usage.ts';
import { handler as adminUpdateCredits } from './api/admin-update-credits.ts';
import { handler as contactSubmit } from './api/contact-submit.ts';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Adapter for Netlify Functions to run in Express
const netlifyAdapter = (handler: any) => async (req: any, res: any) => {
    try {
        const event = {
            httpMethod: req.method,
            body: JSON.stringify(req.body),
            headers: req.headers,
            // Add other Netlify event properties if needed
        };

        const context = {}; // minimal context

        const result = await handler(event, context);

        if (result.headers) {
            for (const [key, value] of Object.entries(result.headers)) {
                res.setHeader(key, value as string);
            }
        }

        res.status(result.statusCode).send(result.body);
    } catch (error) {
        console.error('Adapter error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Routes
app.post('/api/auth-login', netlifyAdapter(authLogin));
app.post('/api/auth-signup', netlifyAdapter(authSignup));
app.get('/api/get-dashboard-data', netlifyAdapter(getDashboardData));
app.post('/api/generate-api-key', netlifyAdapter(generateApiKey));
app.post('/api/simulate-usage', netlifyAdapter(simulateUsage));
app.post('/api/admin-update-credits', netlifyAdapter(adminUpdateCredits));
app.post('/api/contact-submit', netlifyAdapter(contactSubmit));

app.listen(PORT, () => {
    console.log(`Local API Server (Netlify Compatible) running on http://localhost:${PORT}`);
});
