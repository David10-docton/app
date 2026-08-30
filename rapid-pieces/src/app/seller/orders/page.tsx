'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Package, Truck, Check, Clock, Shield, TrendingUp, DollarSign, Filter, BarChart3, ArrowRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const sales = [
  { id: 'ord2', part: 'Plaquettes de frein avant OEM', buyer: 'Jean K.', buyerType: 'Mécanicien', price: 62000, status: 'in_transit', date: '15 Jan 2025', deliveryType: 'RAPID NOW', escrow: true },
  { id: 'ord3', part: 'Alternateur Toyota 2.4D', buyer: 'Transport GTA', buyerType: 'Flotte', price: 120000, status: 'confirmed', date: '14 Jan 2025', deliveryType: 'RAPID NIGERIA', escrow: true },
  { id: 'ord1', part: 'Filtre à huile Honda CR-V', buyer: 'Garage Méca+', buyerType: 'Garage', price: 25000, status: 'completed', date: '12 Jan 2025', deliveryType: 'RAPID NOW', escrow: false },
  { id: 'ord4', part: 'Batterie 60Ah Toyota', buyer: 'Amadou D.', buyerType: 'Particulier', price: 85000, status: 'completed', date: '10 Jan 2025', deliveryType: 'RAPID CITY', escrow: false },
  { id: 'ord5', part: 'Huile moteur 5W30 4L', buyer: 'Garage Méca+', buyerType: 'Garage', price: 15000, status: 'completed', date: '09 Jan 2025', deliveryType: 'RAPID NOW', escrow: false },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  confirmed: { label: 'Confirmée', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  shipped: { label: 'Expédiée', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  in_transit: { label: 'En transit', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  delivered: { label: 'Livrée', color: 'text-green-700', bgColor: 'bg-green-100' },
  completed: { label: 'Terminée', color: 'text-rp-success', bgColor: 'bg-rp-success/10' },
};

export default function SellerOrdersPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filtered = sales.filter(s => {
    if (filter === 'active') return s.status !== 'completed';
    if (filter === 'completed') return s.status === 'completed';
    return true;
  });

  const totalRevenue = sales.reduce((sum, s) => sum + s.price, 0);
  const activeOrders = sales.filter(s => s.status !== 'completed');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-rp-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/seller" className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-rp-text" />
            </Link>
            <h1 className="text-lg font-bold text-rp-text">Mes ventes</h1>
          </div>

          {/* Revenue Summary */}
          <div className="bg-rp-success/10 rounded-xl p-3 flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-rp-text-muted">CA Total (janvier)</p>
              <p className="text-lg font-bold text-rp-success">{totalRevenue.toLocaleString()} FCFA</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-rp-text-muted">En cours</p>
              <p className="text-lg font-bold text-red-600">{activeOrders.length} commandes</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {[
              { key: 'all' as const, label: 'Toutes' },
              { key: 'active' as const, label: 'En cours' },
              { key: 'completed' as const, label: 'Terminées' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  filter === f.key ? 'bg-red-600 text-white' : 'bg-gray-50 text-rp-text-muted'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-3 pb-20">
        {filtered.map((sale) => {
          const status = statusConfig[sale.status];
          return (
            <div key={sale.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${status.bgColor} ${status.color}`}>
                      {status.label}
                    </span>
                    {sale.escrow && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Escrow actif
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm text-rp-text">{sale.part}</h3>
                  <p className="text-xs text-rp-text-muted">{sale.buyer} • {sale.buyerType}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-rp-success">{sale.price.toLocaleString()} <span className="text-[10px]">FCFA</span></p>
                  <p className="text-[10px] text-rp-text-muted">{sale.date}</p>
                </div>
              </div>

              {/* Delivery Type Badge */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] bg-gray-50 px-2 py-1 rounded-full text-rp-text-muted">
                  {sale.deliveryType.replace('_', ' ')}
                </span>
                {sale.status === 'in_transit' && (
                  <Link href={`/seller/orders/${sale.id}`} className="text-xs text-red-600 font-medium inline-flex items-center gap-1">
                    Suivre
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
                {sale.status === 'completed' && (
                  <span className="text-xs text-rp-success font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> Paiement reçu
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Monthly Summary */}
        <div className="bg-gradient-to-r from-rp-secondary to-rp-secondary-light rounded-2xl p-4 text-gray-900 dark:text-white">
          <h3 className="font-bold mb-3 flex items-center gap-1.5"><BarChart3 className="w-4 h-4" /> Résumé mensuel</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xl font-bold">{sales.length}</p>
              <p className="text-[10px] text-gray-900 dark:text-white/70">Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{(totalRevenue / 1000).toFixed(0)}k</p>
              <p className="text-[10px] text-gray-900 dark:text-white/70">Revenue (FCFA)</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">97%</p>
              <p className="text-[10px] text-gray-900 dark:text-white/70">Conformité</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav role="seller" />
    </div>
  );
}
