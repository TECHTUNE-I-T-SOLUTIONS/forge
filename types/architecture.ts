export interface GeneratedSampleFile {
  path: string
  description: string
  code: string
}

export interface GeneratedArchitecture {
  overview: string
  techStack: string[]
  architectureType: string
  components: string[]
  folderStructure: Record<string, unknown>
  sampleFiles: GeneratedSampleFile[]
}

export interface GenerateArchitectureInput {
  name: string
  projectType: string
  targetPlatform: string
  preferredStack?: string
  description: string
  generationMode?: 'new' | 'enhance'
  editRequest?: string
  existingArchitectureSnapshot?: string
  existingFilesSnapshot?: Array<{
    path: string
    content: string
  }>
}

export interface ProjectFileNode {
  id: string
  name: string
  path: string
  type: 'file' | 'folder'
  content?: string
  children?: ProjectFileNode[]
}
