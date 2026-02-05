# 🔍 Debug Authentication Issue

## Step 1: Check Browser Console Error

1. Open your deployed Netlify site
2. Press `F12` to open Developer Tools
3. Go to the **Console** tab
4. Try to sign up
5. Look for any red error messages

**What to look for:**
- Network errors (404, 500, etc.)
- CORS errors
- JavaScript errors
- API response errors

## Step 2: Check Network Tab

1. In Developer Tools (F12), go to **Network** tab
2. Try to sign up again
3. Look for the request to `auth-signup`
4. Click on it to see:
   - **Status Code** (200, 400, 500, etc.)
   - **Response** (what error message was returned)
   - **Request Headers**
   - **Request Payload**

## Step 3: Check Netlify Function Logs

This is the MOST IMPORTANT step:

1. Go to https://app.netlify.com/
2. Open your site
3. Click **Functions** in the top navigation
4. Click on **auth-signup** function
5. Scroll down to see **Function log**
6. Look for error messages

**Copy the error messages you see!**

## Step 4: Common Issues & Solutions

### Issue 1: "Function not found" or 404 error
**Cause:** Functions didn't deploy properly
**Solution:** 
- Check that `netlify.toml` has `functions = "api"`
- Redeploy the site

### Issue 2: "Server configuration error"
**Cause:** Environment variables not set or typo in variable names
**Solution:**
- Double-check variable names (case-sensitive!)
- Make sure all 3 variables are set
- Redeploy after adding variables

### Issue 3: "Failed to create user" - Supabase error
**Cause:** Issue with Supabase connection or table schema
**Solution:**
- Verify Supabase credentials are correct
- Check that `users` table exists in Supabase
- Run the schema creation script

### Issue 4: CORS error
**Cause:** Cross-origin request blocked
**Solution:**
- Check Netlify function is returning proper headers
- Verify the API endpoint URL

### Issue 5: "User already exists"
**Cause:** Email was already used for signup
**Solution:**
- Try a different email
- Or check Supabase to see if user exists

## Step 5: Test Supabase Connection

Run this locally to verify Supabase is working:

```bash
node test-supabase.cjs
```

## Quick Checklist

- [ ] Environment variables added to Netlify (all 3)
- [ ] Site redeployed after adding env vars
- [ ] Browser console checked for errors
- [ ] Network tab checked for API response
- [ ] Netlify function logs checked
- [ ] Supabase credentials verified
- [ ] Using a NEW email (not previously registered)

## What to Share

Please provide:
1. **Error message from browser console**
2. **Status code from Network tab** (e.g., 404, 500)
3. **Response from Network tab** (the actual error returned)
4. **Netlify function logs** (if accessible)
5. **Screenshot** (if possible)

This will help identify the exact issue!
