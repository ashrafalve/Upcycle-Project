'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const designerImages = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1459191052985-6ec95f54c680?w=400&h=300&fit=crop',
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Furniture Restorer',
    quote: 'UpCycle helped me turn my hobby into a thriving business. The platform makes it so easy to connect with clients who appreciate creative upcycling.',
    rating: 5,
  },
  {
    name: 'Mike T.',
    role: 'Textile Artist',
    quote: 'I have transformed over 200 items through UpCycle. The community is amazing and the earnings have been fantastic!',
    rating: 5,
  },
];

export function BecomeDesigner() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white overflow-hidden">
        {/* Animated background */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            />
          ))}
        </motion.div>

        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
                className="inline-block px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Join Our Creative Community
              </motion.span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Turn Your Creativity Into{' '}
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundImage: "linear-gradient(to right, #6ee7b7, #a7f3d0, #6ee7b7)", backgroundSize: "200%" }}
                >
                  Income
                </motion.span>
              </h2>
              
              <p className="text-lg text-emerald-100 mb-8 leading-relaxed">
                Join our community of talented artists and makers. Accept upcycling projects, 
                showcase your creativity, and earn money while helping others give their items new life.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  { 
                    icon: (
                      <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    ), 
                    text: 'Accept custom upcycling projects' 
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ), 
                    text: 'Build your professional portfolio' 
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ), 
                    text: 'Connect with eco-conscious customers' 
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ), 
                    text: 'Set your own prices and earnings' 
                  },
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-emerald-100">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/designers/signup">
                  <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 text-lg px-8 shadow-xl">
                    Apply as Designer →
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Main card */}
              <motion.div 
                className="aspect-square max-w-md mx-auto"
                initial={{ rotate: -2 }}
                whileInView={{ rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-full rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-1">
                  <div className="h-full rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-8 flex flex-col justify-center items-center text-center">
                    <motion.div
                      className="text-7xl font-bold mb-4"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      500+
                    </motion.div>
                    <div className="text-2xl text-emerald-200 mb-2">Active Designers</div>
                    <div className="text-emerald-400 text-sm">and growing every day</div>
                    
                    {/* Animated counter dots */}
                    <div className="flex gap-2 mt-8">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 bg-emerald-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating cards */}
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-white text-gray-900 rounded-2xl p-4 shadow-2xl"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ delay: 0.4, duration: 3, repeat: Infinity }}
              >
                <div className="text-3xl font-bold text-emerald-600">$2.5M+</div>
                <div className="text-sm text-gray-600">Earned by designers</div>
              </motion.div>

              <motion.div 
                className="absolute -top-4 -right-4 bg-white text-gray-900 rounded-2xl p-4 shadow-2xl"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                animate={{ y: [5, -5, 5] }}
                transition={{ delay: 0.5, duration: 4, repeat: Infinity }}
              >
                <div className="text-3xl font-bold text-emerald-600">
                  <svg className="w-8 h-8 inline text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  4.9
                </div>
                <div className="text-sm text-gray-600">Average rating</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Designers Say</h2>
            <p className="mt-4 text-lg text-gray-600">Real stories from our creative community</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
