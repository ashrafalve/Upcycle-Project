import Link from 'next/link';
import { Navbar, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="container mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using UpCycle, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">2. Use License</h2>
              <p className="text-gray-600">
                Permission is granted to temporarily use UpCycle for personal, non-commercial use only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">3. User Account</h2>
              <p className="text-gray-600">
                You are responsible for maintaining the confidentiality of your account and password.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">4. Marketplace Rules</h2>
              <p className="text-gray-600">
                All items listed on UpCycle must comply with our community guidelines and be legally sellable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">5. Contact</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms, please contact us.
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
