'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  Zap,
  Target,
  CheckCircle2,
  Cloud,
  Code2,
  GitBranch,
} from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { value: '10K+', label: 'Projects Generated' },
    { value: '2K+', label: 'Active Developers' },
    { value: '99.9%', label: 'Uptime' },
    { value: '50%', label: 'Time Saved' },
  ]

  const values = [
    {
      icon: Zap,
      title: 'Speed',
      description: 'Generate production-ready projects in seconds, not hours.',
    },
    {
      icon: Code2,
      title: 'Quality',
      description: 'Every line of code follows best practices and industry standards.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Built by developers for developers, with community input at our core.',
    },
    {
      icon: Target,
      title: 'Accuracy',
      description: 'AI models trained on thousands of successful projects.',
    },
    {
      icon: GitBranch,
      title: 'Flexibility',
      description: 'Customize every aspect of your generated project.',
    },
    {
      icon: Cloud,
      title: 'Scalability',
      description: 'Projects generated for growth from day one.',
    },
  ]

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Full-stack developer with 10+ years experience building scalable applications.',
      image: '👩‍💻',
    },
    {
      name: 'James Wilson',
      role: 'CTO & Chief Architect',
      bio: 'AI/ML specialist focused on code generation and architectural patterns.',
      image: '👨‍💻',
    },
    {
      name: 'Alex Rodriguez',
      role: 'VP Product',
      bio: 'Product leader passionate about developer experience and tools.',
      image: '👨‍🔬',
    },
    {
      name: 'Maria Garcia',
      role: 'Lead Engineer',
      bio: 'Backend systems expert with focus on performance and reliability.',
      image: '👩‍🔬',
    },
  ]

  const testimonials = [
    {
      text: 'Forge has cut our project setup time from days to minutes. The quality of generated code is exceptional.',
      author: 'John Smith',
      role: 'CTO at TechStartup',
      image: '👤',
    },
    {
      text: 'The security features and architecture review process give us confidence in production deployments.',
      author: 'Emma Thompson',
      role: 'Lead Developer at BigCorp',
      image: '👤',
    },
    {
      text: 'Finally, a tool that understands modern development. Forge is essential to our workflow.',
      author: 'David Lee',
      role: 'Founder at DevStudio',
      image: '👤',
    },
  ]

  const roadmap = [
    {
      quarter: 'Q1 2026',
      items: [
        'Real-time collaboration features',
        'Advanced AI prompting system',
        'Enhanced security analysis',
      ],
    },
    {
      quarter: 'Q2 2026',
      items: [
        'CI/CD pipeline generation',
        'Database schema optimization',
        'Performance analytics',
      ],
    },
    {
      quarter: 'Q3 2026',
      items: [
        'Mobile app support',
        'Advanced testing frameworks',
        'Multi-language support',
      ],
    },
    {
      quarter: 'Q4 2026',
      items: [
        'AI-powered debugging',
        'Enterprise analytics',
        'Custom model training',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Empowering Developers Worldwide
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Building the future of web development, one generated project at a time.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                We believe that building web applications should be fast, intuitive, and enjoyable. 
                Our mission is to democratize web development by providing developers with 
                powerful AI-driven tools that help them create production-ready applications instantly.
              </p>
              <p className="text-lg text-muted-foreground">
                Every developer should have access to enterprise-grade tools and best practices, 
                regardless of their experience level or team size.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground mb-4">
                We envision a future where AI enhances human creativity in software development, 
                reducing boilerplate and freeing developers to focus on unique features that matter.
              </p>
              <p className="text-lg text-muted-foreground">
                By combining cutting-edge AI with thoughtful design, we're building tools that 
                developers love to use and that produce code worthy of production systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <Card key={idx}>
                  <CardHeader>
                    <Icon className="w-8 h-8 text-primary mb-2" />
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-4 py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4 flex justify-center">{member.image}</div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What Developers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <p className="mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{testimonial.image}</div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="px-4 py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Roadmap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmap.map((item, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-lg mb-4 text-primary">{item.quarter}</h3>
                <ul className="space-y-3">
                  {item.items.map((roadmapItem, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{roadmapItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Be part of a movement transforming how developers build web applications.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started Free</Link>
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
