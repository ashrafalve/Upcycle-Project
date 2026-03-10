'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { listingService } from '@/services/dashboardService';

const categories = [
  { value: 'furniture', label: 'Furniture' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'home-decor', label: 'Home Decor' },
  { value: 'art', label: 'Art' },
  { value: 'jewelry', label: 'Jewelry' },
];

const conditions = [
  { value: 'new', label: 'New' },
  { value: 'like_new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
];

export default function NewListingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'furniture',
    condition: 'good',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      await listingService.createListing({
        title: formData.title,
        description: formData.description,
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
        price: Number(formData.price),
        category: formData.category,
        condition: formData.condition,
      });
      setSuccess('Listing created successfully! Redirecting...');
      setTimeout(() => router.push('/dashboard/listings'), 1500);
    } catch (err) {
      setError('Failed to create listing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <Link
          href="/dashboard/listings"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Listings
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && (
                <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md">
                  {success}
                </div>
              )}
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Vintage Oak Dresser"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item in detail..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    placeholder="100"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: string | null) => setFormData({ ...formData, category: value || '' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value: string | null) => setFormData({ ...formData, condition: value || '' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((cond) => (
                      <SelectItem key={cond.value} value={cond.value}>
                        {cond.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Listing'}
                </Button>
                <Link href="/dashboard/listings">
                  <Button variant="outline" type="button">Cancel</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
