'use client'

import { useContext } from 'react'
import { ToasterContext } from '@/components/ui/toaster'

export function useToast() {
  const context = useContext(ToasterContext)
  
  if (!context) {
    // Fallback for when used outside ToasterProvider
    return {
      success: (message: string) => console.log('✅', message),
      error: (message: string) => console.error('❌', message),
      info: (message: string) => console.info('ℹ️', message),
      warning: (message: string) => console.warn('⚠️', message),
    }
  }

  return {
    success: (message: string, duration?: number) => context.addToast(message, 'success', duration),
    error: (message: string, duration?: number) => context.addToast(message, 'error', duration),
    info: (message: string, duration?: number) => context.addToast(message, 'info', duration),
    warning: (message: string, duration?: number) => context.addToast(message, 'warning', duration),
  }
}
