'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Trash2, Loader2, AlertCircle } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface Project {
  _id: string
  name: string
  description: string
  template: string
  createdAt: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects')
        if (res.ok) {
          const data = await res.json()
          setProjects(data.projects || [])
        } else {
          setError('Failed to load projects')
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
        setError('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/projects/${deleteId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setProjects(projects.filter(p => p._id !== deleteId))
        setDeleteId(null)
      } else {
        alert('Failed to delete project')
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
      alert('Failed to delete project')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="animate-slide-in">
      <h1 className="text-4xl font-bold mb-2">My Projects</h1>
      <p className="text-muted-foreground mb-8">Manage all your generated projects here.</p>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-destructive/10 rounded-lg border border-destructive/20">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <p className="text-destructive mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg border border-border">
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
          {projects.map(project => (
            <div key={project._id} className="relative group">
              <Link
                href={`/dashboard/projects/${project._id}`}
                className="bg-card rounded-lg border border-border p-4 hover:shadow-lg hover:border-primary transition-all block h-full"
              >
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-xs mt-2 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <span className="bg-muted px-2 py-1 rounded">{project.template}</span>
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
              <button
                onClick={() => setDeleteId(project._id)}
                className="absolute top-3 right-3 p-2 rounded-lg bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20"
                title="Delete project"
              >
                <Trash2 size={16} className="text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this project. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
