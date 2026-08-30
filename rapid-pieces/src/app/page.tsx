'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    
    if (!user) {
      router.replace('/login');
    } else if (user.role === 'admin') {
      router.replace('/admin');
    } else if (user.role === 'seller') {
      router.replace('/seller');
    }
    // buyer stays on this page
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-rp-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rp-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-rp-text-muted">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'buyer') {
    return null;
  }

  // If buyer, show the buyer home page content
  return <BuyerHomeContent />;
}

// We import the buyer home content dynamically
function BuyerHomeContent() {
  // Redirect to the actual buyer home
  if (typeof window !== 'undefined') {
    window.location.href = '/buyer';
  }
  return (
    <div className="min-h-screen bg-rp-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-rp-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-rp-text-muted">Chargement...</p>
      </div>
    </div>
  );
}
