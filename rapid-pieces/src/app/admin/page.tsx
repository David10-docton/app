'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Users, ShoppingBag, DollarSign, Globe, Shield, Package, Bell, Menu, X, LogOut } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/lib/auth';
import { dashboardKPIs } from '@/lib/mockData';

const kpiCards = [
  { label: 'GMV Mensuel', value: `${(dashboardKPIs.gmvThisMonth / 1000000).toFixed(1)}M`, unit: 'FCFA', icon: DollarSign, color: 'bg-rp-success', change: '+18%' },
  { label: 'Vendeurs actifs', value: dashboardKPIs.activeSellers.toString(), unit: `/ ${dashboardKPIs.totalSellers}`, icon: Users, color: 'bg-blue-500', change: '+5' },
  { label: 'Acheteurs actifs', value: dashboardKPIs.activeBuyers.toString(), unit: `/ ${dashboardKPIs.totalBuyers}`, icon: ShoppingBag, color: 'bg-purple-500', change: '+12' },
  { label: 'Demandes/mois', value: dashboardKPIs.requestsThisMonth.toString(), unit: 'total', icon: Package, color: 'bg-rp-primary', change: '+23' },
];

const operationalKPIs = [
  { label: 'Taux de conversion', value: `${dashboardKPIs.conversionRate}%`, good: true },
  { label: 'Temps moyen 1ère offre', value: dashboardKPIs.avgTimeToFirstOffer, good: true },
  { label: 'Taux de disponibilité', value: `${dashboardKPIs.availabilityRate}%`, good: true },
  { label: 'Taux d\'annulation', value: `${dashboardKPIs.cancellationRate}%`, good: true },
  { label: 'Taux de retour', value: `${dashboardKPIs.returnRate}%`, good: true },
  { label: 'Panier moyen', value: `${(dashboardKPIs.avgBasket / 1000).toFixed(0)}k FCFA`, good: true },
];

const sourcingKPIs = [
  { label: 'Nigeria', value: dashboardKPIs.nigerianOrders.toString(), flag: '🇳🇬' },
  { label: 'USA', value: dashboardKPIs.usaOrders.toString(), flag: '🇺🇸' },
  { label: 'Offres/demande', value: dashboardKPIs.avgOffersPerRequest.toString(), flag: '📊' },
];

