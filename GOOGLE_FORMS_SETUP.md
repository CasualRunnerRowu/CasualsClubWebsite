# Google Forms Email Collection Setup

This guide shows you how to connect the website email form to Google Sheets.

## Why Google Forms?
- ✅ **Zero backend code** - no server needed
- ✅ **Auto-syncs to Google Sheets** - instant spreadsheet access
- ✅ **Free forever** - no hosting costs
- ✅ **Easy export** - download as Excel anytime
- ✅ **Real-time** - emails appear instantly

---

## Step-by-Step Setup (5 minutes)

### 1. Create the Google Form

1. Go to [forms.google.com](https://forms.google.com)
2. Click **+ Blank** to create a new form
3. Title it: `Casuals Club Email Signups`
4. Delete the default question
5. Click **+** to add a new question:
   - Question type: **Short answer**
   - Question text: `Email`
   - Toggle **Required** ON
   - Click the **⋮** menu → **Response validation**
   - Set to: `Text` → `Email`

### 2. Connect to Google Sheets

1. Click the **Responses** tab at the top
2. Click the **Google Sheets** icon (green spreadsheet)
3. Select **Create a new spreadsheet**
4. Click **Create**
5. A new Google Sheet will open with your responses

**Bookmark this sheet** - this is where all emails will appear!

### 3. Get Your Form Configuration

1. Go back to your Google Form
2. Click the **⋮** (three dots) in the top right
3. Select **Get pre-filled link**
4. In the Email field, type: `test@example.com`
5. Click **Get link** at the bottom
6. You'll get a URL like this:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSc...abc123.../viewform?usp=pp_url&entry.987654321=test@example.com
   ```

7. **Extract these two values:**
   - **Form ID**: Everything between `/d/e/` and `/viewform`
     - Example: `1FAIpQLSc...abc123...`
   - **Entry ID**: The number after `entry.`
     - Example: `987654321`

### 4. Update the Website Code

1. Open `src/App.jsx`
2. Find these lines near the top of the `App()` function (around line 181-182):
   ```javascript
   const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse'
   const GOOGLE_FORM_EMAIL_ENTRY = 'entry.123456789'
   ```

3. Replace with your actual values:
   ```javascript
   const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSc...abc123.../formResponse'
   const GOOGLE_FORM_EMAIL_ENTRY = 'entry.987654321'
   ```

4. Save the file

### 5. Deploy

```bash
npm run build
git add src/App.jsx
git commit -m "feat: connect email form to Google Sheets"
git push
```

Vercel will auto-deploy. Done! 🎉

---

## Testing

1. Go to your live website
2. Enter an email in the "Stay in the Loop" form
3. Click send
4. Check your Google Sheet - the email should appear within seconds

---

## Accessing Your Emails

**Google Sheets URL** (bookmark this):
- Go to [sheets.google.com](https://sheets.google.com)
- Find: `Casuals Club Email Signups (Responses)`

**Export to Excel:**
- Open the Google Sheet
- File → Download → Microsoft Excel (.xlsx)

**Share with team:**
- Click **Share** button in Google Sheets
- Add team members' emails with "Viewer" or "Editor" access

---

## Privacy & GDPR

The form collects only email addresses. Consider adding:
- Privacy policy link on your website
- Unsubscribe mechanism in your emails
- GDPR compliance notice if you have EU visitors

---

## Troubleshooting

**Emails not appearing in sheet?**
- Check the Form ID and Entry ID are correct
- Open browser DevTools → Console tab → look for errors
- Test by submitting directly to the Google Form first

**Getting CORS errors?**
- This is normal! The code uses `mode: 'no-cors'` which prevents errors
- Submissions still work even though we can't read the response

**Want to add more fields?**
- Add more questions to your Google Form
- Get their entry IDs using the pre-filled link method
- Update the code to include those fields in the FormData

---

## Alternative: Google Apps Script (Advanced)

If you need more control (validation, auto-replies, etc.), you can:
1. Create a Google Apps Script web app
2. Use it as a proxy to Google Sheets
3. This allows CORS and custom responses

Let me know if you need help with this approach!
