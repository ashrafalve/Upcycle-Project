import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const requests = [
  { id: 1, title: 'Vintage Chair Restoration', user: 'Sarah J.', designer: 'Mike Chen', budget: '$150-300', status: 'in_progress', date: 'Feb 8, 2024' },
  { id: 2, title: 'Denim Jacket Redesign', user: 'Emma W.', designer: 'Sarah J.', budget: '$50-100', status: 'completed', date: 'Feb 5, 2024' },
  { id: 3, title: 'Coffee Table Makeover', user: 'Alex R.', designer: null, budget: '$200-400', status: 'pending', date: 'Feb 10, 2024' },
  { id: 4, title: 'Lamp Restoration', user: 'Tom A.', designer: 'Mike C.', budget: '$100-150', status: 'cancelled', date: 'Feb 1, 2024' },
];

export default function RequestsPage() {
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    in_progress: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Requests</h1>
          <p className="text-gray-600">Monitor upcycle requests and assignments</p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Request</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">User</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Designer</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Budget</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium">{request.title}</td>
                      <td className="py-4 px-6 text-gray-600">{request.user}</td>
                      <td className="py-4 px-6 text-gray-600">
                        {request.designer || <span className="text-gray-400">Unassigned</span>}
                      </td>
                      <td className="py-4 px-6 text-gray-600">{request.budget}</td>
                      <td className="py-4 px-6 text-gray-600">{request.date}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[request.status]}`}>
                          {request.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Cancel</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
