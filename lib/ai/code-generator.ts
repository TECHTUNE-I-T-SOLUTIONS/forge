import { generateId } from '@/lib/utils'
import type {
	GenerateArchitectureInput,
	GeneratedArchitecture,
	ProjectFileNode,
} from '@/types/architecture'

const MASTER_SYSTEM_PROMPT = `You are an expert software architect. Generate a COMPLETE, PRODUCTION-READY project architecture as JSON with EXACTLY 15-18 fully implemented files.

**OUTPUT ONLY VALID JSON. No markdown code fences, no extra text before/after.**

JSON Structure:
{
  "overview": "Complete detailed project description",
  "techStack": ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB"],
  "architectureType": "Modular Monolith",
  "components": ["List 5+ key components"],
  "folderStructure": {"app": {"api": ["route.ts"], "components": ["Button.tsx"]}, "lib": ["utils.ts"]},
  "sampleFiles": [
    {"path": "package.json", "description": "Project dependencies", "code": "Complete package.json with all dependencies"}
  ]
}

**YOU MUST FOLLOW THE USER'S SPECIFICATIONS EXACTLY:**
- If user specified "nextjs" platform → Use Next.js App Router with app/ folder structure, app/api/ routes
- If user specified "nextjs-postgres" → Include Next.js + PostgreSQL with Prisma schema
- If user specified "nextjs-mongodb" → Include Next.js + MongoDB with Mongoose models
- Tech stack must match what user requested (not generic)
- Architecture type must fit the platform choice

**CRITICAL REQUIREMENTS - EXACTLY 15-18 FILES, NO MORE, NO LESS:**
- If user specified "nextjs" platform → Use Next.js App Router with app/ folder structure, app/api/ routes
- If user specified "nextjs-postgres" → Include Next.js + PostgreSQL with Prisma schema
- If user specified "nextjs-mongodb" → Include Next.js + MongoDB with Mongoose models
- Tech stack must match what user requested (not generic)
- Architecture type must fit the platform choice

**CRITICAL REQUIREMENTS - EXACTLY 15-18 FILES, NO MORE, NO LESS:**

**IF NEXTJS IS THE PLATFORM, YOU MUST INCLUDE:**
- app/ folder (Next.js App Router, NOT pages/)
- app/page.tsx (50+ lines with real content)
- app/layout.tsx (40+ lines with proper layout structure)
- app/api/ folder with MULTIPLE route handlers (app/api/[feature]/route.ts) - each 50+ lines
- Proper app/ folder structure reflecting the app features
- NO pages/ folder (use app router only)
- No incomplete API routes

**MANDATORY FILES FOR ALL PROJECTS (with minimum content requirements):**
1. README.md - 25+ lines: setup, features, architecture, how to run
2. package.json - 35+ lines: ALL dependencies with versions, scripts, metadata
3. tsconfig.json - Complete TypeScript configuration
4. .env.example - ALL required environment variables documented
5. Main entry point (app/page.tsx for Next.js, main.tsx for SPA) - 60+ lines
6. Layout/Shell file (app/layout.tsx or AppShell.tsx) - 50+ lines
7. 4-5 Component files (Header, Footer, Dashboard, Form, etc.) - each 40+ lines with complete React/TypeScript
8. 2-3 API/Service files (data fetching, API handlers, business logic) - each 50+ lines
9. Router/Navigation file - routing structure
10. Database/Schema file (schema.ts, prisma schema, or models) - 60+ lines with full structure
11. Utility functions file (helpers, formatters, validators) - 40+ lines with real functions
12. Constants/Config file (constants, config values) - 30+ lines
13. Type definitions file (types/index.ts or types.ts) - 40+ lines
14. Authentication/Middleware file - security logic
15-18. Additional feature modules, hooks, or specialized services

**CODE QUALITY - ABSOLUTELY MANDATORY:**
- EVERY file MUST have 35+ lines of ACTUAL code (not comments/whitespace)
- NO stubs, skeletons, TODOs, FIXMEs, or placeholder comments
- ALL code must be COMPLETE, WORKING implementations ready for production
- Proper TypeScript types throughout (NO 'any' types, explicit interfaces)
- Real npm packages ONLY (verify package names are correct)
- All imports must reference files that EXIST in sampleFiles
- All dependencies in package.json must be USED in the generated code
- No empty functions, no placeholder implementations
- Complete error handling, validation, and business logic
- Database schemas must be complete (fields, types, relationships, constraints)
- API routes must handle requests completely (validation, error handling, responses)

**FILE STRUCTURE:**
- Realistic folder hierarchy: app/, lib/, components/, types/, etc.
- Clear separation of concerns
- Each file must be independently functional
- All cross-file imports must work correctly

**FORBIDDEN - WILL CAUSE IMMEDIATE REJECTION:**
- ANY incomplete code (e.g., schema.prisma with 1 line, component with just imports)
- Fewer than 15 total files
- Files with fewer than 35 lines of actual code
- Components that don't render anything or have placeholder JSX
- API routes without validation or error handling
- Database schemas with incomplete fields or relationships
- package.json missing dependencies that are used in files
- Fictional, made-up, or wrong package versions
- Using old Next.js pages/ folder instead of app/ folder when platform is nextjs
- Markdown code fences, backticks, or ANY text before/after JSON
- Type definitions section that says "// TODO: add types"
- Remember: EVERY FILE must be ready-to-use production code, not learning examples`

