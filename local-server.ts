import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Vercel API handlers (default exports)
import authLogin from './api/auth-login.ts';
import authSignup from './api/auth-signup.ts';
import getDashboardData from './api/get-dashboard-data.ts';
import generateApiKey from './api/generate-api-key.ts';
import simulateUsage from './api/simulate-usage.ts';
import adminUpdateCredits from './api/admin-update-credits.ts';
import contactSubmit from './api/contact-submit.ts';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Routes - Map directly to Vercel handlers which are practically Express-compatible
// (VercelRequest/Response types are compatible with Express Req/Res for these usages)
app.post('/api/auth-login', authLogin as any);
app.post('/api/auth-signup', authSignup as any);
app.get('/api/get-dashboard-data', getDashboardData as any);
app.post('/api/generate-api-key', generateApiKey as any);
app.post('/api/simulate-usage', simulateUsage as any);
app.post('/api/admin-update-credits', adminUpdateCredits as any);
app.post('/api/contact-submit', contactSubmit as any);

app.listen(PORT, () => {
    console.log(`Local API Server (Vercel Compatible) running on http://localhost:${PORT}`);
});
