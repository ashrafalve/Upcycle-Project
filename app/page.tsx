import { Navbar, Hero, PartnersBanner, HowItWorks, TestimonialsCarousel, FeaturedProducts, BecomeDesigner, Footer } from '@/components/layout';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PartnersBanner />
        <HowItWorks />
        <TestimonialsCarousel />
        <FeaturedProducts />
        <BecomeDesigner />
      </main>
      <Footer />
    </div>
  );
}
