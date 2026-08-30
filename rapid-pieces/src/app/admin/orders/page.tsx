'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Shield, Check, AlertTriangle, DollarSign, Filter, Users, ShoppingBag, Package, BarChart3, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/lib/auth';

const allTransactions = [
  { id: 'ord1', part: 'Plaquettes frein Toyota Corolla', buyer: 'Koffi G.', seller: 'BigMoteurs', price: 62000, status: 'en_livraison', statusLabel: 'En livraison', escrow: 'held', delivery: 'RAPID_NOW', date: '15 Jan' },
  { id: 'ord2', part: 'Alternateur Mercedes Classe C', buyer: 'Transport GTA', seller: 'Sotra Pièces', price: 180000, status: 'confirmee', statusLabel: 'Confirmée', escrow: 'held', delivery: 'RAPID_NIGERIA', date: '14 Jan' },
  { id: 'ord3', part: 'Filtre huile Honda CR-V', buyer: 'Massa Garage', seller: 'Diallo & Frères', price: 25000, status: 'livree', statusLabel: 'Livrée', escrow: 'released', delivery: 'RAPID_CITY', date: '12 Jan' },
  { id: 'ord4', part: 'Kit embrayage Mercedes C220d', buyer: 'Jean K.', seller: 'Parts Express', price: 380000, status: 'expediee', statusLabel: 'Expédiée', escrow: 'held', delivery: 'RAPID_USA', date: '11 Jan' },
  { id: 'ord5', part: 'Batterie 60Ah Toyota Yaris', buyer: 'Amadou D.', seller: 'Sahel Auto', price: 85000, status: 'livree', statusLabel: 'Livrée', escrow: 'released', delivery: 'RAPID_NOW', date: '10 Jan' },
];

const statusStyles: Record<string, { bg: string; text: string; border: string }> = {
  confirmee: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  expediee: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  en_livraison: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  livree: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
};

const escrowStyles: Record<string, { bg: string; text: string; label: string }> = {
  held: { bg: 'bg-purple-500/10', text: 'text-purple-400', label: '🔒 Escrow actif' },
  released: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', label: '✅ Libéré' },
  refunded: { bg: 'bg-red-500/10', text: 'text-red-400', label: '↩️ Remboursé' },
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [filter, setFilter] = useState<'all' | 'active' | 'escrow' | 'completed'>('all');

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) router.replace('/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) return <div className="min-h-screen bg-rp-bg flex items-center justify-center"><div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  const filtered = allTransactions.filter(t => {
    if (filter === 'active') return t.status !== 'livree';
    if (filter === 'escrow') return t.escrow === 'held';
    if (filter === 'completed') return t.status === 'livree';
    return true;
  });

  const totalGMV = allTransactions.reduce((s, t) => s + t.price, 0);
  const heldEscrow = allTransactions.filter(t => t.escrow === 'held').reduce((s, t) => s + t.price, 0);

  return (
    <div className="min-h-screen bg-rp-bg">
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/admin" className="text-slate-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-sm font-bold text-white flex-1">Transactions</h1>
        </div>
        <div className="max-w-2xl mx-auto px-4 pb-3 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
              <p className="text-[10px] text-emerald-400/70">GMV Total</p>
              <p className="text-lg font-bold text-emerald-400">{(totalGMV / 1000).toFixed(0)}k FCFA</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-3">
              <p className="text-[10px] text-purple-400/70">Escrow actif</p>
              <p className="text-lg font-bold text-purple-400">{(heldEscrow / 1000).toFixed(0)}k FCFA</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { key: 'all' as const, label: 'Toutes' },
              { key: 'active' as const, label: 'En cours' },
              { key: 'escrow' as const, label: '🔒 Escrow' },
              { key: 'completed' as const, label: '✅ Terminées' },
            ].map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                  filter === f.key ? 'bg-emerald-600 text-white' : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
                }`}>{f.label}</button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3 pb-24 lg:pb-6">
        {filtered.map(tx => {
          const status = statusStyles[tx.status] || statusStyles.confirmee;
          const escrow = escrowStyles[tx.escrow] || escrowStyles.held;

          return (
            <div key={tx.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${status.bg} ${status.text} border ${status.border}`}>{tx.statusLabel}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${escrow.bg} ${escrow.text}`}>{escrow.label}</span>
                  </div>
                  <h3 className="text-xs font-semibold text-white">{tx.part}</h3>
                  <p className="text-[10px] text-slate-400">Acheteur: {tx.buyer} • Vendeur: {tx.seller}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{tx.price.toLocaleString()} <span className="text-[9px] text-slate-400">FCFA</span></p>
                  <p className="text-[9px] text-slate-500">Commission: {Math.round(tx.price * 0.07).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 bg-slate-700/30 rounded-lg p-2">
                <span>{tx.delivery.replace('_', ' ')}</span>
                <span>{tx.date}</span>
              </div>

              {tx.escrow === 'held' && (
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-[11px] font-semibold hover:bg-emerald-700 transition-colors">Libérer</button>
                  <button className="flex-1 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg text-[11px] font-medium hover:bg-red-500/20 transition-colors">Rembourser</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Nav */}
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
                <Icon className={`w-5 h-5 ${tab.href === '/admin/orders' ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className={`text-[10px] mt-0.5 ${tab.href === '/admin/orders' ? 'text-emerald-400' : 'text-slate-400'}`}>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
