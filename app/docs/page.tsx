import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Documentation - Forge',
  description: 'Learn how to use Forge to generate stunning Next.js applications',
}

export default function DocsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
          <div className="container max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Documentation</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Everything you need to know to get started with Forge.
            </p>

            <div className="space-y-12">
              {/* Getting Started */}
              <section>
                <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      1. Create Your First Project
                    </h3>
                    <p>
                      Head to the dashboard and click "New Project". Fill in your project details,
                      select a template, and specify the features you want included.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      2. Generate Your Code
                    </h3>
                    <p>
                      Click "Generate" and watch as Forge creates a complete Next.js project with
                      all the files and configurations you need.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      3. Download & Deploy
                    </h3>
                    <p>
                      Download your project as a ZIP file, extract it locally, install dependencies,
                      and you're ready to start building!
                    </p>
                  </div>
                </div>
              </section>

              {/* Features */}
              <section>
                <h2 className="text-3xl font-bold mb-4">Key Features</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      AI-Powered Code Generation
                    </h3>
                    <p>
                      Our advanced AI understands your requirements and generates production-ready code
                      following Next.js and React best practices.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Pre-built Templates
                    </h3>
                    <p>
                      Choose from curated templates for common project types including blogs,
                      e-commerce, dashboards, and more.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Full Customization
                    </h3>
                    <p>
                      Don't like a template? Fully customize your project by specifying exact features,
                      components, and integrations you want.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      File Structure Viewer
                    </h3>
                    <p>
                      Preview your entire project structure before downloading. See every file and folder
                      that will be generated.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Built-in IDE
                    </h3>
                    <p>
                      Edit generated files directly in the browser with syntax highlighting and code completion.
                    </p>
                  </div>
                </div>
              </section>

              {/* Templates */}
              <section>
                <h2 className="text-3xl font-bold mb-4">Available Templates</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="p-4 rounded-lg border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Next.js App Router</h3>
                    <p>Modern Next.js setup with App Router, TypeScript, and Tailwind CSS.</p>
                  </div>

                  <div className="p-4 rounded-lg border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Blog</h3>
                    <p>Complete blog platform with MDX, dynamic routes, and content management.</p>
                  </div>

                  <div className="p-4 rounded-lg border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-2">E-Commerce</h3>
                    <p>Full-featured e-commerce setup with products, cart, and checkout.</p>
                  </div>

                  <div className="p-4 rounded-lg border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Dashboard</h3>
                    <p>Admin dashboard with charts, tables, and user management.</p>
                  </div>
                </div>
              </section>

              {/* Best Practices */}
              <section>
                <h2 className="text-3xl font-bold mb-4">Best Practices</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    • <strong>Review Generated Code:</strong> Always review the generated code to understand
                    how it works and adapt it to your needs.
                  </p>
                  <p>
                    • <strong>Follow Next.js Standards:</strong> Our code follows Next.js best practices,
                    but make sure to stay updated with the latest documentation.
                  </p>
                  <p>
                    • <strong>Customize Templates:</strong> Templates are starting points. Customize them
                    to match your brand and requirements.
                  </p>
                  <p>
                    • <strong>Test Before Deploy:</strong> Always test your generated project locally before
                    deploying to production.
                  </p>
                </div>
              </section>

              {/* Support */}
              <section>
                <h2 className="text-3xl font-bold mb-4">Support & Feedback</h2>
                <p className="text-muted-foreground mb-4">
                  Have questions or suggestions? We'd love to hear from you!
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    • <strong>Email:</strong> support@forge.dev
                  </p>
                  <p>
                    • <strong>Discord:</strong> Join our community server
                  </p>
                  <p>
                    • <strong>GitHub:</strong> Report issues and contribute
                  </p>
                  <p>
                    • <strong>Twitter:</strong> Follow for updates and announcements
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
