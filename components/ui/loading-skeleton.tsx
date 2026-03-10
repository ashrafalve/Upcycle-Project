import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';

export { Skeleton } from './skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="border-b dark:border-gray-700">
      {[...Array(columns)].map((_, i) => (
        <td key={i} className="py-4 px-6">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-20 h-20 rounded-md" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-10 w-1/3" />
        <div className="flex gap-3">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
        </div>
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}
