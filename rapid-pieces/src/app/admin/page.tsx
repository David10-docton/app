'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Users, ShoppingBag, DollarSign, Globe, Shield, Package, Bell, Menu, X, LogOut, TrendingUp, Clock, AlertTriangle, BarChart3, ChevronRight, Eye, Truck, Star } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { dashboardKPIs } from '@/lib/mockData';

const kpiCards = [
  { label: 'GMV Mensuel', value: `${(dashboardKPIs.gmvThisMonth / 1000000).toFixed(1)}M`, unit: 'FCFA', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10', change: '+18%' },
  { label: 'Vendeurs actifs', value: dashboardKPIs.activeSellers.toString(), unit: `/ ${dashboardKPIs.totalSellers}`, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10', change: '+5' },
  { label: 'Acheteurs actifs', value: dashboardKPIs.activeBuyers.toString(), unit: `/ ${dashboardKPIs.totalBuyers}`, icon: ShoppingBag, color: 'text-purple-400', bg: 'bg-purple-500/10', change: '+12' },
  { label: 'Demandes/mois', value: dashboardKPIs.requestsThisMonth.toString(), unit: 'total', icon: Package, color: 'text-red-600', bg: 'bg-red-500/10', change: '+23' },
];

const operationalKPIs = [
  { label: 'Taux de conversion', value: `${dashboardKPIs.conversionRate}%` },
  { label: 'Temps 1ère offre', value: dashboardKPIs.avgTimeToFirstOffer },
  { label: 'Disponibilité', value: `${dashboardKPIs.availabilityRate}%` },
  { label: 'Annulations', value: `${dashboardKPIs.cancellationRate}%` },
  { label: 'Retours', value: `${dashboardKPIs.returnRate}%` },
  { label: 'Panier moyen', value: `${(dashboardKPIs.avgBasket / 1000).toFixed(0)}k` },
];

const sourcingKPIs = [
  { label: 'Nigeria', value: dashboardKPIs.nigerianOrders.toString(), flag: '🇳🇬' },
  { label: 'USA', value: dashboardKPIs.usaOrders.toString(), flag: '🇺🇸' },
  { label: 'Offres/demande', value: dashboardKPIs.avgOffersPerRequest.toString(), flag: '📊' },
];

const recentActivity = [
  { id: '1', text: 'Nouveau vendeur: Sahel Auto (Parakou)', time: 'Il y a 30 min', icon: '🏪' },
  { id: '2', text: 'Grosse commande: 380 000 FCFA — Kit embrayage Mercedes', time: 'Il y a 1h', icon: '💰' },
  { id: '3', text: 'Litige en cours: Commande #ord5 — qualité', time: 'Il y a 2h', icon: '⚠️' },
  { id: '4', text: 'Sourcing Nigeria: 3 commandes en transit', time: 'Il y a 3h', icon: '🇳🇬' },
  { id: '5', text: 'Palier: 100ème vendeur vérifié!', time: 'Hier', icon: '🎉' },
];

const navLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/sellers', label: 'Vendeurs' },
  { href: '/admin/orders', label: 'Transactions' },
  { href: '/admin/requests', label: 'Demandes' },
  { href: '/admin/settings', label: 'Config' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) router.replace('/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) return <div className="min-h-screen bg-rp-bg flex items-center justify-center"><div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <header className="bg-white backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/logo_rapidePiece.jpeg" alt="RP" width={36} height={36} className="h-9 w-auto object-contain rounded-lg" priority />
            <div>
              <span className="text-sm font-bold text-gray-900 dark:text-white dark:text-white hidden sm:block">Admin Panel</span>
              <span className="text-[10px] text-emerald-400 hidden sm:block">Rapide Pièces</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${link.href === '/admin' ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-600 dark:text-slate-300 dark:text-slate-300 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
            </div>
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-gray-900 dark:text-white text-xs font-bold hidden sm:flex">AD</div>
            <button onClick={logout} className="p-2 text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-red-600"><LogOut className="w-4 h-4" /></button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2 text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white">
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="lg:hidden border-t border-gray-200 px-4 py-3 space-y-1 slide-up">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenu(false)}
                className={`block px-4 py-2.5 text-sm rounded-lg ${link.href === '/admin' ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-600 dark:text-slate-300 dark:text-slate-300 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6 pb-24 lg:pb-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpiCards.map(kpi => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 ${kpi.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{kpi.label}</span>
                </div>
                <p className="text-xl font-extrabold text-gray-900 dark:text-white">{kpi.value}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{kpi.unit}</span>
                  <span className="text-[10px] text-emerald-400 font-medium">{kpi.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational + Sourcing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <section className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white dark:text-white mb-4">📈 Performance</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {operationalKPIs.map(kpi => (
                <div key={kpi.label} className="bg-gray-100 rounded-xl p-3">
                  <span className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500 block">{kpi.label}</span>
                  <p className="text-base font-bold text-gray-900 dark:text-white mt-0.5">{kpi.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white dark:text-white mb-4">🌍 Sourcing International</h3>
            <div className="grid grid-cols-3 gap-3">
              {sourcingKPIs.map(kpi => (
                <div key={kpi.label} className="text-center bg-gray-100 rounded-xl p-3">
                  <span className="text-xl">{kpi.flag}</span>
                  <p className="text-lg font-bold text-gray-900 dark:text-white dark:text-white mt-1">{kpi.value}</p>
                  <p className="text-[9px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{kpi.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Activity + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <section className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-4 pt-4 pb-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">🔔 Activité récente</h3>
            </div>
            {recentActivity.map((a, i) => (
              <div key={a.id} className={`px-4 py-3 flex items-center gap-3 ${i < recentActivity.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <span className="text-lg flex-shrink-0">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-900 dark:text-white truncate">{a.text}</p>
                  <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{a.time}</p>
                </div>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-2 gap-3">
            {[
              { href: '/admin/sellers', icon: Users, label: 'Vendeurs', count: '127', color: 'text-red-600' },
              { href: '/admin/orders', icon: ShoppingBag, label: 'Transactions', count: '500+', color: 'text-emerald-400' },
              { href: '/admin/requests', icon: Package, label: 'Demandes', count: '234/mois', color: 'text-blue-400' },
              { href: '/admin/settings', icon: Shield, label: 'Configuration', count: 'Plateforme', color: 'text-purple-400' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}
                  className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-gray-300 dark:hover:border-slate-500 transition-colors card-hover">
                  <Icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500 mt-0.5">{item.count}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white backdrop-blur-xl border-t border-gray-200 z-50">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {[
            { href: '/admin', label: 'Dashboard', icon: BarChart3 },
            { href: '/admin/sellers', label: 'Vendeurs', icon: Users },
            { href: '/admin/orders', label: 'Transactions', icon: ShoppingBag },
            { href: '/admin/requests', label: 'Demandes', icon: Package },
            { href: '/admin/settings', label: 'Config', icon: Shield },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <Link key={tab.href} href={tab.href} className="flex flex-col items-center">
                <Icon className={`w-5 h-5 ${tab.href === '/admin' ? 'text-emerald-400' : 'text-gray-400 dark:text-slate-500 dark:text-slate-500'}`} />
                <span className={`text-[10px] mt-0.5 ${tab.href === '/admin' ? 'text-emerald-400' : 'text-gray-400 dark:text-slate-500 dark:text-slate-500'}`}>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
