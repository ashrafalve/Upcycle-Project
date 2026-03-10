'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

const sidebarLinks = [
  {
    label: 'Incoming Requests',
    href: '/designer-dashboard/requests',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    label: 'My Designs',
    href: '/designer-dashboard/designs',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    label: 'Portfolio',
    href: '/designer-dashboard/portfolio',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Earnings',
    href: '/designer-dashboard/earnings',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Profile',
    href: '/designer-dashboard/profile',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

interface DesignerLayoutProps {
  children: React.ReactNode;
}

export function DesignerLayout({ children }: DesignerLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthStore();

  const userName = user ? `${user.first_name} ${user.last_name}` : 'Designer';
  const userInitials = user ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}` : 'D';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-emerald-700 border-b sticky top-0 z-50 lg:hidden">
        <div className="flex items-center justify-between px-4 h-14">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/" className="text-xl font-bold text-white">
            UpCycle <span className="text-emerald-300">Designer</span>
          </Link>
          <div className="w-10" />
        </div>
      </header>

      {/* Desktop Header */}
      <header className="bg-emerald-700 border-b sticky top-0 z-50 hidden lg:block">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            UpCycle <span className="text-emerald-300">Designer</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-emerald-100">{userName}</span>
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-medium">
              {userInitials}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 lg:py-8">
        <div className="flex gap-4 lg:gap-8">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={`
            fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-200 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            lg:w-64 flex-shrink-0
          `}>
            <div className="h-full flex flex-col">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b lg:hidden">
                <span className="font-semibold">Menu</span>
                <button onClick={() => setSidebarOpen(false)} className="p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav className="flex-1 overflow-y-auto p-4 lg:p-4">
                <ul className="space-y-1">
                  {sidebarLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                          pathname === link.href
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        )}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
