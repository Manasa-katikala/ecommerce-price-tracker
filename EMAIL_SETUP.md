# Email Notification Setup Guide

## Overview
The price tracker now sends **automatic email notifications** when a product's price drops below your threshold!

## How It Works

### Email Triggers
An email is sent when **ALL** these conditions are met:
1. ✅ Price has **changed** (new price ≠ old price)
2. ✅ Price has **decreased** (new price < old price)  
3. ✅ New price is **≤ your threshold** (the target price you set)

### What You Get
- 📧 **Beautiful HTML email** with price comparison
- 💰 Shows **price drop amount and percentage**
- 🔗 **Direct link** to buy the product
- ✅ Confirmation when price hits your target

## Email Configuration

### Option 1: Gmail (Recommended for Testing)

#### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification"

#### Step 2: Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select app: "Mail"
3. Select device: "Other" → Type "Price Tracker"
4. Click "Generate"
5. **Copy the 16-character password**

#### Step 3: Configure Environment Variables
1. Create `backend/.env` file:
```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

2. **Important**: Add `.env` to `.gitignore` (if not already there)

### Option 2: Other Email Services

#### SendGrid
```javascript
// In backend/utils/emailService.js
const EMAIL_CONFIG = {
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
};
```

#### Mailgun
```javascript
const EMAIL_CONFIG = {
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD,
  },
};
```

#### AWS SES
```javascript
const EMAIL_CONFIG = {
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 587,
  auth: {
    user: process.env.AWS_SES_USER,
    pass: process.env.AWS_SES_PASSWORD,
  },
};
```

## Testing Email Functionality

### Method 1: Test Endpoint (Coming Soon)
Add this route to test emails without waiting for price drops:
```javascript
// In backend/routes/productRoutes.js
router.post("/test-email", auth, async (req, res) => {
  const { sendTestEmail } = require("../utils/emailService");
  const user = await User.findById(req.user.id);
  
  await sendTestEmail(user.email);
  res.json({ message: "Test email sent!" });
});
```

### Method 2: Manual Price Update
1. Add a product
2. Call the manual update endpoint:
```bash
POST http://localhost:5000/api/products/update-price/:productId
Authorization: <your-token>
```

### Method 3: Simulate Price Drop
Temporarily modify the scraper to return a lower price for testing.

## Troubleshooting

### "Email transporter not available"
**Cause**: Environment variables not loaded  
**Solution**: 
- Check `.env` file exists in `backend/` directory
- Restart the server after creating `.env`
- Verify `dotenv` is installed

### "Invalid login" or "Authentication failed"
**Cause**: Wrong credentials or not using App Password  
**Solution**:
- Use App Password, NOT regular Gmail password
- Enable 2-factor authentication first
- Check for typos in `.env` file

### "Connection timeout"
**Cause**: Network/firewall issues  
**Solution**:
- Check internet connection
- Verify firewall allows SMTP (port 587/465)
- Try different SMTP port

### Emails not being sent
**Check these:**
1. ✅ Price actually dropped below threshold
2. ✅ User email exists in database
3. ✅ Check server console for error messages
4. ✅ Verify `.env` configuration is correct

## Email Content Example

When you receive an alert, it will look like this:

```
Subject: 🎉 Price Drop Alert: Apple iPhone 15 Pro Max

🎉 Great News! Price Dropped!

Apple iPhone 15 Pro Max

Previous Price: ₹1,73,000
New Price: ₹1,45,000
You Save: ₹28,000 (16.18%)

✅ Price is now below your threshold of ₹1,50,000!

[View Product Button]
```

## Production Recommendations

### For Production Deployment:

1. **Use Professional Email Service**
   - SendGrid (12,000 free emails/month)
   - AWS SES (62,000 free emails/month)
   - Mailgun (5,000 free emails/month)

2. **Security Best Practices**
   - Never commit `.env` file
   - Use proper authentication
   - Enable SPF, DKIM, DMARC records
   - Monitor bounce rates

3. **Rate Limiting**
   - Limit emails per user per day
   - Add cooldown between alerts
   - Implement unsubscribe feature

4. **Email Templates**
   - Use email template services
   - Add user preferences (email frequency)
   - Include unsubscribe link

5. **Error Handling**
   - Log failed emails
   - Retry mechanism with exponential backoff
   - Alert admins on persistent failures

## File Structure
```
backend/
├── utils/
│   └── emailService.js       # Email sending logic
├── jobs/
│   └── priceUpdateJob.js     # Price checking + email trigger
├── .env                      # Your email credentials (DO NOT COMMIT)
└── .env.example              # Template for .env
```

## When Emails Are Sent

### Automatic Daily Checks
- Cron job runs at **9:00 AM every day**
- Checks all products
- Sends emails for any price drops below threshold

### Manual Triggers
You can trigger immediate checks via API:
```bash
# Update all products
POST /api/products/update-prices

# Update single product  
POST /api/products/update-price/:productId
```

## FAQ

**Q: Will I get spammed with emails?**  
A: No! Emails are only sent when price drops below your threshold.

**Q: Can I change the email template?**  
A: Yes! Edit `backend/utils/emailService.js` → `sendPriceDropAlert()` function.

**Q: Can I use a free email service?**  
A: Yes! Gmail is free and works great for personal use.

**Q: Will emails work without .env file?**  
A: No, you must configure email credentials in `.env` file.

**Q: Can I disable email notifications?**  
A: Currently no, but you can add a user preference field in the future.

---

**Ready to test?** Set up your `.env` file and restart the server! 🚀
