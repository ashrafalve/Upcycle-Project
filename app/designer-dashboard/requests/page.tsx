'use client';

import { useState } from 'react';
import { DesignerLayout } from '@/components/designer/designer-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, FormField, FormButton } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

interface Request {
  id: number;
  title: string;
  description: string;
  itemImage: string;
  desiredTransformation: string;
  budgetMin: number;
  budgetMax: number;
  userName: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const mockRequests: Request[] = [
  {
    id: 1,
    title: 'Vintage Chair Restoration',
    description: 'Old wooden chair from the 1970s. The legs are wobly and the cushion needs replacing.',
    itemImage: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
    desiredTransformation: 'Refinish the wood, fix the legs, add new comfortable cushions',
    budgetMin: 150,
    budgetMax: 300,
    userName: 'Sarah Johnson',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Denim Jacket Redesign',
    description: 'Classic 90s denim jacket. Want to add some embroidery and patches.',
    itemImage: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=400&fit=crop',
    desiredTransformation: 'Hand embroidery with floral patterns on back and sleeves',
    budgetMin: 50,
    budgetMax: 100,
    userName: 'Emma Wilson',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Coffee Table Makeover',
    description: 'Old coffee table with water damage on the surface.',
    itemImage: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=400&fit=crop',
    desiredTransformation: 'Convert to live-edge design with epoxy finish',
    budgetMin: 200,
    budgetMax: 400,
    userName: 'Alex Rivera',
    status: 'accepted',
  },
];

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [showProposal, setShowProposal] = useState<number | null>(null);
  const [proposalForm, setProposalForm] = useState({
    designIdea: '',
    estimatedPrice: '',
    timeline: '',
  });

  const handleAccept = (id: number) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
  };

  const handleReject = (id: number) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
  };

  const handleSubmitProposal = (id: number) => {
    console.log('Submitting proposal:', { id, ...proposalForm });
    setShowProposal(null);
    setProposalForm({ designIdea: '', estimatedPrice: '', timeline: '' });
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

  return (
    <DesignerLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incoming Requests</h1>
          <p className="text-gray-600">Review and respond to upcycling requests</p>
        </div>

        {pendingRequests.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">New Requests ({pendingRequests.length})</h2>
            <div className="grid gap-6">
              {pendingRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    {showProposal === request.id ? (
                      <div className="space-y-4">
                        <h3 className="font-semibold">Send Design Proposal</h3>
                        <FormField label="Your Design Idea" error="">
                          <Textarea
                            placeholder="Describe your proposed design and approach"
                            value={proposalForm.designIdea}
                            onChange={(e) => setProposalForm({ ...proposalForm, designIdea: e.target.value })}
                            rows={4}
                          />
                        </FormField>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField label="Estimated Price ($)" error="">
                            <Input
                              type="number"
                              placeholder="200"
                              value={proposalForm.estimatedPrice}
                              onChange={(e) => setProposalForm({ ...proposalForm, estimatedPrice: e.target.value })}
                            />
                          </FormField>
                          <FormField label="Timeline (days)" error="">
                            <Input
                              type="number"
                              placeholder="7"
                              value={proposalForm.timeline}
                              onChange={(e) => setProposalForm({ ...proposalForm, timeline: e.target.value })}
                            />
                          </FormField>
                        </div>
                        <div className="flex gap-3">
                          <Button onClick={() => handleSubmitProposal(request.id)} className="bg-emerald-600 hover:bg-emerald-700">
                            Submit Proposal
                          </Button>
                          <Button variant="outline" onClick={() => setShowProposal(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image src={request.itemImage} alt={request.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                            <p className="text-sm text-gray-500">from {request.userName}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Current Condition:</p>
                            <p className="text-sm text-gray-600">{request.description}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Desired Transformation:</p>
                            <p className="text-sm text-gray-600">{request.desiredTransformation}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-emerald-600">
                              ${request.budgetMin} - ${request.budgetMax}
                            </span>
                            <div className="flex gap-2">
                              <Button onClick={() => setShowProposal(request.id)} className="bg-emerald-600 hover:bg-emerald-700">
                                Send Proposal
                              </Button>
                              <Button variant="outline" onClick={() => handleReject(request.id)} className="text-red-600 border-red-600 hover:bg-red-50">
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {processedRequests.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Processed Requests</h2>
            <div className="grid gap-4">
              {processedRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image src={request.itemImage} alt={request.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900">{request.title}</h3>
                        <p className="text-sm text-gray-500">Budget: ${request.budgetMin} - ${request.budgetMax}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        request.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DesignerLayout>
  );
}
