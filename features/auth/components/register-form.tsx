'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerSchema, RegisterFormData, Input, FormField, FormButton } from '@/components/ui/form';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType: 'user',
    },
  });

  const selectedAccountType = watch('accountType');

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    
    try {
      const result = await authService.register({
        email: data.email,
        password: data.password,
        username: `${data.firstName.toLowerCase()}.${data.lastName.toLowerCase()}`,
        first_name: data.firstName,
        last_name: data.lastName,
        account_type: data.accountType,
      });
      setAuth(result.user, result.tokens);
      setSuccess('Registration successful! Redirecting...');
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
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
      
      <div className="grid grid-cols-2 gap-4">
        <FormField label="First Name" error={errors.firstName?.message}>
          <Input
            placeholder="John"
            {...register('firstName')}
          />
        </FormField>
        
        <FormField label="Last Name" error={errors.lastName?.message}>
          <Input
            placeholder="Doe"
            {...register('lastName')}
          />
        </FormField>
      </div>
      
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
          placeholder="Create a password"
          {...register('password')}
        />
      </FormField>
      
      <FormField label="Confirm Password" error={errors.confirmPassword?.message}>
        <Input
          type="password"
          placeholder="Confirm your password"
          {...register('confirmPassword')}
        />
      </FormField>
      
      <FormField label="Account Type" error={errors.accountType?.message}>
        <Select
          value={selectedAccountType}
          onValueChange={(value) => setValue('accountType', value as 'user' | 'designer')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
      
      <p className="text-xs text-gray-500">
        {selectedAccountType === 'designer' 
          ? 'As a designer, you can accept upcycling projects and showcase your work.'
          : 'As a user, you can buy and sell items, and request upcycling designs.'}
      </p>
      
      <FormButton type="submit" className="w-full" isLoading={isLoading}>
        Create Account
      </FormButton>
      
      <p className="text-xs text-center text-gray-500">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="text-emerald-600 hover:underline">Terms of Service</Link>
        {' '}and{' '}
        <Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
      </p>
    </form>
  );
}
