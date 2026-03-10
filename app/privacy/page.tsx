import Link from 'next/link';
import { Navbar, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="container mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">1. Information We Collect</h2>
              <p className="text-gray-600">
                We collect information you provide directly to us, including name, email, and payment information when creating an account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">2. How We Use Information</h2>
              <p className="text-gray-600">
                We use the information we collect to provide, maintain, and improve our services, and to communicate with you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">3. Information Sharing</h2>
              <p className="text-gray-600">
                We do not sell, trade, or otherwise transfer your personal information to outside parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">4. Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">5. Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us.
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
