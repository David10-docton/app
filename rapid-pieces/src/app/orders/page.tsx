'use client';

import { useState } from 'react';
import Link from 'next/link';

const orders = [
  {
    id: 'RP-2025-00847',
    part: 'Plaquettes de frein avant',
    quality: 'OEM',
    seller: 'BigMoteurs',
    price: 48000,
    status: 'delivered',
    statusText: 'Livrée',
    date: '2025-06-10',
    delivery: 'RAPID NOW',
    driver: 'Kofi A.',
    driverPhone: '+229 97 12 34 56',
    signed: true,
    rapidPoints: 480,
    vehicle: 'Toyota Corolla 2018',
  },
  {
    id: 'RP-2025-00852',
    part: 'Filtre à huile',
    quality: 'Genuine',
    seller: 'Sotra Pièces',
    price: 15000,
    status: 'in-transit',
    statusText: 'En livraison',
    date: '2025-06-12',
    delivery: 'RAPID CITY',
    driver: 'Moussa D.',
    driverPhone: '+229 96 78 90 12',
    signed: false,
    rapidPoints: 150,
    vehicle: 'Honda Civic 2020',
  },
  {
    id: 'RP-2025-00838',
    part: 'Amortisseur arrière gauche',
    quality: 'Premium',
    seller: 'Diallo & Frères',
    price: 88000,
    status: 'processing',
    statusText: 'En traitement',
    date: '2025-06-11',
    delivery: 'RAPID CITY',
    driver: null,
    driverPhone: null,
    signed: false,
    rapidPoints: 880,
    vehicle: 'Toyota Corolla 2018',
  },
];

const statusColors: Record<string, string> = {
  delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
  'in-transit': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  processing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

const progressSteps = ['Commandée', 'Préparée', 'En livraison', 'Livrée'];

export default function OrdersPage() {
  const [filter, setFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    if (filter === 'active') return o.status !== 'delivered';
    if (filter === 'delivered') return o.status === 'delivered';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black text-red-500">RAPID</span>
            <span className="text-xl font-black text-white">PIÈCES</span>
          </Link>
          <h1 className="text-sm font-bold text-slate-400 ml-auto">Mes commandes</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50 text-center">
            <div className="text-lg font-bold text-white">1</div>
            <div className="text-[10px] text-slate-400">En cours</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50 text-center">
            <div className="text-lg font-bold text-green-400">1</div>
            <div className="text-[10px] text-slate-400">Livrée</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-3 border border-yellow-500/20 text-center">
            <div className="text-lg font-bold text-yellow-400">1,510</div>
            <div className="text-[10px] text-slate-400">Points</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'Toutes' },
            { value: 'active', label: 'En cours' },
            { value: 'delivered', label: 'Livrées' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === f.value ? 'bg-red-600 text-white' : 'bg-slate-800/50 text-slate-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Orders list */}
        <div className="space-y-3">
          {filtered.map((order) => (
            <div key={order.id} className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
              {/* Order header */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${statusColors[order.status]}`}>
                      {order.status === 'in-transit' && '🔴 '}
                      {order.statusText}
                    </span>
                    {order.status === 'in-transit' && (
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-bold animate-pulse">🔴 Live</span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{order.id}</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                    {order.quality === 'OEM' ? '🛑' : order.quality === 'Genuine' ? '🌀' : '🔧'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{order.part}</h4>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {order.quality} • {order.seller} • {order.vehicle}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-black text-white">{order.price.toLocaleString()} <span className="text-xs font-normal text-slate-400">FCFA</span></span>
                      <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-1 rounded-full font-bold">{order.delivery}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress tracker */}
              <div className="px-4 pb-3">
                <div className="flex items-center gap-1">
                  {progressSteps.map((step, i) => {
                    const stepIndex = order.status === 'processing' ? 1 : order.status === 'in-transit' ? 2 : 3;
                    const isActive = i <= stepIndex;
                    return (
                      <div key={step} className="flex-1">
                        <div className={`h-1 rounded-full ${isActive ? 'bg-red-500' : 'bg-slate-800'}`} />
                        <div className={`text-[8px] mt-1 text-center ${isActive ? 'text-red-400' : 'text-slate-600'}`}>{step}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Expanded details */}
              {expandedOrder === order.id && (
                <div className="border-t border-slate-700/50 p-4 space-y-3">
                  {order.driver && (
                    <div className="bg-slate-800/50 rounded-xl p-3">
                      <div className="text-xs text-slate-400 mb-1">Livreur</div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-white">{order.driver}</div>
                          <div className="text-xs text-slate-400">{order.driverPhone}</div>
                        </div>
                        <a href={`tel:${order.driverPhone}`} className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all">
                          📞 Appeler
                        </a>
                      </div>
                    </div>
                  )}
                  {order.signed && (
                    <div className="bg-green-900/20 rounded-xl p-3 border border-green-500/20">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">✍️</span>
                        <div>
                          <div className="text-xs font-bold text-green-400">Livrée & signée</div>
                          <div className="text-[10px] text-green-300/70">Preuve de livraison confirmée</div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Link href="/protection" className="flex-1 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 text-xs font-bold py-2.5 rounded-lg text-center transition-all">
                      🛡️ Protection
                    </Link>
                    <button className="flex-1 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 text-xs font-bold py-2.5 rounded-lg transition-all">
                      ⭐ Évaluer
                    </button>
                  </div>
                </div>
              )}

              {/* Toggle */}
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="w-full py-2 border-t border-slate-700/50 text-xs text-slate-400 hover:text-white transition-all"
              >
                {expandedOrder === order.id ? '▲ Masquer' : '▼ Détails'}
              </button>
            </div>
          ))}
        </div>

        {/* Rapid Points */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎁</span>
            <span className="text-sm font-bold text-white">Rapid Points</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-black text-yellow-400">1,510</span>
            <span className="text-xs text-slate-400">Prochain palier : Silver à 4,500 pts</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '33%' }} />
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50">
        <div className="flex items-center justify-around h-16">
          <Link href="/" className="flex flex-col items-center gap-1 text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[10px]">Accueil</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center gap-1 text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="text-[10px]">Rechercher</span>
          </Link>
          <Link href="/requests/new" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center -mt-4 shadow-lg shadow-red-600/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </Link>
          <Link href="/orders" className="flex flex-col items-center gap-1 text-red-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            <span className="text-[10px] font-bold">Commandes</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-[10px]">Profil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
