'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Bell, Lock, Users, Palette, Save, Loader2 } from 'lucide-react'

interface Settings {
  notifications: boolean
  emailUpdates: boolean
  darkMode: boolean
  publicProfile: boolean
}

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    emailUpdates: true,
    darkMode: true,
    publicProfile: false,
  })

  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status !== 'loading') {
      setLoading(false)
    }
  }, [status])

  const handleToggle = (key: keyof Settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading || status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="animate-slide-in">
      <h1 className="text-4xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground mb-8">Manage your account preferences and settings.</p>

      <div className="max-w-2xl space-y-6">
        {/* Account Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lock size={20} />
            Account
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
              <input
                id="name"
                type="text"
                value={session?.user?.name || ''}
                readOnly
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                value={session?.user?.email || ''}
                readOnly
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <button className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bell size={20} />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Project Generation Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when projects finish generating</p>
              </div>
              <button
                onClick={() => handleToggle('notifications')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.notifications ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Updates</p>
                <p className="text-sm text-muted-foreground">Receive weekly updates and tips</p>
              </div>
              <button
                onClick={() => handleToggle('emailUpdates')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.emailUpdates ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.emailUpdates ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Palette size={20} />
            Appearance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Use dark theme by default</p>
              </div>
              <button
                onClick={() => handleToggle('darkMode')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.darkMode ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users size={20} />
            Privacy
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Public Profile</p>
                <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
              </div>
              <button
                onClick={() => handleToggle('publicProfile')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.publicProfile ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.publicProfile ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-destructive/10 rounded-lg border border-destructive/20 p-6">
          <h2 className="text-xl font-semibold mb-4 text-destructive">Danger Zone</h2>
          <button className="px-6 py-2 rounded-lg bg-destructive text-destructive-foreground font-semibold hover:opacity-90 transition-opacity">
            Delete Account
          </button>
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            <Save size={18} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
