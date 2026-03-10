import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const stats = [
  { label: 'Active Listings', value: '5', change: '+2 this month' },
  { label: 'Total Purchases', value: '12', change: '+3 this month' },
  { label: 'Upcycle Requests', value: '3', change: '1 pending' },
  { label: 'Messages', value: '8', change: '2 unread' },
];

const recentActivity = [
  { type: 'listing', message: 'Your listing "Vintage Oak Dresser" received a new offer', time: '2 hours ago' },
  { type: 'request', message: 'Designer Mike accepted your upcycle request', time: '1 day ago' },
  { type: 'purchase', message: 'Order #1234 has been shipped', time: '2 days ago' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Welcome back! Here&apos;s your activity overview.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-white dark:bg-gray-800">
              <CardContent className="p-4 md:p-6">
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 md:mt-2">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <Link href="/dashboard/listings/new">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs md:text-sm py-2 md:py-2.5">
                    Add Listing
                  </Button>
                </Link>
                <Link href="/dashboard/requests/new">
                  <Button variant="outline" className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-xs md:text-sm py-2 md:py-2.5">
                    Request Upcycle
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button variant="outline" className="w-full text-xs md:text-sm py-2 md:py-2.5">
                    Browse
                  </Button>
                </Link>
                <Link href="/designers">
                  <Button variant="outline" className="w-full text-xs md:text-sm py-2 md:py-2.5">
                    Find Designers
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">Recent Activity</h2>
              <div className="space-y-3 md:space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-2 md:gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 md:mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-xs md:text-sm text-gray-900 dark:text-white line-clamp-2">{activity.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
