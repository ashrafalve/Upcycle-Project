import { DesignerLayout } from '@/components/designer/designer-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const earnings = {
  total: 3450,
  pending: 450,
  available: 3000,
  thisMonth: 850,
};

const transactions = [
  { id: 1, project: 'Vintage Chair Restoration', client: 'Sarah J.', amount: 250, date: 'Feb 8, 2024', status: 'Completed' },
  { id: 2, project: 'Denim Jacket Redesign', client: 'Emma W.', amount: 100, date: 'Feb 5, 2024', status: 'Completed' },
  { id: 3, project: 'Coffee Table Makeover', client: 'Alex R.', amount: 350, date: 'Feb 1, 2024', status: 'Pending' },
  { id: 4, project: 'Lamp Restoration', client: 'Tom A.', amount: 150, date: 'Jan 28, 2024', status: 'Completed' },
];

export default function EarningsPage() {
  return (
    <DesignerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
          <p className="text-gray-600">Track your income and withdrawals</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">${earnings.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-3xl font-bold text-emerald-600 mt-1">${earnings.thisMonth}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">${earnings.pending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">Available to Withdraw</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">${earnings.available}</p>
              <Button className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700">Withdraw</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Project</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Client</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b">
                      <td className="py-3 px-4">{tx.project}</td>
                      <td className="py-3 px-4 text-gray-600">{tx.client}</td>
                      <td className="py-3 px-4 font-medium">${tx.amount}</td>
                      <td className="py-3 px-4 text-gray-600">{tx.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DesignerLayout>
  );
}
