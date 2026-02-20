'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Code2, Shield, Sparkles, Wrench } from 'lucide-react'

export default function AboutPage() {
  const capabilities = [
    {
      icon: Sparkles,
      title: 'AI Project Generation',
      description:
        'Describe your idea, platform, and stack, then Forge generates a practical starter architecture with real files and code.',
    },
    {
      icon: Code2,
      title: 'Built-in IDE Preview',
      description:
        'Explore generated folder structures, open files in tabs, and review code in a VS Code-like interface before download.',
    },
    {
      icon: Wrench,
      title: 'Iterative Enhancements',
      description:
        'Request modifications to an existing project (for example adding missing files or features) without starting over.',
    },
    {
      icon: Shield,
      title: 'Auth + Project Ownership',
      description:
        'Secure signup, login, password recovery, and per-user project isolation to keep each workspace private.',
    },
  ]

  const useCases = [
    'Launch a new Next.js app with sensible structure and configs',
    'Generate starter API routes, utility files, and component scaffolds',
    'Export complete project files as ZIP and continue locally',
    'Refine generated output by requesting targeted additions',
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Forge
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Forge is an AI starter-kit generator focused on helping developers move from idea to usable project structure faster.
          </p>
        </div>
      </section>

      {/* What Forge Is */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">What Forge Does</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Forge helps you generate practical project foundations for modern web apps.
                Instead of starting from an empty folder, you begin with structure, key files,
                dependencies, and implementation examples you can extend.
              </p>
              <p className="text-lg text-muted-foreground">
                The platform is designed to reduce setup friction so you can spend more time building
                product logic and less time wiring boilerplate.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Current Ownership</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Forge is currently led and actively developed by
                <span className="font-semibold text-foreground"> Prince TechTune</span>
                as the main developer.
              </p>
              <p className="text-lg text-muted-foreground">
                The roadmap is focused on reliability of generated output, better modification flows,
                and smoother developer experience from generation to deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What You Can Do on Forge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((capability, idx) => {
              const Icon = capability.icon
              return (
                <Card key={idx}>
                  <CardHeader>
                    <Icon className="w-8 h-8 text-primary mb-2" />
                    <CardTitle>{capability.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{capability.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Typical Use Cases */}
      <section className="px-4 py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Typical Use Cases</h2>
          <div className="space-y-4">
            {useCases.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Start Building with Forge</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Generate your next project foundation, review it in the built-in IDE preview, and iterate until it fits your needs.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link href="/dashboard/new">Generate a Project</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
