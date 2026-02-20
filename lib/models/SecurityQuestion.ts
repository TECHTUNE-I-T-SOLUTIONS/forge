import mongoose, { Schema } from 'mongoose'

export interface ISecurityQuestion {
  _id: string
  question: string
  category: string
  displayOrder: number
}

const securityQuestionSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['personal', 'preference', 'memory', 'family'],
  },
  displayOrder: {
    type: Number,
    required: true,
  },
})

const SecurityQuestion =
  mongoose.models.SecurityQuestion ||
  mongoose.model('SecurityQuestion', securityQuestionSchema)

// Default security questions
export const DEFAULT_SECURITY_QUESTIONS = [
  {
    _id: 'q1',
    question: 'What is your mother\'s maiden name?',
    category: 'family',
    displayOrder: 1,
  },
  {
    _id: 'q2',
    question: 'What was the name of your first pet?',
    category: 'personal',
    displayOrder: 2,
  },
  {
    _id: 'q3',
    question: 'What city were you born in?',
    category: 'personal',
    displayOrder: 3,
  },
  {
    _id: 'q4',
    question: 'What was the name of your first school?',
    category: 'memory',
    displayOrder: 4,
  },
  {
    _id: 'q5',
    question: 'What is your favorite book?',
    category: 'preference',
    displayOrder: 5,
  },
  {
    _id: 'q6',
    question: 'In what city or town did your mother and father meet?',
    category: 'family',
    displayOrder: 6,
  },
  {
    _id: 'q7',
    question: 'What was the name of your first teacher?',
    category: 'memory',
    displayOrder: 7,
  },
  {
    _id: 'q8',
    question: 'What is your all-time favorite movie?',
    category: 'preference',
    displayOrder: 8,
  },
  {
    _id: 'q9',
    question: 'What was your childhood nickname?',
    category: 'personal',
    displayOrder: 9,
  },
  {
    _id: 'q10',
    question: 'What is your favorite food?',
    category: 'preference',
    displayOrder: 10,
  },
]

export default SecurityQuestion
