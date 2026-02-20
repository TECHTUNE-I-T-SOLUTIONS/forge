import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Legal - Forge',
  description: 'Legal terms and privacy information for Forge',
}

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Legal</h1>
          <p className="text-muted-foreground mb-10">
            This page outlines basic legal terms for using Forge. Replace with your full legal copy before production use.
          </p>

          <div className="space-y-8">
            <section className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-3">Terms of Use</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                By using Forge, you agree to use the platform responsibly and in compliance with applicable laws. You are
                responsible for reviewing generated code before deploying to production.
              </p>
            </section>

            <section className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-3">Privacy</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Forge may process account and project metadata needed to provide the service. Do not store highly sensitive
                secrets in project prompts or generated files unless properly secured.
              </p>
            </section>

            <section className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-3">Cookies</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Forge uses essential cookies/session storage for authentication and platform functionality. You can manage
                browser cookie preferences in your browser settings.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
