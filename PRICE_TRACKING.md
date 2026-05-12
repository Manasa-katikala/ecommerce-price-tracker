# Real Price Tracking Documentation

## Overview
The application now implements **real price scraping** instead of generating fake historical data. Prices are scraped from actual product URLs and tracked over time.

## How It Works

### 1. **When You Add a Product**
- The system scrapes the **actual current price** from the product URL
- Creates a product with the real price
- Starts tracking with one price history entry (today's price)

### 2. **Automatic Daily Updates**
- A **cron job runs every day at 9:00 AM**
- Scrapes prices for all tracked products
- If price changed: adds new entry to price history
- If price unchanged: just updates the last checked timestamp

### 3. **Real Price History Over Time**
- Day 1: You add product → Records current price
- Day 2: Cron job runs → Checks price, adds to history if changed
- Day 3: Cron job runs → Checks price, adds to history if changed
- ...and so on

**After 3 days, you'll see real historical data from those 3 days!**

## Supported Platforms
- ✅ **Amazon India** (amazon.in)
- ✅ **Flipkart** (flipkart.com)
- ⚠️ Other platforms: Falls back to default price

## Manual Testing

### Test the Scraper
```bash
node backend/testScraper.js
```

### Manually Trigger Price Update (via API)
Update all products:
```bash
POST http://localhost:5000/api/products/update-prices
Headers: Authorization: <your-token>
```

Update single product:
```bash
POST http://localhost:5000/api/products/update-price/:productId
Headers: Authorization: <your-token>
```

## Important Notes

### Web Scraping Limitations
1. **Anti-Bot Protection**: Amazon/Flipkart may block requests if they detect automated scraping
2. **Rate Limiting**: The system adds 2-second delays between requests
3. **Selector Changes**: E-commerce sites frequently change their HTML structure
4. **CAPTCHA**: Some requests may be blocked by CAPTCHA

### Troubleshooting

**If scraping fails:**
1. The product URL might be invalid
2. The website might have changed its HTML structure
3. Anti-bot protection might be blocking the request
4. Network issues or timeout

**Solutions:**
- Update the CSS selectors in `backend/utils/priceScraper.js`
- Consider using a proxy service or scraping API
- Use browser automation tools (Puppeteer/Playwright) for better reliability

## Production Recommendations

For a production application, consider:
1. **Use a scraping API** (ScraperAPI, Bright Data, etc.)
2. **Implement retry logic** with exponential backoff
3. **Use proxies** to avoid IP bans
4. **Browser automation** (Puppeteer) for better reliability
5. **Queue system** (Bull, BeeQueue) for handling large-scale scraping
6. **Error notifications** when scraping fails
7. **Fallback mechanisms** if scraping is blocked

## File Structure
```
backend/
├── utils/
│   └── priceScraper.js     # Core scraping logic
├── jobs/
│   └── priceUpdateJob.js   # Cron job for daily updates
├── routes/
│   └── productRoutes.js    # Updated to use real scraping
└── server.js               # Starts cron job on server start
```

## Configuration

### Change Cron Schedule
Edit `backend/jobs/priceUpdateJob.js`:
```javascript
// Current: Every day at 9:00 AM
cron.schedule("0 9 * * *", updateAllPrices);

// Examples:
// Every hour: "0 * * * *"
// Every 6 hours: "0 */6 * * *"
// Twice daily (9 AM & 9 PM): "0 9,21 * * *"
```

## Testing Your Setup

1. **Restart your backend server**
2. **Delete existing products** (they have fake data)
3. **Add a new product** with a real Amazon/Flipkart URL
4. **Check the console** - you should see "🔍 Scraping price from..." and "✅ Scraped price:"
5. **Wait for tomorrow** (or trigger manually) to see the price update
6. **View price history graph** - it will show real data!

---

**Note**: The old products you added before this implementation will still have fake historical data. Only new products added after this update will track real prices.
