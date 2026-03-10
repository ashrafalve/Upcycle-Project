import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/services/api/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const conditionLabels: Record<string, string> = {
  new: 'New',
  like_new: 'Like New',
  good: 'Good',
  fair: 'Fair',
  poor: 'Poor',
};

const locationMap: Record<string, string> = {
  '1': 'Brooklyn, NY',
  '2': 'Austin, TX',
  '3': 'Portland, OR',
  '4': 'Denver, CO',
  '5': 'Seattle, WA',
  '6': 'Chicago, IL',
  '7': 'San Francisco, CA',
};

export function ProductCard({ product }: ProductCardProps) {
  const location = locationMap[product.seller.id] || 'Online';

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-white dark:bg-gray-800">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex gap-1">
            <span className="px-2 py-0.5 text-[10px] md:text-xs font-medium bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-700 dark:text-gray-300">
              {conditionLabels[product.condition]}
            </span>
          </div>
        </div>
      </Link>
      <CardContent className="p-3 md:p-4 flex-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white truncate hover:text-emerald-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
          by {product.seller.first_name} {product.seller.last_name}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 hidden md:block">{location}</p>
      </CardContent>
      <CardFooter className="p-3 md:p-4 pt-0 flex justify-between items-center">
        <span className="text-sm md:text-lg font-bold text-emerald-600 dark:text-emerald-400">
          {formatPrice(product.price)}
        </span>
        <Link href={`/product/${product.id}`}>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs md:text-sm px-3 md:px-4">
            View
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
