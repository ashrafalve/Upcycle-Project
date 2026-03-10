import Link from 'next/link';
import { Navbar, Footer } from '@/components/layout';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="bg-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">About UpCycle</h1>
            <p className="mt-4 text-emerald-100">Learn about our mission to give old items new life</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              UpCycle is a marketplace dedicated to sustainable consumption. We connect people who have items they no longer need with talented designers who can transform these items into beautiful, new products.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why UpCycle?</h2>
            <p className="text-gray-600">
              Every year, millions of items end up in landfills. UpCycle provides a platform to reduce waste by giving pre-loved items a second chance at life through creative transformation.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-gray-600 mb-4">
              Whether you have items to sell or have a talent for upcycling, there is a place for you in our community.
            </p>
            <div className="flex gap-4">
              <Link href="/register" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                Get Started
              </Link>
              <Link href="/designers" className="px-6 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50">
                Find Designers
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
