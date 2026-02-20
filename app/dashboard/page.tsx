'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { ArrowRight, Code2, Plus } from 'lucide-react'

interface Project {
  _id: string
  name: string
  description: string
  template: string
  createdAt: string
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects')
        if (res.ok) {
          const data = await res.json()
          setProjects(data.projects || [])
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const firstName = session?.user?.name?.split(' ')[0] || 'there'

  return (
    <div className="animate-slide-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {firstName}!</h1>
        <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Projects</p>
          <p className="text-3xl font-bold">{projects.length}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-muted-foreground text-sm mb-2">This Month</p>
          <p className="text-3xl font-bold">
            {projects.filter(p => {
              const date = new Date(p.createdAt)
              const now = new Date()
              return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
            }).length}
          </p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-muted-foreground text-sm mb-2">Ready to Use</p>
          <p className="text-3xl font-bold">{projects.length}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-2">Create Your First Project</h2>
        <p className="text-muted-foreground mb-4">
          Generate a beautiful Next.js starter kit with AI. Choose a template or customize it completely.
        </p>
        <Link
          href="/dashboard/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Create Project
        </Link>
      </div>

      {/* Projects Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No projects yet</p>
            <Link
              href="/dashboard/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Create Your First Project
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/dashboard/projects/${project._id}`}
                className="group bg-card rounded-lg border border-border p-4 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                    {project.name}
                  </h3>
                  <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                </div>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                    {project.template}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
