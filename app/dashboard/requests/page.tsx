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

interface UpcycleRequest {
  id: number;
  title: string;
  description: string;
  image: string;
  budget: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed';
  designer?: string;
}

const mockRequests: UpcycleRequest[] = [
  { 
    id: 1, 
    title: 'Restored Vintage Chair', 
    description: 'Old wooden chair that needs new cushions and refinishing',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop',
    budget: '$150 - $300',
    status: 'accepted',
    designer: 'Mike Chen'
  },
  { 
    id: 2, 
    title: 'Denim Jacket Redesign', 
    description: 'Want to add embroidery and patches to vintage denim',
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=200&h=200&fit=crop',
    budget: '$50 - $100',
    status: 'pending'
  },
];

export default function RequestsPage() {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState<UpcycleRequest[]>(mockRequests);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    desiredTransformation: '',
    budgetMin: '',
    budgetMax: '',
    designer: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: UpcycleRequest = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
      budget: `$${formData.budgetMin} - $${formData.budgetMax}`,
      status: 'pending',
    };
    setRequests([newRequest, ...requests]);
    setShowForm(false);
    setFormData({ title: '', description: '', desiredTransformation: '', budgetMin: '', budgetMax: '', designer: '' });
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    accepted: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-emerald-100 text-emerald-700',
    completed: 'bg-gray-100 text-gray-700',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Upcycle Requests</h1>
            <p className="text-gray-600">Request custom upcycling designs for your items</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-emerald-600 hover:bg-emerald-700">
            {showForm ? 'Cancel' : 'New Request'}
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create Upcycle Request</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField label="Item Name" error="">
                  <Input
                    placeholder="What item do you want to upcycle?"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </FormField>

                <FormField label="Item Description" error="">
                  <Textarea
                    placeholder="Describe the current condition and any details about the item"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </FormField>

                <FormField label="Desired Transformation" error="">
                  <Textarea
                    placeholder="Describe how you want the item to look after upcycling"
                    value={formData.desiredTransformation}
                    onChange={(e) => setFormData({ ...formData, desiredTransformation: e.target.value })}
                    rows={3}
                    required
                  />
                </FormField>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="Minimum Budget ($)" error="">
                    <Input
                      type="number"
                      placeholder="100"
                      value={formData.budgetMin}
                      onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                      required
                    />
                  </FormField>
                  <FormField label="Maximum Budget ($)" error="">
                    <Input
                      type="number"
                      placeholder="300"
                      value={formData.budgetMax}
                      onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                      required
                    />
                  </FormField>
                </div>

                <FormField label="Select Designer (Optional)" error="">
                  <Select onValueChange={(value: string | null) => setFormData({ ...formData, designer: value || '' })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a specific designer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Designer</SelectItem>
                      <SelectItem value="mike">Mike Chen</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="emma">Emma Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <div>
                  <Label className="mb-2 block">Upload Item Photo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500">Click to upload a photo of your item</p>
                    <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <FormButton type="submit" className="w-full">
                  Submit Request
                </FormButton>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={request.image} alt={request.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{request.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">{request.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[request.status]}`}>
                        {request.status.replace('_', ' ').charAt(0).toUpperCase() + request.status.replace('_', ' ').slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">Budget: {request.budget}</span>
                      {request.designer && (
                        <span className="text-xs text-gray-500">Designer: {request.designer}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
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
