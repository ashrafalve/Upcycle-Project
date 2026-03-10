import Link from 'next/link';
import { Navbar, Footer } from '@/components/layout';
import { productService } from '@/services/productService';

export default async function CategoriesPage() {
  const categories = await productService.getCategories();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="bg-emerald-600 text-white py-10 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-4xl font-bold">Categories</h1>
            <p className="mt-2 md:mt-4 text-emerald-100">Browse items by category</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/marketplace?category=${category.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-32 md:h-48 bg-gray-200">
                  {category.image && (
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="text-sm md:text-lg font-semibold text-gray-900 group-hover:text-emerald-600">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
