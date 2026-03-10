'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const isServer = typeof window === 'undefined';

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

const steps = [
  {
    number: '01',
    title: 'List Your Items',
    description: 'Snap photos of your pre-loved items, set a price, and list them on our marketplace. Reach thousands of potential buyers.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Request Upcycle Design',
    description: 'Have something special? Describe your vision, set a budget, and connect with talented designers who can bring your idea to life.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Receive Your Masterpiece',
    description: 'Watch as skilled artisans transform your items into unique, one-of-a-kind creations. Payment is released when you are satisfied.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  const isHydrated = useHydrated();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isHydrated) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHydrated]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % steps.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  if (!isHydrated) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            From listing to upcycling — three simple steps to give your items a new purpose
          </p>
        </motion.div>

        {/* Circular Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Carousel Area */}
          <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute w-full max-w-2xl"
              >
                <div className="bg-white rounded-2xl shadow-2xl p-10 relative overflow-hidden">
                  {/* Circle Background */}
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full opacity-15" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full opacity-10" />
                  
                  {/* Center Circle with Icon */}
                  <div className="flex flex-col items-center">
                    {/* Step Number Circle */}
                    <motion.div 
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl mb-6"
                      whileHover={{ scale: 1.1 }}
                    >
                      {steps[activeIndex].number}
                    </motion.div>

                    {/* Icon Circle */}
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg mb-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      {steps[activeIndex].icon}
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{steps[activeIndex].title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed">{steps[activeIndex].description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-2 px-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:shadow-xl transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-10 bg-emerald-500' 
                      : 'w-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:shadow-xl transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
