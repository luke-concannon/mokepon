'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { completeOnboarding } from './_actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OnboardingComponent() {
  const [error, setError] = useState('');
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);
    if (res?.message) {
      // Reloads the user's data from the Clerk API
      await user?.reload();
      router.push('/');
    }
    if (res?.error) {
      setError(res?.error);
    }
  };
  return (
    <main className='flex p-10 w-full justify-center'>
      <form action={handleSubmit} className='flex gap-4 w-1/2'>
        <Input name='jobTitle' required placeholder='What is your role?' />
        <Button type='submit'>Create Profile</Button>
        {error && <p className='text-red-600'>Error: {error}</p>}
      </form>
    </main>
  );
}
