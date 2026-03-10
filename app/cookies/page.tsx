import Link from 'next/link';
import { Navbar, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="container mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
          
          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">What Are Cookies</h2>
              <p className="text-gray-600">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">How We Use Cookies</h2>
              <p className="text-gray-600">
                We use cookies to understand how you use our site, to remember your preferences, and to improve your experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">Types of Cookies We Use</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Essential cookies - required for the site to work</li>
                <li>Analytics cookies - help us understand how visitors use the site</li>
                <li>Preference cookies - remember your settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">Managing Cookies</h2>
              <p className="text-gray-600">
                You can control or delete cookies through your browser settings. Please note that disabling cookies may affect site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about our Cookie Policy, please contact us.
              </p>
            </section>
          </div>

          <div className="mt-8">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
