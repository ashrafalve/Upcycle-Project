'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

const sidebarLinks = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    label: 'Manage Users',
    href: '/admin/users',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    label: 'Manage Designers',
    href: '/admin/designers',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    label: 'Manage Products',
    href: '/admin/products',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    label: 'Manage Requests',
    href: '/admin/requests',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-gray-900 border-b sticky top-0 z-50 lg:hidden">
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
            UpCycle <span className="text-gray-400">Admin</span>
          </Link>
          <div className="w-10" />
        </div>
      </header>

      {/* Desktop Header */}
      <header className="bg-gray-900 border-b sticky top-0 z-50 hidden lg:block">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            UpCycle <span className="text-gray-400">Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Admin Panel</span>
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">
              A
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
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
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
