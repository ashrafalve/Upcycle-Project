import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="text-3xl font-bold text-emerald-600">
              UpCycle
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-gray-900">Forgot your password?</h1>
            <p className="mt-2 text-gray-600">Enter your email and we&apos;ll send you a reset link</p>
          </div>
          
          <form className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="you@example.com"
              />
            </div>

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
              Send Reset Link
            </Button>
          </form>
          
          <p className="text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      <div className="hidden lg:flex flex-1 bg-emerald-600 items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Reset Your Password</h2>
          <p className="text-emerald-100">
            No worries, we&apos;ll help you get back into your account in no time.
          </p>
        </div>
      </div>
    </div>
  );
}
