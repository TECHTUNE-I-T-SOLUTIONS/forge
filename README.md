"# Forge - AI Starter Kit Generator

A powerful Next.js application that uses AI to generate production-ready starter kits for developers. Stop wasting time on boilerplate and start building amazing features.

## Features

- **AI-Powered Code Generation**: Uses OpenRouter API with advanced language models to generate complete Next.js projects
- **Multiple Templates**: Choose from pre-built templates or customize completely with AI
- **Built-in IDE**: View and edit generated files directly in the browser
- **File Structure Viewer**: Interactive explorer showing your entire project structure
- **Project Management**: Dashboard to manage all your generated projects
- **Dark Mode**: Beautiful dark/light theme support with next-themes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Database Integration**: MongoDB integration to save all your projects
- **TypeScript Support**: Full TypeScript support throughout the application

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **AI**: OpenRouter API
- **Icons**: Lucide React
- **UI Components**: Radix UI

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB database (MongoDB Atlas recommended)
- OpenRouter API key (get it from https://openrouter.ai)

### Installation & Setup

1. **Clone and install**:
```bash
git clone <repository-url>
cd forge
npm install
```

2. **Configure environment variables** - Create `.env.local`:
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/forge
OPENROUTER_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

3. **Run development server**:
```bash
npm run dev
```

4. **Open** [http://localhost:3000](http://localhost:3000)

## How to Use

### Generate Your First Project

1. Go to Dashboard → "New Project"
2. Enter project name and description
3. Choose a template (Next.js App, Blog, E-Commerce, Dashboard, or Custom)
4. Select desired features (Authentication, Database, Dark Mode, etc.)
5. Click "Generate" - AI creates your complete project
6. Preview and download as ZIP

### View & Manage Projects

- **Dashboard**: Overview of all projects and stats
- **My Projects**: Browse, open, and delete projects
- **Project Detail**: View file structure, edit code, download files
- **Settings**: Manage account preferences and notifications

## Project Structure

```
forge/
├── app/                          # Next.js App Router
│   ├── api/                     # API routes
│   │   ├── generate/            # AI code generation
│   │   └── projects/            # Project CRUD operations
│   ├── dashboard/               # Protected dashboard pages
│   ├── pricing/                 # Pricing page
│   ├── about/                   # About page
│   ├── docs/                    # Documentation
│   └── page.tsx                 # Landing page
├── components/                  # React components
│   ├── header.tsx               # Top navigation
│   ├── footer.tsx               # Footer
│   ├── file-explorer.tsx        # File tree viewer
│   ├── code-editor.tsx          # Code editor with syntax highlighting
│   └── theme-provider.tsx       # Theme provider wrapper
├── lib/                         # Utilities & services
│   ├── db.ts                   # MongoDB connection
│   ├── models/                 # Mongoose schemas
│   ├── ai/                     # AI/LLM integration
│   ├── export.ts               # ZIP export utility
│   └── utils.ts                # Helper functions
├── public/                      # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── next.config.js              # Next.js configuration
└── tsconfig.json               # TypeScript configuration
```

## API Reference

### POST `/api/generate`
Generate a new project with AI
- **Body**: `{ projectName, description, template, features }`
- **Returns**: `{ project: { id, name, files } }`

### GET `/api/projects`
List all projects
- **Returns**: `{ projects: Project[] }`

### GET `/api/projects/[id]`
Get single project details
- **Returns**: `{ project: Project }`

### PUT `/api/projects/[id]`
Update project
- **Body**: Project data
- **Returns**: `{ project: Project }`

### DELETE `/api/projects/[id]`
Delete project
- **Returns**: `{ success: true }`

## Available Templates

| Template | Description |
|----------|------------|
| **Next.js App** | Modern setup with App Router, TypeScript, Tailwind CSS |
| **Blog** | Complete blogging platform with MDX and dynamic routes |
| **E-Commerce** | Full setup with products, cart, and checkout |
| **Dashboard** | Admin panel with charts, tables, and analytics |
| **Custom** | Build exactly what you want with AI customization |

## Environment Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `OPENROUTER_API_KEY` | Yes | API key for OpenRouter |
| `NEXT_PUBLIC_APP_URL` | No | Your app URL (for CORS) |
| `NODE_ENV` | No | Environment mode |

## Development

```bash
# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
Requires:
- Node.js 18+ runtime
- Environment variables configured
- MongoDB connection accessible

## Key Components

### File Explorer (`components/file-explorer.tsx`)
- Interactive folder tree navigation
- Collapsible directories
- File type icons
- Click to select files

### Code Editor (`components/code-editor.tsx`)
- Syntax highlighting for 10+ languages
- Line numbers
- Copy to clipboard
- Download individual files
- Language detection

### AI Code Generator (`lib/ai/code-generator.ts`)
- OpenRouter API integration
- Structured output parsing
- Fallback to default structure
- Production-ready code generation

### MongoDB Models (`lib/models/Project.ts`)
- Project schema with file structure
- Timestamps for tracking
- Nested file hierarchy support

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Next.js optimizations enabled
- Image optimization
- Code splitting
- CSS minification
- Dark mode support without flash

## Security Features

- Environment variable protection
- MongoDB connection security
- Input validation
- API route protection (ready for auth)

## Future Roadmap

- [ ] User authentication & accounts
- [ ] Team collaboration
- [ ] Real-time collaborative editing
- [ ] Git integration
- [ ] Automated deployment
- [ ] Code quality analysis
- [ ] Custom AI models
- [ ] Version control

## Troubleshooting

### "OPENROUTER_API_KEY is not set"
Add your OpenRouter API key to `.env.local`

### "MongoDB connection failed"
Verify MONGODB_URI in `.env.local` and check MongoDB Atlas access

### "Projects not loading"
Check browser console for errors and MongoDB connection

### "File download not working"
Ensure JSZip dependency is installed: `npm install jszip`

## Support & Feedback

- 📖 Read the [docs](/docs)
- 🐛 Report issues on GitHub
- 💬 Join our Discord community
- 📧 Email: support@forge.dev

## License

MIT License - feel free to use this in your projects!

## Credits

Built with ❤️ using:
- [Next.js](https://nextjs.org) - React framework
- [OpenRouter](https://openrouter.ai) - LLM API
- [MongoDB](https://mongodb.com) - Database
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Radix UI](https://radix-ui.com) - Components
- [Lucide](https://lucide.dev) - Icons" 
