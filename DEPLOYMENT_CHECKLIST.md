# Forge Deployment Checklist

Complete this checklist before deploying Forge to production.

## Pre-Deployment (Development)

### Code Quality
- [x] All files use proper TypeScript typing
- [x] No console.log statements left in production code
- [x] No hardcoded API keys or secrets
- [x] Error handling implemented
- [x] Loading states handled
- [x] Responsive design tested on mobile
- [x] Dark mode works correctly
- [x] Accessibility standards met

### Testing
- [x] Landing page displays correctly
- [x] All public pages accessible
- [x] Dashboard loads without errors
- [x] Create project form validates input
- [x] AI generation works (needs valid API key)
- [x] Projects save to MongoDB
- [x] File explorer navigates correctly
- [x] Code editor displays files
- [x] Download functionality works
- [x] Delete operations work
- [x] Settings page functional
- [x] Theme toggle works

### Dependencies
- [x] All packages installed
- [x] No missing imports
- [x] package.json updated
- [x] No deprecated packages used
- [x] Version conflicts resolved

## Environment Setup

### Local Development
```bash
# Create .env.local
MONGODB_URI=<your_mongodb_connection>
OPENROUTER_API_KEY=<your_api_key>
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Production Environment Variables
```bash
# These must be set in your hosting platform
MONGODB_URI=<production_mongodb_uri>
OPENROUTER_API_KEY=<api_key>
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

## Pre-Deployment Tasks

### MongoDB
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with strong password
- [ ] IP whitelist configured (allow all for now, restrict later)
- [ ] Connection string copied securely
- [ ] Backup enabled
- [ ] Test connection successful

### OpenRouter
- [ ] Account created at openrouter.ai
- [ ] API key generated
- [ ] API key stored securely (NOT in git)
- [ ] Test generation works in development
- [ ] Credit/payment method added if needed

### Repository
- [ ] Git repository initialized
- [ ] .gitignore configured properly
- [ ] No sensitive files committed
- [ ] README.md complete
- [ ] SETUP.md complete
- [ ] Code is clean and documented

## Deployment Options

### Option 1: Vercel (Recommended)

#### Setup
- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Import project to Vercel
- [ ] Add environment variables:
  - [ ] MONGODB_URI
  - [ ] OPENROUTER_API_KEY
  - [ ] NEXT_PUBLIC_APP_URL
- [ ] Configure build settings (should be auto-detected)
- [ ] Deploy

#### Post-Deployment
- [ ] Test landing page loads
- [ ] Test dashboard accessible
- [ ] Test AI generation works
- [ ] Test file operations
- [ ] Check console for errors
- [ ] Monitor Vercel analytics

### Option 2: Netlify

#### Setup
- [ ] Create Netlify account
- [ ] Connect GitHub repository
- [ ] Add build command: `npm run build`
- [ ] Add publish directory: `.next`
- [ ] Add environment variables
- [ ] Deploy

#### Post-Deployment
- [ ] Verify all pages load
- [ ] Test API routes work
- [ ] Monitor Netlify analytics

### Option 3: Self-Hosted (VPS/Docker)

#### Setup
- [ ] VPS provisioned (AWS, DigitalOcean, etc)
- [ ] Node.js installed (v18+)
- [ ] PM2 or systemd configured
- [ ] Nginx/Apache reverse proxy setup
- [ ] SSL certificate installed
- [ ] Environment variables configured

#### Build & Deploy
```bash
npm install
npm run build
npm start
```

#### Monitoring
- [ ] Process manager running
- [ ] Error logs monitored
- [ ] Performance tracked
- [ ] Auto-restart on failure

### Option 4: Docker Deployment

#### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Deployment
```bash
docker build -t forge:latest .
docker run -p 3000:3000 \
  -e MONGODB_URI=<uri> \
  -e OPENROUTER_API_KEY=<key> \
  forge:latest
```

## Post-Deployment Verification

### Functionality
- [ ] Landing page loads with current date
- [ ] All public pages accessible (About, Pricing, Docs, Blog)
- [ ] Dashboard accessible
- [ ] Can create new project
- [ ] AI generation works
- [ ] Projects save to database
- [ ] Can view project details
- [ ] File explorer works
- [ ] Code editor functional
- [ ] Download works
- [ ] Delete works
- [ ] Settings page accessible
- [ ] Theme toggle works

