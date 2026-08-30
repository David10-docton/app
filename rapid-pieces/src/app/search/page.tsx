'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

const categories = [
  { name: 'Freinage', icon: '🛑', count: 145 },
  { name: 'Moteur', icon: '⚙️', count: 230 },
  { name: 'Éclairage', icon: '💡', count: 89 },
  { name: 'Climatisation', icon: '❄️', count: 67 },
  { name: 'Suspension', icon: '🔧', count: 112 },
  { name: 'Carrosserie', icon: '🚗', count: 178 },
  { name: 'Électronique', icon: '📡', count: 95 },
  { name: 'Transmission', icon: '🔄', count: 88 },
  { name: 'Filtration', icon: '🌀', count: 134 },
  { name: 'Refroidissement', icon: '🌡️', count: 56 },
];

const qualities = ['OEM', 'Genuine', 'Premium Aftermarket', 'Standard Aftermarket', 'Occasion', 'Reconditionné'];

const cities = ['Cotonou', 'Abomey-Calavi', 'Parakou', 'Porto-Novo', 'Bohicon'];

const mockResults = [
  { id: 1, name: 'Plaquettes de frein avant', category: 'Freinage', quality: 'OEM', price: 45000, seller: 'BigMoteurs', rating: 4.9, badges: ['Verified', 'Premium'], delivery: 'RAPID NOW', img: '🛑' },
  { id: 2, name: 'Filtre à huile Toyota', category: 'Filtration', quality: 'Genuine', price: 12000, seller: 'Sotra Pièces', rating: 4.7, badges: ['Verified'], delivery: 'RAPID CITY', img: '🌀' },
  { id: 3, name: 'Amortisseur arrière Honda', category: 'Suspension', quality: 'Premium Aftermarket', price: 85000, seller: 'Diallo & Frères', rating: 4.8, badges: ['Verified', 'Top Seller'], delivery: 'RAPID CITY', img: '🔧' },
  { id: 4, name: 'Alternateur Toyota Corolla', category: 'Moteur', quality: 'Reconditionné', price: 120000, seller: 'Massa Garage', rating: 4.5, badges: ['Verified'], delivery: 'RAPID NIGERIA', img: '⚙️' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rapid-score');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Logo size="sm" />
            <span className="text-sm font-black text-gray-900 dark:text-white hidden sm:inline">RAPID PIÈCES</span>
          </Link>
          <h1 className="text-sm font-bold text-gray-400 dark:text-slate-500 dark:text-slate-500 ml-auto">Recherche</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 space-y-4">
        {/* Search bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une pièce..."
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 pl-10 text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:text-slate-500 dark:text-slate-500 focus:outline-none focus:border-red-500/50"
            />
            <svg className="w-4 h-4 text-gray-400 dark:text-slate-500 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-xl border transition-all ${showFilters ? 'bg-red-600 border-red-500 text-gray-900 dark:text-white' : 'bg-gray-50 border-gray-200 text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          </button>
          <button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-500 text-gray-900 dark:text-white font-bold px-6 py-3 rounded-xl transition-all"
          >
            Chercher
          </button>
        </div>

        {/* Photo search coming soon */}
        <div className="block bg-gradient-to-r from-purple-50 to-gray-50 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📷</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">Recherche par photo</div>
              <div className="text-xs text-purple-600">AI Part Finder — Photographiez une pièce, l&apos;IA identifie la référence</div>
            </div>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-bold">Coming Soon</span>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white backdrop-blur-sm rounded-2xl p-4 border border-gray-200 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Filtres</h3>

            {/* Categories */}
            <div>
              <label className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-2 block">Catégorie</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedCategory(selectedCategory === c.name ? '' : c.name)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedCategory === c.name
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-50 text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white'
                    }`}
                  >
                    {c.icon} {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality */}
            <div>
              <label className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-2 block">Qualité</label>
              <div className="flex flex-wrap gap-2">
                {qualities.map((q) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQuality(selectedQuality === q ? '' : q)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedQuality === q
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-50 text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* City */}
            <div>
              <label className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-2 block">Ville</label>
              <div className="flex flex-wrap gap-2">
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCity(selectedCity === c ? '' : c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedCity === c
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-50 text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white'
                    }`}
                  >
                    📍 {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div>
              <label className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-2 block">Budget max</label>
              <input type="number" placeholder="Ex: 100000 FCFA" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm" />
            </div>
          </div>
        )}

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500">Trier par :</span>
          {[
            { value: 'rapid-score', label: 'Rapid Score' },
            { value: 'price-asc', label: 'Prix ↑' },
            { value: 'price-desc', label: 'Prix ↓' },
            { value: 'rating', label: 'Note' },
          ].map((s) => (
            <button
              key={s.value}
              onClick={() => setSortBy(s.value)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                sortBy === s.value ? 'bg-red-600 text-white' : 'bg-gray-50 text-gray-400 dark:text-slate-500 dark:text-slate-500'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Categories quick access */}
        {!showResults && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 dark:text-slate-500 dark:text-slate-500 uppercase tracking-wide">Catégories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {categories.map((c) => (
                <button
                  key={c.name}
                  onClick={() => { setSelectedCategory(c.name); handleSearch(); }}
                  className="bg-white backdrop-blur-sm rounded-xl p-3 border border-gray-200 text-center hover:border-red-500/30 transition-all"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div className="text-xs font-bold text-gray-900 dark:text-white dark:text-white mt-1">{c.name}</div>
                  <div className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{c.count} pièces</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-400 dark:text-slate-500 dark:text-slate-500">{mockResults.length} résultats</h3>
              <button onClick={() => setShowResults(false)} className="text-xs text-red-400 hover:text-red-300">Effacer</button>
            </div>
            {mockResults.map((r) => (
              <Link key={r.id} href="/offers/1" className="block bg-white backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:border-red-500/30 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-3xl shrink-0">
                    {r.img}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white dark:text-white truncate">{r.name}</h4>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">{r.quality}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500">📍 {r.seller}</span>
                      <span className="text-xs text-yellow-400">⭐ {r.rating}</span>
                      <div className="flex gap-1">
                        {r.badges.map((b) => (
                          <span key={b} className="text-[10px] bg-green-500/20 text-green-300 px-1 py-0.5 rounded">{b}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-black text-gray-900 dark:text-white">{r.price.toLocaleString()} <span className="text-xs font-normal text-gray-400 dark:text-slate-500 dark:text-slate-500">FCFA</span></span>
                      <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-1 rounded-full font-bold">{r.delivery}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Recent searches */}
        {!showResults && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 dark:text-slate-500 dark:text-slate-500 uppercase tracking-wide">Recherches récentes</h3>
            {['Plaquettes de frein Toyota Corolla', 'Filtre à huile Honda Civic', 'Amortisseur arrière'].map((s, i) => (
              <button key={i} onClick={() => { setQuery(s); handleSearch(); }} className="w-full bg-white backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-200 text-left hover:border-gray-300 dark:hover:border-slate-500 transition-all">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-gray-400 dark:text-slate-500 dark:text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-sm text-gray-600 dark:text-slate-300 dark:text-slate-300">{s}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white backdrop-blur-xl border-t border-gray-200">
        <div className="flex items-center justify-around h-16">
          <Link href="/" className="flex flex-col items-center gap-1 text-gray-400 dark:text-slate-500 dark:text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[10px]">Accueil</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center gap-1 text-red-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="text-[10px] font-bold">Rechercher</span>
          </Link>
          <Link href="/requests/new" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center -mt-4 shadow-lg shadow-red-600/20">
            <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </Link>
          <Link href="/orders" className="flex flex-col items-center gap-1 text-gray-400 dark:text-slate-500 dark:text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            <span className="text-[10px]">Commandes</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-400 dark:text-slate-500 dark:text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-[10px]">Profil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
