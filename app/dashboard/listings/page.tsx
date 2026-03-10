'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, FormField, FormButton } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

interface Listing {
  id: number;
  title: string;
  price: number;
  image: string;
  status: 'active' | 'sold' | 'pending';
  views: number;
}

const mockListings: Listing[] = [
  { id: 1, title: 'Vintage Oak Dresser', price: 350, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop', status: 'active', views: 45 },
  { id: 2, title: 'Mid-Century Chair', price: 275, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop', status: 'active', views: 32 },
  { id: 3, title: 'Reclaimed Table', price: 425, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=200&h=200&fit=crop', status: 'sold', views: 89 },
];

export default function ListingsPage() {
  const [showForm, setShowForm] = useState(false);
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: Listing = {
      id: Date.now(),
      title: formData.title,
      price: Number(formData.price),
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
      status: 'active',
      views: 0,
    };
    setListings([newListing, ...listings]);
    setShowForm(false);
    setFormData({ title: '', description: '', price: '', category: '', condition: '' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
            <p className="text-gray-600">Manage your product listings</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-emerald-600 hover:bg-emerald-700">
            {showForm ? 'Cancel' : 'Add New Listing'}
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Listing</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField label="Product Name" error="">
                  <Input
                    placeholder="Enter product name"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </FormField>

                <FormField label="Description" error="">
                  <Textarea
                    placeholder="Describe your product"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </FormField>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="Price ($)" error="">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </FormField>

                  <FormField label="Category" error="">
                    <Select onValueChange={(value: string | null) => setFormData({ ...formData, category: value || '' })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="home-decor">Home Decor</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="jewelry">Jewelry</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>

                <FormField label="Condition" error="">
                  <Select onValueChange={(value: string | null) => setFormData({ ...formData, condition: value || '' })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like_new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <div>
                  <Label className="mb-2 block">Product Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <FormButton type="submit" className="w-full">
                  Create Listing
                </FormButton>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {listings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={listing.image} alt={listing.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                    <p className="text-emerald-600 font-bold">${listing.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        listing.status === 'active' ? 'bg-green-100 text-green-700' :
                        listing.status === 'sold' ? 'bg-gray-100 text-gray-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">{listing.views} views</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
