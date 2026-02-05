# Supabase Migration Guide

## Overview
This guide will help you migrate your DocNexus application from MongoDB to Supabase.

## Prerequisites
- A Supabase account (sign up at https://supabase.com)
- Your existing MongoDB data (if you want to migrate it)

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in your project details:
   - **Name**: DocNexus (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
4. Click "Create new project"
5. Wait for the project to be provisioned (usually takes 1-2 minutes)

## Step 2: Set Up the Database Schema

1. In your Supabase dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` from your project root
4. Paste it into the SQL editor
5. Click "Run" to execute the SQL
6. You should see a success message confirming the tables were created

## Step 3: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. You'll need two values:
   - **Project URL**: Found under "Project URL" (looks like `https://xxxxx.supabase.co`)
   - **Anon/Public Key**: Found under "Project API keys" → "anon public"

## Step 4: Update Environment Variables

1. Open your `.env` file in the project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

3. Keep the other environment variables as they are:
   - `JWT_SECRET`: Keep your existing secret or generate a new one
   - `ADMIN_API_KEY`: Keep your existing admin key
   - `VITE_API_URL`: Keep as is for local development

## Step 5: Migrate Existing Data (Optional)

If you have existing users and data in MongoDB that you want to migrate:

### Option A: Manual Migration (Small Dataset)
1. Export your MongoDB data using MongoDB Compass or mongodump
2. Transform the data to match Supabase schema:
   - `_id` → `id` (convert ObjectId to UUID)
   - `apiKey` → `api_key`
   - `createdAt` → `created_at`
3. Insert data via Supabase dashboard or API

### Option B: Script Migration (Larger Dataset)
Create a migration script that:
1. Connects to both MongoDB and Supabase
2. Reads users from MongoDB
3. Transforms and inserts into Supabase
4. Handles errors and logs progress

Example migration script structure:
```javascript
// migration.js
const mongoose = require('mongoose');
const { createClient } = require('@supabase/supabase-js');

// Connect to both databases
// Read from MongoDB
// Transform data
// Insert into Supabase
```

## Step 6: Test the Migration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the following features:
   - **Sign Up**: Create a new user account
   - **Login**: Log in with the new account
   - **Dashboard**: View dashboard data
   - **API Key Generation**: Generate an API key
   - **Usage Simulation**: Test the simulate-usage endpoint
   - **Admin Functions**: Test credit updates (if applicable)

3. Check Supabase dashboard:
   - Go to **Table Editor** → **users** to see your new user
   - Go to **Table Editor** → **usage_logs** to see logged activities

## Step 7: Verify Data Integrity

1. In Supabase dashboard, go to **Table Editor**
2. Check the `users` table:
   - Verify user records are created correctly
   - Check that passwords are hashed
   - Verify credits are assigned properly
3. Check the `usage_logs` table:
   - Verify logs are being created
   - Check timestamps are correct

## Step 8: Update Deployment Configuration

### For Netlify:
1. Go to your Netlify dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the new environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Keep existing variables:
   - `JWT_SECRET`
   - `ADMIN_API_KEY`
5. Remove old MongoDB variables:
   - `MONGO_URI`
6. Trigger a new deployment

### For Vercel:
1. Go to your Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the new Supabase variables
4. Remove old MongoDB variables
5. Redeploy your application

## Step 9: Monitor and Optimize

1. **Monitor Performance**:
   - Check Supabase dashboard for query performance
   - Use the **Database** → **Query Performance** tab

2. **Set Up Backups**:
   - Supabase automatically backs up your database
   - Configure additional backup schedules if needed

3. **Enable Real-time** (Optional):
   - If you want real-time features, enable them in Supabase
   - Update your frontend to use Supabase real-time subscriptions

## Troubleshooting

### Issue: "Invalid API credentials"
- **Solution**: Double-check your `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env`
- Make sure there are no extra spaces or quotes

### Issue: "Table does not exist"
- **Solution**: Re-run the SQL schema from `supabase-schema.sql`
- Check for any SQL errors in the Supabase SQL Editor

### Issue: "Row Level Security policy violation"
- **Solution**: The API uses the anon key, which should work with the service role policies
- If issues persist, temporarily disable RLS for testing (not recommended for production)

### Issue: "Cannot read property 'id' of null"
- **Solution**: Check that your queries are returning data
- Add error handling and logging to identify which query is failing

## Benefits of Supabase

✅ **Built-in Authentication**: Can integrate Supabase Auth for easier user management
✅ **Real-time Capabilities**: Subscribe to database changes in real-time
✅ **Auto-generated APIs**: RESTful and GraphQL APIs out of the box
✅ **Row Level Security**: Fine-grained access control at the database level
✅ **Better Performance**: PostgreSQL is generally faster than MongoDB for relational data
✅ **Free Tier**: Generous free tier for development and small projects
✅ **Dashboard**: Beautiful UI for managing your database
✅ **Backups**: Automatic daily backups

## Next Steps

1. Consider using Supabase Auth instead of custom JWT authentication
2. Explore Supabase Storage for file uploads
3. Set up Supabase Edge Functions for serverless operations
4. Implement real-time features using Supabase subscriptions
5. Use Supabase's built-in email templates for user notifications

## Support

If you encounter any issues during migration:
- Check Supabase documentation: https://supabase.com/docs
- Join Supabase Discord: https://discord.supabase.com
- Review the Supabase GitHub discussions: https://github.com/supabase/supabase/discussions

## Rollback Plan

If you need to rollback to MongoDB:
1. Keep your MongoDB connection string safe
2. The old `db.ts` and `models.ts` files are still in your project
3. Revert the API endpoint changes
4. Update `.env` to use `MONGO_URI` again
5. Redeploy with the old configuration
