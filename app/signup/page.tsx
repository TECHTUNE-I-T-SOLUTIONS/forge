'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

interface SecurityAnswerForm {
  questionId: string
  question: string
  answer: string
}

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Step 1: Basic Info
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')

  // Step 2: Password
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Step 3: Security Questions
  const [selectedQuestions, setSelectedQuestions] = useState<SecurityAnswerForm[]>([
    { questionId: 'q1', question: "What is your mother's maiden name?", answer: '' },
    { questionId: 'q2', question: 'What was the name of your first pet?', answer: '' },
    { questionId: 'q4', question: 'What was the name of your first school?', answer: '' },
  ])

  const validateStep1 = () => {
    setNameError('')
    setEmailError('')
    let isValid = true

    if (name.length < 2) {
      setNameError('Name must be at least 2 characters')
      isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address')
      isValid = false
    }

    return isValid
  }

  const validateStep2 = () => {
    setPasswordError('')
    let isValid = true

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      isValid = false
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter')
      isValid = false
    } else if (!/[0-9]/.test(password)) {
      setPasswordError('Password must contain at least one number')
      isValid = false
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      setPasswordError('Password must contain at least one special character')
      isValid = false
    } else if (password !== confirmPassword) {
      setPasswordError('Passwords do not match')
      isValid = false
    }

    return isValid
  }

  const validateStep3 = () => {
    setError('')
    return selectedQuestions.every((q) => q.answer.trim().length > 0)
  }

  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) return
    if (currentStep === 2 && !validateStep2()) return
    if (currentStep === 3 && !validateStep3()) {
      setError('Please answer all security questions')
      return
    }
    setCurrentStep(currentStep + 1)
    setError('')
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep1() || !validateStep2() || !validateStep3()) {
      setError('Please complete all steps correctly')
      return
    }

    setLoading(true)
    setError('')

    try {
      const securityAnswers = selectedQuestions.map((q) => ({
        questionId: q.questionId,
        question: q.question,
        answer: q.answer,
      }))

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          password,
          confirmPassword,
          securityAnswers,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create account')
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/login?signup=success')
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-4 pt-8">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
            <h2 className="text-2xl font-bold">Account Created!</h2>
            <p className="text-center text-muted-foreground">
              Your account has been successfully created. Redirecting to login...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Step {currentStep} of 3</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      setNameError('')
                    }}
                    placeholder="John Doe"
                    className={nameError ? 'border-red-500' : ''}
                  />
                  {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailError('')
                    }}
                    placeholder="you@example.com"
                    className={emailError ? 'border-red-500' : ''}
                  />
                  {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Password */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordError('')
                    }}
                    placeholder="Enter password"
                    className={passwordError ? 'border-red-500' : ''}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Must contain: uppercase, number, special character, min 8 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      setPasswordError('')
                    }}
                    placeholder="Confirm password"
                    className={passwordError ? 'border-red-500' : ''}
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                  <span className="text-sm">Show password</span>
                </label>

                {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              </div>
            )}

            {/* Step 3: Security Questions */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Answer at least 3 security questions. These will help you recover your account.
                </p>
                {selectedQuestions.map((q, idx) => (
                  <div key={q.questionId}>
                    <Label htmlFor={`answer-${idx}`} className="text-sm font-normal">
                      {q.question}
                    </Label>
                    <Input
                      id={`answer-${idx}`}
                      value={q.answer}
                      onChange={(e) => {
                        const newQuestions = [...selectedQuestions]
                        newQuestions[idx].answer = e.target.value
                        setSelectedQuestions(newQuestions)
                      }}
                      placeholder="Your answer"
                      className="text-sm"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={loading}
                >
                  Previous
                </Button>
              )}

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={loading}
                  className="flex-1"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              )}
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
