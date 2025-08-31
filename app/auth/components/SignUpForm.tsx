'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Button from '../../../components/ui/Button';
import ErrorAlert from '../../../components/ui/ErrorAlert';
import InputBox from '../../../components/ui/InputBox';
import { authManager } from '../../../lib/auth/nextauth/providers';
import { LoginCredentials } from '../../../lib/auth/types/auth.types';

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/tasks';
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginCredentials>({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Register user with our auth service
      await authManager().register(formData);

      // After successful registration, sign them in
      const signInResponse = await signIn('credentials', {
        username: formData.username,
        password: formData.password,
        redirect: false,
        callbackUrl,
      });

      if (signInResponse?.error) {
        setError(new Error('Registration successful, but sign in failed'));
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      console.error(error);
      setError(new Error('An error occurred during sign up'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <ErrorAlert error={error} defaultMessage="Sign up failed" />

      <InputBox
        label="Username"
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        focusBorderColor="focus:border-primary"
        focusRingColor="focus:ring-primary"
        focusLabelColor="text-primary"
        defaultLabelColor="text-gray-800"
        borderColor="border-gray-500"
        disabled={isLoading}
        value={formData.username}
        onChange={handleChange}
      />
      <InputBox
        label="Password"
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        focusBorderColor="focus:border-primary"
        focusRingColor="focus:ring-primary"
        focusLabelColor="text-primary"
        defaultLabelColor="text-gray-800"
        borderColor="border-gray-500"
        disabled={isLoading}
        value={formData.password}
        onChange={handleChange}
      />

      <div className="flex flex-row-reverse gap-2 justify-between items-center">
        <Button
          type="submit"
          label="Sign up"
          variant="filled"
          size="large"
          className="rounded-3xl!"
        />
        <Link href="/auth/login" className="text-primary">
          sign in
        </Link>
      </div>
    </form>
  );
}
