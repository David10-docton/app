'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, Package, MapPin, Clock, Star, ChevronRight, Camera, Menu, X, Shield, Phone, Store } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const categories = [
  { name: 'Freinage', icon: '🔧', count: 120 },
  { name: 'Moteur', icon: '⚙️', count: 85 },
  { name: 'Éclairage', icon: '💡', count: 64 },
  { name: 'Climatisation', icon: '❄️', count: 42 },
  { name: 'Filtration', icon: '🛢️', count: 95 },
  { name: 'Suspension', icon: '🔩', count: 38 },
];

const recentRequests = [
  { id: '1', part: 'Phare avant droit Hyundai Tucson 2015', buyer: 'Koffi Germain', type: 'Mécanicien', location: 'Marcory', time: 'Il y a 15 min', responses: 3, status: 'En cours' },
  { id: '2', part: 'Plaquettes de frein avant Toyota Corolla 2018', buyer: 'Massa Garage', type: 'Garage', location: 'Marcory', time: 'Il y a 1h', responses: 5, status: 'Pièce trouvée' },
  { id: '3', part: 'Alternateur Mercedes Classe C 2015', buyer: 'Transport GTA', type: 'Flotte', location: 'Cotonou', time: 'Il y a 2h', responses: 2, status: 'En cours' },
];

const topSellers = [
  { id: '1', name: 'BigMoteurs', specialty: 'Pièces Auto Premium', rating: 4.9, transactions: 234, badge: 'Premium Seller', location: 'Treichville' },
  { id: '2', name: 'Sotra Pièces Auto', specialty: 'Pièces Européennes', rating: 4.7, transactions: 189, badge: 'Verified Seller', location: 'Treichville' },
  { id: '3', name: 'Diallo & Frères', specialty: 'Pièces Européennes', rating: 4.8, transactions: 156, badge: 'Verified Seller', location: 'Adjamé' },
];

