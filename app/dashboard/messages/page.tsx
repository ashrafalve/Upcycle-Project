import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const messages = [
  { id: 1, from: 'Mike Chen', subject: 'Re: Chair Restoration', preview: 'Hi! I saw your request and I think I can help...', time: '2 hours ago', unread: true },
  { id: 2, from: 'Sarah Johnson', subject: 'Question about your listing', preview: 'Is the dresser still available? I\'m interested...', time: '1 day ago', unread: true },
  { id: 3, from: 'Support', subject: 'Welcome to UpCycle!', preview: 'Thank you for joining our community...', time: '3 days ago', unread: false },
];

export default function MessagesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Your conversations</p>
        </div>

        <Card>
          <CardContent className="p-0">
            {messages.map((message) => (
              <div key={message.id} className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${message.unread ? 'bg-emerald-50' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{message.from}</span>
                      {message.unread && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                    </div>
                    <p className="text-sm text-gray-700 mt-0.5">{message.subject}</p>
                    <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                  </div>
                  <span className="text-xs text-gray-400 ml-4">{message.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
