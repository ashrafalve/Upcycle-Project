import { DesignerLayout } from '@/components/designer/designer-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const stats = [
  { label: 'Pending Requests', value: '5', change: '3 new today' },
  { label: 'Active Projects', value: '3', change: '2 completing soon' },
  { label: 'Completed', value: '24', change: '+4 this month' },
  { label: 'Earnings', value: '$3,450', change: '+15% vs last month' },
];

const recentRequests = [
  { id: 1, title: 'Vintage Chair Restoration', budget: '$150-300', user: 'Sarah J.', time: '2 hours ago' },
  { id: 2, title: 'Denim Jacket Redesign', budget: '$50-100', user: 'Emma W.', time: '5 hours ago' },
];

export default function DesignerDashboardPage() {
  return (
    <DesignerLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Designer Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here&apos;s your activity overview.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-emerald-600 mt-2">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Requests</h2>
                <Link href="/designer-dashboard/requests">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
              <div className="space-y-3">
                {recentRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{request.title}</p>
                      <p className="text-sm text-gray-500">{request.user} • {request.time}</p>
                    </div>
                    <span className="text-sm font-medium text-emerald-600">{request.budget}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link href="/designer-dashboard/portfolio">
                  <Button variant="outline" className="w-full">Add to Portfolio</Button>
                </Link>
                <Link href="/designer-dashboard/profile">
                  <Button variant="outline" className="w-full">Edit Profile</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DesignerLayout>
  );
}
