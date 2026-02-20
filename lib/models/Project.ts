import mongoose, { Schema, Document } from 'mongoose'
import type { GeneratedArchitecture } from '@/types/architecture'

export interface ProjectFile {
  id: string
  name: string
  path: string
  content?: string
  type: 'file' | 'folder'
  children?: ProjectFile[]
}

export interface IProject extends Document {
  userId?: mongoose.Types.ObjectId
  name: string
  description: string
  projectType: string
  targetPlatform: string
  preferredStack?: string
  generatedArchitecture?: GeneratedArchitecture
  files: ProjectFile[]
  createdAt: Date
  updatedAt: Date
}

const projectFileSchema = new Schema({
  id: String,
  name: String,
  path: String,
  content: String,
  type: { type: String, enum: ['file', 'folder'] },
  children: [{ type: Schema.Types.Mixed }],
}, { _id: false })

const projectSchema = new Schema<IProject>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    projectType: {
      type: String,
      default: 'web-app',
    },
    targetPlatform: {
      type: String,
      default: 'web',
    },
    preferredStack: {
      type: String,
      default: '',
    },
    generatedArchitecture: {
      type: Schema.Types.Mixed,
      default: null,
    },
    files: [projectFileSchema],
  },
  {
    timestamps: true,
  }
)

const Project = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema)

export default Project
