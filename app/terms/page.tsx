import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Terms of Service - Forge',
  description: 'Terms of service for Forge',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-10">
            These Terms govern your use of Forge. By using Forge, you agree to these terms.
          </p>

          <div className="space-y-8">
            <section className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-3">Acceptable Use</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You agree to use the platform lawfully and responsibly. You are responsible for reviewing generated code before production deployment.
              </p>
            </section>

            <section className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-3">Account Responsibility</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You are responsible for maintaining account security and for actions performed under your account.
              </p>
            </section>

            <section className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-3">Service Availability</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We may update, improve, or discontinue features at any time to maintain service quality and reliability.
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
