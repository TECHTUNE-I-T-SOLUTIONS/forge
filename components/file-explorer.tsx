'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, File, Folder, FolderOpen } from 'lucide-react'

interface ProjectFile {
  id: string
  name: string
  path: string
  content?: string
  type: 'file' | 'folder'
  children?: ProjectFile[]
}

interface FileExplorerProps {
  files: ProjectFile[]
  onFileSelect: (file: ProjectFile) => void
}

interface ExpandedFolders {
  [key: string]: boolean
}

export default function FileExplorer({ files, onFileSelect }: FileExplorerProps) {
  const [expanded, setExpanded] = useState<ExpandedFolders>({})

  const toggleFolder = (id: string) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getFileIcon = (type: string, name: string) => {
    if (type === 'folder') {
      return <Folder size={16} />
    }
    if (name.endsWith('.tsx') || name.endsWith('.ts')) {
      return <File size={16} className="text-blue-500" />
    }
    if (name.endsWith('.css')) {
      return <File size={16} className="text-purple-500" />
    }
    if (name.endsWith('.json')) {
      return <File size={16} className="text-yellow-500" />
    }
    return <File size={16} className="text-muted-foreground" />
  }

  const renderFileTree = (fileList: ProjectFile[], depth = 0) => {
    return fileList.map(file => (
      <div key={file.id}>
        <div
          className={`flex items-center gap-2 px-3 py-2 hover:bg-muted/50 cursor-pointer transition-colors ${
            depth > 0 ? 'ml-' + (depth * 4) : ''
          }`}
          style={{ paddingLeft: `${12 + depth * 12}px` }}
          onClick={() => {
            if (file.type === 'folder') {
              toggleFolder(file.id)
            } else {
              onFileSelect(file)
            }
          }}
        >
          {file.type === 'folder' ? (
            <>
              {expanded[file.id] ? (
                <ChevronDown size={16} className="text-muted-foreground" />
              ) : (
                <ChevronRight size={16} className="text-muted-foreground" />
              )}
              {expanded[file.id] ? (
                <FolderOpen size={16} className="text-amber-500" />
              ) : (
                <Folder size={16} className="text-amber-500" />
              )}
            </>
          ) : (
            <>
              <div className="w-4" />
              {getFileIcon(file.type, file.name)}
            </>
          )}
          <span className="text-sm font-medium truncate">{file.name}</span>
        </div>

        {file.type === 'folder' && expanded[file.id] && file.children && (
          <div>
            {renderFileTree(file.children, depth + 1)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="p-2">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase px-3 py-2 mb-2">
        Project Structure
      </h3>
      <div className="text-sm">{renderFileTree(files)}</div>
    </div>
  )
}
