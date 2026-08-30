'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Star, Shield, Clock, MapPin, Check, Info, ChevronDown, Truck, Award } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { mockOffers } from '@/lib/mockData';

const qualityColorMap: Record<string, string> = {
  'OEM': 'bg-red-100 text-red-700',
  'Genuine': 'bg-blue-100 text-blue-700',
  'Premium Aftermarket': 'bg-purple-100 text-purple-700',
  'Standard Aftermarket': 'bg-gray-100 text-gray-700',
  'Used': 'bg-yellow-100 text-yellow-700',
  'Reconditioned': 'bg-green-100 text-green-700',
};

export default function OffersPage() {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  // Get offers for request r2 (alternateur Hilux)
  const offers = mockOffers.filter(o => o.requestId === 'r2');
  const sortedOffers = [...offers].sort((a, b) => b.rapidScore - a.rapidScore);

  const rapidScoreBreakdown = (score: number) => ({
    price: Math.min(30, Math.round(score * 0.33)),
    quality: Math.min(25, Math.round(score * 0.27)),
    availability: Math.min(20, Math.round(score * 0.22)),
    reputation: Math.min(15, Math.round(score * 0.16)),
    delivery: Math.min(10, Math.round(score * 0.11)),
  });

  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-rp-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/search" className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-rp-text" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-rp-text">Offres disponibles</h1>
              <p className="text-xs text-rp-text-muted">Alternateur Toyota Hilux 2018</p>
            </div>
          </div>
          <div className="bg-rp-primary/10 rounded-xl px-3 py-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-rp-primary" />
            <p className="text-xs text-rp-primary">Classement par Rapid Score — meilleure offre globale</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-3 pb-20">
        {/* Rapid Price Reference */}
        <div className="bg-gradient-to-r from-rp-secondary to-rp-secondary-light rounded-2xl p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4" />
            <span className="text-xs font-semibold">RAPID PRICE — Prix moyen du marché</span>
          </div>
          <p className="text-2xl font-bold">135 000 FCFA</p>
          <p className="text-xs text-white/70 mt-1">Basé sur 12 transactions similaires</p>
        </div>

        {/* Offers */}
        {sortedOffers.map((offer, index) => {
          const breakdown = rapidScoreBreakdown(offer.rapidScore);
          const isExpanded = showDetails === offer.id;
          const isSelected = selectedOffer === offer.id;
          
          return (
            <div
              key={offer.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm transition-all ${
                isSelected ? 'ring-2 ring-rp-primary' : ''
              }`}
            >
              {/* Rank Badge */}
              {index === 0 && (
                <div className="bg-rp-gold/20 px-4 py-1.5 flex items-center gap-2">
                  <span className="text-sm">🏆</span>
                  <span className="text-xs font-bold text-yellow-700">MEILLEURE OFFRE</span>
                </div>
              )}
              
              <div className="p-4">
                {/* Score + Price Row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-rp-primary/10 rounded-xl flex items-center justify-center">
                      <span className="text-lg font-bold text-rp-primary">{offer.rapidScore}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-rp-text">{offer.partName}</p>
                      <p className="text-xs text-rp-text-muted">{offer.sellerName}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 fill-rp-gold text-rp-gold" />
                        <span className="text-xs font-medium">{offer.sellerScore}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full ml-1 ${
                          offer.sellerBadge === 'Top Seller' ? 'bg-rp-gold/20 text-yellow-700' :
                          offer.sellerBadge === 'Premium Seller' ? 'bg-purple-100 text-purple-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>{offer.sellerBadge}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-rp-primary">{offer.price.toLocaleString()}</p>
                    <p className="text-[10px] text-rp-text-muted">FCFA</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${qualityColorMap[offer.quality] || 'bg-gray-100 text-gray-700'}`}>
                    {offer.quality}
                  </span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-green-50 text-green-700 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {offer.deliveryTime}
                  </span>
                  {offer.warranty && (
                    <span className="text-[10px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 flex items-center gap-1">
                      <Shield className="w-3 h-3" /> {offer.warranty}
                    </span>
                  )}
                </div>

                {/* Rapid Score Breakdown (expandable) */}
                <button 
                  onClick={() => setShowDetails(isExpanded ? null : offer.id)}
                  className="w-full bg-rp-bg rounded-xl p-3 text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-rp-text">Détails Rapid Score</span>
                    <ChevronDown className={`w-4 h-4 text-rp-text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {/* Score bars */}
                  <div className="space-y-1.5">
                    {[
                      { label: 'Prix', value: breakdown.price, max: 30, color: '#E63946' },
                      { label: 'Qualité', value: breakdown.quality, max: 25, color: '#1D3557' },
                      { label: 'Disponibilité', value: breakdown.availability, max: 20, color: '#457B9D' },
                      { label: 'Réputation', value: breakdown.reputation, max: 15, color: '#2D6A4F' },
                      { label: 'Délai', value: breakdown.delivery, max: 10, color: '#F4A261' },
                    ].map(bar => (
                      <div key={bar.label} className="flex items-center gap-2">
                        <span className="text-[10px] text-rp-text-muted w-16">{bar.label}</span>
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full score-bar"
                            style={{ width: `${(bar.value / bar.max) * 100}%`, backgroundColor: bar.color, '--score-width': `${(bar.value / bar.max) * 100}%` } as React.CSSProperties}
                          />
                        </div>
                        <span className="text-[10px] font-medium text-rp-text w-6 text-right">{bar.value}/{bar.max}</span>
                      </div>
                    ))}
                  </div>
                </button>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedOffer(offer.id)}
                  className={`w-full mt-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-rp-success text-white'
                      : 'bg-rp-primary text-white'
                  }`}
                >
                  {isSelected ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" /> Offre sélectionnée
                    </span>
                  ) : (
                    'Choisir cette offre'
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {/* Comparison Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-sm text-rp-text mb-3">📊 Résumé comparatif</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-rp-text-muted border-b border-rp-border">
                  <th className="text-left py-2">Option</th>
                  <th className="text-right py-2">Prix</th>
                  <th className="text-center py-2">Qualité</th>
                  <th className="text-center py-2">Délai</th>
                  <th className="text-right py-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {sortedOffers.map((offer, i) => (
                  <tr key={offer.id} className={`border-b border-rp-border/50 ${selectedOffer === offer.id ? 'bg-rp-primary/5' : ''}`}>
                    <td className="py-2 font-medium text-rp-text">{String.fromCharCode(65 + i)}</td>
                    <td className="py-2 text-right font-semibold text-rp-primary">{(offer.price / 1000).toFixed(0)}k</td>
                    <td className="py-2 text-center">{offer.quality.split(' ')[0]}</td>
                    <td className="py-2 text-center">{offer.deliveryTime}</td>
                    <td className="py-2 text-right font-bold">{offer.rapidScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rapid Protection Banner */}
        {selectedOffer && (
          <div className="bg-rp-success/10 rounded-2xl p-4 border border-rp-success/20 slide-up">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-rp-success flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-rp-text">Rapid Protection active</p>
                <p className="text-xs text-rp-text-muted">Garantie de conformité, retour, médiation inclus</p>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full mt-3 py-3 bg-rp-success text-white rounded-xl text-sm font-bold text-center"
            >
              Procéder au paiement sécurisé
            </Link>
          </div>
        )}
      </div>

      <BottomNav role="buyer" />
    </div>
  );
}
