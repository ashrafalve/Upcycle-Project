import Link from 'next/link';
import { Navbar, Footer } from '@/components/layout';

const designers = [
  { id: 2, name: 'Sarah Johnson', specialty: 'Furniture Restoration', location: 'Brooklyn, NY' },
  { id: 1, name: 'Mike Chen', specialty: 'Leather Goods', location: 'Austin, TX' },
  { id: 3, name: 'Emma Wilson', specialty: 'Textile Arts', location: 'Portland, OR' },
  { id: 4, name: 'Alex Rivera', specialty: 'Woodworking', location: 'Denver, CO' },
  { id: 7, name: 'Jessica Brown', specialty: 'Art & Decor', location: 'Seattle, WA' },
  { id: 8, name: 'David Kim', specialty: 'Metal Work', location: 'Chicago, IL' },
];

export default function DesignerShowcasePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="bg-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Designer Showcase</h1>
            <p className="mt-4 text-emerald-100">Meet our talented upcycling designers</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {designers.map((designer, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-md">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-2xl mb-4">
                  {designer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{designer.name}</h3>
                <p className="text-emerald-600">{designer.specialty}</p>
                <p className="text-gray-500 text-sm">{designer.location}</p>
                <Link href={`/designers/${designer.id}`} className="inline-block mt-4 text-emerald-600 hover:text-emerald-700 font-medium">
                  View Profile →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