const ENHANCEMENT_SYSTEM_PROMPT = `You are an expert software architect working on an EXISTING project.

**OUTPUT ONLY VALID JSON. No markdown code fences, no extra text before/after.**

JSON Structure:
{
	"overview": "Updated architecture summary",
	"techStack": ["Current stack items"],
	"architectureType": "Current architecture pattern",
	"components": ["Updated component list"],
	"folderStructure": {"folder": ["files"]},
	"sampleFiles": [
		{"path": "file/to/update.ts", "description": "Updated file", "code": "complete updated code"}
	]
}

You are given the CURRENT project files and architecture context.
Your job is to apply the requested modifications by returning file-level updates.

CRITICAL RULES:
- Return ONLY files that need to be created or updated
- Keep unchanged files out of sampleFiles
- If requested feature is missing dependencies/config, include the required related files (e.g. package.json, env, routes)
- Preserve existing folder conventions where possible
- Ensure all returned files are complete and production-ready
- For Next.js, use app router conventions when platform is nextjs
- No stubs, no TODOs, no placeholders`

function buildUserPrompt(input: GenerateArchitectureInput): string {
	const stackValue = input.preferredStack?.trim() || 'Not specified'
	const platformGuidance = getPlatformGuidance(input.targetPlatform)

	return `Design a complete software project architecture for the following idea:

Project Name: ${input.name}
Project Type: ${input.projectType}
Target Platform: ${input.targetPlatform}
Preferred Stack: ${stackValue}
Description: ${input.description}

${platformGuidance}

CRITICAL: You MUST follow the user's platform and stack specifications EXACTLY. Generate 15-18 complete, production-ready files.
Return ONLY the JSON object, no other text.`
}

function buildEnhancementPrompt(input: GenerateArchitectureInput): string {
	const stackValue = input.preferredStack?.trim() || 'Not specified'
	const platformGuidance = getPlatformGuidance(input.targetPlatform)
	const editRequest = input.editRequest?.trim() || 'Apply general improvements and fix structural gaps.'

	const filesPreview = (input.existingFilesSnapshot || [])
		.slice(0, 120)
		.map((file, index) => {
			const excerpt = file.content.slice(0, 1200)
			return `${index + 1}. ${file.path}\n${excerpt}`
		})
		.join('\n\n---\n\n')

	return `Apply targeted modifications to this existing project.

Project Name: ${input.name}
Project Type: ${input.projectType}
Target Platform: ${input.targetPlatform}
Preferred Stack: ${stackValue}
Original Description: ${input.description}

REQUESTED MODIFICATIONS:
${editRequest}

${platformGuidance}

CURRENT ARCHITECTURE SNAPSHOT:
${input.existingArchitectureSnapshot || 'Not available'}

CURRENT FILES SNAPSHOT (path + excerpt):
${filesPreview || 'No files provided'}

CRITICAL: Return only files that should be created or updated based on the request. Keep paths accurate so files can be patched by path.
Return ONLY the JSON object, no other text.`
}

