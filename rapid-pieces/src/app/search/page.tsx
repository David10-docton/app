'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, Star, MapPin, Clock, X, Camera, Menu } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { POPULAR_BRANDS, BENIN_LOCATIONS, QUALITY_LEVELS } from '@/lib/types';

const allResults = [
  { id: '1', part: 'Plaquettes de frein avant', brand: 'Toyota', model: 'Corolla 2018', price: 62000, oldPrice: 75000, quality: 'OEM' as const, seller: 'Auto Pièces Cotonou', score: 92, delivery: '1h', rating: 4.8, location: 'Cotonou', image: '🛞' },
  { id: '2', part: 'Alternateur', brand: 'Toyota', model: 'Hilux 2018', price: 120000, quality: 'Premium Aftermarket' as const, seller: 'Nigeria Auto Parts', score: 82, delivery: '3-5j', rating: 4.6, location: 'Nigeria', image: '⚡' },
  { id: '3', part: 'Filtre à huile', brand: 'Honda', model: 'CR-V 2019', price: 25000, quality: 'Genuine' as const, seller: 'Auto Pièces Cotonou', score: 88, delivery: '2h', rating: 4.8, location: 'Cotonou', image: '🛢️' },
  { id: '4', part: 'Kit d\'embrayage', brand: 'Mercedes-Benz', model: 'Classe C 2015', price: 380000, quality: 'OEM' as const, seller: 'Parts Express USA', score: 95, delivery: '7-10j', rating: 4.9, location: 'USA', image: '⚙️' },
  { id: '5', part: 'Amortisseurs arrière', brand: 'Peugeot', model: '308 2016', price: 180000, quality: 'Premium Aftermarket' as const, seller: 'Garage Mécanique Générale', score: 76, delivery: '24h', rating: 4.5, location: 'Abomey-Calavi', image: '🔧' },
  { id: '6', part: 'Batterie 60Ah', brand: 'Toyota', model: 'Yaris 2020', price: 85000, quality: 'Genuine' as const, seller: 'Sahel Auto', score: 72, delivery: '2h', rating: 4.2, location: 'Parakou', image: '🔋' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'price' | 'delivery'>('score');

  const filteredResults = allResults.filter(r => {
    const matchesQuery = !query || r.part.toLowerCase().includes(query.toLowerCase()) || r.brand.toLowerCase().includes(query.toLowerCase());
    const matchesBrand = !selectedBrand || r.brand === selectedBrand;
    const matchesQuality = !selectedQuality || r.quality === selectedQuality;
    const matchesLocation = !selectedLocation || r.location === selectedLocation;
    const matchesPrice = !maxPrice || r.price <= parseInt(maxPrice);
    return matchesQuery && matchesBrand && matchesQuality && matchesLocation && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'delivery') return a.delivery.localeCompare(b.delivery);
    return b.score - a.score;
  });

  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Desktop Header */}
      <header className="hidden lg:block bg-white border-b border-rp-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo_rapidePiece.jpeg" alt="Rapid Pièces" width={48} height={48} className="h-12 w-auto object-contain rounded-lg" priority />
            <span className="text-lg font-bold text-rp-text">Rapid Pièces</span>
          </Link>
          <div className="flex-1 max-w-xl mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-rp-text-muted" />
              <input
                type="text"
                placeholder="Rechercher une pièce..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-rp-bg rounded-xl text-sm border-0 focus:ring-2 focus:ring-rp-primary outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-rp-text-muted" />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-rp-text-muted hover:text-rp-primary">Accueil</Link>
            <Link href="/orders" className="text-sm text-rp-text-muted hover:text-rp-primary">Commandes</Link>
            <Link href="/profile" className="w-8 h-8 bg-rp-primary rounded-full flex items-center justify-center text-white text-xs font-bold">JK</Link>
          </div>
        </div>
      </header>

      {/* Mobile Search Header */}
      <div className="lg:hidden bg-white px-4 pt-12 pb-4 border-b border-rp-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo_rapidePiece.jpeg" alt="RP" width={36} height={36} className="h-9 w-auto object-contain rounded-lg" priority />
            </Link>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-rp-text-muted" />
              <input
                type="text"
                placeholder="Marque, modèle, pièce..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-rp-bg rounded-xl text-sm border-0 focus:ring-2 focus:ring-rp-primary outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-rp-text-muted" />
                </button>
              )}
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="w-10 h-10 bg-rp-primary rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <Filter className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Quick Brand Tags */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {POPULAR_BRANDS.slice(0, 8).map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(selectedBrand === brand ? '' : brand)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedBrand === brand 
                    ? 'bg-rp-primary text-white' 
                    : 'bg-rp-bg text-rp-text-muted'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-rp-border px-4 py-4 slide-up">
          <div className="max-w-lg mx-auto space-y-4">
            <div>
              <label className="text-xs font-semibold text-rp-text-muted mb-2 block">Qualité</label>
              <div className="flex flex-wrap gap-2">
                {QUALITY_LEVELS.map(q => (
                  <button
                    key={q.value}
                    onClick={() => setSelectedQuality(selectedQuality === q.value ? '' : q.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      selectedQuality === q.value ? 'text-white' : 'bg-rp-bg text-rp-text-muted'
                    }`}
                    style={selectedQuality === q.value ? { backgroundColor: q.color } : {}}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-rp-text-muted mb-2 block">Localisation</label>
              <div className="flex flex-wrap gap-2">
                {BENIN_LOCATIONS.slice(0, 6).map(loc => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(selectedLocation === loc ? '' : loc)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      selectedLocation === loc ? 'bg-rp-secondary text-white' : 'bg-rp-bg text-rp-text-muted'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-rp-text-muted mb-2 block">Prix max (FCFA)</label>
              <input
                type="number"
                placeholder="Ex: 100000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-4 py-2 bg-rp-bg rounded-xl text-sm border-0 outline-none focus:ring-2 focus:ring-rp-primary"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sort Bar */}
      <div className="px-4 lg:px-6 py-3 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <p className="text-sm text-rp-text-muted">{filteredResults.length} résultats</p>
          <div className="flex gap-2">
            {[
              { key: 'score' as const, label: 'Rapid Score' },
              { key: 'price' as const, label: 'Prix' },
              { key: 'delivery' as const, label: 'Délai' },
            ].map(s => (
              <button
                key={s.key}
                onClick={() => setSortBy(s.key)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  sortBy === s.key ? 'bg-rp-primary text-white' : 'bg-white text-rp-text-muted border border-rp-border'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results - Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-20 lg:pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {filteredResults.map((result) => (
            <Link key={result.id} href={`/offers/${result.id}`} className="block bg-white rounded-2xl p-4 shadow-sm card-hover">
              <div className="flex gap-3 sm:flex-col sm:gap-2">
                <div className="w-16 h-16 sm:w-full sm:h-32 bg-rp-bg rounded-xl flex items-center justify-center text-3xl sm:text-5xl flex-shrink-0">
                  {result.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between sm:flex-col sm:gap-1">
                    <div>
                      <h3 className="font-semibold text-sm text-rp-text">{result.part}</h3>
                      <p className="text-xs text-rp-text-muted">{result.brand} {result.model}</p>
                    </div>
                    <div className="text-right sm:text-left flex-shrink-0">
                      <p className="font-bold text-rp-primary">{result.price.toLocaleString()} <span className="text-xs">FCFA</span></p>
                      {result.oldPrice && (
                        <p className="text-xs text-rp-text-muted line-through">{result.oldPrice.toLocaleString()} FCFA</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="flex items-center gap-1 text-xs bg-rp-primary/10 text-rp-primary px-2 py-0.5 rounded-full font-semibold">
                      Score {result.score}
                    </span>
                    <span className="text-xs bg-rp-bg text-rp-text-muted px-2 py-0.5 rounded-full">{result.quality}</span>
                    <span className="flex items-center gap-1 text-xs text-rp-text-muted">
                      <Clock className="w-3 h-3" /> {result.delivery}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-rp-text-muted">{result.seller}</span>
                    <span className="flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 fill-rp-gold text-rp-gold" /> {result.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold text-rp-text">Aucun résultat trouvé</p>
            <p className="text-sm text-rp-text-muted mt-1">Essayez de modifier vos filtres</p>
          </div>
        )}

        {/* Photo Search CTA */}
        <div className="bg-gradient-to-r from-rp-accent/20 to-rp-accent/10 rounded-2xl p-4 border border-rp-accent/30 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-rp-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-rp-text">Recherche par photo (coming soon)</h3>
              <p className="text-xs text-rp-text-muted">Photographiez une pièce, l&apos;IA identifie la référence</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav role="buyer" />
    </div>
  );
}
