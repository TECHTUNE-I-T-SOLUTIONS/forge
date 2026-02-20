import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Cookie Policy - Forge',
  description: 'Cookie policy for Forge',
}

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground mb-10">
            This Cookie Policy explains how Forge uses cookies and similar technologies.
          </p>

          <div className="space-y-8">
            <section className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-3">Essential Cookies</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use essential cookies for authentication, session management, and core app functionality.
              </p>
            </section>

            <section className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-3">Preference Cookies</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Preference storage may be used for UI settings such as theme mode to improve your experience.
              </p>
            </section>

            <section className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-3">Managing Cookies</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You can control or disable cookies in your browser settings. Disabling essential cookies may affect app functionality.
              </p>
            </section>
          </div>

          <div className="mt-10 text-sm">
            <Link href="/legal" className="text-primary hover:underline">
              Back to Legal Overview
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
