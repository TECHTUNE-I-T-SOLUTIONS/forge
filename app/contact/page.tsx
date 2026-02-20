import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Contact - Forge',
  description: 'Get in touch with the Forge team',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Contact</h1>
          <p className="text-muted-foreground mb-8">
            Need help, have feedback, or want to collaborate? Reach out and we’ll respond as soon as possible.
          </p>

          <div className="rounded-lg border border-border bg-card p-6 space-y-5">
            <div>
              <p className="text-sm font-semibold mb-1">Email</p>
              <a href="mailto:techtune.it.solutions@gmail.com" className="text-sm text-primary hover:underline">
                techtune.it.solutions@gmail.com
              </a>
            </div>

            <div>
              <p className="text-sm font-semibold mb-1">GitHub</p>
              <a
                href="https://github.com/TECHTUNE-I-T-SOLUTIONS/forge"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary hover:underline"
              >
                TECHTUNE-I-T-SOLUTIONS/forge
              </a>
            </div>

            <div>
              <p className="text-sm font-semibold mb-1">Response Time</p>
              <p className="text-sm text-muted-foreground">Usually within 24–48 hours.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
