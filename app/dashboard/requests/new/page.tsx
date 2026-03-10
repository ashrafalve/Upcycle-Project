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
import { upcycleRequestService } from '@/services/dashboardService';

export default function NewRequestPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    transformation: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      await upcycleRequestService.createRequest({
        title: formData.title,
        description: formData.description,
        item_images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
        budget_min: Number(formData.budgetMin),
        budget_max: Number(formData.budgetMax),
        desired_transformation: formData.transformation,
      });
      setSuccess('Request created successfully! Redirecting...');
      setTimeout(() => router.push('/dashboard/requests'), 1500);
    } catch (err) {
      setError('Failed to create request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <Link
          href="/dashboard/requests"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Requests
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Request Upcycle Design</CardTitle>
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
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Vintage Chair Restoration"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Item Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the item you want upcycled..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budgetMin">Min Budget ($)</Label>
                  <Input
                    id="budgetMin"
                    type="number"
                    min="0"
                    placeholder="50"
                    value={formData.budgetMin}
                    onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budgetMax">Max Budget ($)</Label>
                  <Input
                    id="budgetMax"
                    type="number"
                    min="0"
                    placeholder="200"
                    value={formData.budgetMax}
                    onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transformation">Desired Transformation</Label>
                <Textarea
                  id="transformation"
                  placeholder="Describe how you want your item to look..."
                  rows={4}
                  value={formData.transformation}
                  onChange={(e) => setFormData({ ...formData, transformation: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit Request'}
                </Button>
                <Link href="/dashboard/requests">
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
