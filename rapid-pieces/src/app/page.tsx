'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) { router.replace('/login'); return; }
    if (user.role === 'admin') router.replace('/admin');
    else if (user.role === 'seller') router.replace('/seller');
    else router.replace('/buyer');
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen bg-rp-bg flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-rp-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
