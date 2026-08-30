'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Package, Clock, Star, Users, ShoppingCart, BarChart3, Trophy, ClipboardList } from 'lucide-react';

const stats = {
  revenue: { current: 4250000, previous: 3800000, currency: 'FCFA' },
  orders: { current: 47, previous: 42 },
  avgOrder: { current: 90425, previous: 90476 },
  responseTime: { current: '12 min', previous: '18 min' },
  conversionRate: { current: 34, previous: 28 },
  cancelRate: { current: 2, previous: 4 },
};

const monthlyRevenue = [
  { month: 'Jan', revenue: 2800000 },
  { month: 'Fév', revenue: 3100000 },
  { month: 'Mar', revenue: 2900000 },
  { month: 'Avr', revenue: 3500000 },
  { month: 'Mai', revenue: 3800000 },
  { month: 'Juin', revenue: 4250000 },
];

const topProducts = [
  { name: 'Plaquettes de frein avant', sold: 23, revenue: 1035000, views: 456, demandes: 89 },
  { name: 'Filtre à huile Toyota', sold: 31, revenue: 387500, views: 312, demandes: 67 },
  { name: 'Amortisseur arrière Honda', sold: 12, revenue: 1020000, views: 189, demandes: 45 },
  { name: 'Alternateur Corolla', sold: 8, revenue: 680000, views: 234, demandes: 34 },
  { name: 'Batterie 60Ah', sold: 15, revenue: 975000, views: 567, demandes: 78 },
];

const recentOrders = [
  { id: 'RP-847', part: 'Plaquettes frein', amount: 45000, status: 'delivered', date: '2025-06-12' },
  { id: 'RP-852', part: 'Filtre à huile', amount: 12500, status: 'in-transit', date: '2025-06-12' },
  { id: 'RP-838', part: 'Amortisseur', amount: 85000, status: 'processing', date: '2025-06-11' },
  { id: 'RP-831', part: 'Alternateur', amount: 92000, status: 'delivered', date: '2025-06-10' },
];

const statusColors: Record<string, string> = {
  delivered: 'bg-emerald-500/20 text-emerald-400',
  'in-transit': 'bg-blue-500/20 text-blue-400',
  processing: 'bg-amber-500/20 text-amber-400',
};

export default function SellerStatsPage() {
  const [period, setPeriod] = useState('month');

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));

  return (
    <div className="min-h-screen bg-rp-bg pb-24 lg:pb-8">
      {/* Header */}
      <header className="bg-white backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link href="/seller" className="text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">Statistiques</h1>
            <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">Performance de votre boutique</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 space-y-6">
        {/* Period selector */}
        <div className="flex gap-2">
          {['week', 'month', 'quarter', 'year'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                period === p ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 dark:text-slate-500 dark:text-slate-500'
              }`}
            >
              {p === 'week' ? 'Semaine' : p === 'month' ? 'Mois' : p === 'quarter' ? 'Trimestre' : 'Année'}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: 'Chiffre d\'affaires', value: `${(stats.revenue.current / 1000000).toFixed(1)}M`, change: '+12%', up: true, color: 'text-emerald-400', icon: TrendingUp },
            { label: 'Commandes', value: stats.orders.current.toString(), change: '+12%', up: true, color: 'text-blue-400', icon: ShoppingCart },
            { label: 'Panier moyen', value: `${(stats.avgOrder.current / 1000).toFixed(0)}k`, change: '0%', up: true, color: 'text-purple-400', icon: BarChart3 },
            { label: 'Temps de réponse', value: stats.responseTime.current, change: '-33%', up: true, color: 'text-amber-400', icon: Clock },
            { label: 'Taux conversion', value: `${stats.conversionRate.current}%`, change: '+6%', up: true, color: 'text-emerald-400', icon: Users },
            { label: 'Taux annulation', value: `${stats.cancelRate.current}%`, change: '-50%', up: true, color: 'text-emerald-400', icon: Package },
          ].map((kpi, i) => (
            <div key={i} className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <div className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1">{kpi.label}</div>
              <div className="text-xl font-black text-gray-900 dark:text-white">{kpi.value}</div>
              <div className={`text-[10px] font-medium ${kpi.color} flex items-center gap-1 mt-1`}>
                {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.change} vs mois dernier
              </div>
            </div>
          ))}
        </div>

        {/* Revenue chart */}
        <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white dark:text-white mb-4 flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> Revenus mensuels</h3>
          <div className="flex items-end gap-2 h-40">
            {monthlyRevenue.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{(m.revenue / 1000000).toFixed(1)}M</span>
                <div className="w-full bg-blue-500 rounded-t transition-all" style={{ height: `${(m.revenue / maxRevenue) * 120}px` }} />
                <span className="text-[9px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white dark:text-white mb-4 flex items-center gap-1.5"><Trophy className="w-4 h-4" /> Produits les plus demandés</h3>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-200 last:border-0">
                <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-red-600">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-gray-900 dark:text-white dark:text-white truncate">{p.name}</div>
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">
                    <span>{p.sold} vendus</span>
                    <span>{p.demandes} demandes</span>
                    <span>{p.views} vues</span>
                  </div>
                </div>
                <div className="text-xs font-bold text-gray-900 dark:text-white dark:text-white">{p.revenue.toLocaleString()} FCFA</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white dark:text-white mb-4 flex items-center gap-1.5"><ClipboardList className="w-4 h-4" /> Commandes récentes</h3>
          <div className="space-y-2">
            {recentOrders.map((o, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                <div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white dark:text-white">{o.part}</div>
                  <div className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{o.id} • {o.date}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusColors[o.status]}`}>
                    {o.status === 'delivered' ? 'Livrée' : o.status === 'in-transit' ? 'En livraison' : 'En cours'}
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white dark:text-white">{o.amount.toLocaleString()} FCFA</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
