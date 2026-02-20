import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArrowRight, Zap, Code2, LayoutDashboard } from 'lucide-react'

export const metadata = {
  title: 'Forge - AI Starter Kit Generator',
  description: 'Generate beautiful Next.js starter kits with AI-powered code generation',
}

export default function Home() {
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const features = [
    {
      icon: Code2,
      title: 'AI-Powered Generation',
      description: 'Generate production-ready Next.js starter kits with a single prompt.',
    },
    {
      icon: LayoutDashboard,
      title: 'Beautiful Templates',
      description: 'Choose from pre-built templates or customize with your own specifications.',
    },
    {
      icon: Zap,
      title: 'Instant Setup',
      description: 'Download and start coding in seconds. No boilerplate, no setup hassle.',
    },
  ]

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="w-full pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-primary mb-4">
                Today: {formattedDate}
              </p>
            </div>

            <div className="max-w-4xl mx-auto text-center mb-12 animate-slide-in">
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
                Generate Your Next.js Starter Kit in Seconds
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Forge uses advanced AI to create beautiful, production-ready Next.js applications.
                No more boilerplate. No more setup. Just code.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  Start Generating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* IDE Preview */}
            <div className="max-w-6xl mx-auto mb-20">
              <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
                <div className="px-4 py-3 border-b border-border bg-muted/60 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground ml-3">forge-workspace</span>
                </div>

                <div className="flex h-[430px] bg-background">
                  <div className="w-64 border-r border-border bg-muted/20 hidden md:block">
                    <div className="px-4 py-3 border-b border-border text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Explorer
                    </div>
                    <div className="p-3 space-y-2 text-sm">
                      <div className="font-medium">src</div>
                      <div className="pl-4 text-muted-foreground space-y-1">
                        <div>app</div>
                        <div>components</div>
                        <div>lib</div>
                        <div>types</div>
                      </div>
                      <div className="pt-2 text-muted-foreground">package.json</div>
                      <div className="text-muted-foreground">README.md</div>
                      <div className="text-muted-foreground">next.config.js</div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="border-b border-border bg-muted/30 flex items-center overflow-x-auto text-sm">
                      <div className="px-4 py-2 border-r border-border bg-background font-medium">app/page.tsx</div>
                      <div className="px-4 py-2 border-r border-border text-muted-foreground">components/Hero.tsx</div>
                      <div className="px-4 py-2 text-muted-foreground">lib/api.ts</div>
                    </div>

                    <div className="flex-1 overflow-auto p-5 font-mono text-sm leading-6">
                      <div className="text-muted-foreground">import Link from 'next/link'</div>
                      <div className="text-muted-foreground">import {'{ ArrowRight }'} from 'lucide-react'</div>
                      <div className="mt-3 text-foreground">export default function HomePage() {'{'}</div>
                      <div className="pl-4 text-foreground">return (</div>
                      <div className="pl-8 text-foreground">&lt;main className=\"min-h-screen\"&gt;</div>
                      <div className="pl-12 text-foreground">&lt;h1 className=\"text-5xl font-bold\"&gt;</div>
                      <div className="pl-16 text-primary">Forge your next app with AI</div>
                      <div className="pl-12 text-foreground">&lt;/h1&gt;</div>
                      <div className="pl-12 text-foreground">&lt;Link href=\"/dashboard\"&gt;</div>
                      <div className="pl-16 text-foreground">Start Generating &lt;ArrowRight /&gt;</div>
                      <div className="pl-12 text-foreground">&lt;/Link&gt;</div>
                      <div className="pl-8 text-foreground">&lt;/main&gt;</div>
                      <div className="pl-4 text-foreground">)</div>
                      <div className="text-foreground">{'}'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="container max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose Forge?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
                  >
                    <Icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Build Something Amazing?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers using Forge to build faster.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
