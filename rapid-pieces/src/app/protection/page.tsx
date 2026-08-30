'use client';

import Link from 'next/link';
import { ChevronLeft, Shield, CheckCircle, ArrowLeft, MessageSquare, RotateCcw, Lock, Eye } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const protections = [
  {
    icon: Shield,
    title: 'Garantie de conformité',
    description: 'La pièce reçue correspond à la description. Sinon, retour ou remboursement possible.',
    color: 'text-rp-success',
    bgColor: 'bg-rp-success/10'
  },
  {
    icon: RotateCcw,
    title: 'Retour possible',
    description: 'Si la pièce ne convient pas, vous pouvez la retourner selon les conditions du vendeur.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: Lock,
    title: 'Paiement sécurisé (Escrow)',
    description: 'Votre argent est conservé en sécurité. Le vendeur est payé uniquement après confirmation de réception.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: MessageSquare,
    title: 'Médiation',
    description: 'En cas de litige, l\'équipe Rapid Pièces intervient pour trouver une solution équitable.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  {
    icon: Eye,
    title: 'Inspection avant livraison',
    description: 'Pour les pièces sensibles, Rapid Pièces peut effectuer un contrôle avant acheminement.',
    color: 'text-rp-primary',
    bgColor: 'bg-rp-primary/10'
  },
  {
    icon: CheckCircle,
    title: 'Preuve de transaction',
    description: 'Chaque transaction est enregistrée. Vous avez une trace officielle de votre achat.',
    color: 'text-rp-secondary',
    bgColor: 'bg-rp-secondary/10'
  }
];

const steps = [
  { step: 1, title: 'Commande', desc: 'Vous sélectionnez une offre et payez via Rapid Pièces' },
  { step: 2, title: 'Escrow', desc: 'Votre paiement est sécurisé en escrow' },
  { step: 3, title: 'Expédition', desc: 'Le vendeur prépare et expédie la pièce' },
  { step: 4, title: 'Livraison', desc: 'Vous recevez la pièce' },
  { step: 5, title: 'Confirmation', desc: 'Vous confirmez la conformité' },
  { step: 6, title: 'Paiement vendeur', desc: 'Le vendeur reçoit son paiement' },
];

export default function ProtectionPage() {
  return (
    <div className="min-h-screen bg-rp-bg">
      <div className="bg-gradient-to-r from-rp-success to-emerald-600 text-white px-4 pt-12 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-white" />
            </Link>
            <h1 className="text-xl font-bold">Rapid Protection</h1>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10" />
            <div>
              <p className="text-sm text-white/90 leading-relaxed">
                Chaque transaction via Rapid Pièces est protégée. Vous achetez en toute confiance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4 pb-20">
        {/* Protections */}
        {protections.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="bg-white rounded-2xl p-4 shadow-sm flex gap-3">
              <div className={`w-10 h-10 ${p.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${p.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-rp-text">{p.title}</h3>
                <p className="text-xs text-rp-text-muted mt-0.5 leading-relaxed">{p.description}</p>
              </div>
            </div>
          );
        })}

        {/* Process Flow */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-sm text-rp-text mb-4">🔄 Processus de paiement sécurisé</h3>
          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 bg-rp-success rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {s.step}
                  </div>
                  {i < steps.length - 1 && <div className="w-0.5 h-6 bg-rp-success/20 mt-1" />}
                </div>
                <div className="pt-0.5">
                  <p className="text-sm font-medium text-rp-text">{s.title}</p>
                  <p className="text-xs text-rp-text-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Anti-counterfeiting */}
        <div className="bg-rp-primary/5 rounded-2xl p-4 border border-rp-primary/20">
          <h3 className="font-bold text-sm text-rp-text mb-2">🛡️ Protection contre les faux produits</h3>
          <div className="space-y-2 text-xs text-rp-text-muted">
            <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-rp-success" /> Photo obligatoire pour certaines pièces</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-rp-success" /> Référence et marque obligatoires</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-rp-success" /> Classification qualité standardisée (OEM, Genuine, Premium...)</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-rp-success" /> Vendeurs vérifiés uniquement pour les pièces sensibles</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-rp-success" /> Inspection possible avant livraison</div>
          </div>
        </div>

        {/* Rapid Seller Score */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-sm text-rp-text mb-2">⭐ Rapid Seller Score</h3>
          <p className="text-xs text-rp-text-muted mb-3">
            Chaque vendeur est noté selon son historique de transactions. Plus le score est élevé, plus la confiance est grande.
          </p>
          <div className="space-y-2">
            {[
              { badge: 'New Seller', level: 1, color: 'bg-gray-100 text-gray-600' },
              { badge: 'Rapid Seller', level: 2, color: 'bg-blue-100 text-blue-700' },
              { badge: 'Verified Seller', level: 3, color: 'bg-rp-gold/20 text-yellow-700' },
              { badge: 'Premium Seller', level: 4, color: 'bg-purple-100 text-purple-700' },
              { badge: 'Top Seller', level: 5, color: 'bg-rp-primary/10 text-rp-primary' },
            ].map((b) => (
              <div key={b.badge} className="flex items-center gap-3">
                <span className="text-xs font-bold text-rp-text-muted w-4">{b.level}</span>
                <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${b.color}`}>{b.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav role="buyer" />
    </div>
  );
}
