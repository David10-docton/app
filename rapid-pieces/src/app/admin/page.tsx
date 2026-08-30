'use client';

import Link from 'next/link';
import { BarChart3, Users, ShoppingBag, TrendingUp, Clock, AlertTriangle, ChevronRight, DollarSign, MapPin, Globe, Shield, Package } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { dashboardKPIs } from '@/lib/mockData';

const kpiCards = [
  { label: 'GMV Mensuel', value: `${(dashboardKPIs.gmvThisMonth / 1000000).toFixed(1)}M`, unit: 'FCFA', icon: DollarSign, color: 'bg-rp-success', change: '+18%' },
  { label: 'Vendeurs actifs', value: dashboardKPIs.activeSellers.toString(), unit: `/ ${dashboardKPIs.totalSellers}`, icon: Users, color: 'bg-blue-500', change: '+5' },
  { label: 'Acheteurs actifs', value: dashboardKPIs.activeBuyers.toString(), unit: `/ ${dashboardKPIs.totalBuyers}`, icon: ShoppingBag, color: 'bg-purple-500', change: '+12' },
  { label: 'Demandes/mois', value: dashboardKPIs.requestsThisMonth.toString(), unit: 'total', icon: Package, color: 'bg-rp-primary', change: '+23' },
];

const operationalKPIs = [
  { label: 'Taux de conversion', value: `${dashboardKPIs.conversionRate}%`, icon: TrendingUp, good: true },
  { label: 'Temps moyen 1ère offre', value: dashboardKPIs.avgTimeToFirstOffer, icon: Clock, good: true },
  { label: 'Taux de disponibilité', value: `${dashboardKPIs.availabilityRate}%`, icon: Package, good: true },
  { label: 'Taux d\'annulation', value: `${dashboardKPIs.cancellationRate}%`, icon: AlertTriangle, good: true },
  { label: 'Taux de retour', value: `${dashboardKPIs.returnRate}%`, icon: AlertTriangle, good: true },
  { label: 'Panier moyen', value: `${(dashboardKPIs.avgBasket / 1000).toFixed(0)}k FCFA`, icon: DollarSign, good: true },
];

const sourcingKPIs = [
  { label: 'Commandes Nigeria', value: dashboardKPIs.nigerianOrders.toString(), icon: Globe },
  { label: 'Commandes USA', value: dashboardKPIs.usaOrders.toString(), icon: Globe },
  { label: 'Offres/demande', value: dashboardKPIs.avgOffersPerRequest.toString(), icon: BarChart3 },
];

const recentActivity = [
  { id: '1', type: 'new_seller', text: 'Nouveau vendeur: Sahel Auto (Parakou)', time: 'Il y a 30 min', icon: '🏪' },
  { id: '2', type: 'big_order', text: 'Grosse commande: 380 000 FCFA — Kit embrayage Mercedes', time: 'Il y a 1h', icon: '💰' },
  { id: '3', type: 'dispute', text: 'Litige en cours: Commande #ord5 — qualité discutée', time: 'Il y a 2h', icon: '⚠️' },
  { id: '4', type: 'nigeria', text: 'Sourcing Nigeria: 3 commandes en transit', time: 'Il y a 3h', icon: '🇳🇬' },
  { id: '5', type: 'milestone', text: 'Palier atteint: 100ème vendeur vérifié!', time: 'Hier', icon: '🎉' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-rp-secondary to-rp-secondary-light text-white px-4 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/70 text-xs">Admin Panel</p>
              <h1 className="text-xl font-bold">Dashboard Rapid Pièces</h1>
              <p className="text-xs text-white/60 mt-1">Dernière mise à jour: il y a 5 min</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-3 space-y-4 pb-20">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          {kpiCards.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 ${kpi.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] text-rp-text-muted">{kpi.label}</span>
                </div>
                <p className="text-2xl font-bold text-rp-text">{kpi.value}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-rp-text-muted">{kpi.unit}</span>
                  <span className="text-[10px] text-rp-success font-medium">{kpi.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational KPIs */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-sm text-rp-text mb-3">📈 Performance Opérationnelle</h3>
          <div className="grid grid-cols-2 gap-3">
            {operationalKPIs.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.label} className="bg-rp-bg rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${kpi.good ? 'text-rp-success' : 'text-rp-danger'}`} />
                    <span className="text-[10px] text-rp-text-muted">{kpi.label}</span>
                  </div>
                  <p className="text-lg font-bold text-rp-text mt-1">{kpi.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sourcing */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-sm text-rp-text mb-3">🌍 Sourcing International</h3>
          <div className="grid grid-cols-3 gap-2">
            {sourcingKPIs.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.label} className="text-center bg-rp-bg rounded-xl p-3">
                  <Icon className="w-4 h-4 text-rp-secondary mx-auto mb-1" />
                  <p className="text-lg font-bold text-rp-text">{kpi.value}</p>
                  <p className="text-[9px] text-rp-text-muted">{kpi.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-2">
            <h3 className="font-bold text-sm text-rp-text">🔔 Activité récente</h3>
          </div>
          {recentActivity.map((activity, i) => (
            <div key={activity.id} className={`px-4 py-3 flex items-center gap-3 ${i < recentActivity.length - 1 ? 'border-b border-rp-border/50' : ''}`}>
              <span className="text-xl">{activity.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-rp-text truncate">{activity.text}</p>
                <p className="text-[10px] text-rp-text-muted">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/admin/sellers" className="bg-white rounded-2xl p-4 shadow-sm card-hover text-center">
            <Users className="w-6 h-6 text-rp-primary mx-auto mb-2" />
            <p className="text-xs font-semibold text-rp-text">Gérer les vendeurs</p>
          </Link>
          <Link href="/admin/orders" className="bg-white rounded-2xl p-4 shadow-sm card-hover text-center">
            <ShoppingBag className="w-6 h-6 text-rp-success mx-auto mb-2" />
            <p className="text-xs font-semibold text-rp-text">Transactions</p>
          </Link>
          <Link href="/admin/requests" className="bg-white rounded-2xl p-4 shadow-sm card-hover text-center">
            <Package className="w-6 h-6 text-rp-accent mx-auto mb-2" />
            <p className="text-xs font-semibold text-rp-text">Demandes</p>
          </Link>
          <Link href="/admin/settings" className="bg-white rounded-2xl p-4 shadow-sm card-hover text-center">
            <Shield className="w-6 h-6 text-rp-secondary mx-auto mb-2" />
            <p className="text-xs font-semibold text-rp-text">Configuration</p>
          </Link>
        </div>
      </div>

      <BottomNav role="admin" />
    </div>
  );
}
