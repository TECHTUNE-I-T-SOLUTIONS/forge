# Forge - Quick Start Guide

Get Forge up and running in 5 minutes.

## 1. Prerequisites (2 minutes)

Before starting, you need:

1. **Node.js 18+**: [Download here](https://nodejs.org/)
2. **MongoDB Connection**: 
   - Free option: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (sign up, create cluster, get connection string)
3. **OpenRouter API Key**: 
   - Sign up at [openrouter.ai](https://openrouter.ai), get your API key

## 2. Install & Configure (2 minutes)

```bash
# Clone repository
git clone <repo-url>
cd forge

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
MONGODB_URI=<paste-your-mongodb-connection-string>
OPENROUTER_API_KEY=<paste-your-api-key>
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
EOF
```

Replace `<paste-your-mongodb-connection-string>` and `<paste-your-api-key>` with your actual values.

## 3. Run Development Server (1 minute)

```bash
npm run dev
```

Wait for the output:
```
> next dev

  ▲ Next.js 16.0.0

  ◳ Ready in 2.3s
```

Then open: **http://localhost:3000**

## 4. Test It Works (1 minute)

1. **Homepage** (`/`) - Should display current date
2. **Dashboard** (`/dashboard`) - Should show overview
3. **Create Project** - Click "New Project"
   - Fill in project name: "My First Project"
   - Add description: "Test project"
   - Choose template: "Next.js App"
   - Select some features
   - Click "Generate"
4. **Wait** - AI generates your project (30-60 seconds)
5. **Download** - Click download button to get ZIP file

## Done! 🎉

You now have a working Forge instance!

### Next Steps

- Explore the generated code
- Modify dashboard settings
- Create more projects with different templates
- Deploy to production (see `SETUP.md` for detailed instructions)

### Important Files

| File | Purpose |
|------|---------|
| `.env.local` | Your secrets (MongoDB URI, API keys) |
| `app/` | All pages and API routes |
| `components/` | Reusable React components |
| `lib/db.ts` | Database connection |
| `lib/ai/code-generator.ts` | AI generation logic |

### Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run TypeScript check
npm run lint
```

### Troubleshooting

**Error: "MONGODB_URI is not set"**
```bash
# Check .env.local exists
cat .env.local

# Should show your MongoDB URI
```

**Error: "Cannot connect to MongoDB"**
- Verify MongoDB URI is correct
- Check MongoDB Atlas IP whitelist (allow all for testing)
- Try connection string in MongoDB Atlas UI

**Error: "OPENROUTER_API_KEY is not set"**
- Add API key to `.env.local`
- Restart dev server (`Ctrl+C`, then `npm run dev`)

**Generation is slow**
- First generation takes 30-60 seconds
- Check internet connection
- Try again if timeout

**Port 3000 already in use**
```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

### Learn More

- 📖 **Full Setup**: See `SETUP.md`
- 🚀 **Deployment**: See `DEPLOYMENT_CHECKLIST.md`
- 📋 **Project Details**: See `PROJECT_SUMMARY.md`
- 🎯 **Main README**: See `README.md`

### Get Help

1. Check browser console (F12) for errors
2. Check terminal for error messages
3. Read relevant documentation file
4. Create issue on GitHub

---

**You're all set!** Start generating amazing projects with Forge! ✨
