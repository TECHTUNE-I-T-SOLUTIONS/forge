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

            {/* IDE Preview Placeholder */}
            <div className="max-w-4xl mx-auto mb-20">
              <div className="bg-muted rounded-lg border border-border overflow-hidden shadow-2xl">
                <div className="bg-muted-foreground/10 px-4 py-3 border-b border-border flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground ml-4">forge-editor.tsx</span>
                </div>
                <div className="p-8 bg-background min-h-96 font-mono text-sm text-foreground">
                  <div className="text-muted-foreground">
                    <div>{'// Your generated code will appear here'}</div>
                    <div>{'import { useState } from "react"'}</div>
                    <div className="text-primary">{'export default function App() {'}</div>
                    <div>{'  return ('}</div>
                    <div>{'    <div>Hello, World!</div>'}</div>
                    <div>{'  )'}</div>
                    <div>{'}'}</div>
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
