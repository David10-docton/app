'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, TrendingUp, Package, Star, ChevronRight, DollarSign, AlertCircle, Menu, X, LogOut, ShoppingCart, Store, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';

const todayStats = { newRequests: 5, todaySales: 3, todayRevenue: 245000, responseRate: 96, avgResponseTime: '12 min' };

const recentRequests = [
  { id: '1', part: 'Plaquettes frein avant Toyota Corolla 2018', buyer: 'Koffi Germain', type: 'Mécanicien', location: 'Marcory', time: 'Il y a 15 min', urgent: true, responses: 2 },
  { id: '2', part: 'Filtre à huile Honda CR-V 2019', buyer: 'Massa Garage', type: 'Garage', location: 'Marcory', time: 'Il y a 32 min', urgent: false, responses: 4 },
  { id: '3', part: 'Alternateur Mercedes Classe C 2015', buyer: 'Transport GTA', type: 'Flotte', location: 'Cotonou', time: 'Il y a 1h', urgent: false, responses: 1 },
  { id: '4', part: 'Courroie alternateur Peugeot 308 2016', buyer: 'Amadou D.', type: 'Pro', location: 'Adjamé', time: 'Il y a 2h', urgent: false, responses: 0 },
];

const recentSales = [
  { id: '1', part: 'Huile moteur 5W30 4L', buyer: 'Massa Garage', amount: 45000, time: '09:30', status: 'Livrée' },
  { id: '2', part: 'Filtre air Toyota', buyer: 'Koffi G.', amount: 12000, time: '08:15', status: 'En livraison' },
  { id: '3', part: 'Batterie 60Ah', buyer: 'Transport GTA', amount: 85000, time: 'Hier', status: 'Livrée' },
];

const navLinks = [
  { href: '/seller', label: 'Accueil' },
  { href: '/seller/requests', label: 'Demandes', badge: 5 },
  { href: '/seller/catalogue', label: 'Catalogue' },
  { href: '/seller/orders', label: 'Ventes' },
  { href: '/seller/profile', label: 'Profil' },
];