const recentActivity = [
  { id: '1', text: 'Nouveau vendeur: Sahel Auto (Parakou)', time: 'Il y a 30 min', icon: '🏪' },
  { id: '2', text: 'Grosse commande: 380 000 FCFA — Kit embrayage Mercedes', time: 'Il y a 1h', icon: '💰' },
  { id: '3', text: 'Litige en cours: Commande #ord5 — qualité discutée', time: 'Il y a 2h', icon: '⚠️' },
  { id: '4', text: 'Sourcing Nigeria: 3 commandes en transit', time: 'Il y a 3h', icon: '🇳🇬' },
  { id: '5', text: 'Palier atteint: 100ème vendeur vérifié!', time: 'Hier', icon: '🎉' },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-rp-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Desktop Header */}
      <header className="hidden lg:block bg-white border-b border-rp-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/logo_rapidePiece.jpeg" alt="Rapid Pièces" width={48} height={48} className="h-12 w-auto object-contain rounded-lg" priority />
            <div>
              <span className="text-lg font-bold text-rp-text">Rapid Pièces</span>
              <span className="text-xs text-rp-text-muted block">Admin Panel</span>
            </div>
          </Link>
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-2 text-sm font-medium text-rp-text-muted hover:text-rp-primary hover:bg-rp-primary/5 rounded-lg transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-rp-text-muted" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rp-danger text-[9px] text-white rounded-full flex items-center justify-center font-bold">3</span>
            </div>
            <div className="w-8 h-8 bg-rp-secondary rounded-full flex items-center justify-center text-white text-xs font-bold">AD</div>
            <button onClick={logout} className="p-2 text-rp-text-muted hover:text-rp-danger rounded-lg" title="Déconnexion">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <div className="lg:hidden bg-gradient-to-r from-rp-secondary to-rp-secondary-light text-white px-4 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/admin" className="flex items-center gap-3">
              <Image src="/logo_rapidePiece.jpeg" alt="Rapid Pièces" width={44} height={44} className="h-11 w-auto object-contain rounded-lg bg-white" priority />
              <div>
                <h1 className="text-lg font-bold">Dashboard Admin</h1>
                <p className="text-xs text-white/60">Rapid Pièces</p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bell className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rp-danger text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
              </div>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="bg-white/10 rounded-2xl p-4 mb-4 slide-up">
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-xl">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 -mt-3 lg:mt-6 space-y-4 lg:space-y-6 pb-20 lg:pb-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpiCards.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 ${kpi.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-rp-text-muted">{kpi.label}</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-rp-text">{kpi.value}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-rp-text-muted">{kpi.unit}</span>
                  <span className="text-[10px] text-rp-success font-medium">{kpi.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational + Sourcing side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Operational KPIs */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
            <h3 className="font-bold text-sm sm:text-base text-rp-text mb-3">📈 Performance Opérationnelle</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {operationalKPIs.map((kpi) => (
                <div key={kpi.label} className="bg-rp-bg rounded-xl p-3">
                  <span className="text-[10px] sm:text-xs text-rp-text-muted block">{kpi.label}</span>
                  <p className="text-base sm:text-lg font-bold text-rp-text mt-1">{kpi.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sourcing */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
            <h3 className="font-bold text-sm sm:text-base text-rp-text mb-3">🌍 Sourcing International</h3>
            <div className="grid grid-cols-3 gap-3">
              {sourcingKPIs.map((kpi) => (
                <div key={kpi.label} className="text-center bg-rp-bg rounded-xl p-3 sm:p-4">
                  <span className="text-xl sm:text-2xl">{kpi.flag}</span>
                  <p className="text-lg sm:text-xl font-bold text-rp-text mt-1">{kpi.value}</p>
                  <p className="text-[9px] sm:text-[10px] text-rp-text-muted">{kpi.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity + Quick Actions side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 pt-4 pb-2">
              <h3 className="font-bold text-sm sm:text-base text-rp-text">🔔 Activité récente</h3>
            </div>
            {recentActivity.map((activity, i) => (
              <div key={activity.id} className={`px-4 py-3 flex items-center gap-3 ${i < recentActivity.length - 1 ? 'border-b border-rp-border/50' : ''}`}>
                <span className="text-xl flex-shrink-0">{activity.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-rp-text truncate">{activity.text}</p>
                  <p className="text-[10px] text-rp-text-muted">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/sellers" className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm card-hover text-center">
              <Users className="w-8 h-8 text-rp-primary mx-auto mb-2" />
              <p className="text-xs sm:text-sm font-semibold text-rp-text">Gérer les vendeurs</p>
              <p className="text-[10px] text-rp-text-muted mt-1">127 vendeurs</p>
            </Link>
            <Link href="/admin/orders" className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm card-hover text-center">
              <ShoppingBag className="w-8 h-8 text-rp-success mx-auto mb-2" />
              <p className="text-xs sm:text-sm font-semibold text-rp-text">Transactions</p>
              <p className="text-[10px] text-rp-text-muted mt-1">500+/mois</p>
            </Link>
            <Link href="/admin/requests" className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm card-hover text-center">
              <Package className="w-8 h-8 text-rp-accent mx-auto mb-2" />
              <p className="text-xs sm:text-sm font-semibold text-rp-text">Demandes</p>
              <p className="text-[10px] text-rp-text-muted mt-1">234/mois</p>
            </Link>
            <Link href="/admin/settings" className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm card-hover text-center">
              <Shield className="w-8 h-8 text-rp-secondary mx-auto mb-2" />
              <p className="text-xs sm:text-sm font-semibold text-rp-text">Configuration</p>
              <p className="text-[10px] text-rp-text-muted mt-1">Plateforme</p>
            </Link>
          </div>
        </div>
      </div>

      <BottomNav role="admin" />
    </div>
  );
}
