import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/services/api/types';
import { formatPrice } from '@/lib/utils';
import { MapPin, User, Eye, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const conditionConfig: Record<string, { label: string; color: string }> = {
  new: { label: 'Brand New', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
  like_new: { label: 'Like New', color: 'bg-blue-500/10 text-blue-600 border-blue-200' },
  good: { label: 'Good', color: 'bg-amber-500/10 text-amber-600 border-amber-200' },
  fair: { label: 'Fair', color: 'bg-orange-500/10 text-orange-600 border-orange-200' },
  poor: { label: 'Poor', color: 'bg-red-500/10 text-red-600 border-red-200' },
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
  const condition = conditionConfig[product.condition] || { label: product.condition, color: 'bg-gray-100 text-gray-600' };

  return (
    <Card className="group relative overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl flex flex-col h-full">
      {/* Image Section */}
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="outline" className={`backdrop-blur-md border font-semibold px-2.5 py-0.5 rounded-lg ${condition.color}`}>
            {condition.label}
          </Badge>
        </div>

        {/* Wishlist Button (Aesthetic only for now) */}
        <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-white transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0">
          <Heart className="w-4 h-4" />
        </button>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 dark:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg border border-white/20">
            <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
              <Eye className="w-4 h-4" /> Quick View
            </span>
          </div>
        </div>
      </Link>

      {/* Content Section */}
      <CardContent className="p-3 md:p-5 flex-1 flex flex-col min-w-0">
        <div className="mb-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-sm md:text-lg text-gray-900 dark:text-white leading-tight hover:text-emerald-600 transition-colors line-clamp-2 min-h-[2.5rem] md:min-h-0">
              {product.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 mt-1.5 text-gray-500 dark:text-gray-400">
            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
              <User className="w-2.5 h-2.5 md:w-3 md:h-3 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-[10px] md:text-xs font-medium truncate">
              {product.seller.first_name} {product.seller.last_name}
            </span>
          </div>
        </div>

        <div className="mt-auto space-y-2 md:space-y-3">
          <div className="flex items-center text-gray-400 dark:text-gray-500 text-[10px] md:text-xs">
            <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1 text-emerald-500 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-800 gap-2">
            <div className="flex flex-col">
              <span className="text-[8px] md:text-[10px] uppercase tracking-wider text-gray-400 font-bold">Price</span>
              <span className="text-base md:text-xl font-black text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
            </div>
            <Link href={`/product/${product.id}`} className="w-full sm:w-auto">
              <Button size="sm" className="w-full sm:w-auto rounded-lg md:rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 px-3 md:px-5 h-8 md:h-9 text-[10px] md:text-sm transition-all hover:scale-105 active:scale-95">
                View
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
