'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, FileText, Globe, Shield, Star, ChevronRight, MapPin, Clock, TrendingUp, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/lib/auth';
import { DELIVERY_OPTIONS } from '@/lib/types';
import { mockRequests, mockSellers } from '@/lib/mockData';

const quickActions = [
  { icon: Search, label: 'Rechercher une pièce', href: '/search', color: 'bg-blue-500' },
  { icon: FileText, label: 'Demander une pièce', href: '/requests/new', color: 'bg-rp-primary' },
  { icon: Globe, label: 'Sourcing international', href: '/sourcing', color: 'bg-emerald-500' },
  { icon: Shield, label: 'Mes protections', href: '/protection', color: 'bg-purple-500' },
];

const stats = [
  { label: 'Vendeurs actifs', value: '127+', icon: Star },
  { label: 'Pièces trouvées', value: '2 340+', icon: TrendingUp },
  { label: 'Livraison < 2h', value: '85%', icon: Clock },
];

const navLinks = [
  { href: '/buyer', label: 'Accueil' },
  { href: '/search', label: 'Rechercher' },
  { href: '/requests/new', label: 'Demander' },
  { href: '/orders', label: 'Commandes' },
  { href: '/sourcing', label: 'Sourcing' },
  { href: '/protection', label: 'Protection' },
  { href: '/profile', label: 'Profil' },
];

