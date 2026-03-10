'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 md:w-80 md:h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 md:w-96 md:h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-emerald-400/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content with Image */}
      <div className="container relative z-10 mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs md:text-sm font-medium text-emerald-100 mb-6 md:mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
              Sustainable Shopping Platform
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 md:mb-6">
              Turn Old Things Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                Something New
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-sm md:text-lg lg:text-xl text-emerald-100/80 mb-8 md:mb-12">
              The innovative marketplace to buy, sell, and creatively upcycle pre-loved products. 
              Give your old items a second life with custom designs from talented artists.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                type="button"
                onClick={() => router.push('/marketplace')}
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm md:text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Explore Marketplace
              </button>
              <button
                type="button"
                onClick={() => router.push('/design-requests/new')}
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm md:text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Start Upcycling
              </button>
            </div>

            {/* Stats */}
            <div className="mt-10 md:mt-16 grid grid-cols-3 gap-2 md:gap-8 max-w-xl">
              <div className="text-center sm:text-left">
                <div className="text-xl md:text-3xl lg:text-4xl font-bold text-emerald-300">10K+</div>
                <div className="text-xs md:text-sm text-emerald-100/60">Items Listed</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl md:text-3xl lg:text-4xl font-bold text-emerald-300">500+</div>
                <div className="text-xs md:text-sm text-emerald-100/60">Designers</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl md:text-3xl lg:text-4xl font-bold text-emerald-300">50K+</div>
                <div className="text-xs md:text-sm text-emerald-100/60">Happy Users</div>
              </div>
            </div>
          </div>

          {/* Right Image - Visible on all screens */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            {/* Card Container with rounded and faded edges */}
            <div className="relative w-full max-w-[280px] md:max-w-[350px] lg:max-w-full aspect-[4/5] lg:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
              <Image
                src="/hero-person.png"
                alt="UpCycle Designer"
                fill
                className="object-contain"
                priority
              />
              {/* Gradient Fades on all sides to blend with background */}
              <div className="absolute inset-0">
                {/* Top fade */}
                <div className="absolute top-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-b from-emerald-900/70 to-transparent" />
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent" />
                {/* Left fade */}
                <div className="absolute top-0 bottom-0 left-0 w-12 md:w-24 bg-gradient-to-r from-emerald-900/70 to-transparent" />
                {/* Right fade */}
                <div className="absolute top-0 bottom-0 right-0 w-12 md:w-24 bg-gradient-to-l from-emerald-900/70 to-transparent" />
              </div>
              
              {/* Floating Badges - Smaller on mobile */}
              {/* Upcycling Badge */}
              <div className="absolute top-4 right-0 md:top-10 md:right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-2 md:p-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-10 md:h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-xs md:text-base font-semibold">Upcycling</div>
                    <div className="text-emerald-300 text-[10px] md:text-sm">Transform Old to New</div>
                  </div>
                </div>
              </div>
              
              {/* Stats Badge */}
              <div className="absolute bottom-16 left-0 md:bottom-20 md:left-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-2 md:p-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-10 md:h-10 bg-teal-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-xs md:text-base font-semibold">10K+ Items</div>
                    <div className="text-emerald-300 text-[10px] md:text-sm">Listed on Marketplace</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
