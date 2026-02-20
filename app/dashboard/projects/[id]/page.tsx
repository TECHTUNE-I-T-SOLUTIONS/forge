'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Download, Code2, X, ChevronDown, } from 'lucide-react'
import FileExplorer from '@/components/file-explorer'
import CodeEditor from '@/components/code-editor'
import { useToast } from '@/hooks/use-toast'

import type { GeneratedArchitecture } from '@/types/architecture'

interface ProjectFile {
  id: string
  name: string
  path: string
  content?: string
  type: 'file' | 'folder'
  children?: ProjectFile[]
}

interface OpenFile {
  id: string
  file: ProjectFile
}

interface Project {
  _id: string
  userId: string
  name: string
  description: string
  projectType: string
  targetPlatform: string
  preferredStack: string
  generatedArchitecture?: GeneratedArchitecture
  files: ProjectFile[]
  createdAt: string
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string
  const toast = useToast()

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null)
  const [openFiles, setOpenFiles] = useState<OpenFile[]>([])
  const [showFileExplorer, setShowFileExplorer] = useState(true)
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)
  const [showModificationsModal, setShowModificationsModal] = useState(false)
  const [modificationsText, setModificationsText] = useState('')
  const [submittingMods, setSubmittingMods] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    techStack: true,
    architecture: true,
    components: true,
  })

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`)
        if (res.ok) {
          const data = await res.json()
          setProject(data.project)
        }
      } catch (error) {
        console.error('Failed to fetch project:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [projectId])

  const handleFileSelect = (file: ProjectFile) => {
    if (file.type === 'file') {
      setSelectedFile(file)
      
      // Add to open files if not already open
      const isOpen = openFiles.some(of => of.file.id === file.id)
      if (!isOpen) {
        setOpenFiles([...openFiles, { id: file.id, file }])
      }
    }
  }

  const closeFile = (fileId: string) => {
    const newOpenFiles = openFiles.filter(of => of.file.id !== fileId)
    setOpenFiles(newOpenFiles)
    
    if (selectedFile?.id === fileId && newOpenFiles.length > 0) {
      setSelectedFile(newOpenFiles[newOpenFiles.length - 1].file)
    } else if (newOpenFiles.length === 0) {
      setSelectedFile(null)
    }
  }

  const switchToFile = (file: ProjectFile) => {
    setSelectedFile(file)
  }

  const handleRequestModifications = async () => {
    if (!modificationsText.trim() || !project) return

    setSubmittingMods(true)
    try {
      const res = await fetch(`/api/projects/${projectId}/enhance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modifications: modificationsText,
          currentStructure: project.files,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setProject(data.project)
        setModificationsText('')
        setShowModificationsModal(false)
        toast.success('Project enhanced successfully! New files have been added.')
      } else {
        toast.error('Failed to enhance project')
      }
    } catch (error) {
      console.error('Failed to enhance project:', error)
      toast.error('Failed to enhance project. Please try again.')
    } finally {
      setSubmittingMods(false)
    }
  }

  const handleDownload = async () => {
    if (!project) return

    try {
      const { exportProjectAsZip, downloadFile } = await import('@/lib/export')
      const blob = await exportProjectAsZip(project.name, project.files)
      downloadFile(blob, `${project.name.toLowerCase().replace(/\s+/g, '-')}.zip`)
      toast.success('Project downloaded successfully!')
    } catch (error) {
      console.error('Failed to download project:', error)
      toast.error('Failed to download project')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Code2 size={48} className="mx-auto mb-4 animate-pulse text-muted-foreground" />
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Project not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col animate-slide-in bg-background">
      {/* Header Bar */}
      <div className="border-b border-border px-6 py-4 bg-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code2 size={20} className="text-primary" />
          <h1 className="text-lg font-semibold">{project.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowModificationsModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium"
          >
            ✨ Request Modifications
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-colors text-sm"
          >
            <Download size={16} />
            Download ZIP
          </button>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR - Description & Architecture */}
        <div className="w-80 border-r border-border overflow-auto bg-muted/20 p-6 space-y-6">
          {/* Project Description */}
          <div>
            <p className="text-sm text-muted-foreground mb-2 font-semibold uppercase tracking-wide">Description</p>
            <p className="text-xs leading-relaxed text-foreground line-clamp-3">
              {project.description}
            </p>
            {project.description.length > 200 && (
              <button
                onClick={() => setShowDescriptionModal(true)}
                className="text-xs text-primary hover:underline mt-2 font-medium"
              >
                Read More →
              </button>
            )}
          </div>

          {/* Metadata */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Type</p>
              <p className="text-sm font-medium capitalize">{project.projectType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Platform</p>
              <p className="text-sm font-medium capitalize">{project.targetPlatform}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Stack</p>
              <p className="text-sm font-medium capitalize">{project.preferredStack}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Created</p>
              <p className="text-sm font-medium">{new Date(project.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Architecture Info - Collapsible */}
          {project.generatedArchitecture && (
            <div className="space-y-3 border-t border-border pt-6">
              {/* Overview */}
              <div>
                <button
                  onClick={() => setExpandedSections(s => ({ ...s, overview: !s.overview }))}
                  className="flex items-center gap-2 w-full text-sm font-semibold hover:text-primary transition-colors"
                >
                  <ChevronDown size={14} className={expandedSections.overview ? '' : '-rotate-90 transition-transform'} />
                  Overview
                </button>
                {expandedSections.overview && project.generatedArchitecture.overview && (
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{project.generatedArchitecture.overview}</p>
                )}
              </div>

              {/* Tech Stack */}
              {project.generatedArchitecture.techStack && (
                <div>
                  <button
                    onClick={() => setExpandedSections(s => ({ ...s, techStack: !s.techStack }))}
                    className="flex items-center gap-2 w-full text-sm font-semibold hover:text-primary transition-colors"
                  >
                    <ChevronDown size={14} className={expandedSections.techStack ? '' : '-rotate-90 transition-transform'} />
                    Tech Stack ({project.generatedArchitecture.techStack.length})
                  </button>
                  {expandedSections.techStack && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.generatedArchitecture.techStack.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 rounded text-xs bg-primary/10 text-primary font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Architecture Type */}
              {project.generatedArchitecture.architectureType && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Architecture</p>
                  <p className="text-sm bg-background px-2 py-1 rounded border border-border">{project.generatedArchitecture.architectureType}</p>
                </div>
              )}

              {/* Components */}
              {project.generatedArchitecture.components && (
                <div>
                  <button
                    onClick={() => setExpandedSections(s => ({ ...s, components: !s.components }))}
                    className="flex items-center gap-2 w-full text-sm font-semibold hover:text-primary transition-colors"
                  >
                    <ChevronDown size={14} className={expandedSections.components ? '' : '-rotate-90 transition-transform'} />
                    Components ({project.generatedArchitecture.components.length})
                  </button>
                  {expandedSections.components && (
                    <ul className="space-y-1 mt-2">
                      {project.generatedArchitecture.components.map((comp, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {typeof comp === 'string' ? comp : JSON.stringify(comp)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDE - IDE */}
        <div className="flex-1 flex flex-col overflow-hidden bg-background">
          {/* File Tabs Bar */}
          <div className="border-b border-border bg-muted/40 flex items-center overflow-x-auto">
            <button
              onClick={() => setShowFileExplorer(!showFileExplorer)}
              className="px-4 py-2 text-xs font-medium hover:bg-muted transition-colors whitespace-nowrap border-r border-border"
              title="Toggle File Explorer"
            >
              {showFileExplorer ? '✕ Explorer' : '📁 Explorer'}
            </button>
            
            {openFiles.length === 0 ? (
              <div className="flex-1 px-4 py-2 text-xs text-muted-foreground">
                No files open
              </div>
            ) : (
              <>
                {openFiles.map(openFile => (
                  <div
                    key={openFile.id}
                    className={`flex items-center gap-2 px-4 py-2 border-r border-border cursor-pointer hover:bg-muted transition-colors group ${
                      selectedFile?.id === openFile.file.id ? 'bg-background border-b-2 border-primary' : ''
                    }`}
                    onClick={() => switchToFile(openFile.file)}
                  >
                    <span className="text-xs font-medium truncate">{openFile.file.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        closeFile(openFile.file.id)
                      }}
                      className="opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Editor Area with File Explorer Drawer */}
          <div className="flex-1 flex overflow-hidden">
            {/* File Explorer Drawer */}
            {showFileExplorer && (
              <div className="w-64 border-r border-border overflow-auto bg-muted/30">
                <FileExplorer files={project.files} onFileSelect={handleFileSelect} />
              </div>
            )}

            {/* Code Editor */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {selectedFile ? (
                <>
                  {/* File Info Bar */}
                  <div className="px-4 py-3 border-b border-border bg-card text-xs text-muted-foreground flex items-center justify-between">
                    <span>{selectedFile.path}</span>
                    <span className="text-xs">{selectedFile.content?.length || 0} bytes</span>
                  </div>

                  {/* Code Editor */}
                  <CodeEditor
                    file={{
                      ...selectedFile,
                      content: selectedFile.content ?? '',
                    }}
                  />
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Code2 size={48} className="mx-auto mb-3 opacity-50" />
                    <p>Select a file to view and edit</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description Modal */}
      {showDescriptionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-96 overflow-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-bold">Project Description</h2>
              <button
                onClick={() => setShowDescriptionModal(false)}
                className="hover:bg-muted p-2 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Request Modifications Modal */}
      {showModificationsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card">
              <h2 className="text-lg font-bold">Request Modifications</h2>
              <button
                onClick={() => setShowModificationsModal(false)}
                className="hover:bg-muted p-2 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">What would you like to add or modify?</label>
                <p className="text-xs text-muted-foreground mb-3">
                  Describe the new features, components, or changes you'd like. The AI will analyze your project and add the requested items.
                </p>
                <textarea
                  value={modificationsText}
                  onChange={(e) => setModificationsText(e.target.value)}
                  placeholder="e.g., Add user authentication with JWT, Add a blog section with markdown support, Create an admin dashboard, Add payment integration with Stripe..."
                  className="w-full h-32 px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowModificationsModal(false)}
                  disabled={submittingMods}
                  className="px-6 py-2 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-50 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestModifications}
                  disabled={submittingMods || !modificationsText.trim()}
                  className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-colors disabled:opacity-50 text-sm font-semibold"
                >
                  {submittingMods ? 'Processing...' : 'Enhance Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
