'use client';

import Link from 'next/link';
import { ChevronLeft, Globe, Shield, Clock, Truck, Check, Star, ArrowRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { DELIVERY_OPTIONS } from '@/lib/types';

const corridors = [
  {
    id: 'nigeria',
    flag: '🇳🇬',
    name: 'Rapid Nigeria',
    country: 'Nigeria',
    city: 'Lagos',
    description: 'Premier corridor d\'approvisionnement. Large marché aftermarket avec des milliers de fournisseurs.',
    timeframe: '48-72 heures',
    advantages: ['Prix compétitifs', 'Large choix de pièces', 'Transport terrestre rapide'],
    brands: ['Toyota', 'Honda', 'Nissan', 'Mercedes-Benz', 'BMW'],
    process: [
      'Décrivez votre pièce',
      'Rapid Pièces recherche au Nigeria',
      'Comparaison des fournisseurs',
      'Devis validé par le client',
      'Achat et transport Nigeria → Bénin',
      'Contrôle qualité',
      'Livraison au client'
    ]
  },
  {
    id: 'usa',
    flag: '🇺🇸',
    name: 'Rapid USA',
    country: 'États-Unis',
    city: 'Houston, TX',
    description: 'Pour les pièces OEM rares, les véhicules américains et les pièces spécialisées.',
    timeframe: '7-10 jours',
    advantages: ['Pièces OEM garanties', 'Pièces rares et spécialisées', 'Qualité contrôlée'],
    brands: ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz'],
    process: [
      'Décrivez votre pièce',
      'Rapid Pièces recherche aux USA',
      'Vérification de la référence',
      'Devis avec transport international',
      'Achat et expédition aérienne',
      'Dédouanement',
      'Livraison au client'
    ]
  }
];

export default function SourcingPage() {
  return (
    <div className="min-h-screen bg-rp-bg">
      <div className="bg-gradient-to-r from-rp-secondary to-rp-secondary-light text-white px-4 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-white" />
            </Link>
            <h1 className="text-xl font-bold">Sourcing International</h1>
          </div>
          <p className="text-white/80 text-sm">
            Rapid Pièces devient votre agent d&apos;achat international. Trouvez des pièces au Nigeria, aux États-Unis et bientôt dans le monde entier.
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6 pb-20">
        {/* How it works */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-sm text-rp-text mb-3">Comment ça marche ?</h2>
          <div className="space-y-3">
            {['Le client décrit la pièce dont il a besoin', 'Rapid Pièces recherche les fournisseurs', 'Comparaison des offres et des prix', 'Le client valide et paie', 'Rapid Pièces organise le transport', 'Livraison au client'].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-rp-primary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-xs text-rp-text">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Corridors */}
        {corridors.map((corridor) => (
          <div key={corridor.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-rp-primary to-rp-primary-dark p-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{corridor.flag}</span>
                <div>
                  <h3 className="font-bold text-white">{corridor.name}</h3>
                  <p className="text-white/70 text-xs">{corridor.country} • {corridor.city}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-xs text-rp-text-muted mb-3">{corridor.description}</p>
              
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-rp-primary" />
                <span className="text-sm font-semibold text-rp-text">Délai: {corridor.timeframe}</span>
              </div>

              <div className="mb-3">
                <p className="text-xs font-semibold text-rp-text-muted mb-2">Avantages</p>
                <div className="space-y-1">
                  {corridor.advantages.map(adv => (
                    <div key={adv} className="flex items-center gap-2 text-xs text-rp-text">
                      <Check className="w-3 h-3 text-rp-success" /> {adv}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <p className="text-xs font-semibold text-rp-text-muted mb-2">Marques disponibles</p>
                <div className="flex flex-wrap gap-1.5">
                  {corridor.brands.map(brand => (
                    <span key={brand} className="text-[10px] bg-rp-bg text-rp-text px-2 py-0.5 rounded-full">{brand}</span>
                  ))}
                </div>
              </div>

              <Link 
                href="/requests/new"
                className="block w-full py-3 bg-rp-primary text-white rounded-xl text-sm font-semibold text-center"
              >
                Demander une pièce depuis {corridor.country}
              </Link>
            </div>
          </div>
        ))}

        {/* Trust Banner */}
        <div className="bg-rp-success/10 rounded-2xl p-4 border border-rp-success/20">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-rp-success flex-shrink-0" />
            <div>
              <h3 className="font-bold text-sm text-rp-text">Rapid Protection International</h3>
              <p className="text-xs text-rp-text-muted mt-0.5">Chaque achat international est couvert. Paiement en escrow, contrôle qualité, garantie de conformité.</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav role="buyer" />
    </div>
  );
}
