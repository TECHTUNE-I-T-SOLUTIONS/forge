'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Zap,
  Code2,
  Shield,
  RefreshCw,
  Users,
  Layers,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'

export default function FeaturesPage() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Generation',
      description: 'Generate complete Next.js starter kits in seconds with AI-powered code generation.',
    },
    {
      icon: Code2,
      title: 'Modern Tech Stack',
      description: 'Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and more.',
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Enterprise-grade security with password hashing, JWT tokens, and security questions.',
    },
    {
      icon: RefreshCw,
      title: 'Architecture Review',
      description: 'Review AI-generated architecture before code generation for maximum control.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share projects with your team and collaborate on starter kits in real-time.',
    },
    {
      icon: Layers,
      title: 'Multi-Platform Support',
      description: 'Generate projects for web, mobile, API, and full-stack development.',
    },
    {
      icon: Sparkles,
      title: 'Customizable Templates',
      description: 'Choose from various technology stacks and customize your project structure.',
    },
    {
      icon: CheckCircle2,
      title: 'Export Ready',
      description: 'Download your generated projects as ready-to-use starter kits.',
    },
  ]

  const benefits = [
    'Save weeks of boilerplate setup time',
    'Consistent project structure across teams',
    'Built-in best practices and patterns',
    'Automatic dependency management',
    'Type-safe code generation',
    'Scalable architecture templates',
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Powerful Features for Modern Development
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Forge empowers developers to create production-ready Next.js projects instantly with AI-assisted architecture design and code generation.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="w-8 h-8 text-primary mb-2" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Forge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="space-y-8">
            {[
              {
                step: 1,
                title: 'Describe Your Project',
                description: 'Tell us about your project idea, what you\'re building, and your preferences.',
              },
              {
                step: 2,
                title: 'AI Generates Architecture',
                description: 'Our AI analyzes your requirements and generates a complete project architecture.',
              },
              {
                step: 3,
                title: 'Review & Customize',
                description: 'Review the generated architecture and make any adjustments you need.',
              },
              {
                step: 4,
                title: 'Download & Start Building',
                description: 'Download your ready-to-use starter kit and begin development immediately.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-primary/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Development?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of developers using Forge to create amazing projects faster.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">View Documentation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
