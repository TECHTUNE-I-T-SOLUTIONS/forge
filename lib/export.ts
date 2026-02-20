import JSZip from 'jszip'

interface ProjectFile {
  id: string
  name: string
  path: string
  content?: string
  type: 'file' | 'folder'
  children?: ProjectFile[]
}

export async function exportProjectAsZip(
  projectName: string,
  files: ProjectFile[]
): Promise<Blob> {
  const zip = new JSZip()
  const root = zip.folder(projectName.replace(/\s+/g, '-').toLowerCase())

  const addFilesToZip = (fileList: ProjectFile[], parentPath: string = '') => {
    fileList.forEach(file => {
      const fullPath = parentPath ? `${parentPath}/${file.name}` : file.name

      if (file.type === 'file') {
        if (root) {
          root.file(fullPath, file.content ?? '')
        } else {
          zip.file(fullPath, file.content ?? '')
        }
      } else if (file.type === 'folder' && file.children) {
        addFilesToZip(file.children, fullPath)
      }
    })
  }

  addFilesToZip(files)

  return await zip.generateAsync({ type: 'blob' })
}

export function downloadFile(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
