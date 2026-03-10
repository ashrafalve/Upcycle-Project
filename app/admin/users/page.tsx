import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const users = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'buyer', joined: 'Jan 15, 2024', status: 'active' },
  { id: 2, name: 'Mike Chen', email: 'mike@example.com', role: 'designer', joined: 'Jan 20, 2024', status: 'active' },
  { id: 3, name: 'Emma Wilson', email: 'emma@example.com', role: 'seller', joined: 'Feb 1, 2024', status: 'active' },
  { id: 4, name: 'Alex Rivera', email: 'alex@example.com', role: 'buyer', joined: 'Feb 5, 2024', status: 'inactive' },
];

export default function UsersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
            <p className="text-gray-600">View and manage platform users</p>
          </div>
          <Button className="bg-gray-900 hover:bg-gray-800">Add User</Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Name</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Email</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Role</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Joined</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium">{user.name}</td>
                      <td className="py-4 px-6 text-gray-600">{user.email}</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 capitalize">{user.role}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{user.joined}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <Button variant="ghost" size="sm">Edit</Button>
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
