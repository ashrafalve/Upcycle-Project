import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Footer } from '@/components/layout';
import { productService } from '@/services/productService';
import { Button } from '@/components/ui/button';

export default async function NewArrivalsPage() {
  const products = await productService.getProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="bg-emerald-600 text-white py-10 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-4xl font-bold">New Arrivals</h1>
            <p className="mt-2 md:mt-4 text-emerald-100">Fresh items just listed</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-32 md:h-48 bg-gray-200">
                  {product.images[0] && (
                    <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                  )}
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-emerald-600 truncate">
                    {product.title}
                  </h3>
                  <p className="text-emerald-600 font-bold mt-1 md:mt-2">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/marketplace">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
