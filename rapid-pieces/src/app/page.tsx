'use client';

import Link from 'next/link';
import { Search, FileText, Zap, Globe, Truck, Shield, Star, ChevronRight, MapPin, Clock, TrendingUp } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
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

export default function BuyerHome() {
  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-rp-primary to-rp-primary-dark text-white px-4 pt-12 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Rapid Pièces</h1>
              <p className="text-white/80 text-sm">La bourse des pièces automobiles</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">🔧</span>
            </div>
          </div>
          
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

      <div className="max-w-lg mx-auto px-4 -mt-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href} className="flex flex-col items-center">
                <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-md`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[11px] text-center mt-1.5 font-medium text-rp-text leading-tight">{action.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Stats Banner */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-1">
                    <Icon className="w-4 h-4 text-rp-primary" />
                  </div>
                  <p className="text-lg font-bold text-rp-text">{stat.value}</p>
                  <p className="text-[10px] text-rp-text-muted">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Options */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-rp-text">Options de livraison</h2>
          </div>
          <div className="space-y-2">
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

        {/* Recent Requests */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-rp-text">Demandes récentes</h2>
            <Link href="/requests" className="text-sm text-rp-primary font-medium flex items-center gap-1">
              Voir tout <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockRequests.slice(0, 3).map((req) => (
              <Link key={req.id} href={`/requests/${req.id}`} className="block bg-white rounded-xl p-4 shadow-sm card-hover">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-rp-text">{req.partName}</h3>
                    <p className="text-xs text-rp-text-muted mt-0.5">
                      {req.vehicle.brand} {req.vehicle.model} {req.vehicle.year}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-rp-text-muted">
                        <MapPin className="w-3 h-3" /> {req.location}
                      </span>
                      {req.quality && (
                        <span className="text-xs bg-rp-secondary/10 text-rp-secondary px-2 py-0.5 rounded-full">{req.quality}</span>
                      )}
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
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-rp-text">Vendeurs vérifiés</h2>
            <Link href="/sellers" className="text-sm text-rp-primary font-medium flex items-center gap-1">
              Voir tout <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {mockSellers.filter(s => s.isVerified).map((seller) => (
              <Link key={seller.id} href={`/sellers/${seller.id}`} className="flex-shrink-0 w-44 bg-white rounded-xl p-3 shadow-sm card-hover">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-rp-secondary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {seller.name.charAt(0)}
                  </div>
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

        {/* Trust Banner */}
        <div className="bg-gradient-to-r from-rp-secondary to-rp-secondary-light rounded-2xl p-5 text-white mb-20">
          <Shield className="w-8 h-8 mb-3" />
          <h3 className="font-bold text-lg mb-1">Rapid Protection</h3>
          <p className="text-white/80 text-sm leading-relaxed">
            Chaque transaction est protégée. Garantie de conformité, retour possible, médiation incluse.
          </p>
        </div>
      </div>

      <BottomNav role="buyer" />
    </div>
  );
}