export default function SellerDashboard() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'seller')) router.replace('/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) return <div className="min-h-screen bg-rp-bg flex items-center justify-center"><div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <header className="bg-white backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/seller" className="flex items-center gap-2">
            <Image src="/logo_rapidePiece.jpeg" alt="RP" width={36} height={36} className="h-9 w-auto object-contain rounded-lg" priority />
            <div>
              <span className="text-sm font-bold text-gray-900 dark:text-white dark:text-white hidden sm:block">Espace Vendeur</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">4.8 • Verified</span>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="relative px-3 py-2 text-sm text-gray-600 dark:text-slate-300 dark:text-slate-300 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                {link.label}
                {link.badge && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">{link.badge}</span>}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">5</span>
            </div>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2 text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white">
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button onClick={logout} className="hidden sm:flex p-2 text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-red-600"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>

        {mobileMenu && (
          <div className="lg:hidden border-t border-gray-200 px-4 py-3 space-y-1 slide-up">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenu(false)}
                className="block px-4 py-2.5 text-sm text-gray-600 dark:text-slate-300 dark:text-slate-300 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                {link.label} {link.badge ? `(${link.badge})` : ''}
              </Link>
            ))}
            <button onClick={logout} className="block w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">Déconnexion</button>
          </div>
        )}
      </header>

      {/* Revenue Banner */}
      <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/10 border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-300/70">Chiffre d&apos;affaires aujourd&apos;hui</p>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{todayStats.todayRevenue.toLocaleString()} <span className="text-sm font-medium text-blue-300">FCFA</span></p>
            <p className="text-[10px] text-blue-300/60">{todayStats.todaySales} ventes • +12% vs hier</p>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-400/30" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 pb-24 lg:pb-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Nvelles demandes', value: todayStats.newRequests, color: 'text-red-600' },
            { label: 'Ventes', value: todayStats.todaySales, color: 'text-emerald-400' },
            { label: 'Réponses', value: `${todayStats.responseRate}%`, color: 'text-amber-400' },
            { label: 'Temps rép.', value: todayStats.avgResponseTime, color: 'text-blue-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-3 text-center">
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* New Requests + Recent Sales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* New Requests */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-gray-900 dark:text-white">Nouvelles demandes</h2>
                <span className="w-5 h-5 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">5</span>
              </div>
              <Link href="/seller/requests" className="text-xs text-red-600 font-medium flex items-center gap-1 hover:underline">Voir tout <ChevronRight className="w-3 h-3" /></Link>
            </div>
            <div className="space-y-2">
              {recentRequests.map(req => (
                <Link key={req.id} href={`/seller/requests/${req.id}`}
                  className="block bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-3 hover:border-gray-300 dark:hover:border-slate-500 transition-colors card-hover">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${req.urgent ? 'bg-red-500/10' : 'bg-gray-100'}`}>
                      {req.urgent ? <AlertCircle className="w-4 h-4 text-red-600" /> : <Package className="w-4 h-4 text-gray-400 dark:text-slate-500 dark:text-slate-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-semibold text-gray-900 dark:text-white truncate">{req.part}</h3>
                        {req.urgent && <span className="text-[8px] bg-red-600 text-white px-1.5 py-0.5 rounded-full flex-shrink-0">URGENT</span>}
                      </div>
                      <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{req.buyer} • {req.type}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] text-gray-400 dark:text-slate-500 dark:text-slate-500 flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" /> {req.location}</span>
                        <span className="text-[9px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{req.time}</span>
                        <span className="text-[9px] text-red-600 font-medium">{req.responses} offres</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 dark:text-slate-500 dark:text-slate-500 flex-shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Sales */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Ventes récentes</h2>
              <Link href="/seller/orders" className="text-xs text-red-600 font-medium flex items-center gap-1 hover:underline">Voir tout <ChevronRight className="w-3 h-3" /></Link>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
              {recentSales.map((sale, i) => (
                <div key={sale.id} className={`p-3 flex items-center gap-3 ${i < recentSales.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="w-9 h-9 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{sale.part}</p>
                    <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{sale.buyer} • {sale.time}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-emerald-400">{sale.amount.toLocaleString()} FCFA</p>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                      sale.status === 'Livrée' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    }`}>{sale.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Performance */}
        <section className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white dark:text-white mb-4">📊 Performance du mois</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Transactions', value: '89', target: '100', pct: 89 },
              { label: 'Conformité', value: '97%', target: '95%', pct: 97 },
              { label: 'Réponses', value: '96%', target: '90%', pct: 96 },
              { label: 'Retours', value: '2%', target: '<5%', pct: 40 },
            ].map(kpi => (
              <div key={kpi.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500">{kpi.label}</span>
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">{kpi.value}</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 rounded-full transition-all" style={{ width: `${Math.min(100, kpi.pct)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white backdrop-blur-xl border-t border-gray-200 z-50">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {[
            { href: '/seller', label: 'Accueil', icon: Store },
            { href: '/seller/requests', label: 'Demandes', icon: Bell, badge: 5 },
            { href: '/seller/catalogue', label: 'Catalogue', icon: Package, center: true },
            { href: '/seller/orders', label: 'Ventes', icon: DollarSign },
            { href: '/seller/profile', label: 'Profil', icon: Star },
          ].map(tab => {
            const Icon = tab.icon;
            if (tab.center) return (
              <Link key={tab.href} href={tab.href} className="flex flex-col items-center -mt-4">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <Icon className="w-6 h-6 text-gray-900 dark:text-white" />
                </div>
                <span className="text-[10px] mt-1 text-blue-400 font-medium">{tab.label}</span>
              </Link>
            );
            return (
              <Link key={tab.href} href={tab.href} className="flex flex-col items-center relative">
                <Icon className="w-5 h-5 text-gray-400 dark:text-slate-500 dark:text-slate-500" />
                {tab.badge && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">{tab.badge}</span>}
                <span className="text-[10px] mt-0.5 text-gray-400 dark:text-slate-500 dark:text-slate-500">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
