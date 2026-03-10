'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

const featuredProducts = [
  {
    id: '1',
    title: 'Vintage Oak Dresser',
    price: 350,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    condition: 'Good',
    location: 'Brooklyn, NY',
  },
  {
    id: '2',
    title: 'Upcycled Leather Bag',
    price: 120,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=300&fit=crop',
    condition: 'Like New',
    location: 'Austin, TX',
  },
  {
    id: '3',
    title: 'Restored Mid-Century Chair',
    price: 275,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop',
    condition: 'Excellent',
    location: 'Portland, OR',
  },
  {
    id: '4',
    title: 'Reclaimed Wood Coffee Table',
    price: 425,
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop',
    condition: 'Good',
    location: 'Denver, CO',
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured <span className="text-emerald-600">Upcycled</span> Products
            </h2>
            <p className="mt-4 text-lg text-gray-600">Discover unique pieces given a new lease of life</p>
          </div>
          <Link href="/marketplace">
            <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              View All Products →
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300 h-full">
                <Link href={`/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    
                    {/* Hover overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-xs font-medium bg-white/95 backdrop-blur rounded-full text-gray-700 shadow-sm">
                        {product.condition}
                      </span>
                    </div>

                    {/* Upcycled badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 text-xs font-medium bg-emerald-500 text-white rounded-full shadow-sm flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Upcycled
                      </span>
                    </div>
                  </div>
                </Link>
                
                <CardContent className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 truncate hover:text-emerald-600 transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {product.location}
                  </p>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="text-xl font-bold text-emerald-600">
                    {formatPrice(product.price)}
                  </span>
                  <Link href={`/product/${product.id}`}>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      View
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/marketplace">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 px-8">
              Explore More Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
