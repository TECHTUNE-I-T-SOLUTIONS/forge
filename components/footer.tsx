'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Code2, Mail } from 'lucide-react'
import forgeLogo from '@/app/assets/forge.png'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: [
      { label: 'Features', href: '/#features', id: 'features' },
      { label: 'Pricing', href: '/pricing', id: 'pricing' },
      { label: 'Documentation', href: '/docs', id: 'docs' },
      { label: 'GitHub', href: '#', id: 'github-link' },
    ],
    Company: [
      { label: 'About', href: '/about', id: 'about' },
      { label: 'Blog', href: '/blog', id: 'blog' },
      { label: 'Careers', href: '#', id: 'careers' },
      { label: 'Contact', href: '#', id: 'contact' },
    ],
    Legal: [
      { label: 'Privacy', href: '#', id: 'privacy' },
      { label: 'Terms', href: '#', id: 'terms' },
      { label: 'Security', href: '#', id: 'security' },
      { label: 'Cookies', href: '#', id: 'cookies' },
    ],
  }

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <Image
                src={forgeLogo}
                alt="Forge Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span>Forge</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Generate beautiful Next.js starter kits with AI-powered code generation.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" title="GitHub" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
              <Code2 size={20} />
            </a>
            <a href="#" title="Twitter" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
              <Code2 size={20} />
            </a>
            <a href="#" title="LinkedIn" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
              <Code2 size={20} />
            </a>
            <a href="#" title="Email" aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} Forge. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
