import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';

const purchases = [
  { id: 1, title: 'Upcycled Leather Bag', price: 120, date: 'Feb 5, 2024', status: 'Delivered', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=200&h=200&fit=crop' },
  { id: 2, title: 'Vintage Oak Dresser', price: 350, date: 'Jan 28, 2024', status: 'Shipped', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop' },
];

export default function PurchasesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Purchases</h1>
          <p className="text-gray-600">Track your orders and purchases</p>
        </div>

        <div className="grid gap-4">
          {purchases.map((purchase) => (
            <Card key={purchase.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg bg-gray-100" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{purchase.title}</h3>
                    <p className="text-gray-500 text-sm">{purchase.date}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-emerald-600 font-bold">${purchase.price}</span>
                      <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">{purchase.status}</span>
                    </div>
                  </div>
                  <button className="text-emerald-600 hover:underline text-sm">View Details</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
