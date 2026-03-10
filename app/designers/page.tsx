'use client';

import { useState } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const designers = [
  { id: 1, name: 'Mike Chen', specialty: 'Furniture Restoration', rating: 4.9, projects: 24, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
  { id: 2, name: 'Sarah Johnson', specialty: 'Leather Work', rating: 4.8, projects: 18, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
  { id: 3, name: 'Emma Wilson', specialty: 'Textile Design', rating: 4.7, projects: 12, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
  { id: 4, name: 'Alex Rivera', specialty: 'Woodworking', rating: 4.6, projects: 8, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
];

export default function DesignersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDesigners = designers.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="bg-emerald-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">Find Designers</h1>
            <p className="mt-4 text-emerald-100 text-lg">Connect with talented upcycling experts</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDesigners.map((designer) => (
              <Card key={designer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-200 mb-4">
                    <img 
                      src={designer.image} 
                      alt={designer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{designer.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{designer.specialty}</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{designer.rating}</span>
                    <span className="text-gray-400 text-sm">({designer.projects} projects)</span>
                  </div>
                  <Button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
