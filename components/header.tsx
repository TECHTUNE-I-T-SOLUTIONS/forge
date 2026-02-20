'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { signOut } from 'next-auth/react'
import { Moon, Sun, Menu, X, LogIn, LogOut, User } from 'lucide-react'
import forgeLogo from '@/app/assets/forge.png'

interface SessionUser {
  id: string
  name: string
  email: string
}

export function Header() {
  const { theme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<SessionUser | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/about', label: 'About' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/docs', label: 'Docs' },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Check if user is logged in by trying to access a protected route
        const res = await fetch('/api/auth/session', { cache: 'no-store' })
        if (!res.ok) {
          setUser(null)
          setAuthLoading(false)
          return
        }
        const data = await res.json()
        setUser(data.user || null)
      } catch (_error) {
        setUser(null)
      } finally {
        setAuthLoading(false)
      }
    }

    fetchSession()
  }, [])

  const handleSignIn = () => {
    router.push('/login')
  }

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      setUser(null)
      router.refresh()
      if (pathname.startsWith('/dashboard')) {
        router.push('/')
      }
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Image
            src={forgeLogo}
            alt="Forge Logo"
            width={32}
            height={32}
            className="w-8 h-8"
            priority
          />
          <span>Forge</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
        </nav>

        {/* Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {!authLoading && user ? (
              <>
                <span className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-md border border-border bg-muted/50">
                  <User size={14} />
                  {user.name}
                </span>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1 text-sm px-3 py-2 rounded-md border border-border hover:bg-muted transition-colors"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={handleSignIn}
                className="inline-flex items-center gap-1 text-sm px-3 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <LogIn size={16} />
                Sign in
              </button>
            )}
          </div>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {mounted ? (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />) : <Moon size={20} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="container max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            {!authLoading && user ? (
              <button
                onClick={() => {
                  setMenuOpen(false)
                  void handleSignOut()
                }}
                className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:bg-muted transition-colors"
              >
                <LogOut size={16} />
                Sign out ({user.name})
              </button>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false)
                  void handleSignIn()
                }}
                className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-primary text-primary-foreground"
              >
                <LogIn size={16} />
                Sign in
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
