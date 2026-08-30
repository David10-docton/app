'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, TrendingUp, Package, Star, ChevronRight, DollarSign, AlertCircle, Menu, X, LogOut } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/lib/auth';

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

const navLinks = [
  { href: '/seller', label: 'Dashboard' },
  { href: '/seller/requests', label: 'Demandes', badge: 5 },
  { href: '/seller/catalogue', label: 'Catalogue' },
  { href: '/seller/orders', label: 'Ventes' },
  { href: '/seller/profile', label: 'Profil' },
];

export default function SellerDashboard() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'seller')) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-rp-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rp-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== 'seller') return null;

  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Desktop Header */}
      <header className="hidden lg:block bg-white border-b border-rp-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/seller" className="flex items-center gap-3">
            <Image src="/logo_rapidePiece.jpeg" alt="Rapid Pièces" width={48} height={48} className="h-12 w-auto object-contain rounded-lg" priority />
            <div>
              <span className="text-lg font-bold text-rp-text">Rapid Pièces</span>
              <span className="text-xs text-rp-text-muted block">Espace Vendeur</span>
            </div>
          </Link>
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="relative px-3 py-2 text-sm font-medium text-rp-text-muted hover:text-rp-primary hover:bg-rp-primary/5 rounded-lg transition-colors">
                {link.label}
                {link.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rp-danger text-white text-[9px] rounded-full flex items-center justify-center font-bold">{link.badge}</span>
                )}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-rp-text-muted" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rp-danger text-[9px] text-white rounded-full flex items-center justify-center font-bold">5</span>
            </div>
            <Link href="/seller/profile" className="flex items-center gap-2 px-3 py-2 bg-rp-secondary/10 rounded-xl">
              <div className="w-8 h-8 bg-rp-secondary rounded-full flex items-center justify-center text-white text-xs font-bold">AP</div>
              <span className="text-sm font-medium text-rp-text hidden xl:block">Auto Pièces</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <div className="lg:hidden bg-gradient-to-r from-rp-secondary to-rp-secondary-light text-white px-4 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/seller" className="flex items-center gap-3">
              <Image src="/logo_rapidePiece.jpeg" alt="Rapid Pièces" width={44} height={44} className="h-11 w-auto object-contain rounded-lg bg-white" priority />
              <div>
                <h1 className="text-lg font-bold">Auto Pièces Cotonou</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <Star className="w-3 h-3 fill-rp-gold text-rp-gold" />
                  <span className="text-xs font-medium">4.8 • Verified Seller</span>
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bell className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rp-danger text-[9px] rounded-full flex items-center justify-center font-bold">5</span>
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
                    {link.label} {link.badge ? `(${link.badge})` : ''}
                  </Link>
                ))}
              </nav>
            </div>
          )}
          
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

      <div className="max-w-7xl mx-auto px-4 lg:px-6 -mt-3 lg:mt-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 lg:mb-6">
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-sm">
            <p className="text-xl sm:text-2xl font-bold text-rp-primary">{todayStats.newRequests}</p>
            <p className="text-[10px] sm:text-xs text-rp-text-muted">Nvelles demandes</p>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-sm">
            <p className="text-xl sm:text-2xl font-bold text-rp-success">{todayStats.todaySales}</p>
            <p className="text-[10px] sm:text-xs text-rp-text-muted">Ventes</p>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-sm">
            <p className="text-xl sm:text-2xl font-bold text-rp-accent">{todayStats.responseRate}%</p>
            <p className="text-[10px] sm:text-xs text-rp-text-muted">Réponses</p>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-sm">
            <p className="text-xl sm:text-2xl font-bold text-rp-secondary">{todayStats.avgResponseTime}</p>
            <p className="text-[10px] sm:text-xs text-rp-text-muted">Temps rép.</p>
          </div>
        </div>

        {/* New Requests + Recent Sales side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* New Requests Alert */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-rp-text text-base sm:text-lg">Nouvelles demandes</h2>
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
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${req.urgent ? 'bg-rp-primary/10' : 'bg-rp-bg'}`}>
                      {req.urgent ? <AlertCircle className="w-5 h-5 text-rp-primary" /> : <Package className="w-5 h-5 text-rp-text-muted" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-rp-text truncate">{req.part}</h3>
                        {req.urgent && <span className="text-[9px] bg-rp-primary text-white px-1.5 py-0.5 rounded-full flex-shrink-0">URGENT</span>}
                      </div>
                      <p className="text-xs text-rp-text-muted truncate">{req.vehicle}</p>
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
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-rp-text text-base sm:text-lg">Ventes récentes</h2>
              <Link href="/seller/orders" className="text-xs text-rp-primary font-medium flex items-center gap-1">
                Voir tout <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {recentSales.map((sale, i) => (
                <div key={sale.id} className={`p-3 sm:p-4 flex items-center gap-3 ${i < recentSales.length - 1 ? 'border-b border-rp-border/50' : ''}`}>
                  <div className="w-10 h-10 bg-rp-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-rp-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-rp-text truncate">{sale.part}</p>
                    <p className="text-xs text-rp-text-muted">{sale.buyer} • {sale.time}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-rp-success">{sale.amount.toLocaleString()} FCFA</p>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                      sale.status === 'Livré' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>{sale.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm mb-20 lg:mb-6">
          <h3 className="font-bold text-sm sm:text-base text-rp-text mb-3">📊 Performance du mois</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              {[
                { label: 'Transactions', value: '89', percent: 89 },
                { label: 'Taux de conformité', value: '97%', percent: 97 },
              ].map(kpi => (
                <div key={kpi.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs sm:text-sm text-rp-text-muted">{kpi.label}</span>
                    <span className="text-xs sm:text-sm font-semibold text-rp-text">{kpi.value}</span>
                  </div>
                  <div className="h-2 bg-rp-bg rounded-full overflow-hidden">
                    <div className="h-full bg-rp-primary rounded-full" style={{ width: `${Math.min(100, kpi.percent)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {[
                { label: 'Taux de réponse', value: '96%', percent: 96 },
                { label: 'Taux de retour', value: '2%', percent: 60 },
              ].map(kpi => (
                <div key={kpi.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs sm:text-sm text-rp-text-muted">{kpi.label}</span>
                    <span className="text-xs sm:text-sm font-semibold text-rp-text">{kpi.value}</span>
                  </div>
                  <div className="h-2 bg-rp-bg rounded-full overflow-hidden">
                    <div className="h-full bg-rp-primary rounded-full" style={{ width: `${Math.min(100, kpi.percent)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav role="seller" />
    </div>
  );
}
