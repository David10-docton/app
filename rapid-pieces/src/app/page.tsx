'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, Package, Menu, X, Shield, Phone, Store, ChevronRight, TrendingUp, Clock, MapPin, ArrowRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import ThemeToggle from '@/components/ThemeToggle';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import ServiceCard from '@/components/ServiceCard';
import RequestCard from '@/components/RequestCard';
import SellerCard from '@/components/SellerCard';
import DeliveryCard from '@/components/DeliveryCard';
import { products, categories, deliveryOptions } from '@/lib/products';

const recentRequests = [
  { id: '1', part: 'Phare avant droit Hyundai Tucson 2015', buyer: 'Koffi Germain', buyerType: 'Mécanicien', location: 'Marcory', time: 'Il y a 15 min', responses: 3, status: 'En cours' as const, vehicle: 'Hyundai Tucson 2015' },
  { id: '2', part: 'Plaquettes de frein avant Toyota Corolla 2018', buyer: 'Massa Garage', buyerType: 'Garage', location: 'Marcory', time: 'Il y a 1h', responses: 5, status: 'Pièce trouvée' as const, vehicle: 'Toyota Corolla 2018' },
  { id: '3', part: 'Alternateur Mercedes Classe C 2015', buyer: 'Transport GTA', buyerType: 'Flotte', location: 'Cotonou', time: 'Il y a 2h', responses: 2, status: 'Urgent' as const, vehicle: 'Mercedes Classe C 2015' },
];

const topSellers = [
  { id: '1', name: 'BigMoteurs', specialty: 'Pièces Auto Premium', rating: 4.9, transactions: 234, badge: 'Premium' as const, location: 'Treichville' },
  { id: '2', name: 'Sotra Pièces Auto', specialty: 'Pièces Européennes', rating: 4.7, transactions: 189, badge: 'Verified' as const, location: 'Treichville' },
  { id: '3', name: 'Diallo & Frères', specialty: 'Pièces Européennes', rating: 4.8, transactions: 156, badge: 'Verified' as const, location: 'Adjamé' },
];

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo_rapidePiece.jpeg" alt="Rapide Pièces" width={40} height={40} className="h-10 w-auto object-contain rounded-lg" priority />
            <span className="text-lg font-bold text-gray-900 dark:text-white hidden sm:block">Rapide Pièces</span>
          </Link>
          
          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Rechercher une pièce..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {['Accueil', 'Commandes', 'Sourcing'].map(item => (
              <Link key={item} href={item === 'Accueil' ? '/' : item === 'Commandes' ? '/orders' : '/sourcing'}
                className="px-3 py-2 text-sm text-gray-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition-colors">{item}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:flex" />
            <Link href="/orders" className="relative p-2 text-gray-400 hover:text-red-600">
              <Package className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
            </Link>
            <Link href="/login" className="hidden sm:flex items-center gap-1 px-3 py-2 text-xs text-gray-500 dark:text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Store className="w-4 h-4" /> Vendeur
            </Link>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="lg:hidden border-t border-gray-200 dark:border-slate-700 px-4 py-3 space-y-1 bg-white dark:bg-slate-900 slide-up">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Rechercher une pièce..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 outline-none" />
            </div>
            {['Accueil', 'Commandes', 'Sourcing', 'Profil'].map(item => (
              <Link key={item} href={item === 'Accueil' ? '/' : item === 'Commandes' ? '/orders' : item === 'Sourcing' ? '/sourcing' : '/profile'}
                onClick={() => setMobileMenu(false)}
                className="block px-4 py-2.5 text-sm text-gray-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg">{item}</Link>
            ))}
            <Link href="/login" onClick={() => setMobileMenu(false)} className="block px-4 py-2.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"><Store className="w-4 h-4" /> Espace Vendeur</Link>
            <div className="px-4 py-2"><ThemeToggle /></div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="absolute top-10 right-10 w-72 h-72 bg-red-100 dark:bg-red-900/20 rounded-full blur-3xl animate-slow-zoom opacity-60" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            La bourse des pièces<br />
            <span className="text-red-600">automobiles</span>
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-8">
            Trouvez. Comparez. Commandez. Recevez. Les meilleures offres localement et à l&apos;international.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
            <Link href="/search" className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              <Search className="w-4 h-4" /> Recherche avancée
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">
        {/* Delivery Options */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Options de livraison</h2>
            <Link href="/sourcing" className="text-xs text-red-600 font-medium flex items-center gap-1 hover:underline">
              Voir tout <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {deliveryOptions.map(opt => (
              <DeliveryCard key={opt.label} label={opt.label} desc={opt.desc} time={opt.time} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Catégories</h2>
            <Link href="/search" className="text-xs text-red-600 font-medium flex items-center gap-1 hover:underline">
              Tout voir <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2 sm:gap-3">
            {categories.map(cat => (
              <CategoryCard key={cat.name} name={cat.name} count={cat.count} href={`/search?category=${cat.name}`} />
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Produits populaires</h2>
              <p className="text-xs text-gray-500 dark:text-slate-400">Les pièces les plus demandées à Cotonou</p>
            </div>
            <Link href="/search" className="text-xs text-red-600 font-medium flex items-center gap-1 hover:underline">
              Tout voir <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.slice(0, 8).map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* Recent Requests + Top Sellers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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
                <RequestCard key={req.id} {...req} />
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
                <SellerCard key={seller.id} {...seller} />
              ))}
            </div>
          </section>
        </div>

        {/* Services */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Nos services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            <ServiceCard label="Rapid Price" desc="Prix moyen du marché" href="/rapid-price" />
            <ServiceCard label="Achats groupés" desc="Économisez ensemble" href="/group-buy" />
            <ServiceCard label="Historique véhicule" desc="Suivi des pièces" href="/vehicle-history" />
            <ServiceCard label="Rapid Business" desc="Solutions B2B" href="/rapid-business" />
          </div>
        </section>

        {/* Trust Banner */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">Rapide Protection</h3>
              <p className="text-sm text-gray-600 dark:text-slate-300">Chaque transaction est protégée. Garantie de conformité, retour possible, médiation incluse. Paiement sécurisé en escrow.</p>
              <Link href="/protection" className="inline-flex items-center gap-1 mt-2 text-sm text-green-600 dark:text-green-400 font-medium hover:underline">
                En savoir plus <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 text-center shadow-sm">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Besoin d&apos;assistance ?</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Contactez-nous directement</p>
          <a href="https://wa.me/22901XXYYZZ" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors shadow-md">
            <Phone className="w-4 h-4" /> Nous contacter
          </a>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
