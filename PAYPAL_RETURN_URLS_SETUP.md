# PayPal Return URLs Configuration Guide

## Overview

After payment completion or cancellation, users need to be redirected back to your website. This guide explains how to configure PayPal return URLs.

---

## 🔗 Your Return URLs

Once your site is deployed on Netlify, use these URLs:

### For Production (Netlify)
Replace `YOUR-SITE-NAME` with your actual Netlify site name:

- **Success URL:** `https://YOUR-SITE-NAME.netlify.app/payment/success`
- **Cancel URL:** `https://YOUR-SITE-NAME.netlify.app/payment/cancelled`

### For Testing (Local Development)
- **Success URL:** `http://localhost:8080/payment/success`
- **Cancel URL:** `http://localhost:8080/payment/cancelled`

---

## 📋 How to Configure in PayPal

### Step 1: Access PayPal Payment Button Settings

1. Log in to your PayPal Business account
2. Go to **Payment Buttons** or **Product & Services**
3. Find the payment links you created for DocuNexus subscriptions

### Step 2: Edit Each Payment Link

You have 6 payment links to update (3 monthly + 3 annual). For each one:

#### Monthly Plans
- **Basic Monthly** (`T87PWJX7JPRDU`)
- **Personal Monthly** (`C2A6ZW8TACGK8`)
- **Business Monthly** (`63ZL4ZCQFRDMS`)

#### Annual Plans
- **Basic Annual** (`K532H2T3BZU4Y`)
- **Personal Annual** (`C572JNGFFPXGJ`)
- **Business Annual** (`2WP4H4RELGZRG`)

### Step 3: Set Return URLs for Each Button

1. Click **Edit** on each payment button/link
2. Look for **Advanced Settings** or **Advanced Options**
3. Find the section for **Return URLs** or **Website Preferences**
4. Set these URLs:

   **Return URL (on successful payment):**
   ```
   https://YOUR-SITE-NAME.netlify.app/payment/success
   ```

   **Cancel URL (if payment is cancelled):**
   ```
   https://YOUR-SITE-NAME.netlify.app/payment/cancelled
   ```

5. **Enable Auto Return** (if available)
6. **Save** the changes

### Step 4: Repeat for All Subscription Tiers

Make sure to update all 6 payment links with the same return URLs.

---

## 🎨 Pages Created

### 1. Payment Success Page (`/payment/success`)
**What it shows:**
- ✅ Success message with animated checkmark
- 📧 Email confirmation notice
- 📝 Account setup instructions
- 🔗 Button to create account
- 🏠 Button to return home
- 📧 Support contact information

**Features:**
- Reads email from URL parameters if provided by PayPal
- Beautiful animations
- Clear next steps
- Mobile responsive

### 2. Payment Cancelled Page (`/payment/cancelled`)
**What it shows:**
- ❌ Cancellation message (non-alarming)
- 💡 Reassurance that no charges were made
- 🔄 Option to return to pricing
- 📞 Contact support option
- 🏠 Return to home button

**Features:**
- Friendly, non-judgmental messaging
- Easy navigation back to pricing
- Support contact options
- Mobile responsive

---

## 🔧 Advanced PayPal Configuration (Optional)

### Payment Data Transfer (PDT)

If you want to receive payment details on the success page:

1. Go to PayPal Account Settings → Website Payments → Website Preferences
2. Enable **Auto Return**
3. Set **Return URL** to: `https://YOUR-SITE-NAME.netlify.app/payment/success`
4. Enable **Payment Data Transfer (PDT)**
5. Copy the **Identity Token**
6. You can use this token to fetch payment details on the success page

### IPN (Instant Payment Notification)

For backend payment verification:

1. Go to PayPal Account Settings → Notifications
2. Enable **Instant Payment Notifications (IPN)**
3. Set **Notification URL** to: `https://YOUR-SITE-NAME.netlify.app/api/paypal-ipn`
4. You would need to create this API endpoint to handle payment verification

---

## 🌐 Finding Your Netlify Site URL

1. Go to https://app.netlify.com/
2. Click on your deployed site
3. Your site URL is shown at the top (e.g., `https://docunexus-abc123.netlify.app`)
4. You can also set up a custom domain

---

## ✅ Testing Checklist

Before going live, test the complete flow:

### Monthly Plans
- [ ] Basic Monthly → Complete payment → Redirects to /payment/success
- [ ] Basic Monthly → Cancel payment → Redirects to /payment/cancelled
- [ ] Personal Monthly → Complete payment → Success page
- [ ] Personal Monthly → Cancel → Cancelled page
- [ ] Business Monthly → Complete payment → Success page
- [ ] Business Monthly → Cancel → Cancelled page

### Annual Plans
- [ ] Basic Annual → Complete → Success
- [ ] Basic Annual → Cancel → Cancelled
- [ ] Personal Annual → Complete → Success
- [ ] Personal Annual → Cancel → Cancelled
- [ ] Business Annual → Complete → Success
- [ ] Business Annual → Cancel → Cancelled

### Page Functionality
- [ ] Success page displays correctly
- [ ] Cancelled page displays correctly
- [ ] All buttons work (Create Account, Return to Pricing, Return to Home)
- [ ] No broken links
- [ ] Mobile responsive on both pages
- [ ] Support email links work

---

## 🚨 Important Notes

1. **Update ALL 6 payment links** with the return URLs
2. **Use HTTPS** for production URLs (required by PayPal)
3. **Test with PayPal Sandbox** first before going live
4. **Replace YOUR-SITE-NAME** with your actual Netlify site name
5. **The return URLs must be EXACTLY the same** for all payment buttons (PayPal allows you to use the same return URLs for multiple buttons)

---

## 📝 Quick Reference

### Your Pages
- **Success:** `https://YOUR-SITE-NAME.netlify.app/payment/success`
- **Cancelled:** `https://YOUR-SITE-NAME.netlify.app/payment/cancelled`
- **Pricing:** `https://YOUR-SITE-NAME.netlify.app/pricing`
- **Auth/Signup:** `https://YOUR-SITE-NAME.netlify.app/auth`

### Files Created
- ✅ `src/pages/PaymentSuccess.tsx` - Success page
- ✅ `src/pages/PaymentCancelled.tsx` - Cancel page
- ✅ `src/App.tsx` - Routes added

---

## 🎯 Next Steps

1. **Deploy your site** to Netlify
2. **Get your Netlify URL** 
3. **Update PayPal payment buttons** with return URLs
4. **Test the complete flow** with a test payment
5. **Go live!** 🚀

---

## Need Help?

If you encounter issues:
- Check that URLs are HTTPS (not HTTP) for production
- Verify return URLs are saved in PayPal settings
- Test with PayPal sandbox first
- Check browser console for errors
- Ensure `/payment/success` and `/payment/cancelled` routes are working