function getPlatformGuidance(platform: string): string {
	const platformGuides: Record<string, string> = {
		'nextjs': 'PLATFORM: Next.js with App Router\n- Use app/ folder structure (NOT pages/folder)\n- Include app/layout.tsx, app/page.tsx\n- Create app/api/ folder with multiple route handlers\n- Include next.config.js\n- Use TypeScript throughout',
		'nextjs-postgres': 'PLATFORM: Next.js + PostgreSQL\n- Use Next.js App Router with app/ folder\n- Include Prisma schema file (schema.prisma)\n- Create app/api/ routes for data operations\n- Include database migration files or seed data\n- Use TypeScript for all files',
		'nextjs-mongodb': 'PLATFORM: Next.js + MongoDB\n- Use Next.js App Router with app/ folder\n- Include Mongoose model files (models/ folder)\n- Create app/api/ routes for data operations\n- Include proper database connectivity (lib/db.ts)\n- Use TypeScript for all files',
		'react-spa': 'PLATFORM: React SPA\n- Use src/pages or src/components folder structure\n- Include src/App.tsx as main component\n- Create src/routes or router configuration\n- Include state management (Redux, Zustand, or Context)\n- Add src/api or src/services for API calls',
		'fastapi': 'PLATFORM: FastAPI\n- Include main.py or app.py as entry point\n- Create routes/ folder for API endpoints\n- Include models/ folder for data models\n- Add database configuration and migrations\n- Include requirements.txt with dependencies',
		'node-express': 'PLATFORM: Node.js + Express\n- Include server.ts or index.ts as entry point\n- Create routes/ folder for API endpoints\n- Include middleware configuration\n- Add controller files for business logic\n- Include database models/schemas',
	}
	return platformGuides[platform] || 'Follow the target platform best practices and include all necessary configuration files.'
}

function extractJson(content: string): unknown {
	const cleaned = content.trim()

	// Try direct parsing first
	if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
		try {
			return JSON.parse(cleaned)
		} catch (e) {
			// Continue to other methods
		}
	}

	// Try extracting from code fences
	const fenced = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i)
	if (fenced?.[1]) {
		try {
			return JSON.parse(fenced[1].trim())
		} catch (e) {
			// Continue to other methods
		}
	}

	// Try finding outermost braces with proper depth tracking
	const start = cleaned.indexOf('{')
	const end = cleaned.lastIndexOf('}')
	if (start >= 0 && end > start) {
		try {
			const jsonStr = cleaned.slice(start, end + 1)
			return JSON.parse(jsonStr)
		} catch (e) {
			// Try to find properly balanced braces
			try {
				let depth = 0
				let inString = false
				let escape = false
				let validEnd = -1
				
				for (let i = start; i < cleaned.length; i++) {
					const char = cleaned[i]
					
					if (escape) {
						escape = false
						continue
					}
					
					if (char === '\\') {
						escape = true
						continue
					}
					
					if (char === '"' && !escape) {
						inString = !inString
					}
					
					if (!inString) {
						if (char === '{') depth++
						if (char === '}') {
							depth--
							if (depth === 0) {
								validEnd = i
								break
							}
						}
					}
				}
				
				if (validEnd > start) {
					const balanced = cleaned.slice(start, validEnd + 1)
					return JSON.parse(balanced)
				}
			} catch (e2) {
				// Log what we tried to parse for debugging
				console.error('JSON parsing failed after balancing attempt')
				console.error('Content preview:', cleaned.substring(0, 300))
			}
		}
	}

	// Last attempt: try to salvage incomplete JSON with required fields
	try {
		// Find sampleFiles array if it exists
		const sampleFilesMatch = cleaned.match(/"sampleFiles"\s*:\s*\[([\s\S]*)\]/i)
		if (sampleFilesMatch) {
			// Try to construct minimal valid JSON
			const partial = `{"overview":"Generated project","techStack":[],"architectureType":"Modular","components":[],"folderStructure":{},"sampleFiles":[${sampleFilesMatch[1]}]}`
			return JSON.parse(partial)
		}
	} catch (e) {
		console.error('Could not salvage partial JSON')
	}

	console.error('Failed to extract JSON. Content length:', cleaned.length)
	console.error('First 200 chars:', cleaned.substring(0, 200))
	throw new Error('No valid JSON object found in model response')
}

