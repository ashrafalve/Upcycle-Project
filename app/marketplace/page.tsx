'use client';

import { useEffect, useState } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { ProductCard } from '@/features/products/components/product-card';
import { ProductFilters } from '@/features/products/components/product-filters';
import { productService, mockCategories } from '@/services/productService';
import { Product, Category } from '@/services/api/types';

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (filters?: {
    category?: string;
    condition?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }) => {
    setIsLoading(true);
    try {
      const data = await productService.getProducts(filters);
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filters: {
    category?: string;
    condition?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }) => {
    loadProducts(filters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="bg-emerald-600 text-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-4xl font-bold">Marketplace</h1>
            <p className="mt-2 text-emerald-100">Discover unique upcycled and pre-loved items</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm border"
            >
              <span className="font-medium">Filters</span>
              <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-lg shadow-sm p-4 lg:p-0 lg:shadow-none">
                <ProductFilters
                  categories={categories}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="mb-4 md:mb-6">
                <p className="text-gray-600">
                  {isLoading ? 'Loading...' : `${products.length} products found`}
                </p>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg h-48 md:h-80 animate-pulse" />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found</p>
                  <p className="text-gray-400">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
