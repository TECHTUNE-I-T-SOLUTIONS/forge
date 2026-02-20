import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArrowRight, Calendar, User } from 'lucide-react'

export const metadata = {
  title: 'Blog - Forge',
  description: 'Latest articles and updates about Forge and web development',
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  readTime: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Introducing Forge: The Future of Web Development',
    excerpt: 'Say goodbye to boilerplate. Forge uses AI to generate production-ready Next.js projects in seconds.',
    author: 'John Doe',
    date: '2024-02-20',
    category: 'Announcement',
    readTime: '5 min read',
    slug: 'introducing-forge',
  },
  {
    id: '2',
    title: 'How AI is Transforming Starter Kit Generation',
    excerpt: 'Explore how advanced language models are making web development more accessible than ever.',
    author: 'Jane Smith',
    date: '2024-02-15',
    category: 'Technology',
    readTime: '8 min read',
    slug: 'ai-starter-kits',
  },
  {
    id: '3',
    title: 'Best Practices for Next.js Projects in 2024',
    excerpt: 'Learn the latest Next.js patterns and best practices to build faster, more maintainable applications.',
    author: 'Mike Johnson',
    date: '2024-02-10',
    category: 'Tutorial',
    readTime: '10 min read',
    slug: 'nextjs-best-practices',
  },
  {
    id: '4',
    title: 'Customizing Your Generated Projects',
    excerpt: 'A complete guide to customizing and extending your Forge-generated projects to match your needs.',
    author: 'Sarah Williams',
    date: '2024-02-05',
    category: 'Guide',
    readTime: '7 min read',
    slug: 'customizing-projects',
  },
]

const categories = ['All', 'Announcement', 'Technology', 'Tutorial', 'Guide']

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        {/* Header Section */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent border-b border-border">
          <div className="container max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-4">Blog & Resources</h1>
            <p className="text-xl text-muted-foreground">
              Articles, tutorials, and updates about Forge and modern web development.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="w-full py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === 'All'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
          <div className="container max-w-6xl mx-auto">
            {/* Featured Post */}
            {blogPosts.length > 0 && (
              <div className="mb-16">
                <article className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="inline-block mb-4">
                          <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                            Featured
                          </span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {blogPosts[0].title}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6">
                          {blogPosts[0].excerpt}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {new Date(blogPosts[0].date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          {blogPosts[0].author}
                        </div>
                        <span>{blogPosts[0].readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-primary/20 mb-4">
                          {blogPosts[0].category[0]}
                        </div>
                        <p className="text-muted-foreground">Featured article</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-8 py-6 bg-muted/50 border-t border-border flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{blogPosts[0].category}</span>
                    <button className="flex items-center gap-2 text-primary hover:gap-3 transition-all">
                      Read Article
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </article>
              </div>
            )}

            {/* Other Posts Grid */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Latest Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.slice(1).map(post => (
                  <article
                    key={post.id}
                    className="group bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-xs text-muted-foreground flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {post.author}
                        </span>
                      </div>
                      <button className="text-primary hover:text-primary/80 transition-colors">
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get the latest articles, tips, and updates delivered straight to your inbox.
              </p>
              <div className="flex gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
