'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@/services/api/types';

interface ProductFiltersProps {
  categories: Category[];
  onFilterChange: (filters: {
    category?: string;
    condition?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }) => void;
}

export function ProductFilters({ categories, onFilterChange }: ProductFiltersProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [condition, setCondition] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  const applyFilters = () => {
    const filters: {
      category?: string;
      condition?: string;
      minPrice?: number;
      maxPrice?: number;
      search?: string;
    } = {};

    if (search) filters.search = search;
    if (category !== 'all') filters.category = category;
    if (condition !== 'all') filters.condition = condition;

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (min) filters.minPrice = min;
      if (max) filters.maxPrice = max;
    }

    onFilterChange(filters);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setCondition('all');
    setPriceRange('all');
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
        <Select value={category} onValueChange={(value) => setCategory(value || 'all')}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Condition</label>
        <Select value={condition} onValueChange={(value) => setCondition(value || 'all')}>
          <SelectTrigger>
            <SelectValue placeholder="All Conditions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Conditions</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="like_new">Like New</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="poor">Poor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
        <Select value={priceRange} onValueChange={(value) => setPriceRange(value || 'all')}>
          <SelectTrigger>
            <SelectValue placeholder="Any Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Price</SelectItem>
            <SelectItem value="0-50">Under $50</SelectItem>
            <SelectItem value="50-100">$50 - $100</SelectItem>
            <SelectItem value="100-250">$100 - $250</SelectItem>
            <SelectItem value="250-500">$250 - $500</SelectItem>
            <SelectItem value="500-100000">$500+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3">
        <Button onClick={applyFilters} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} variant="outline">
          Clear
        </Button>
      </div>
    </div>
  );
}
