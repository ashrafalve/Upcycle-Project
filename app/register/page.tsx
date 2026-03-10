import Link from 'next/link';
import { RegisterForm } from '@/features/auth/components/register-form';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 bg-emerald-600 items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start Your UpCycle Journey</h2>
          <p className="text-emerald-100">
            Join thousands of eco-conscious buyers, sellers, and designers transforming 
            the way people think about pre-loved items.
          </p>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="text-3xl font-bold text-emerald-600">
              UpCycle
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-gray-900">Create an account</h1>
            <p className="mt-2 text-gray-600">Join the UpCycle community</p>
          </div>
          
          <RegisterForm />
          
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