### Performance
- [ ] Page load times acceptable (<3s)
- [ ] No console errors
- [ ] No network failures
- [ ] Database queries fast
- [ ] Images load correctly
- [ ] Styles load correctly

### Security
- [ ] HTTPS enabled
- [ ] Environment variables not exposed
- [ ] No sensitive data in HTML
- [ ] CORS headers correct
- [ ] Rate limiting working (if enabled)
- [ ] Input validation working

### Monitoring
- [ ] Error tracking enabled
- [ ] Analytics working
- [ ] Logs accessible
- [ ] Performance metrics visible
- [ ] Alert system configured

## Custom Domain Setup

If deploying with custom domain:

### DNS Configuration
- [ ] Domain registered
- [ ] DNS records updated to point to hosting
- [ ] SSL certificate issued
- [ ] HTTPS working
- [ ] www redirect configured

### Vercel Custom Domain
```
1. Go to Vercel Project Settings
2. Add custom domain
3. Update DNS records per Vercel instructions
4. Wait for SSL provisioning (usually 24-48 hours)
5. Verify domain works
```

## Monitoring & Maintenance

### Daily
- [ ] Check error logs
- [ ] Monitor uptime
- [ ] Verify backups running

### Weekly
- [ ] Review performance metrics
- [ ] Check for failed API calls
- [ ] Monitor database size
- [ ] Update dependencies if critical

### Monthly
- [ ] Analyze user statistics
- [ ] Review security logs
- [ ] Test backup restoration
- [ ] Plan improvements

## Scaling Considerations

As usage grows, consider:

1. **Database**
   - [ ] Add MongoDB indexes
   - [ ] Set up read replicas
   - [ ] Configure sharding if needed
   - [ ] Increase storage quota

2. **API Limits**
   - [ ] Monitor OpenRouter API usage
   - [ ] Implement rate limiting
   - [ ] Cache common generations
   - [ ] Add request queuing

3. **Infrastructure**
   - [ ] Increase server resources
   - [ ] Add CDN for static assets
   - [ ] Implement caching layers
   - [ ] Load balancing if multi-region

## Troubleshooting

### Common Issues

**Issue**: MongoDB connection timeout
- Check IP whitelist in MongoDB Atlas
- Verify connection string
- Check network connectivity

**Issue**: OpenRouter API errors
- Verify API key is correct
- Check rate limits
- Monitor API status page
- Ensure sufficient credits

**Issue**: Slow page loads
- Check database query performance
- Enable Next.js analytics
- Review network tab in DevTools
- Consider adding caching

**Issue**: File downloads not working
- Check JSZip is installed
- Test in incognito mode
- Check browser console
- Verify disk space available

## Rollback Plan

If deployment fails:

1. Revert to previous git commit
2. Test locally
3. Redeploy
4. Or use previous Vercel deployment

```bash
git revert <commit-hash>
git push
# Vercel auto-deploys
```

## Post-Launch Tasks

- [ ] Create social media accounts
- [ ] Set up email marketing
- [ ] Create documentation
- [ ] Set up user feedback channel
- [ ] Plan marketing strategy
- [ ] Monitor user adoption
- [ ] Collect feedback
- [ ] Plan v2.0 features

## Optimization Checklist

### Frontend
- [ ] Images optimized
- [ ] CSS minified
- [ ] JavaScript minified
- [ ] Code splitting enabled
- [ ] Lazy loading implemented
- [ ] Caching headers set

### Backend
- [ ] Database indexes created
- [ ] Connection pooling enabled
- [ ] API response caching added
- [ ] Compression enabled
- [ ] Error handling optimized

## Compliance & Legal

- [ ] Privacy policy written
- [ ] Terms of service written
- [ ] GDPR compliance checked
- [ ] Cookie policy configured
- [ ] Data retention policy set

## Final Sign-Off

- [ ] All checklist items completed
- [ ] Team approval obtained
- [ ] Ready for production
- [ ] Deployment authorized

**Deployed By**: _______________
**Date**: _______________
**Version**: 1.0.0

---

Keep this checklist for future deployments and maintenance!
