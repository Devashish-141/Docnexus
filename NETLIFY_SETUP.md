# Netlify Deployment Setup Guide

## Issue: Sign Up and Sign In Not Working on Netlify

The authentication endpoints are failing on Netlify because **environment variables are not configured**.

## Solution: Configure Environment Variables on Netlify

### Step 1: Access Netlify Dashboard

1. Go to [Netlify](https://app.netlify.com/)
2. Navigate to your deployed site
3. Click on **Site settings**

### Step 2: Add Environment Variables

1. In the left sidebar, click on **Environment variables** (under "Build & deploy")
2. Click **Add a variable** or **Add environment variables**
3. Add the following variables:

#### Required Environment Variables

| Variable Name | Description | Where to Get It |
|--------------|-------------|-----------------|
| `SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Project Settings → API |
| `SUPABASE_ANON_KEY` | Your Supabase anonymous key | Supabase Dashboard → Project Settings → API |
| `JWT_SECRET` | Secret key for JWT tokens | Generate a random string (min 32 characters) |

#### How to Generate JWT_SECRET

Run this command in your terminal to generate a secure random secret:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use an online generator like https://randomkeygen.com/

### Step 3: Redeploy Your Site

After adding the environment variables:

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for the deployment to complete

### Step 4: Verify the Fix

1. Open your deployed site
2. Navigate to the sign-up or sign-in page
3. Try creating an account or logging in
4. Check the browser console (F12) for any errors

## Troubleshooting

### Check Netlify Function Logs

1. Go to your Netlify dashboard
2. Click on **Functions** in the top navigation
3. Click on `auth-signup` or `auth-login`
4. View the **Function log** to see any errors

### Common Issues

1. **"Missing SUPABASE_URL"** - Environment variable not set correctly
2. **"Missing JWT_SECRET"** - Environment variable not set correctly
3. **CORS errors** - Check that your frontend is using the correct API endpoints
4. **Network errors** - Verify Supabase credentials are correct

## Testing Locally

To test locally with the same environment:

1. Copy `.env.example` to `.env`
2. Fill in your actual values
3. Run `npm run dev`

## Netlify Function Endpoints

Your authentication endpoints on Netlify will be:

- **Sign Up**: `https://your-site.netlify.app/api/auth-signup`
- **Sign In**: `https://your-site.netlify.app/api/auth-login`

The frontend makes requests to `/api/auth-signup` and `/api/auth-login`, which Netlify automatically routes to `/.netlify/functions/auth-signup` and `/.netlify/functions/auth-login` (configured in `netlify.toml`).
