'use client';

import Link from 'next/link';
import { Bell, TrendingUp, Package, Star, Clock, ChevronRight, Eye, MessageSquare, DollarSign, BarChart3, AlertCircle } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const todayStats = {
  newRequests: 5,
  todaySales: 3,
  todayRevenue: 245000,
  responseRate: 96,
  avgResponseTime: '12 min',
};

const recentRequests = [
  { id: '1', part: 'Plaquettes frein avant', vehicle: 'Toyota Corolla 2018', location: 'Cotonou', time: 'Il y a 15 min', urgent: true },
  { id: '2', part: 'Filtre à huile', vehicle: 'Honda CR-V 2019', location: 'Abomey-Calavi', time: 'Il y a 32 min', urgent: false },
  { id: '3', part: 'Courroie alternateur', vehicle: 'Peugeot 308 2016', location: 'Porto-Novo', time: 'Il y a 1h', urgent: false },
  { id: '4', part: 'Ampoule phare gauche', vehicle: 'Mercedes Classe C 2015', location: 'Cotonou', time: 'Il y a 2h', urgent: false },
];

const recentSales = [
  { id: '1', part: 'Huile moteur 5W30', buyer: 'Garage Méca+', amount: 45000, time: '09:30', status: 'Livré' },
  { id: '2', part: 'Filtre air Toyota', buyer: 'Jean K.', amount: 12000, time: '08:15', status: 'En transit' },
  { id: '3', part: 'Batterie 60Ah', buyer: 'Transport GTA', amount: 85000, time: 'Hier', status: 'Livré' },
];

export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-rp-secondary to-rp-secondary-light text-white px-4 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/70 text-xs">Bonjour,</p>
              <h1 className="text-xl font-bold">Auto Pièces Cotonou</h1>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-3 h-3 fill-rp-gold text-rp-gold" />
                <span className="text-xs font-medium">4.8 • Verified Seller</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">342 transactions</span>
              </div>
            </div>
            <div className="relative">
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rp-danger text-[9px] rounded-full flex items-center justify-center font-bold">5</span>
            </div>
          </div>
          
          {/* Revenue Card */}
          <div className="bg-white/15 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-rp-gold" />
              <span className="text-xs font-medium text-white/80">Chiffre d&apos;affaires aujourd&apos;hui</span>
            </div>
            <p className="text-2xl font-bold">{todayStats.todayRevenue.toLocaleString()} FCFA</p>
            <p className="text-xs text-white/60 mt-1">{todayStats.todaySales} ventes • +12% vs hier</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-3">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-rp-primary">{todayStats.newRequests}</p>
            <p className="text-[10px] text-rp-text-muted">Nvelles demandes</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-rp-success">{todayStats.todaySales}</p>
            <p className="text-[10px] text-rp-text-muted">Ventes</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-rp-accent">{todayStats.responseRate}%</p>
            <p className="text-[10px] text-rp-text-muted">Réponses</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-rp-secondary">{todayStats.avgResponseTime}</p>
            <p className="text-[10px] text-rp-text-muted">Temps rép.</p>
          </div>
        </div>

        {/* New Requests Alert */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-rp-text">Nouvelles demandes</h2>
              <span className="w-5 h-5 bg-rp-primary text-white text-[10px] rounded-full flex items-center justify-center font-bold">5</span>
            </div>
            <Link href="/seller/requests" className="text-xs text-rp-primary font-medium flex items-center gap-1">
              Voir tout <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentRequests.map((req) => (
              <Link key={req.id} href={`/seller/requests/${req.id}`} className="block bg-white rounded-xl p-3 shadow-sm card-hover">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${req.urgent ? 'bg-rp-primary/10' : 'bg-rp-bg'}`}>
                    {req.urgent ? <AlertCircle className="w-5 h-5 text-rp-primary" /> : <Package className="w-5 h-5 text-rp-text-muted" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-rp-text">{req.part}</h3>
                      {req.urgent && <span className="text-[9px] bg-rp-primary text-white px-1.5 py-0.5 rounded-full">URGENT</span>}
                    </div>
                    <p className="text-xs text-rp-text-muted">{req.vehicle}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-rp-text-muted flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-rp-success rounded-full" /> {req.location}
                      </span>
                      <span className="text-[10px] text-rp-text-muted">{req.time}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-rp-text-muted flex-shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Sales */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-rp-text">Ventes récentes</h2>
            <Link href="/seller/orders" className="text-xs text-rp-primary font-medium flex items-center gap-1">
              Voir tout <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {recentSales.map((sale, i) => (
              <div key={sale.id} className={`p-3 flex items-center gap-3 ${i < recentSales.length - 1 ? 'border-b border-rp-border/50' : ''}`}>
                <div className="w-10 h-10 bg-rp-success/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-rp-success" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-rp-text">{sale.part}</p>
                  <p className="text-xs text-rp-text-muted">{sale.buyer} • {sale.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-rp-success">{sale.amount.toLocaleString()} FCFA</p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                    sale.status === 'Livré' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>{sale.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-20">
          <h3 className="font-bold text-sm text-rp-text mb-3">📊 Performance du mois</h3>
          <div className="space-y-3">
            {[
              { label: 'Transactions', value: '89', target: '100', percent: 89 },
              { label: 'Taux de conformité', value: '97%', target: '95%', percent: 97 },
              { label: 'Taux de réponse', value: '96%', target: '90%', percent: 96 },
              { label: 'Taux de retour', value: '2%', target: '<5%', percent: 60 },
            ].map(kpi => (
              <div key={kpi.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-rp-text-muted">{kpi.label}</span>
                  <span className="text-xs font-semibold text-rp-text">{kpi.value}</span>
                </div>
                <div className="h-1.5 bg-rp-bg rounded-full overflow-hidden">
                  <div className="h-full bg-rp-primary rounded-full" style={{ width: `${Math.min(100, kpi.percent)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav role="seller" />
    </div>
  );
}
