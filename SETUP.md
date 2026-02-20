# Forge Setup Guide

Complete instructions to get Forge running on your local machine or deploy it.

## Prerequisites

- **Node.js**: Version 18 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify: `node --version`

- **npm/pnpm/yarn**: Comes with Node.js
  - Verify: `npm --version`

- **MongoDB**: Database setup
  - Option 1: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)
  - Option 2: Local MongoDB installation

- **OpenRouter API Key**: For AI code generation
  - Sign up at [openrouter.ai](https://openrouter.ai)
  - Get your API key from the dashboard

## Step 1: Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd forge

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

## Step 2: Set Up MongoDB

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user with a password
5. Get your connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/forge
   ```
6. Replace `username` and `password` with your credentials

### Option B: Local MongoDB

1. Download MongoDB from [mongodb.com/community](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB
3. Connection string:
   ```
   mongodb://localhost:27017/forge
   ```

## Step 3: Get OpenRouter API Key

1. Visit [openrouter.ai](https://openrouter.ai)
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy your API key (keep it safe!)

## Step 4: Configure Environment

Create a `.env.local` file in the project root:

```env
# MongoDB - Your connection string from Step 2
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/forge

# OpenRouter API Key from Step 3
OPENROUTER_API_KEY=sk_live_xxxxxxxxxxxxxxxxxxxx

# Your app URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

## Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 6: Test the App

1. **Homepage**: Visit `/` - Should see landing page with current date
2. **Dashboard**: Go to `/dashboard` - Should see overview
3. **Create Project**: Click "New Project" and fill in details
4. **Generate**: Select template and features, click Generate
5. **View**: Check generated files in project detail page

## Troubleshooting

### Error: "MONGODB_URI is not set"

**Solution**: Make sure `.env.local` exists in the root directory with correct MongoDB URI.

```bash
# Check if file exists
cat .env.local

# If not, create it with your credentials
echo "MONGODB_URI=mongodb+srv://..." > .env.local
```

### Error: "OPENROUTER_API_KEY is not set"

**Solution**: Add your OpenRouter API key to `.env.local`:

```env
OPENROUTER_API_KEY=sk_live_xxxxxxx
```

### Error: "Cannot connect to MongoDB"

**Checklist**:
- [ ] MongoDB URI is correct in `.env.local`
- [ ] MongoDB password doesn't contain special characters that need escaping
- [ ] MongoDB Atlas cluster is active
- [ ] Your IP is whitelisted in MongoDB Atlas (if using cloud)
- [ ] VPN might be blocking connection

### Error: "Cannot read property 'connect' of undefined"

**Solution**: Mongoose not initialized. Check that:
- [ ] `lib/db.ts` exists
- [ ] MongoDB URI is valid
- [ ] Run `npm install mongoose` if missing

### Slow Code Generation

**Normal**: First generation might take 30-60 seconds while AI processes.

**Optimization**:
- Check your internet connection
- OpenRouter might be busy - retry in a moment
- Use simpler templates for faster generation

### Files Not Saving to MongoDB

**Check**:
- MongoDB connection is working
- Check browser console for errors
- Verify MongoDB collections are being created

## Development Tips

### Hot Reload

Changes to files automatically reload in the browser. No manual refresh needed.

### Next.js Pages

- Public pages: `app/page.tsx`, `app/about/page.tsx`
- Dashboard pages: `app/dashboard/*.tsx`
- API routes: `app/api/*.ts`

### Styling

- Global styles: `app/globals.css`
- Tailwind classes in JSX
- Dark mode: Toggle with moon/sun icon

### Database

- MongoDB collections auto-created
- Models in `lib/models/`
- Connection pooling handled by Mongoose

## Deployment

### Deploy to Vercel (Easiest)

```bash
# Push to GitHub
git push

# Connect to Vercel
# 1. Go to vercel.com
# 2. Click "New Project"
# 3. Select your repository
# 4. Add environment variables:
#    - MONGODB_URI
#    - OPENROUTER_API_KEY
#    - NEXT_PUBLIC_APP_URL (your Vercel domain)
# 5. Deploy
```

### Deploy to Other Platforms

#### Netlify

```bash
npm run build
# Upload `out` folder
```

#### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t forge .
docker run -p 3000:3000 -e MONGODB_URI=... -e OPENROUTER_API_KEY=... forge
```

## Performance Optimization

### Enable Production Builds

```bash
npm run build
npm start
```

### Optimize Database

- Add MongoDB indexes for faster queries
- Archive old projects periodically
- Clean up unused files

### Cache Settings

- Browser caching configured
- Next.js automatic code splitting
- Image optimization enabled

## Security Checklist

- [ ] `.env.local` not committed to git
- [ ] Database password is strong
- [ ] OpenRouter API key is secret
- [ ] CORS configured for your domain
- [ ] Database backups enabled
- [ ] Regular security updates for dependencies

## Common Customizations

### Change App Name

Search for "Forge" and replace in:
- `app/layout.tsx`
- `components/header.tsx`
- `components/footer.tsx`
- `README.md`

### Add Custom Domain

1. Deploy to Vercel/hosting
2. Add custom domain in hosting settings
3. Update `NEXT_PUBLIC_APP_URL` in `.env`

### Modify Color Scheme

Edit `app/globals.css`:
```css
:root {
  --primary: 217 100% 50.0%;      /* Change these values */
  --secondary: 280 85% 55%;
  /* ... */
}
```

### Add Features to Templates

Edit `app/dashboard/new/page.tsx` `featuresList` array

## Getting Help

### Documentation
- Read README.md for overview
- Check /docs page in app
- Review code comments

### Debug
- Check browser console (F12)
- Check terminal output
- Enable verbose logging

### Contact
- Create issue on GitHub
- Email: support@forge.dev
- Discord community (coming soon)

## Next Steps

1. ✅ Complete setup
2. ✅ Generate your first project
3. ✅ Customize the generated code
4. ✅ Deploy to production
5. ✅ Start building features

Happy coding with Forge!
