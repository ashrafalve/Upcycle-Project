'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Search, MoreVertical, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

const initialConversations = [
  { id: 1, name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', lastMessage: 'Hi! I saw your request and I think I can help...', time: '2h ago', unread: true, online: true },
  { id: 2, name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', lastMessage: 'Is the dresser still available? I\'m interested...', time: '1d ago', unread: false, online: false },
  { id: 3, name: 'Support', avatar: null, lastMessage: 'Welcome to UpCycle! Thank you for joining...', time: '3d ago', unread: false, online: true },
];

const mockMessages: Record<number, any[]> = {
  1: [
    { id: 1, text: 'Hello! I am interested in your furniture restoration service.', sender: 'me', time: '10:00 AM' },
    { id: 2, text: 'Hi! I saw your request and I think I can help. What kind of piece do you have?', sender: 'them', time: '10:05 AM' },
    { id: 3, text: 'It is a vintage oak dresser. It needs some sanding and a new finish.', sender: 'me', time: '10:10 AM' },
    { id: 4, text: 'I can definitely do that. Can you send some photos?', sender: 'them', time: '10:15 AM' },
  ],
  2: [
    { id: 1, text: 'Is the dresser still available?', sender: 'them', time: 'Yesterday' },
  ],
  3: [
    { id: 1, text: 'Welcome to UpCycle!', sender: 'them', time: '3 days ago' },
  ]
};

import { Suspense } from 'react';

// ... (existing imports and mock data)

function MessagesContent() {
  const searchParams = useSearchParams();
  const recipientId = searchParams.get('recipient');
  
  const [activeTab, setActiveTab] = useState<number>(1);
  const [messageText, setMessageText] = useState('');
  const [conversations, setConversations] = useState(initialConversations);

  useEffect(() => {
    if (recipientId) {
      const id = parseInt(recipientId);
      const exists = conversations.find(c => c.id === id);
      if (exists) {
        setActiveTab(id);
      } else {
        setActiveTab(id);
      }
    }
  }, [recipientId, conversations]);

  const activeConversation = conversations.find(c => c.id === activeTab) || conversations[0];
  const messages = mockMessages[activeTab] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col md:flex-row gap-6 overflow-hidden">
      {/* Sidebar */}
      <Card className="w-full md:w-80 flex flex-col flex-shrink-0">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input className="pl-9 bg-gray-50 border-none" placeholder="Search chats..." />
          </div>
        </div>
        <CardContent className="p-0 flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div 
              key={conv.id} 
              onClick={() => setActiveTab(conv.id)}
              className={cn(
                "p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-3",
                activeTab === conv.id ? "bg-emerald-50 border-l-4 border-l-emerald-500" : ""
              )}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold overflow-hidden">
                  {conv.avatar ? (
                    <img src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" />
                  ) : (
                    conv.name[0]
                  )}
                </div>
                {conv.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-gray-900 truncate">{conv.name}</span>
                  <span className="text-[10px] text-gray-400">{conv.time}</span>
                </div>
                <p className={cn(
                  "text-xs truncate",
                  conv.unread ? "text-gray-900 font-bold" : "text-gray-500"
                )}>
                  {conv.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold overflow-hidden">
              {activeConversation.avatar ? (
                <img src={activeConversation.avatar} alt={activeConversation.name} className="w-full h-full object-cover" />
              ) : (
                activeConversation.name[0]
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{activeConversation.name}</h3>
              <p className="text-xs text-emerald-500 font-medium">
                {activeConversation.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Search className="w-4 h-4 text-gray-500" /></Button>
            <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4 text-gray-500" /></Button>
          </div>
        </div>

        {/* Messages Area */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "flex flex-col max-w-[80%]",
                msg.sender === 'me' ? "ml-auto items-end" : "items-start"
              )}
            >
              <div className={cn(
                "px-4 py-2 rounded-2xl text-sm shadow-sm",
                msg.sender === 'me' 
                  ? "bg-emerald-600 text-white rounded-br-none" 
                  : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
              )}>
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
            </div>
          ))}
        </CardContent>

        {/* Chat Input */}
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="text-gray-400">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message..." 
              className="flex-1 bg-gray-50 border-none focus-visible:ring-emerald-500" 
            />
            <Button type="submit" size="icon" className="bg-emerald-600 hover:bg-emerald-700 rounded-full w-10 h-10 shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="flex items-center justify-center h-full">Loading conversations...</div>}>
        <MessagesContent />
      </Suspense>
    </DashboardLayout>
  );
}
