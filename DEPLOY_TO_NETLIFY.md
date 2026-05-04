# Deploy to Your Netlify Domain (takeabreakset.netlify.app)

Your project is ready for deployment! Follow these steps to publish to your Netlify domain.

## Quick Deploy Option (Easiest)

### Step 1: Download Your Project
1. In Bolt, click the download button to get all project files as a ZIP
2. Extract the ZIP file to your computer

### Step 2: Deploy to Netlify
1. Go to https://app.netlify.com/
2. Find your site "takeabreakset.netlify.app" in your sites list
3. Click on it to open the site dashboard
4. Look for the "Deploys" tab
5. Scroll down and drag-and-drop the ENTIRE extracted project folder onto the deploy zone

### Step 3: Add Environment Variables
Before your site will work properly, you MUST add these environment variables:

1. In your site dashboard, go to: **Site settings** → **Environment variables**
2. Click "Add a variable" and add these TWO variables:

**Variable 1:**
- Key: `VITE_SUPABASE_URL`
- Value: `https://rquvxzqlvbkckqncyplj.supabase.co`

**Variable 2:**
- Key: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdXZ4enFsdmJrY2txbmN5cGxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMDMyNzUsImV4cCI6MjA3ODU3OTI3NX0.HejNyxs1z_8Cl3wqxqfiX5yvGxcYSBy5biYvtXIoENQ`

3. After adding both variables, go back to **Deploys** tab
4. Click "Trigger deploy" → "Deploy site" to rebuild with the environment variables

### Step 4: Verify
Your site should now be live at: https://takeabreakset.netlify.app

---

## Alternative: Deploy via Git (Automatic Updates)

If you want automatic deployments when you make changes:

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Download your project from Bolt
3. Push the code to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

### Step 2: Connect to Netlify
1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize Netlify to access your repositories
5. Select your repository
6. Netlify will auto-detect settings from `netlify.toml`
7. Click "Deploy site"

### Step 3: Link to Your Domain
1. After deployment, go to **Site settings** → **Domain management**
2. Click "Add custom domain"
3. Enter: `takeabreakset.netlify.app`
4. Netlify will recognize it as your domain and link it

### Step 4: Add Environment Variables
Same as above - add the two VITE environment variables in Site settings → Environment variables, then trigger a new deploy.

---

## Build Configuration

Your project is already configured with:
- Build command: `npx vite build`
- Publish directory: `dist`
- Node version: 22
- SPA redirect rules for React Router

All settings are in `netlify.toml` and will be automatically detected.

---

## Troubleshooting

**Site shows blank page?**
- Check that environment variables are added correctly
- Trigger a new deploy after adding variables
- Check browser console for errors

**404 errors on page refresh?**
- Already handled by the `_redirects` file in the public folder

**Build fails?**
- Check the build logs in Netlify dashboard
- Verify Node version is 20.19 or higher
- Ensure all dependencies are in package.json

---

Your site is ready to go live! 🚀