export default function BuyerHome() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'buyer')) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-rp-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rp-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== 'buyer') return null;

  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Desktop Header */}
      <header className="hidden lg:block bg-white border-b border-rp-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/buyer" className="flex items-center gap-3">
            <Image src="/logo_rapidePiece.jpeg" alt="Rapid Pièces" width={48} height={48} className="h-12 w-auto object-contain rounded-lg" priority />
            <div>
              <span className="text-lg font-bold text-rp-text">Rapid Pièces</span>
              <span className="text-xs text-rp-text-muted block">La bourse des pièces automobiles</span>
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
            <Link href="/profile" className="flex items-center gap-2 px-3 py-2 bg-rp-primary/10 rounded-xl">
              <div className="w-8 h-8 bg-rp-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-rp-text hidden xl:block">{user.name.split(' ')[0]}</span>
            </Link>
            <button onClick={logout} className="p-2 text-rp-text-muted hover:text-rp-danger rounded-lg" title="Déconnexion">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <div className="lg:hidden bg-gradient-to-r from-rp-primary to-rp-primary-dark text-white px-4 pt-12 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/buyer" className="flex items-center gap-3">
              <Image src="/logo_rapidePiece.jpeg" alt="Rapid Pièces" width={48} height={48} className="h-12 w-auto object-contain rounded-lg bg-white" priority />
              <div>
                <h1 className="text-xl font-bold tracking-tight">Rapid Pièces</h1>
                <p className="text-white/80 text-xs">La bourse des pièces automobiles</p>
              </div>
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="bg-white/10 rounded-2xl p-4 mb-4 slide-up">
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-xl transition-colors">
                    {link.label}
                  </Link>
                ))}
                <button onClick={logout} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-red-300 hover:bg-white/10 rounded-xl">
                  Déconnexion
                </button>
              </nav>
            </div>
          )}
          
          {/* Search Bar */}
          <Link href="/search" className="block">
            <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg">
              <Search className="w-5 h-5 text-rp-text-muted" />
              <div className="flex-1">
                <p className="text-sm text-rp-text-muted">Rechercher une pièce...</p>
                <p className="text-xs text-rp-text-muted/70">Marque, modèle, référence OEM</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 -mt-4 lg:mt-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href} className="flex flex-col items-center bg-white rounded-2xl p-4 shadow-sm card-hover">
                <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-md`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[11px] text-center mt-2 font-medium text-rp-text leading-tight">{action.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm mb-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-1">
                    <Icon className="w-4 h-4 text-rp-primary" />
                  </div>
                  <p className="text-lg sm:text-2xl font-bold text-rp-text">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-rp-text-muted">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Options */}
        <div className="mb-6">
          <h2 className="font-bold text-rp-text text-base sm:text-lg mb-3">Options de livraison</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DELIVERY_OPTIONS.map((opt) => (
              <div key={opt.type} className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm card-hover">
                <span className="text-2xl">{opt.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-rp-text">{opt.label}</span>
                    <span className="text-xs bg-rp-primary/10 text-rp-primary px-2 py-0.5 rounded-full font-medium">{opt.timeframe}</span>
                  </div>
                  <p className="text-xs text-rp-text-muted mt-0.5">{opt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Requests */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-rp-text text-base sm:text-lg">Demandes récentes</h2>
            </div>
            <div className="space-y-3">
              {mockRequests.slice(0, 3).map((req) => (
                <Link key={req.id} href={`/requests/${req.id}`} className="block bg-white rounded-xl p-4 shadow-sm card-hover">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-rp-text">{req.partName}</h3>
                      <p className="text-xs text-rp-text-muted mt-0.5">{req.vehicle.brand} {req.vehicle.model} {req.vehicle.year}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs text-rp-text-muted"><MapPin className="w-3 h-3" /> {req.location}</span>
                        {req.quality && <span className="text-xs bg-rp-secondary/10 text-rp-secondary px-2 py-0.5 rounded-full">{req.quality}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-rp-primary">{req.responsesCount}</span>
                      <p className="text-[10px] text-rp-text-muted">offres</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Sellers */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-rp-text text-base sm:text-lg">Vendeurs vérifiés</h2>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-3 flex gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {mockSellers.filter(s => s.isVerified).map((seller) => (
                <Link key={seller.id} href={`/sellers/${seller.id}`} className="flex-shrink-0 w-44 lg:w-auto bg-white rounded-xl p-3 shadow-sm card-hover">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-rp-secondary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{seller.name.charAt(0)}</div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-rp-text truncate">{seller.name}</p>
                      <p className="text-[10px] text-rp-text-muted truncate">{seller.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 fill-rp-gold text-rp-gold" />
                    <span className="text-xs font-bold text-rp-text">{seller.rating}</span>
                    <span className="text-[10px] text-rp-text-muted">({seller.totalTransactions})</span>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                    seller.badge === 'Top Seller' ? 'bg-rp-gold/20 text-yellow-700' :
                    seller.badge === 'Premium Seller' ? 'bg-purple-100 text-purple-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>{seller.badge}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Banner */}
        <div className="bg-gradient-to-r from-rp-secondary to-rp-secondary-light rounded-2xl p-5 sm:p-8 text-white mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <Shield className="w-8 h-8 sm:w-12 sm:h-12 mb-3 sm:mb-0 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg sm:text-xl mb-1">Rapid Protection</h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">Chaque transaction est protégée. Garantie de conformité, retour possible, médiation incluse.</p>
              <Link href="/protection" className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-white underline underline-offset-2">
                En savoir plus <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="hidden lg:block bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Image src="/logo_rapidePiece.jpeg" alt="Rapid Pièces" width={40} height={40} className="h-10 w-auto object-contain rounded-lg" />
                <span className="font-bold text-rp-text">Rapid Pièces</span>
              </div>
              <p className="text-xs text-rp-text-muted leading-relaxed">La bourse digitale des pièces automobiles en Afrique de l&apos;Ouest.</p>
            </div>
            <div>
              <h4 className="font-bold text-sm text-rp-text mb-3">Acheteurs</h4>
              <div className="space-y-2 text-xs text-rp-text-muted">
                <Link href="/search" className="block hover:text-rp-primary">Rechercher</Link>
                <Link href="/requests/new" className="block hover:text-rp-primary">Demander</Link>
                <Link href="/sourcing" className="block hover:text-rp-primary">Sourcing</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm text-rp-text mb-3">Vendeurs</h4>
              <div className="space-y-2 text-xs text-rp-text-muted">
                <Link href="/seller" className="block hover:text-rp-primary">Dashboard</Link>
                <Link href="/seller/catalogue" className="block hover:text-rp-primary">Catalogue</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm text-rp-text mb-3">Contact</h4>
              <div className="space-y-2 text-xs text-rp-text-muted">
                <p>📍 Cotonou, Bénin</p>
                <p>✉️ contact@rapidpieces.bj</p>
              </div>
            </div>
          </div>
          <div className="border-t border-rp-border mt-6 pt-4 text-center text-xs text-rp-text-muted">
            © 2025 Rapid Pièces. Tous droits réservés.
          </div>
        </footer>
      </div>

      <BottomNav role="buyer" />
    </div>
  );
}
