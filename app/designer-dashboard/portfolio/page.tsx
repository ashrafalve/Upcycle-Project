'use client';

import { useState } from 'react';
import { DesignerLayout } from '@/components/designer/designer-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/form';
import Image from 'next/image';

const portfolioItems = [
  { id: 1, title: 'Restored Vintage Chair', category: 'Furniture', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop', featured: true },
  { id: 2, title: 'Upcycled Leather Bag', category: 'Fashion', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=300&fit=crop', featured: true },
  { id: 3, title: 'Painted Dresser', category: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop', featured: false },
  { id: 4, title: 'Denim Jacket Redesign', category: 'Fashion', image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=300&fit=crop', featured: true },
];

export default function PortfolioPage() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <DesignerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
            <p className="text-gray-600">Showcase your best work</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-emerald-600 hover:bg-emerald-700">
            {showAddForm ? 'Cancel' : 'Add Work'}
          </Button>
        </div>

        {showAddForm && (
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Add New Portfolio Item</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Title</label>
                  <Input placeholder="Project title" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                  <Input placeholder="e.g., Furniture, Fashion, Art" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Upload Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 mt-2">Click to upload image</p>
                  </div>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Save to Portfolio</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <div className="relative h-64 bg-gray-100">
                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                {item.featured && (
                  <span className="absolute top-2 right-2 px-2 py-1 text-xs bg-emerald-600 text-white rounded">Featured</span>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DesignerLayout>
  );
}