function normalizeArchitecture(parsed: any): GeneratedArchitecture {
	const normalized = {
		overview: typeof parsed?.overview === 'string' ? parsed.overview : 'Architecture generated by Forge.',
		techStack: Array.isArray(parsed?.techStack)
			? parsed.techStack.filter((item: unknown) => typeof item === 'string')
			: [],
		architectureType:
			typeof parsed?.architectureType === 'string' ? parsed.architectureType : 'Modular Monolith',
		components: Array.isArray(parsed?.components)
			? parsed.components.filter((item: unknown) => typeof item === 'string')
			: [],
		folderStructure:
			parsed?.folderStructure && typeof parsed.folderStructure === 'object'
				? parsed.folderStructure
				: {},
		sampleFiles: Array.isArray(parsed?.sampleFiles)
			? parsed.sampleFiles
				.filter((file: unknown) => !!file && typeof file === 'object')
				.filter((file: any) => {
					// Validate file has substantial content
					const hasPath = typeof file.path === 'string' && file.path.length > 0
					const hasCode = typeof file.code === 'string' && file.code.trim().length > 0
					return hasPath && hasCode
				})
				.map((file: any) => ({
					path: file.path,
					description: typeof file.description === 'string' ? file.description : 'Generated file',
					code: file.code,
				}))
			: [],
	}

	// Validate minimum file count
	if (normalized.sampleFiles.length < 12) {
		console.warn(
			`⚠️  Generated only ${normalized.sampleFiles.length} files (need 12-16). Quality may be insufficient.`
		)
	}

	return normalized
}

export function buildFileTreeFromArchitecture(architecture: GeneratedArchitecture): ProjectFileNode[] {
	const rootMap = new Map<string, ProjectFileNode>()

	const ensureFolder = (
		segments: string[],
		container: Map<string, ProjectFileNode> | ProjectFileNode[]
	): ProjectFileNode => {
		const folderName = segments[0]
		if (!folderName) {
			throw new Error('Invalid folder path')
		}

		let existing: ProjectFileNode | undefined
		if (Array.isArray(container)) {
			existing = container.find((node) => node.name === folderName && node.type === 'folder')
		} else {
			existing = container.get(folderName)
		}

		if (!existing) {
			existing = {
				id: generateId(),
				name: folderName,
				path: segments.slice(0, 1).join('/'),
				type: 'folder',
				children: [],
			}

			if (Array.isArray(container)) {
				container.push(existing)
			} else {
				container.set(folderName, existing)
			}
		}

		if (segments.length === 1) {
			return existing
		}

		const remaining = segments.slice(1)
		if (!existing.children) {
			existing.children = []
		}

		const childFolder = ensureFolder(remaining, existing.children)
		childFolder.path = segments.slice(0, segments.length - remaining.length + 1).join('/')
		return existing
	}

	for (const sample of architecture.sampleFiles) {
		const rawSegments = sample.path.split('/').filter(Boolean)
		if (!rawSegments.length) continue

		const fileName = rawSegments[rawSegments.length - 1]
		const folderSegments = rawSegments.slice(0, -1)

		if (!folderSegments.length) {
			if (!rootMap.has(fileName)) {
				rootMap.set(fileName, {
					id: generateId(),
					name: fileName,
					path: fileName,
					type: 'file',
					content: sample.code,
				})
			}
			continue
		}

		const top = folderSegments[0]
		let topFolder = rootMap.get(top)
		if (!topFolder) {
			topFolder = {
				id: generateId(),
				name: top,
				path: top,
				type: 'folder',
				children: [],
			}
			rootMap.set(top, topFolder)
		}

		ensureFolder(folderSegments, [topFolder])

		let parent = topFolder
		for (let i = 1; i < folderSegments.length; i += 1) {
			const seg = folderSegments[i]
			let next = parent.children?.find((node) => node.name === seg && node.type === 'folder')
			if (!next) {
				next = {
					id: generateId(),
					name: seg,
					path: `${parent.path}/${seg}`,
					type: 'folder',
					children: [],
				}
				if (!parent.children) parent.children = []
				parent.children.push(next)
			}
			parent = next
		}

		if (!parent.children) {
			parent.children = []
		}

		const filePath = rawSegments.join('/')
		const exists = parent.children.some((node) => node.path === filePath && node.type === 'file')
		if (!exists) {
			parent.children.push({
				id: generateId(),
				name: fileName,
				path: filePath,
				type: 'file',
				content: sample.code,
			})
		}
	}

	const files = Array.from(rootMap.values())
	files.sort((a, b) => {
		if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
		return a.name.localeCompare(b.name)
	})

	return files
}

