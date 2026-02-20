import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { ToasterProvider } from '@/components/ui/toaster'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Forge - AI Starter Kit Generator',
  description: 'Generate beautiful Next.js starter kits with AI-powered code generation',
  icons: {
    icon: '/assets/forge.png',
    shortcut: '/assets/forge.png',
    apple: '/assets/forge.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToasterProvider>
            {children}
          </ToasterProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
