# 🚀 Quick Start Guide - Sign In & Sign Up Setup

## ✅ What's Already Done
- Frontend auth pages are ready
- Backend API is migrated to Supabase
- Netlify Functions are configured
- All code is working

## ❌ What You Need to Do

### **YOU MUST SET UP SUPABASE FIRST!**

The sign in and sign up **will NOT work** until you complete these steps:

---

## 📋 Step-by-Step Setup (5 minutes)

### **Step 1: Create Supabase Project** (2 minutes)

1. **Go to**: https://supabase.com
2. **Click**: "Start your project" or "Sign In"
3. **Sign up** with GitHub, Google, or email
4. **Click**: "New Project"
5. **Fill in**:
   - Organization: Create new or select existing
   - Name: `DocNexus` (or any name you like)
   - Database Password: **Choose a strong password and SAVE IT!**
   - Region: Select closest to your location
   - Pricing Plan: Free
6. **Click**: "Create new project"
7. **Wait**: 1-2 minutes while it provisions

### **Step 2: Run SQL Schema** (1 minute)

1. In your Supabase project dashboard
2. **Click**: "SQL Editor" in the left sidebar
3. **Click**: "New Query" button
4. **Open** the file `supabase-schema.sql` from this project
5. **Copy** all the SQL code
6. **Paste** into the Supabase SQL Editor
7. **Click**: "Run" (or press Ctrl+Enter)
8. **Verify**: You should see "Success. No rows returned"

### **Step 3: Get Your Credentials** (1 minute)

1. In Supabase dashboard
2. **Click**: "Settings" (gear icon) in left sidebar
3. **Click**: "API"
4. **Copy** two values:
   
   **A. Project URL**
   - Found under "Project URL"
   - Looks like: `https://abcdefghijk.supabase.co`
   - **Copy this!**
   
   **B. Anon/Public Key**
   - Found under "Project API keys"
   - Section: "anon public"
   - Starts with: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Copy this!**

### **Step 4: Update .env File** (1 minute)

1. **Open** the `.env` file in your project root
2. **Replace** the placeholder values:

**BEFORE:**
```env
SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

**AFTER:**
```env
SUPABASE_URL=https://your-actual-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key-here
```

3. **Save** the file

### **Step 5: Verify Configuration** (30 seconds)

Run this command to check if everything is set up correctly:

```bash
node test-supabase.cjs
```

You should see:
```
✅ Configuration looks good!
```

If you see ❌ errors, go back and check your .env file.

### **Step 6: Start the Development Server** (30 seconds)

Run this command:

```bash
netlify dev
```

This will:
- Start the frontend on port 8080
- Start Netlify Functions (your API)
- Make everything available on port 8888

**Open your browser to**: http://localhost:8888

### **Step 7: Test Sign Up** (1 minute)

1. You should see the auth page
2. **Click**: "Register" tab
3. **Fill in**:
   - Full Name: `Test User`
   - Company: `Test Company`
   - Email: `test@example.com`
   - Password: `password123`
4. **Click**: "Create Account"
5. **Success!** You should be redirected to the dashboard

### **Step 8: Verify in Supabase** (30 seconds)

1. Go back to Supabase dashboard
2. **Click**: "Table Editor" in left sidebar
3. **Click**: "users" table
4. **You should see** your test user!

---

## 🎉 That's It!

Your sign in and sign up are now working!

---

## 🧪 Test Sign In

1. Logout (if logged in)
2. Go to auth page
3. **Click**: "Login" tab
4. **Enter**:
   - Email: `test@example.com`
   - Password: `password123`
5. **Click**: "Sign In"
6. **Success!** You're logged in

---

## 🔧 Troubleshooting

### "Cannot connect to server"
**Solution**: Make sure `netlify dev` is running

### "Invalid credentials" error on signup
**Solution**: 
1. Check that you updated .env with real Supabase credentials
2. Run `node test-supabase.cjs` to verify
3. Restart `netlify dev` after changing .env

### "Table does not exist"
**Solution**: 
1. Go to Supabase SQL Editor
2. Run the SQL from `supabase-schema.sql`
3. Check Table Editor to verify tables exist

### "User already exists"
**Solution**: 
- Email is already registered
- Try a different email
- Or check Supabase Table Editor and delete the user

### Port 8888 already in use
**Solution**:
```bash
# Kill the process using port 8888
# Then run netlify dev again
netlify dev
```

---

## 📝 Quick Commands Reference

```bash
# Check configuration
node test-supabase.cjs

# Start development server
netlify dev

# Open browser
# Go to: http://localhost:8888
```

---

## 🎯 Summary

To make sign in/sign up work, you MUST:

1. ✅ Create Supabase project
2. ✅ Run SQL schema
3. ✅ Get credentials (URL + Key)
4. ✅ Update .env file
5. ✅ Run `netlify dev`
6. ✅ Test at http://localhost:8888

**Current Status**: ❌ Supabase credentials not configured

**Run this to check**: `node test-supabase.cjs`

---

## 🆘 Still Need Help?

1. Make sure you followed ALL steps above
2. Check that .env has real values (not placeholders)
3. Verify SQL schema ran successfully in Supabase
4. Check browser console for errors (F12)
5. Check terminal for API errors

---

**Ready to start?** Begin with Step 1 above! 🚀