function fallbackArchitecture(input: GenerateArchitectureInput): GeneratedArchitecture {
	const projectName = input.name || 'My Project'
	const description = input.description || 'A modern web application'
	
	return {
		overview: `${projectName} is a ${input.projectType} designed for ${input.targetPlatform}. ${description}`,
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Mongoose', 'NextAuth'],
		architectureType: 'Modular Monolith',
		components: [
			'Landing Page',
			'Dashboard',
			'Authentication System',
			'API Routes',
			'Database Models',
			'UI Components',
		],
		folderStructure: {
			app: {
				api: {
					auth: ['[...nextauth]', 'session', 'signup'],
					projects: ['[id]', 'route.ts'],
					data: ['route.ts'],
				},
				dashboard: {
					projects: ['[id]', 'page.tsx'],
					settings: ['page.tsx'],
					layout: ['layout.tsx'],
				},
			},
			components: {
				ui: ['button.tsx', 'card.tsx', 'input.tsx', 'dialog.tsx'],
				layout: ['header.tsx', 'footer.tsx', 'sidebar.tsx'],
			},
			lib: {
				models: ['User.ts', 'Project.ts'],
				utils: ['db.ts', 'auth.ts', 'utils.ts'],
			},
		},
		sampleFiles: [
			{
				path: 'README.md',
				description: 'Project documentation',
				code: `# ${projectName}

${description}

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- MongoDB
- NextAuth

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Features

- Modern, responsive UI
- User authentication
- Real-time data updates
- RESTful API
- Database integration

Generated with Forge ✨
`,
			},
			{
				path: 'app/page.tsx',
				description: 'Landing page',
				code: `import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            ${projectName}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            ${description}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">View Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
`,
			},
			{
				path: 'app/dashboard/page.tsx',
				description: 'Main dashboard',
				code: `'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {session?.user?.name || 'User'}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600 font-semibold">All Systems Operational</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
`,
			},
			{
				path: 'lib/db.ts',
				description: 'Database connection',
				code: `import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/${projectName.toLowerCase().replace(/\\s+/g, '-')}'

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env file')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB
`,
			},
			{
				path: 'components/ui/button.tsx',
				description: 'Button component',
				code: `import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'default',
            'border border-gray-300 bg-white hover:bg-gray-50': variant === 'outline',
            'hover:bg-gray-100': variant === 'ghost',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
`,
			},
			{
				path: 'package.json',
				description: 'Project dependencies',
				code: `{
  "name": "${projectName.toLowerCase().replace(/\\s+/g, '-')}",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "mongodb": "^6.3.0",
    "mongoose": "^8.0.0",
    "next-auth": "^4.24.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0"
  }
}
`,
			},
			{
				path: '.env.example',
				description: 'Environment variables template',
				code: `# Database
MONGODB_URI=mongodb://localhost:27017/${projectName.toLowerCase().replace(/\\s+/g, '-')}

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
`,
			},
		],
	}
}

