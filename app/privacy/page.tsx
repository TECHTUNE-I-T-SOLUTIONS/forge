import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Privacy Policy - Forge',
  description: 'Privacy policy for Forge',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10">
            This Privacy Policy describes how Forge collects, uses, and protects your information.
          </p>

          <div className="space-y-8">
            <section className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We collect account information (such as name and email), project prompts, and generated content needed to provide the service.
              </p>
            </section>

            <section className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-3">How We Use Data</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use your data to authenticate access, generate requested output, improve reliability, and provide support.
              </p>
            </section>

            <section className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-3">Data Security</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We apply reasonable technical and organizational safeguards, but you should avoid placing highly sensitive secrets in prompts or generated files.
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
