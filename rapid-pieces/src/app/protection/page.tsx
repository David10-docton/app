'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const protections = [
  {
    icon: '🔒',
    title: 'Escrow Sécurisé',
    desc: "Votre paiement est retenu par Rapid Pièces jusqu'à confirmation de réception. Le vendeur ne reçoit l'argent qu'après validation.",
    color: 'bg-blue-500/10 border-blue-500/30',
  },
  {
    icon: '🔄',
    title: 'Retour Garanti',
    desc: "Retour gratuit sous 7 jours si la pièce ne correspond pas à la description ou n'est pas conforme.",
    color: 'bg-purple-500/10 border-purple-500/30',
  },
  {
    icon: '⚖️',
    title: 'Médiation',
    desc: "En cas de litige, l'équipe Rapid Pièces intervient comme médiateur pour trouver une solution équitable.",
    color: 'bg-yellow-500/10 border-yellow-500/30',
  },
  {
    icon: '🛡️',
    title: 'Garantie Pièce',
    desc: "Chaque pièce achetée bénéficie d'une garantie selon sa classification (OEM : 12 mois, Premium : 6 mois, Standard : 3 mois).",
    color: 'bg-green-500/10 border-green-500/30',
  },
  {
    icon: '✅',
    title: 'Vendeurs Vérifiés',
    desc: "Tous nos vendeurs passent par un processus de vérification KYC. Les badges garantissent leur fiabilité.",
    color: 'bg-emerald-500/10 border-emerald-500/30',
  },
  {
    icon: '📝',
    title: 'Preuve de Livraison',
    desc: "Signature numérique à la livraison. Photo de la pièce installée si souhaité. Traçabilité complète.",
    color: 'bg-orange-500/10 border-orange-500/30',
  },
];

const guarantees = [
  { quality: 'OEM', period: '12 mois', color: 'text-blue-400' },
  { quality: 'Genuine', period: '12 mois', color: 'text-blue-400' },
  { quality: 'Premium Aftermarket', period: '6 mois', color: 'text-purple-400' },
  { quality: 'Standard Aftermarket', period: '3 mois', color: 'text-yellow-400' },
  { quality: 'Reconditionné', period: '3 mois', color: 'text-orange-400' },
  { quality: 'Occasion', period: '1 mois', color: 'text-slate-400' },
];

export default function ProtectionPage() {
  const router = useRouter();
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => router.back()} className="text-slate-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-lg font-bold text-white">Rapid Protection</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Hero */}
        <div className="bg-gradient-to-br from-green-900/40 to-slate-900 rounded-2xl p-6 border border-green-500/20 text-center">
          <div className="text-4xl mb-3">🛡️</div>
          <h2 className="text-xl font-bold text-white mb-2">Rapid Protection</h2>
          <p className="text-sm text-slate-300">Chaque transaction est protégée de bout en bout</p>
        </div>

        {/* Protections */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Ce qui est inclus</h3>
          {protections.map((p, i) => (
            <div key={i} className={`rounded-xl p-4 border ${p.color}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <h4 className="font-bold text-white text-sm">{p.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees by quality */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Garantie par qualité</h3>
          <div className="space-y-2">
            {guarantees.map((g, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                <span className={`text-sm font-medium ${g.color}`}>{g.quality}</span>
                <span className="text-sm text-white font-bold">{g.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Report a problem */}
        <button
          onClick={() => setShowReport(!showReport)}
          className="w-full bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 text-left hover:border-red-500/30 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🚨</span>
              <div>
                <h4 className="font-bold text-white text-sm">Signaler un problème</h4>
                <p className="text-xs text-slate-400">Livrée, non conforme, litige</p>
              </div>
            </div>
            <svg className={`w-5 h-5 text-slate-400 transition-transform ${showReport ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </button>

        {showReport && (
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 space-y-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Type de problème</label>
              <select className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2.5 text-white text-sm">
                <option>Pièce non reçue</option>
                <option>Pièce non conforme</option>
                <option>Pièce défectueuse</option>
                <option>Retard de livraison</option>
                <option>Vendeur non réactif</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Numéro de commande</label>
              <input type="text" placeholder="RP-XXXXX" className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2.5 text-white text-sm" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Description</label>
              <textarea rows={3} className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2.5 text-white text-sm resize-none" placeholder="Décrivez le problème..." />
            </div>
            <button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all">
              Envoyer le signalement
            </button>
          </div>
        )}

        {/* Escrow explanation */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Comment fonctionne l'Escrow</h3>
          <div className="space-y-4">
            {[
              { step: '1', icon: '💳', title: 'Vous payez', desc: "L'argent est sécurisé par Rapid Pièces" },
              { step: '2', icon: '📦', title: 'Le vendeur expédie', desc: "Confirmation de la livraison par le livreur" },
              { step: '3', icon: '✍️', title: 'Vous confirmez', desc: 'Signature ou validation de réception' },
              { step: '4', icon: '💰', title: 'Le vendeur reçoit', desc: "Libération de l'escrow au vendeur" },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold text-sm shrink-0">
                  {s.step}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{s.icon}</span>
                    <h4 className="font-bold text-white text-sm">{s.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav placeholder */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 h-16" />
    </div>
  );
}
