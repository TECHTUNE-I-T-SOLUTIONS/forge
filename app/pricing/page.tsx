import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Check } from 'lucide-react'

export const metadata = {
  title: 'Pricing - Forge',
  description: 'Simple, transparent pricing for Forge',
}

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for trying out Forge',
      features: [
        '5 projects per month',
        'Basic templates',
        'Community support',
        'Standard code generation',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'For serious developers',
      features: [
        'Unlimited projects',
        'All templates',
        'Priority support',
        'Advanced customization',
        'Team collaboration',
        'Analytics dashboard',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large teams',
      features: [
        'Everything in Professional',
        'Dedicated support',
        'Custom integrations',
        'SSO & SAML',
        'Advanced security',
        'Custom AI models',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  return (
    <>
      <Header />
      <main>
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
              <p className="text-xl text-muted-foreground">
                Choose the perfect plan for your needs. Always flexible to scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-lg border transition-all ${
                    plan.popular
                      ? 'border-primary shadow-2xl scale-105 bg-card'
                      : 'border-border bg-card'
                  } p-8`}
                >
                  {plan.popular && (
                    <div className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-primary text-primary-foreground mb-4">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>

                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-colors mb-8 ${
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:opacity-90'
                        : 'border border-border hover:bg-muted'
                    }`}
                  >
                    {plan.cta}
                  </button>

                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-muted/50 rounded-lg border border-border p-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

              <div className="max-w-3xl mx-auto space-y-6">
                {[
                  {
                    q: 'Can I cancel anytime?',
                    a: 'Yes! You can cancel your subscription at any time with no penalties.',
                  },
                  {
                    q: 'Do you offer discounts for annual billing?',
                    a: 'Yes, annual plans come with 20% off compared to monthly billing.',
                  },
                  {
                    q: 'What payment methods do you accept?',
                    a: 'We accept all major credit cards, PayPal, and other popular payment methods.',
                  },
                  {
                    q: 'Is there a free trial?',
                    a: 'Yes, all paid plans come with a 14-day free trial. No credit card required.',
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <h4 className="font-semibold mb-2">{item.q}</h4>
                    <p className="text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
