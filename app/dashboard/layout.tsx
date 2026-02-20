'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, LayoutDashboard, Plus, FolderOpen, Settings, LogOut, Sun, Moon } from 'lucide-react'
import { SessionProvider, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import forgeLogo from '@/app/assets/forge.png'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/new', label: 'New Project', icon: Plus },
  { href: '/dashboard/projects', label: 'My Projects', icon: FolderOpen },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

function DashboardContent({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  // Prevent hydration mismatch by only showing theme-dependent content after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await signOut({ redirect: false })
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setLoggingOut(false)
      setShowLogoutDialog(false)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } border-r border-border bg-card transition-all duration-300 hidden md:flex flex-col`}
      >
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Image src={forgeLogo} alt="Forge" width={32} height={32} className="rounded-lg" />
            {sidebarOpen && <span>Forge</span>}
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted w-full transition-colors"
            title={sidebarOpen ? undefined : 'Toggle theme'}
          >
            {mounted && theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            {sidebarOpen && <span className="text-sm font-medium">Toggle Theme</span>}
          </button>
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive w-full transition-colors"
            title={sidebarOpen ? undefined : 'Logout'}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="border-b border-border bg-card md:hidden p-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Image src={forgeLogo} alt="Forge" width={32} height={32} className="rounded-lg" />
            <span>Forge</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-muted"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <nav className="md:hidden border-b border-border bg-muted/50">
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-background'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )
              })}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-background w-full transition-colors"
              >
                {mounted && theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                <span className="text-sm font-medium">Toggle Theme</span>
              </button>
              <button
                onClick={() => {
                  setSidebarOpen(false)
                  setShowLogoutDialog(true)
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive w-full transition-colors"
              >
                <LogOut size={20} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </nav>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="container max-w-7xl mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out of your account and redirected to the homepage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loggingOut}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              disabled={loggingOut}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loggingOut ? 'Logging out...' : 'Logout'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <DashboardContent>{children}</DashboardContent>
    </SessionProvider>
  )
}
