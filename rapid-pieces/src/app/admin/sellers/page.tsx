'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, Shield, Search, Filter, Check, X, Eye, Ban, Award, MapPin } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { mockSellers } from '@/lib/mockData';

export default function AdminSellersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'pending' | 'flagged'>('all');

  const filtered = mockSellers.filter(s => {
    const matchesSearch = !search || s.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || 
      (filter === 'verified' && s.isVerified) ||
      (filter === 'pending' && !s.isVerified) ||
      (filter === 'flagged' && s.returnRate > 4);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-rp-bg">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-rp-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/admin" className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-rp-text" />
            </Link>
            <h1 className="text-lg font-bold text-rp-text">Gestion des vendeurs</h1>
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rp-text-muted" />
            <input
              type="text"
              placeholder="Rechercher un vendeur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-rp-bg rounded-xl text-sm border-0 outline-none focus:ring-2 focus:ring-rp-primary"
            />
          </div>
          <div className="flex gap-2">
            {[
              { key: 'all' as const, label: 'Tous' },
              { key: 'verified' as const, label: '✅ Vérifiés' },
              { key: 'pending' as const, label: '⏳ En attente' },
              { key: 'flagged' as const, label: '🚩 Signalés' },
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
        {filtered.map((seller) => (
          <div key={seller.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-rp-secondary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                {seller.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-rp-text truncate">{seller.name}</h3>
                  {seller.isVerified && <Shield className="w-3.5 h-3.5 text-rp-primary flex-shrink-0" />}
                </div>
                <p className="text-xs text-rp-text-muted flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {seller.location}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 fill-rp-gold text-rp-gold" /> {seller.rating}
                  </span>
                  <span className="text-[10px] text-rp-text-muted">{seller.totalTransactions} transactions</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                    seller.badge === 'Top Seller' ? 'bg-rp-gold/20 text-yellow-700' :
                    seller.badge === 'Premium Seller' ? 'bg-purple-100 text-purple-700' :
                    seller.badge === 'Verified Seller' ? 'bg-blue-100 text-blue-700' :
                    'bg-rp-bg text-rp-text-muted'
                  }`}>{seller.badge}</span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="text-center bg-rp-bg rounded-lg py-1.5">
                <p className="text-xs font-bold text-rp-success">{seller.fulfillmentRate}%</p>
                <p className="text-[9px] text-rp-text-muted">Conformité</p>
              </div>
              <div className="text-center bg-rp-bg rounded-lg py-1.5">
                <p className="text-xs font-bold text-rp-text">{seller.responseRate}%</p>
                <p className="text-[9px] text-rp-text-muted">Réponse</p>
              </div>
              <div className="text-center bg-rp-bg rounded-lg py-1.5">
                <p className={`text-xs font-bold ${seller.returnRate > 4 ? 'text-rp-danger' : 'text-rp-success'}`}>{seller.returnRate}%</p>
                <p className="text-[9px] text-rp-text-muted">Retours</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 bg-rp-bg text-rp-text rounded-xl text-xs font-medium flex items-center justify-center gap-1">
                <Eye className="w-3 h-3" /> Détails
              </button>
              {!seller.isVerified && (
                <button className="flex-1 py-2 bg-rp-success text-white rounded-xl text-xs font-medium flex items-center justify-center gap-1">
                  <Check className="w-3 h-3" /> Vérifier
                </button>
              )}
              <button className="w-8 py-2 bg-red-50 text-rp-danger rounded-xl flex items-center justify-center">
                <Ban className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav role="admin" />
    </div>
  );
}