// Free models disabled - all currently rate-limited or spending limit exceeded
// Skipping directly to cheap paid models for faster generation
const FREE_MODELS: string[] = []

// Ultra-cheap paid models - better quality than free (all under $0.01 per generation)
const CHEAP_PAID_MODELS = [
	'anthropic/claude-3.5-haiku',                 // $0.003 input, best quality/price
	'openai/gpt-4o-mini',                         // $0.0015 input, very cheap
	'mistralai/mistral-small-latest',             // $0.002 input, efficient
	'mistralai/mistral-nemo',                     // Very cheap fallback
]

const GROQ_MODELS = [
	'llama-3.3-70b-versatile',
	'deepseek-r1-distill-llama-70b',
]

async function tryGenerateWithModel(
	model: string,
	systemPrompt: string,
	userPrompt: string,
	openRouterBaseUrl: string,
	apiKey: string
): Promise<GeneratedArchitecture | null> {
	try {
		console.log(`Trying model: ${model}`)
		
		// Use higher token limits for better quality - generate complete 15-18 files
		let maxTokens = 14000
		if (model.includes('claude')) maxTokens = 32000  // Claude Haiku is ultra-cheap, give it plenty of room for complete files
		if (model.includes('gpt-4o-mini')) maxTokens = 28000  // GPT-4o Mini also very cheap
		if (model.includes('gemma')) maxTokens = 8000
		
		const response = await fetch(`${openRouterBaseUrl}/chat/completions`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
				'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
				'X-Title': 'Forge - Architecture Generator',
			},
			body: JSON.stringify({
				model,
				temperature: 0.2,
				max_tokens: maxTokens,
				messages: [
					{ role: 'system', content: systemPrompt },
					{ role: 'user', content: userPrompt },
				],
			}),
		})

		if (!response.ok) {
			const errorText = await response.text()
			console.warn(`Model ${model} failed:`, response.status, errorText.substring(0, 200))
			return null
		}

		const result = await response.json()
		const content = result?.choices?.[0]?.message?.content

		if (typeof content !== 'string' || !content.trim()) {
			console.warn(`Model ${model} returned empty response`)
			return null
		}

		console.log(`✓ Model ${model} succeeded, response length: ${content.length} chars`)

		const parsed = extractJson(content)
		const normalized = normalizeArchitecture(parsed)

		// Validate that the architecture has meaningful content
		if (!normalized.sampleFiles || normalized.sampleFiles.length < 3) {
			console.warn(`Model ${model} generated too few files (${normalized.sampleFiles?.length || 0})`)
			return null
		}

		console.log(`✓ Successfully generated ${normalized.sampleFiles.length} files with ${model}`)
		return normalized
	} catch (error) {
		console.warn(`Model ${model} error:`, error instanceof Error ? error.message : error)
		return null
	}
}

export async function generateArchitecture(input: GenerateArchitectureInput): Promise<GeneratedArchitecture> {
	const openRouterBaseUrl = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1'
	const apiKey = process.env.OPENROUTER_API_KEY
	const systemPrompt = input.generationMode === 'enhance' ? ENHANCEMENT_SYSTEM_PROMPT : MASTER_SYSTEM_PROMPT
	const userPrompt = input.generationMode === 'enhance' ? buildEnhancementPrompt(input) : buildUserPrompt(input)

	if (!apiKey) {
		console.warn('No OPENROUTER_API_KEY found, using fallback architecture')
		return fallbackArchitecture(input)
	}

	// Try each free model in order until one succeeds
	for (const model of FREE_MODELS) {
		const result = await tryGenerateWithModel(model, systemPrompt, userPrompt, openRouterBaseUrl, apiKey)
		if (result) {
			return result
		}
	}

	// Free models exhausted - try ultra-cheap paid models (pennies per generation)
	console.log('Free models exhausted, trying ultra-cheap paid models (<$0.01 per generation)...')
	for (const model of CHEAP_PAID_MODELS) {
		const result = await tryGenerateWithModel(model, systemPrompt, userPrompt, openRouterBaseUrl, apiKey)
		if (result) {
			return result
		}
	}

	// Optional direct Groq fallback (if GROQ_API_KEY is configured)
	const groqKey = process.env.GROQ_API_KEY
	if (groqKey) {
		console.log('OpenRouter models exhausted, trying Groq direct models...')
		for (const model of GROQ_MODELS) {
			const groqResult = await tryGenerateWithGroq(model, systemPrompt, userPrompt, groqKey)
			if (groqResult) {
				return groqResult
			}
		}
	}

	// All OpenRouter models failed - try Gemini API directly
	const geminiKey = process.env.GEMINI_API_KEY
	if (geminiKey) {
		console.log('All OpenRouter models failed, trying Google Gemini API directly...')
		const geminiResult = await tryGenerateWithGemini(systemPrompt, userPrompt, geminiKey)
		if (geminiResult) {
			return geminiResult
		}
	}

	// All models failed, use local fallback
	console.warn('All AI models failed or rate-limited, using local fallback')
	return fallbackArchitecture(input)
}

