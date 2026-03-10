'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';

export function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    if (user.account_type === 'admin') return '/admin';
    if (user.account_type === 'designer') return '/designer-dashboard';
    return '/dashboard';
  };

  const handleLogout = () => {
    logout();
    router.push('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md dark:border-gray-700">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/Upcycle_symbol.svg" 
            alt="UpCycle" 
            width={36} 
            height={36}
            className="w-8 h-8 md:w-9 md:h-9"
          />
          <span className="text-xl md:text-2xl font-bold text-emerald-600">UpCycle</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/marketplace" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Marketplace
          </Link>
          <Link href="/designers" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Designers
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            How It Works
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              <Link href={getDashboardLink()}>
                <Button variant="ghost" className="dark:text-gray-300">
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button variant="ghost" className="dark:text-gray-300">
                  Profile
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="dark:text-gray-300">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-gray-900">
          <nav className="flex flex-col p-4 space-y-3">
            <Link 
              href="/marketplace" 
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link 
              href="/designers" 
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Designers
            </Link>
            <Link 
              href="/how-it-works" 
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            
            <div className="pt-3 border-t">
              {isAuthenticated && user ? (
                <>
                  <Link 
                    href={getDashboardLink()} 
                    className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/dashboard/settings" 
                    className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block text-sm font-medium text-red-600 py-2 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-emerald-600 text-emerald-600">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
