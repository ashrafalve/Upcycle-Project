'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

const testimonials = [
  {
    id: 1,
    name: 'Emily R.',
    role: 'Home Decor Enthusiast',
    content: 'Found the most beautiful upcycled vintage dresser for my living room. The quality exceeded my expectations and I love that I helped keep furniture out of a landfill!',
    rating: 5,
  },
  {
    id: 2,
    name: 'James K.',
    role: 'First-time Seller',
    content: 'Sold my old guitar on UpCycle within 3 days! The platform made it so easy to list items and connect with buyers who truly appreciate sustainable products.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Priya M.',
    role: 'Eco-conscious Parent',
    content: 'Upcycled my kids old furniture into something stunning for their playroom. The designer understood my vision perfectly. Highly recommend!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Michael T.',
    role: 'Vintage Collector',
    content: 'The variety of upcycled items on UpCycle is amazing. I have found so many unique pieces that you cannot find anywhere else. This is the future of shopping!',
    rating: 5,
  },
];

export function TestimonialsCarousel() {
  const isHydrated = useHydrated();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isHydrated) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHydrated]);

  if (!isHydrated) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our <span className="text-emerald-600">Community</span> Says
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Join thousands of happy users who are part of the upcycling movement
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative h-[220px] md:h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-3xl mx-4 border border-gray-100">
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonials[currentIndex].rating)].map((_, j) => (
                      <motion.svg 
                        key={j} 
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * j }}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </motion.svg>
                    ))}
                  </div>

                  <p className="text-base md:text-lg text-gray-700 leading-relaxed line-clamp-2">
                    {testimonials[currentIndex].content}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {testimonials[currentIndex].name.charAt(0)}
                    </motion.div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {testimonials[currentIndex].role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex ? 'bg-emerald-600 w-6' : 'bg-gray-300 w-2'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Arrow navigation */}
          <div className="flex justify-center gap-3 mt-4">
            <motion.button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-emerald-600 hover:bg-emerald-50 border border-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-emerald-600 hover:bg-emerald-50 border border-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Stats banner */}
        <motion.div 
          className="mt-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: '50K+', label: 'Happy Customers' },
              { value: '100K+', label: 'Items Upcycled' },
              { value: '500+', label: 'Expert Designers' },
              { value: '95%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
              >
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-emerald-100 text-xs md:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