async function tryGenerateWithGemini(
	systemPrompt: string,
	userPrompt: string,
	apiKey: string
): Promise<GeneratedArchitecture | null> {
	try {
		console.log('Trying Google Gemini 2.0 Flash...')
		
		const response = await fetch(
			'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-goog-api-key': apiKey,
				},
				body: JSON.stringify({
					contents: [
						{
							parts: [
								{
									text: `${systemPrompt}\n\n${userPrompt}`,
								},
							],
						},
					],
					generationConfig: {
						temperature: 0.2,
						maxOutputTokens: 8192,
					},
				}),
			}
		)

		if (!response.ok) {
			const errorText = await response.text()
			console.error('Gemini API failed:', response.status, errorText.substring(0, 200))
			return null
		}

		const result = await response.json()
		const content = result?.candidates?.[0]?.content?.parts?.[0]?.text

		if (typeof content !== 'string' || !content.trim()) {
			console.error('Gemini returned empty response')
			return null
		}

		console.log(`✓ Gemini succeeded, response length: ${content.length} chars`)

		const parsed = extractJson(content)
		const normalized = normalizeArchitecture(parsed)

		if (!normalized.sampleFiles || normalized.sampleFiles.length < 3) {
			console.warn(`Gemini generated too few files (${normalized.sampleFiles?.length || 0})`)
			return null
		}

		console.log(`✓ Successfully generated ${normalized.sampleFiles.length} files with Gemini`)
		return normalized
	} catch (error) {
		console.error('Gemini error:', error instanceof Error ? error.message : error)
		return null
	}
}

async function tryGenerateWithGroq(
	model: string,
	systemPrompt: string,
	userPrompt: string,
	apiKey: string
): Promise<GeneratedArchitecture | null> {
	try {
		console.log(`Trying Groq model: ${model}`)

		const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model,
				temperature: 0.2,
				max_tokens: 12000,
				messages: [
					{ role: 'system', content: systemPrompt },
					{ role: 'user', content: userPrompt },
				],
			}),
		})

		if (!response.ok) {
			const errorText = await response.text()
			console.warn(`Groq model ${model} failed:`, response.status, errorText.substring(0, 200))
			return null
		}

		const result = await response.json()
		const content = result?.choices?.[0]?.message?.content

		if (typeof content !== 'string' || !content.trim()) {
			console.warn(`Groq model ${model} returned empty response`)
			return null
		}

		console.log(`✓ Groq model ${model} succeeded, response length: ${content.length} chars`)

		const parsed = extractJson(content)
		const normalized = normalizeArchitecture(parsed)

		if (!normalized.sampleFiles || normalized.sampleFiles.length < 1) {
			console.warn(`Groq model ${model} generated too few files (${normalized.sampleFiles?.length || 0})`)
			return null
		}

		console.log(`✓ Successfully generated ${normalized.sampleFiles.length} files with Groq ${model}`)
		return normalized
	} catch (error) {
		console.warn(`Groq model ${model} error:`, error instanceof Error ? error.message : error)
		return null
	}
}