const deliveryOptions = [
  { type: 'RAPID_NOW', label: 'RAPID NOW', desc: 'Disponible chez un vendeur local', time: '< 1h', icon: '⚡' },
  { type: 'RAPID_CITY', label: 'RAPID CITY', desc: 'Disponible à Cotonou', time: '< 2h', icon: '🏙️' },
  { type: 'RAPID_NIGERIA', label: 'RAPID NIGERIA', desc: 'Sourcé au Nigeria', time: '48h', icon: '🇳🇬' },
  { type: 'RAPID_USA', label: 'RAPID USA', desc: 'Sourcé aux États-Unis', time: '7 jours', icon: '🇺🇸' },
];

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo_rapidePiece.jpeg" alt="Rapide Pièces" width={40} height={40} className="h-10 w-auto object-contain rounded-lg" priority />
            <span className="text-lg font-bold text-gray-900 dark:text-white dark:text-white hidden sm:block">Rapide Pièces</span>
          </Link>
          
          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
              <input type="text" placeholder="Rechercher une pièce..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {['Accueil', 'Commandes', 'Sourcing'].map(item => (
              <Link key={item} href={item === 'Accueil' ? '/' : item === 'Commandes' ? '/orders' : '/sourcing'}
                className="px-3 py-2 text-sm text-gray-600 dark:text-slate-300 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition-colors">{item}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:flex" />
            <Link href="/orders" className="relative p-2 text-gray-400 dark:text-slate-500 hover:text-red-600">
              <Package className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
            </Link>
            <Link href="/login" className="hidden sm:flex items-center gap-1 px-3 py-2 text-xs text-gray-500 dark:text-slate-400 dark:text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Store className="w-4 h-4" /> Vendeur
            </Link>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:text-slate-300">
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="lg:hidden border-t border-gray-200 dark:border-slate-700 px-4 py-3 space-y-1 bg-white dark:bg-slate-900 slide-up">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
              <input type="text" placeholder="Rechercher une pièce..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 outline-none" />
            </div>
            {['Accueil', 'Commandes', 'Sourcing', 'Profil'].map(item => (
              <Link key={item} href={item === 'Accueil' ? '/' : item === 'Commandes' ? '/orders' : item === 'Sourcing' ? '/sourcing' : '/profile'}
                onClick={() => setMobileMenu(false)}
                className="block px-4 py-2.5 text-sm text-gray-600 dark:text-slate-300 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg">{item}</Link>
            ))}
            <Link href="/login" onClick={() => setMobileMenu(false)} className="block px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">🏪 Espace Vendeur</Link>
            <div className="px-4 py-2"><ThemeToggle /></div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="absolute top-10 right-10 w-72 h-72 bg-red-100 rounded-full blur-3xl animate-slow-zoom opacity-60" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            La bourse des pièces<br />
            <span className="text-red-600">automobiles</span>
          </h1>
          <p className="text-gray-500 dark:text-slate-400 dark:text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-8">
            Trouvez. Comparez. Commandez. Recevez. Connectez-vous aux meilleures offres localement et à l&apos;international.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
              <input type="text" placeholder="Rechercher une pièce... (ex: plaquettes frein Toyota Corolla)"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-24 py-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-500 text-sm shadow-lg" />
              <Link href="/search" className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors shadow-md">
                Rechercher
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center gap-3 mt-6">
            <Link href="/requests/new" className="flex items-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
              <ShoppingCart className="w-4 h-4" /> Demander une pièce
            </Link>
            <Link href="/search" className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 dark:hover:bg-slate-700 transition-colors shadow-sm">
              <Camera className="w-4 h-4" /> Photo/Vocal
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Categories */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Catégories</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map(cat => (
              <Link key={cat.name} href={`/search?category=${cat.name}`}
                className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-red-300 hover:shadow-md transition-all card-hover">
                <span className="text-2xl block mb-2">{cat.icon}</span>
                <p className="text-xs font-semibold text-gray-900">{cat.name}</p>
                <p className="text-[10px] text-gray-400 dark:text-slate-500">{cat.count} pièces</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Delivery Options */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Options de livraison</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {deliveryOptions.map(opt => (
              <div key={opt.type} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 card-hover shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{opt.icon}</span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{opt.label}</span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-slate-400 mb-1">{opt.desc}</p>
                <span className="text-[10px] px-2 py-0.5 bg-red-50 text-red-600 rounded-full font-medium">{opt.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Requests + Top Sellers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Requests */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Demandes récentes</h2>
              <Link href="/search" className="text-xs text-red-600 font-medium flex items-center gap-1 hover:underline">
                Voir tout <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentRequests.map(req => (
                <Link key={req.id} href={`/requests/new`}
                  className="block bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 hover:border-gray-300 dark:hover:border-slate-500 hover:shadow-md transition-all card-hover">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{req.part}</h3>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400">{req.buyer} • {req.type}</p>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                      req.status === 'Pièce trouvée' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}>{req.status}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 dark:text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {req.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {req.time}</span>
                    <span className="text-red-600 font-medium">{req.responses} offres</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Top Sellers */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Top Vendeurs</h2>
              <Link href="/search" className="text-xs text-red-600 font-medium flex items-center gap-1 hover:underline">
                Voir tout <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {topSellers.map(seller => (
                <Link key={seller.id} href="/search"
                  className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 hover:border-gray-300 dark:hover:border-slate-500 hover:shadow-md transition-all card-hover">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
                    {seller.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">{seller.name}</h3>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                        seller.badge === 'Premium Seller' ? 'bg-purple-50 text-purple-600 border border-purple-200' : 'bg-blue-50 text-blue-600 border border-blue-200'
                      }`}>{seller.badge}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400">{seller.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] text-gray-900 font-medium">{seller.rating}</span>
                      <span className="text-[10px] text-gray-400 dark:text-slate-500">({seller.transactions} ventes)</span>
                      <span className="text-[10px] text-gray-400 dark:text-slate-500">• {seller.location}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Rapid Services */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Nos services</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { href: '/rapid-price', icon: '📊', label: 'Rapid Price', desc: 'Prix moyen du marché' },
              { href: '/group-buy', icon: '🤝', label: 'Achats groupés', desc: 'Économisez ensemble' },
              { href: '/vehicle-history', icon: '🚗', label: 'Historique véhicule', desc: 'Suivi des pièces' },
              { href: '/rapid-business', icon: '🏢', label: 'Rapid Business', desc: 'Solutions B2B' },
            ].map(s => (
              <Link key={s.href} href={s.href}
                className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-red-300 hover:shadow-md transition-all card-hover">
                <span className="text-2xl block mb-2">{s.icon}</span>
                <p className="text-xs font-semibold text-gray-900">{s.label}</p>
                <p className="text-[10px] text-gray-400 dark:text-slate-500">{s.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust Banner */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Shield className="w-10 h-10 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Rapide Protection</h3>
              <p className="text-sm text-gray-600 dark:text-slate-300">Chaque transaction est protégée. Garantie de conformité, retour possible, médiation incluse. Paiement sécurisé en escrow.</p>
              <Link href="/protection" className="inline-flex items-center gap-1 mt-2 text-sm text-green-600 font-medium hover:underline">
                En savoir plus <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 text-center shadow-sm">
          <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 mb-1">Besoin d&apos;assistance immédiate ?</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Contactez-nous directement via WhatsApp</p>
          <a href="https://wa.me/22901XXYYZZ?text=Bonjour%20Rapide%20Pi%C3%A8ces%2C%20je%20cherche%20une%20pi%C3%A8ce%20auto."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors shadow-md">
            <Phone className="w-4 h-4" /> Appel Direct / WhatsApp
          </a>
        </section>
      </div>

      {/* Bottom Nav (mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {[
            { href: '/', label: 'Accueil', icon: Search },
            { href: '/requests/new', label: 'Demander', icon: ShoppingCart, center: true },
            { href: '/orders', label: 'Commandes', icon: Package },
            { href: '/profile', label: 'Profil', icon: Store },
          ].map(tab => {
            const Icon = tab.icon;
            if (tab.center) return (
              <Link key={tab.href} href={tab.href} className="flex flex-col items-center -mt-4">
                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] mt-1 text-red-600 font-medium">{tab.label}</span>
              </Link>
            );
            return (
              <Link key={tab.href} href={tab.href} className="flex flex-col items-center">
                <Icon className="w-5 h-5 text-gray-400 dark:text-slate-500" />
                <span className="text-[10px] mt-0.5 text-gray-400 dark:text-slate-500">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
