import Link from 'next/link';
import { Navbar, Footer } from '@/components/layout';

const posts = [
  { title: 'Getting Started with Upcycling', date: 'Feb 10, 2024', excerpt: 'A beginner guide to upcycling' },
  { title: 'Top 10 Upcycling Trends', date: 'Feb 8, 2024', excerpt: 'What\'s hot in the world of upcycling' },
  { title: 'Sustainable Living Tips', date: 'Feb 5, 2024', excerpt: 'Easy ways to reduce your footprint' },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="bg-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Blog</h1>
            <p className="mt-4 text-emerald-100">Latest news and tips</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl">
            {posts.map((post, i) => (
              <article key={i} className="bg-white rounded-lg p-6 shadow-md mb-6">
                <p className="text-gray-500 text-sm">{post.date}</p>
                <h2 className="text-xl font-semibold text-gray-900 mt-1">{post.title}</h2>
                <p className="text-gray-600 mt-2">{post.excerpt}</p>
                <Link href="#" className="inline-block mt-4 text-emerald-600 hover:text-emerald-700">
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
