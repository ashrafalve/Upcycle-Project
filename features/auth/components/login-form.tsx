'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginSchema, LoginFormData, Input, FormField, FormButton } from '@/components/ui/form';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    
    try {
      const result = await authService.login(data);
      setAuth(result.user, result.tokens);
      setSuccess('Login successful! Redirecting...');
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      {success && (
        <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md">
          {success}
        </div>
      )}
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}
      
      <FormField label="Email" error={errors.email?.message}>
        <Input
          type="email"
          placeholder="you@example.com"
          {...register('email')}
        />
      </FormField>
      
      <FormField label="Password" error={errors.password?.message}>
        <Input
          type="password"
          placeholder="Enter your password"
          {...register('password')}
        />
      </FormField>
      
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <Link href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700">
          Forgot password?
        </Link>
      </div>
      
      <FormButton type="submit" className="w-full" isLoading={isLoading}>
        Sign In
      </FormButton>
    </form>
  );
}
