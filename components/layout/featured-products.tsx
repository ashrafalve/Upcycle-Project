'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/features/products/components/product-card';
import { Product } from '@/services/api/types';

const featuredProducts: Product[] = [
  {
    id: '1',
    title: 'Industrial Copper Pipe Lamp',
    description: 'A unique desk lamp handcrafted from industrial copper pipes and a vintage Edison bulb.',
    price: 85,
    images: ['/images/products/pipe-lamp.png'],
    condition: 'good',
    category: 'Furniture',
    status: 'available',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    seller: {
      id: '1',
      username: 'sarah_designs',
      email: 'sarah@example.com',
      first_name: 'Sarah',
      last_name: 'Johnson',
      account_type: 'user',
    },
  },
  {
    id: '2',
    title: 'Vintage Suitcase Planter',
    description: 'A reclaimed vintage leather suitcase transformed into a stunning indoor garden.',
    price: 145,
    images: ['/images/products/suitcase-planter.png'],
    condition: 'like_new',
    category: 'Home Decor',
    status: 'available',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    seller: {
      id: '2',
      username: 'mike_creates',
      email: 'mike@example.com',
      first_name: 'Mike',
      last_name: 'Chen',
      account_type: 'designer',
    },
  },
  {
    id: '3',
    title: 'Bicycle Wheel Wall Clock',
    description: 'Modern industrial wall clock created from a salvaged vintage bicycle wheel.',
    price: 75,
    images: ['https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800&q=80'],
    condition: 'new',
    category: 'Art',
    status: 'available',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    seller: {
      id: '3',
      username: 'emma_vintage',
      email: 'emma@example.com',
      first_name: 'Emma',
      last_name: 'Wilson',
      account_type: 'user',
    },
  },
  {
    id: '4',
    title: 'Pallet Wood Lounge Chair',
    description: 'Ergonomic lounge chair built entirely from heat-treated shipping pallets.',
    price: 210,
    images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80'],
    condition: 'good',
    category: 'Furniture',
    status: 'available',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    seller: {
      id: '4',
      username: 'alex_woodworks',
      email: 'alex@example.com',
      first_name: 'Alex',
      last_name: 'Rivera',
      account_type: 'designer',
    },
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Featured <span className="text-emerald-600">Upcycled</span> Pieces
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Hand-picked sustainable treasures from our community of artisans and designers. 
              Give these unique items a second story.
            </p>
          </div>
          <Link href="/marketplace">
            <Button variant="outline" className="rounded-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300">
              View All Marketplace →
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/marketplace">
            <Button size="lg" className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-10 py-6 text-lg shadow-xl shadow-emerald-600/20 transform hover:scale-105 transition-all">
              Discover More sustainable goods
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
