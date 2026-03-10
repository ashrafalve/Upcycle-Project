import Link from 'next/link';
import { LoginForm } from '@/features/auth/components/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="text-3xl font-bold text-emerald-600">
              UpCycle
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to your account</p>
          </div>
          
          <LoginForm />
          
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
      <div className="hidden lg:flex flex-1 bg-emerald-600 dark:bg-emerald-800 items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join the UpCycle Community</h2>
          <p className="text-emerald-100">
            Buy, sell, and transform pre-loved items into something beautiful. 
            Start your sustainable journey today.
          </p>
        </div>
      </div>
    </div>
  );
}
