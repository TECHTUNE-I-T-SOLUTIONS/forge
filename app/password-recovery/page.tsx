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

interface SecurityQuestion {
  questionId: string
  question: string
}

export default function PasswordRecoveryPage() {
  const router = useRouter()
  const [step, setStep] = useState<'email' | 'verify' | 'reset'>('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Step 1: Email
  const [email, setEmail] = useState('')

  // Step 2: Verify
  const [securityQuestions, setSecurityQuestions] = useState<SecurityQuestion[]>([])
  const [securityAnswers, setSecurityAnswers] = useState<Record<string, string>>({})
  const [resetToken, setResetToken] = useState('')

  // Step 3: Reset
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/password-recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to initiate password recovery')
        setLoading(false)
        return
      }

      setResetToken(data.resetToken || '')
      setSecurityQuestions(data.securityQuestions || [])
      setStep('verify')
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const validateAnswers = () => {
    return securityQuestions.every((q) => securityAnswers[q.questionId]?.trim().length > 0)
  }

  const handleVerifyAnswers = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAnswers()) {
      setError('Please answer all security questions')
      return
    }

    setStep('reset')
    setError('')
  }

  const validatePassword = () => {
    setPasswordError('')
    let isValid = true

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      isValid = false
    } else if (!/[A-Z]/.test(newPassword)) {
      setPasswordError('Password must contain at least one uppercase letter')
      isValid = false
    } else if (!/[0-9]/.test(newPassword)) {
      setPasswordError('Password must contain at least one number')
      isValid = false
    } else if (!/[^a-zA-Z0-9]/.test(newPassword)) {
      setPasswordError('Password must contain at least one special character')
      isValid = false
    } else if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match')
      isValid = false
    }

    return isValid
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePassword()) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const securityAnswersArray = securityQuestions.map((q) => ({
        questionId: q.questionId,
        answer: securityAnswers[q.questionId],
      }))

      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          newPassword,
          confirmPassword,
          resetToken,
          securityAnswers: securityAnswersArray,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to reset password')
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-4 pt-8">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
            <h2 className="text-2xl font-bold">Password Reset!</h2>
            <p className="text-center text-muted-foreground">
              Your password has been successfully reset. Redirecting to login...
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
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            {step === 'email'
              ? 'Enter your email to get started'
              : step === 'verify'
              ? 'Answer your security questions'
              : 'Create a new password'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={
              step === 'email'
                ? handleRequestReset
                : step === 'verify'
                ? handleVerifyAnswers
                : handleResetPassword
            }
            className="space-y-6"
          >
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Step 1: Email */}
            {step === 'email' && (
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="you@example.com"
                  disabled={loading}
                  required
                />
              </div>
            )}

            {/* Step 2: Verify */}
            {step === 'verify' && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Answer your security questions to verify your identity.
                </p>
                {securityQuestions.map((q) => (
                  <div key={q.questionId}>
                    <Label htmlFor={`answer-${q.questionId}`} className="text-sm font-normal">
                      {q.question}
                    </Label>
                    <Input
                      id={`answer-${q.questionId}`}
                      value={securityAnswers[q.questionId] || ''}
                      onChange={(e) => {
                        setSecurityAnswers({
                          ...securityAnswers,
                          [q.questionId]: e.target.value,
                        })
                      }}
                      placeholder="Your answer"
                      className="text-sm"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Reset */}
            {step === 'reset' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value)
                      setPasswordError('')
                    }}
                    placeholder="Enter new password"
                    className={passwordError ? 'border-red-500' : ''}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Must contain: uppercase, number, special character, min 8 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="confirm-new-password">Confirm Password</Label>
                  <Input
                    id="confirm-new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      setPasswordError('')
                    }}
                    placeholder="Confirm new password"
                    className={passwordError ? 'border-red-500' : ''}
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    disabled={loading}
                  />
                  <span className="text-sm">Show password</span>
                </label>

                {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              </div>
            )}

            <div className="flex gap-3">
              {(step === 'verify' || step === 'reset') && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (step === 'verify') {
                      setStep('email')
                      setError('')
                    } else {
                      setStep('verify')
                      setError('')
                    }
                  }}
                  disabled={loading}
                >
                  Back
                </Button>
              )}

              <Button type="submit" disabled={loading} className="flex-1">
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {step === 'email'
                  ? 'Continue'
                  : step === 'verify'
                  ? 'Verify'
                  : 'Reset Password'}
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Remember your password?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
