# Making Sign In and Sign Up Work - Quick Setup Guide

## Current Status
✅ Frontend code is ready (Auth.tsx, AuthContext.tsx)
✅ Backend API endpoints are migrated to Supabase
✅ Netlify Functions are configured
⏳ Need to set up Supabase credentials
⏳ Need to run with Netlify Dev for local testing

## Step-by-Step Setup

### Step 1: Set Up Supabase (REQUIRED)

1. **Go to Supabase**: https://supabase.com
2. **Sign up/Login** to your account
3. **Create a new project**:
   - Click "New Project"
   - Name: DocNexus (or your choice)
   - Database Password: Choose a strong password
   - Region: Select closest to you
   - Click "Create new project"
   - Wait 1-2 minutes for provisioning

4. **Run the SQL Schema**:
   - In Supabase dashboard, go to **SQL Editor** (left sidebar)
   - Click "New Query"
   - Copy the SQL from `supabase-schema.sql` file
   - Paste and click **Run**
   - You should see success message

5. **Get Your Credentials**:
   - Go to **Settings** → **API** (left sidebar)
   - Copy **Project URL** (looks like: https://xxxxx.supabase.co)
   - Copy **anon public** key (under "Project API keys")

6. **Update .env File**:
   Open `.env` and replace placeholders:
   ```env
   SUPABASE_URL=https://your-actual-project-id.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key
   ```

### Step 2: Run with Netlify Dev (Local Development)

Since your API endpoints are Netlify Functions, you need to use Netlify CLI:

```bash
# Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli

# Run the development server with Netlify Functions
netlify dev
```

This will:
- Start Vite dev server on port 8080
- Start Netlify Functions on port 8888
- Proxy API calls correctly

### Step 3: Test Sign Up

1. Open browser to: http://localhost:8888
2. Click on "Register" tab
3. Fill in:
   - Full Name: Test User
   - Company: Test Company
   - Email: test@example.com
   - Password: password123
4. Click "Create Account"
5. You should be redirected to dashboard

### Step 4: Test Sign In

1. Go back to auth page
2. Click "Login" tab
3. Enter:
   - Email: test@example.com
   - Password: password123
4. Click "Sign In"
5. You should be redirected to dashboard

### Step 5: Verify in Supabase

1. Go to Supabase dashboard
2. Click **Table Editor** → **users**
3. You should see your test user!

## Alternative: Quick Test Without Netlify CLI

If you want to test quickly without setting up Netlify CLI, you can create a simple Express server:

### Option A: Create Local API Server

Create `server.js` in project root:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Import your API functions
const authLogin = require('./api/auth-login.ts');
const authSignup = require('./api/auth-signup.ts');
// ... import other endpoints

app.post('/api/auth-login', authLogin);
app.post('/api/auth-signup', authSignup);
// ... add other routes

app.listen(3001, () => {
  console.log('API server running on http://localhost:3001');
});
```

Then run:
```bash
npm install express cors
node server.js
```

## Troubleshooting

### "Cannot connect to API"
- Make sure Netlify Dev is running: `netlify dev`
- Or make sure your Express server is running on port 3001

### "Invalid API credentials" 
- Check that you updated `.env` with real Supabase credentials
- Make sure there are no extra spaces in the values

### "Table does not exist"
- Run the SQL schema in Supabase SQL Editor
- Check that tables were created in Table Editor

### "User already exists"
- The email is already registered
- Try a different email or check Supabase Table Editor

## Current Configuration

Your project is configured for:
- **Frontend**: Vite dev server on port 8080
- **API Proxy**: Vite proxies `/api/*` to `localhost:3001`
- **Netlify Dev**: Runs on port 8888 and handles both frontend + functions

## Recommended Approach

**Use Netlify Dev** (recommended):
```bash
netlify dev
```
Then open: http://localhost:8888

This is the closest to production environment and handles everything automatically.

## Next Steps After Sign In Works

1. ✅ Test all auth flows
2. ✅ Test dashboard data loading
3. ✅ Test API key generation
4. ✅ Deploy to Netlify with environment variables
5. ✅ Test in production

## Need Help?

If you're still having issues:
1. Check browser console for errors
2. Check terminal for API errors
3. Check Supabase logs in dashboard
4. Verify environment variables are loaded
