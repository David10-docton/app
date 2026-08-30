'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Package, MapPin, Clock, AlertTriangle, Eye, Users, ShoppingBag, BarChart3, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { mockRequests } from '@/lib/mockData';

export default function AdminRequestsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [filter, setFilter] = useState<'all' | 'open' | 'matched'>('all');

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) router.replace('/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) return <div className="min-h-screen bg-rp-bg flex items-center justify-center"><div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  const all = [...mockRequests, { id: 'r5', vehicle: { brand: 'Volkswagen', model: 'Golf VII', year: 2017, engine: '1.6 TDI' }, partName: 'Turbo complet', description: '', quantity: 1, location: 'Cotonou', status: 'open' as const, createdAt: '2025-01-15T10:00:00', responsesCount: 0, buyerId: 'b4' }];

  const filtered = all.filter(r => filter === 'all' || r.status === filter);

  return (
    <div className="min-h-screen bg-rp-bg">
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/admin" className="text-slate-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-sm font-bold text-white flex-1">Demandes</h1>
          <span className="w-6 h-6 bg-rp-primary text-white text-[10px] rounded-full flex items-center justify-center font-bold">{all.filter(r => r.status === 'open').length}</span>
        </div>
        <div className="max-w-2xl mx-auto px-4 pb-3 flex gap-2">
          {[
            { key: 'all' as const, label: 'Toutes' },
            { key: 'open' as const, label: '🟢 Ouvertes' },
            { key: 'matched' as const, label: '🔵 Correspondance' },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                filter === f.key ? 'bg-emerald-600 text-white' : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
              }`}>{f.label}</button>
          ))}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3 pb-24 lg:pb-6">
        {filtered.map(req => (
          <div key={req.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  req.status === 'open' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                }`}>{req.status === 'open' ? 'Ouverte' : 'Correspondance'}</span>
                {req.responsesCount === 0 && <span className="text-[8px] bg-red-500/10 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded-full">Sans offre</span>}
              </div>
              <span className="text-lg font-bold text-rp-primary">{req.responsesCount}</span>
            </div>
            <h3 className="text-xs font-semibold text-white mb-0.5">{req.partName}</h3>
            <p className="text-[10px] text-slate-400">{req.vehicle.brand} {req.vehicle.model} {req.vehicle.year}</p>
            <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {req.location}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(req.createdAt).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 bg-slate-700/50 text-slate-300 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 hover:bg-slate-600/50">
                <Eye className="w-3 h-3" /> Détails
              </button>
              {req.status === 'open' && req.responsesCount === 0 && (
                <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-[11px] font-semibold hover:bg-emerald-700">⚡ Trouver des vendeurs</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 z-50">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {[
            { href: '/admin', label: 'Dashboard', icon: BarChart3 },
            { href: '/admin/sellers', label: 'Vendeurs', icon: Users },
            { href: '/admin/orders', label: 'Transactions', icon: ShoppingBag },
            { href: '/admin/requests', label: 'Demandes', icon: Package },
            { href: '/admin/settings', label: 'Config', icon: ShieldCheck },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <Link key={tab.href} href={tab.href} className="flex flex-col items-center">
                <Icon className={`w-5 h-5 ${tab.href === '/admin/requests' ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className={`text-[10px] mt-0.5 ${tab.href === '/admin/requests' ? 'text-emerald-400' : 'text-slate-400'}`}>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
