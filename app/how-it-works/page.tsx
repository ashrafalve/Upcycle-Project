import { Navbar, Footer, HowItWorks } from '@/components/layout';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-emerald-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">How It Works</h1>
            <p className="mt-4 text-emerald-100 text-lg">Turn your old items into something beautiful</p>
          </div>
        </div>
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
