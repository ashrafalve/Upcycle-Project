import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { label: 'Total Users', value: '1,234', change: '+12%', icon: 'users' },
  { label: 'Active Designers', value: '156', change: '+5%', icon: 'designers' },
  { label: 'Total Products', value: '892', change: '+8%', icon: 'products' },
  { label: 'Upcycle Requests', value: '67', change: '+15%', icon: 'requests' },
];

const recentActivity = [
  { type: 'user', message: 'New user registered: john@example.com', time: '5 min ago' },
  { type: 'product', message: 'New product listed: Vintage Oak Dresser', time: '1 hour ago' },
  { type: 'designer', message: 'Designer application: Sarah Johnson', time: '2 hours ago' },
  { type: 'request', message: 'New upcycle request: Chair Restoration', time: '3 hours ago' },
];

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Platform overview and management</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-emerald-600 mt-2">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900 mt-2" />
                  <div>
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
