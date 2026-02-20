'use client'

import { useState, useCallback } from 'react'
import { Copy, Download, Check } from 'lucide-react'

interface ProjectFile {
  id: string
  name: string
  path: string
  content: string
  type: 'file' | 'folder'
}

interface CodeEditorProps {
  file: ProjectFile
}

const getLanguageFromFilename = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase()
  const languageMap: { [key: string]: string } = {
    'ts': 'typescript',
    'tsx': 'typescript',
    'js': 'javascript',
    'jsx': 'javascript',
    'json': 'json',
    'css': 'css',
    'scss': 'scss',
    'html': 'html',
    'md': 'markdown',
    'py': 'python',
    'sh': 'bash',
  }
  return languageMap[ext || ''] || 'plaintext'
}

export default function CodeEditor({ file }: CodeEditorProps) {
  const [copied, setCopied] = useState(false)
  const code = file.content

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  const handleDownload = () => {
    const element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(code)
    )
    element.setAttribute('download', file.name)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const language = getLanguageFromFilename(file.name)
  const lineCount = code.split('\n').length

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div>
          <p className="text-sm font-medium">{file.path}</p>
          <p className="text-xs text-muted-foreground">{lineCount} lines</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2 text-sm"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check size={18} className="text-green-500" />
                Copied
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="p-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2 text-sm"
            title="Download file"
          >
            <Download size={18} />
            Download
          </button>
        </div>
      </div>

      {/* Code Display */}
      <div className="flex-1 overflow-auto bg-background">
        <div className="flex">
          {/* Line Numbers */}
          <div className="bg-muted/50 text-muted-foreground text-sm select-none p-4 text-right font-mono border-r border-border">
            {Array.from({ length: lineCount }, (_, i) => i + 1).map(num => (
              <div key={num}>{num}</div>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1 p-4">
            <pre className="font-mono text-sm text-foreground overflow-x-auto whitespace-pre">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="p-3 border-t border-border bg-muted/30 text-xs text-muted-foreground">
        Language: {language} | Encoding: UTF-8
      </div>
    </div>
  )
}
