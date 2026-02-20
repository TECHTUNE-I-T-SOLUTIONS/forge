'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertCircle, Zap } from 'lucide-react'

const projectTypes = [
  { id: 'web-app', name: 'Web App', description: 'Full-stack web application' },
  { id: 'api-backend', name: 'API Backend', description: 'REST or GraphQL API' },
  { id: 'mobile-app', name: 'Mobile App', description: 'React Native or Flutter mobile app' },
  { id: 'library', name: 'Library/Package', description: 'Reusable library or component' },
]

const targetPlatforms = [
  { id: 'nodejs', name: 'Node.js', description: 'Server-side JavaScript/TypeScript' },
  { id: 'nextjs', name: 'Next.js', description: 'React framework with SSR/SSG' },
  { id: 'react', name: 'React SPA', description: 'Single-page React application' },
  { id: 'python', name: 'Python', description: 'Python backend (Django, FastAPI, Flask)' },
  { id: 'java', name: 'Java', description: 'Java backend (Spring, Jakarta)' },
  { id: 'dotnet', name: '.NET', description: 'C# / .NET Core backend' },
]

const preferredStacks = [
  { id: 'fullstack-ts', name: 'Full-Stack TypeScript', description: 'Node.js + React + TypeScript' },
  { id: 'fullstack-python', name: 'Python + React', description: 'Python backend + React frontend' },
  { id: 'nextjs-mongo', name: 'Next.js + MongoDB', description: 'Modern full-stack with MongoDB' },
  { id: 'nextjs-postgres', name: 'Next.js + PostgreSQL', description: 'Next.js with relational DB' },
  { id: 'spring-react', name: 'Spring Boot + React', description: 'Java backend + React frontend' },
  { id: 'dotnet-react', name: '.NET + React', description: 'C# backend + React frontend' },
]

export default function NewProjectPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectType: 'web-app',
    targetPlatform: 'nextjs',
    preferredStack: 'nextjs-mongo',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: 'projectType' | 'targetPlatform' | 'preferredStack', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGenerate = async () => {
    if (!formData.name.trim()) {
      setError('Project name is required')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to generate project')

      const data = await res.json()
      router.push(`/dashboard/projects/${data.project.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate project')
      setLoading(false)
    }
  }

  return (
    <div className="animate-slide-in">
      <h1 className="text-4xl font-bold mb-2">Create New Project</h1>
      <p className="text-muted-foreground mb-8">
        Describe your idea and let AI design the perfect architecture for you.
      </p>

      {/* Step 1: Idea Details */}
      {step === 1 && (
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Step 1: Your Idea</h2>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Project Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., AI Task Manager, E-Commerce Platform"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what your project does, its main features, and target users..."
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(2)}
              disabled={!formData.name.trim()}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2"
            >
              <span>Next: Technical Preferences</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Technical Preferences */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Step 2: Technical Preferences</h2>

          {/* Project Type */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap size={20} /> Project Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectTypes.map(type => (
                <div
                  key={type.id}
                  onClick={() => handleSelectChange('projectType', type.id)}
                  className={`p-5 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.projectType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <h4 className="font-semibold text-base mb-1">{type.name}</h4>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Target Platform */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4">Target Platform</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {targetPlatforms.map(platform => (
                <div
                  key={platform.id}
                  onClick={() => handleSelectChange('targetPlatform', platform.id)}
                  className={`p-5 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.targetPlatform === platform.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <h4 className="font-semibold text-base mb-1">{platform.name}</h4>
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Stack */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4">Preferred Tech Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {preferredStacks.map(stack => (
                <div
                  key={stack.id}
                  onClick={() => handleSelectChange('preferredStack', stack.id)}
                  className={`p-5 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.preferredStack === stack.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <h4 className="font-semibold text-base mb-1">{stack.name}</h4>
                  <p className="text-sm text-muted-foreground">{stack.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span>Review & Generate</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Step 3: Review & Generate</h2>

          <div className="space-y-6 mb-8 p-6 bg-muted/50 rounded-lg border border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Project Name</p>
              <p className="text-lg font-semibold">{formData.name}</p>
            </div>

            {formData.description && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p className="text-base">{formData.description}</p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-semibold">
                  {projectTypes.find(t => t.id === formData.projectType)?.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Platform</p>
                <p className="font-semibold">
                  {targetPlatforms.find(p => p.id === formData.targetPlatform)?.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stack</p>
                <p className="font-semibold">
                  {preferredStacks.find(s => s.id === formData.preferredStack)?.name}
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex gap-3">
              <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? 'Generating Architecture...' : 'Generate & Review'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

