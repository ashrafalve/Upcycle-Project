import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const designers = [
  { id: 1, name: 'Mike Chen', email: 'mike@example.com', specialty: 'Furniture Restoration', projects: 24, rating: 4.9, status: 'approved' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', specialty: 'Leather Work', projects: 18, rating: 4.8, status: 'approved' },
  { id: 3, name: 'Emma Wilson', email: 'emma@example.com', specialty: 'Textile Design', projects: 12, rating: 4.7, status: 'pending' },
  { id: 4, name: 'Alex Rivera', email: 'alex@example.com', specialty: 'Woodworking', projects: 8, rating: 4.6, status: 'rejected' },
];

export default function DesignersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Designers</h1>
          <p className="text-gray-600">Review and manage designer applications</p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Designer</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Specialty</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Projects</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Rating</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {designers.map((designer) => (
                    <tr key={designer.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium">{designer.name}</p>
                          <p className="text-sm text-gray-500">{designer.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{designer.specialty}</td>
                      <td className="py-4 px-6 text-gray-600">{designer.projects}</td>
                      <td className="py-4 px-6">
                        <span className="text-yellow-500">★ {designer.rating}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          designer.status === 'approved' ? 'bg-green-100 text-green-700' :
                          designer.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {designer.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          {designer.status === 'pending' && (
                            <>
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">Approve</Button>
                              <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">Reject</Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">View</Button>
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
