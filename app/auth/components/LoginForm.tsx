'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Button from '../../../components/ui/Button';
import ErrorAlert from '../../../components/ui/ErrorAlert';
import InputBox from '../../../components/ui/InputBox';
import { LoginCredentials } from '../../../lib/auth/types/auth.types';

export default function LoginForm() {
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
      const response = await signIn('credentials', {
        username: formData.username,
        password: formData.password,
        redirect: false,
        callbackUrl,
      });
      console.log(formData);
      console.log(response);

      if (response?.error) {
        // Use the actual error message from NextAuth or fallback to generic message
        const errorMessage =
          response.error === 'CredentialsSignin'
            ? 'Invalid username or password'
            : response.error;
        setError(new Error(errorMessage));
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      console.error(error);
      setError(new Error('An error occurred during login'));
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
      <ErrorAlert error={error} defaultMessage="Login failed" />

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

      <div className="flex flex-col gap-2">
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
        <div className="flex flex-row gap-2 items-center">
          <span>Forgot password?</span>
          <Link href="/auth/reset-password" className="text-primary">
            Reset password
          </Link>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-2 justify-between items-center">
        <Button
          type="submit"
          label="Sign in"
          variant="filled"
          size="large"
          className="rounded-3xl!"
        />
        <Link href="/auth/register" className="text-primary">
          create an account
        </Link>
      </div>
    </form>
  );
}
