import { DesignerLayout } from '@/components/designer/designer-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const designs = [
  { id: 1, title: 'Restored Mid-Century Chair', client: 'Sarah J.', status: 'In Progress', progress: 60, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop' },
  { id: 2, title: 'Upcycled Denim Tote', client: 'Emma W.', status: 'Completed', progress: 100, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=300&fit=crop' },
  { id: 3, title: 'Painted Dresser', client: 'Alex R.', status: 'In Progress', progress: 30, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
];

export default function DesignsPage() {
  return (
    <DesignerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Designs</h1>
            <p className="text-gray-600">Track your ongoing and completed projects</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design) => (
            <Card key={design.id} className="overflow-hidden">
              <div className="relative h-48 bg-gray-100">
                <Image src={design.image} alt={design.title} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900">{design.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Client: {design.client}</p>
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-emerald-600">{design.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all" 
                      style={{ width: `${design.progress}%` }}
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    design.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {design.status}
                  </span>
                  <Button variant="ghost" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DesignerLayout>
  );
}
