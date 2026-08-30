'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Shield, Clock, Check, AlertTriangle, DollarSign, Filter } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { mockOrders } from '@/lib/mockData';

const allTransactions = [
  ...mockOrders,
  { id: 'ord4', requestId: 'r3', offerId: 'o9', buyerId: 'b3', sellerId: 's4', sellerName: 'Parts Express USA', partName: 'Kit d\'embrayage complet', vehicle: { brand: 'Mercedes-Benz', model: 'Classe C', year: 2015, engine: '220d' }, price: 380000, deliveryType: 'RAPID_USA' as const, status: 'shipped' as const, createdAt: '2025-01-11T08:00:00', estimatedDelivery: '2025-01-20T08:00:00', escrowStatus: 'held' as const },
  { id: 'ord5', requestId: 'r1', offerId: 'o2', buyerId: 'b1', sellerId: 's3', sellerName: 'Garage Mécanique Générale', partName: 'Plaquettes frein premium', vehicle: { brand: 'Toyota', model: 'Corolla', year: 2018, engine: '1.8 essence' }, price: 45000, deliveryType: 'RAPID_NOW' as const, status: 'completed' as const, createdAt: '2025-01-10T14:00:00', estimatedDelivery: '2025-01-10T16:00:00', escrowStatus: 'released' as const },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  in_transit: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
  completed: 'bg-rp-success/10 text-rp-success',
};

const escrowColors: Record<string, string> = {
  held: 'bg-purple-100 text-purple-700',
  released: 'bg-green-100 text-green-700',
  refunded: 'bg-red-100 text-red-700',
};

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'escrow' | 'completed'>('all');

  const filtered = allTransactions.filter(t => {
    if (filter === 'active') return !['completed', 'cancelled'].includes(t.status);
    if (filter === 'escrow') return t.escrowStatus === 'held';
    if (filter === 'completed') return t.status === 'completed';
    return true;
  });

  const totalGMV = allTransactions.reduce((sum, t) => sum + t.price, 0);
  const heldEscrow = allTransactions.filter(t => t.escrowStatus === 'held').reduce((sum, t) => sum + t.price, 0);

  return (
    <div className="min-h-screen bg-rp-bg">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-rp-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/admin" className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-rp-text" />
            </Link>
            <h1 className="text-lg font-bold text-rp-text">Transactions</h1>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-rp-success/10 rounded-xl p-3">
              <p className="text-xs text-rp-text-muted">GMV Total</p>
              <p className="text-lg font-bold text-rp-success">{(totalGMV / 1000).toFixed(0)}k FCFA</p>
            </div>
            <div className="bg-purple-100 rounded-xl p-3">
              <p className="text-xs text-rp-text-muted">Escrow actif</p>
              <p className="text-lg font-bold text-purple-700">{(heldEscrow / 1000).toFixed(0)}k FCFA</p>
            </div>
          </div>

          <div className="flex gap-2">
            {[
              { key: 'all' as const, label: 'Toutes' },
              { key: 'active' as const, label: 'En cours' },
              { key: 'escrow' as const, label: '🔒 Escrow' },
              { key: 'completed' as const, label: '✅ Terminées' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  filter === f.key ? 'bg-rp-primary text-white' : 'bg-rp-bg text-rp-text-muted'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-3 pb-20">
        {filtered.map((tx) => (
          <div key={tx.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[tx.status] || 'bg-gray-100 text-gray-700'}`}>
                    {tx.status}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${escrowColors[tx.escrowStatus]}`}>
                    <Shield className="w-3 h-3" /> {tx.escrowStatus}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-rp-text">{tx.partName}</h3>
                <p className="text-xs text-rp-text-muted">{tx.vehicle.brand} {tx.vehicle.model} {tx.vehicle.year}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-rp-text">{tx.price.toLocaleString()} <span className="text-[10px]">FCFA</span></p>
                <p className="text-[10px] text-rp-text-muted">Commission: {Math.round(tx.price * 0.07).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-rp-text-muted bg-rp-bg rounded-lg p-2">
              <span>Acheteur → {tx.buyerId}</span>
              <span>Vendeur: {tx.sellerName}</span>
              <span>{tx.deliveryType.replace('_', ' ')}</span>
            </div>

            {tx.escrowStatus === 'held' && (
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2 bg-rp-success text-white rounded-xl text-xs font-medium">Libérer le paiement</button>
                <button className="flex-1 py-2 bg-red-50 text-rp-danger rounded-xl text-xs font-medium">Rembourser</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <BottomNav role="admin" />
    </div>
  );
}
