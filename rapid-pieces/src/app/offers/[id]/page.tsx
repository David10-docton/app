'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const offers = [
  {
    id: 1,
    seller: 'BigMoteurs',
    badges: ['Verified', 'Premium'],
    rating: 4.9,
    sales: 342,
    part: 'Plaquettes de frein avant',
    quality: 'OEM',
    brand: 'Toyota Genuine',
    price: 45000,
    delivery: 'RAPID NOW',
    deliveryTime: '< 1h',
    warranty: '12 mois',
    stock: 12,
    rapidScore: 92,
    scoreBreakdown: { price: 28, quality: 24, availability: 18, reputation: 14, delivery: 8 },
    distance: '2.3 km',
  },
  {
    id: 2,
    seller: 'Sotra Pièces',
    badges: ['Verified'],
    rating: 4.7,
    sales: 218,
    part: 'Plaquettes de frein avant',
    quality: 'Genuine',
    brand: 'Toyota',
    price: 38000,
    delivery: 'RAPID CITY',
    deliveryTime: '< 2h',
    warranty: '12 mois',
    stock: 8,
    rapidScore: 85,
    scoreBreakdown: { price: 27, quality: 22, availability: 16, reputation: 12, delivery: 8 },
    distance: '5.1 km',
  },
  {
    id: 3,
    seller: 'Diallo & Frères',
    badges: ['Verified', 'Top Seller'],
    rating: 4.8,
    sales: 567,
    part: 'Plaquettes de frein avant',
    quality: 'Premium Aftermarket',
    brand: 'Bosch',
    price: 28000,
    delivery: 'RAPID CITY',
    deliveryTime: '< 2h',
    warranty: '6 mois',
    stock: 20,
    rapidScore: 78,
    scoreBreakdown: { price: 25, quality: 19, availability: 17, reputation: 11, delivery: 6 },
    distance: '8.7 km',
  },
  {
    id: 4,
    seller: 'Massa Garage',
    badges: ['Verified'],
    rating: 4.5,
    sales: 89,
    part: 'Plaquettes de frein avant',
    quality: 'Standard Aftermarket',
    brand: 'Général',
    price: 18000,
    delivery: 'RAPID NIGERIA',
    deliveryTime: '48h',
    warranty: '3 mois',
    stock: 35,
    rapidScore: 62,
    scoreBreakdown: { price: 22, quality: 14, availability: 15, reputation: 8, delivery: 3 },
    distance: 'International',
  },
];

export default function OffersPage() {
  const router = useRouter();
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('rapid-score');

  const sorted = [...offers].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.rapidScore - a.rapidScore;
  });

  return (
    <div className="min-h-screen bg-slate-950 pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => router.back()} className="text-slate-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div>
            <h1 className="text-sm font-bold text-white">Offres reçues</h1>
            <p className="text-[10px] text-slate-400">Plaquettes de frein avant — Toyota Corolla 2018</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
        {/* Sort tabs */}
        <div className="flex gap-2">
          {[
            { value: 'rapid-score', label: '🏆 Rapid Score' },
            { value: 'price', label: '💰 Prix' },
            { value: 'rating', label: '⭐ Note' },
          ].map((s) => (
            <button
              key={s.value}
              onClick={() => setSortBy(s.value)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                sortBy === s.value ? 'bg-red-600 text-white' : 'bg-slate-800/50 text-slate-400'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Rapid Score explanation */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">📊</span>
            <span className="text-xs font-bold text-white">Rapid Score = Prix (30%) + Qualité (25%) + Disponibilité (20%) + Réputation (15%) + Délai (10%)</span>
          </div>
        </div>

        {/* Offers */}
        <div className="space-y-3">
          {sorted.map((offer, index) => (
            <div
              key={offer.id}
              className={`bg-slate-900/50 backdrop-blur-sm rounded-2xl border transition-all ${
                selectedOffer === offer.id ? 'border-red-500/50 ring-1 ring-red-500/20' : 'border-slate-700/50 hover:border-slate-600'
              }`}
            >
              {/* Seller header */}
              <div className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {offer.seller.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white">{offer.seller}</span>
                        {index === 0 && <span className="text-[10px] bg-yellow-500/20 text-yellow-300 px-1.5 py-0.5 rounded font-bold">👑 BEST</span>}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-yellow-400">⭐ {offer.rating}</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-400">{offer.sales} ventes</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-400">📍 {offer.distance}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-white">{offer.rapidScore}</div>
                    <div className="text-[10px] text-slate-400">Rapid Score</div>
                  </div>
                </div>
                {/* Badges */}
                <div className="flex gap-1.5 mt-2">
                  {offer.badges.map((b) => (
                    <span key={b} className="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full font-bold">
                      {b === 'Verified' ? '✅' : b === 'Premium' ? '💎' : '🏆'} {b}
                    </span>
                  ))}
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-bold">{offer.quality}</span>
                </div>
              </div>

              {/* Part details */}
              <div className="p-4">
                <div className="bg-slate-800/50 rounded-xl p-3 mb-3">
                  <div className="text-sm font-bold text-white">{offer.part}</div>
                  <div className="text-xs text-slate-400 mt-0.5">Marque: {offer.brand}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-lg font-black text-white">{offer.price.toLocaleString()} <span className="text-xs font-normal text-slate-400">FCFA</span></span>
                  </div>
                </div>

                {/* Delivery & warranty */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                    <div className="text-[10px] text-slate-400">Livraison</div>
                    <div className="text-xs font-bold text-red-400">{offer.delivery}</div>
                    <div className="text-[10px] text-slate-500">{offer.deliveryTime}</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                    <div className="text-[10px] text-slate-400">Garantie</div>
                    <div className="text-xs font-bold text-green-400">{offer.warranty}</div>
                    <div className="text-[10px] text-slate-500">{offer.stock} en stock</div>
                  </div>
                </div>

                {/* Score breakdown */}
                <div className="space-y-1 mb-3">
                  {[
                    { label: 'Prix', value: offer.scoreBreakdown.price, max: 30, color: 'bg-green-500' },
                    { label: 'Qualité', value: offer.scoreBreakdown.quality, max: 25, color: 'bg-blue-500' },
                    { label: 'Dispo', value: offer.scoreBreakdown.availability, max: 20, color: 'bg-purple-500' },
                    { label: 'Rép.', value: offer.scoreBreakdown.reputation, max: 15, color: 'bg-yellow-500' },
                    { label: 'Délai', value: offer.scoreBreakdown.delivery, max: 10, color: 'bg-red-500' },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 w-8">{s.label}</span>
                      <div className="flex-1 bg-slate-800 rounded-full h-1.5">
                        <div className={`${s.color} h-1.5 rounded-full`} style={{ width: `${(s.value / s.max) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-500 w-6 text-right">{s.value}/{s.max}</span>
                    </div>
                  ))}
                </div>

                {/* Action */}
                <button
                  onClick={() => setSelectedOffer(selectedOffer === offer.id ? null : offer.id)}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                    selectedOffer === offer.id
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-800/50 text-white hover:bg-red-600/80'
                  }`}
                >
                  {selectedOffer === offer.id ? 'Sélectionnée ✓' : 'Sélectionner cette offre'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {selectedOffer && (
          <div className="sticky bottom-20 lg:bottom-4 bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 border border-red-500/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">Offre sélectionnée</div>
                <div className="text-xs text-slate-400">{offers.find(o => o.id === selectedOffer)?.seller}</div>
              </div>
              <Link href="/checkout" className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl transition-all">
                Commander →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
