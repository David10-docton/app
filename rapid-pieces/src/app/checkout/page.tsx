'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [step, setStep] = useState(1);

  const orderSummary = {
    part: 'Plaquettes de frein avant',
    quality: 'OEM',
    seller: 'BigMoteurs',
    price: 45000,
    delivery: 'RAPID CITY',
    deliveryFee: 3000,
    total: 48000,
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} className="text-slate-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-lg font-bold text-white">Paiement</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Progress */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step >= s ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                {s}
              </div>
              {s < 3 && <div className={`flex-1 h-0.5 mx-2 ${step > s ? 'bg-red-600' : 'bg-slate-800'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>Résumé</span>
          <span>Paiement</span>
          <span>Confirmation</span>
        </div>

        {/* Step 1: Summary */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50 space-y-3">
              <h3 className="text-sm font-semibold text-white">Résumé de la commande</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Pièce</span>
                  <span className="text-white font-bold">{orderSummary.part}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Qualité</span>
                  <span className="text-blue-400">{orderSummary.quality}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Vendeur</span>
                  <span className="text-white">{orderSummary.seller}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Livraison</span>
                  <span className="text-red-400 font-bold">{orderSummary.delivery}</span>
                </div>
                <hr className="border-slate-700/50" />
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Pièce</span>
                  <span className="text-white">{orderSummary.price.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Livraison</span>
                  <span className="text-white">{orderSummary.deliveryFee.toLocaleString()} FCFA</span>
                </div>
                <hr className="border-slate-700/50" />
                <div className="flex justify-between text-lg">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-white font-black">{orderSummary.total.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>

            {/* Rapid Protection */}
            <div className="bg-green-900/20 rounded-xl p-4 border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🛡️</span>
                <span className="text-sm font-bold text-green-400">Rapid Protection active</span>
              </div>
              <p className="text-xs text-green-300/70">Votre paiement est sécurisé par Escrow. L'argent est retenu jusqu'à confirmation de réception.</p>
            </div>

            <button onClick={() => setStep(2)} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all">
              Continuer →
            </button>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Méthode de paiement</h3>
            
            {[
              { id: 'momo', icon: '📱', name: 'Mobile Money', desc: 'MTN MoMo, Moov Money' },
              { id: 'card', icon: '💳', name: 'Carte bancaire', desc: 'Visa, Mastercard' },
              { id: 'cod', icon: '💵', name: 'Paiement à la livraison', desc: 'Payez quand vous recevez' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setPaymentMethod(m.id)}
                className={`w-full rounded-xl p-4 border text-left transition-all ${
                  paymentMethod === m.id
                    ? 'bg-red-600/10 border-red-500/50'
                    : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <div className="text-sm font-bold text-white">{m.name}</div>
                    <div className="text-xs text-slate-400">{m.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ml-auto flex items-center justify-center ${paymentMethod === m.id ? 'border-red-500 bg-red-500' : 'border-slate-600'}`}>
                    {paymentMethod === m.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
              </button>
            ))}

            {paymentMethod === 'momo' && (
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 space-y-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Numéro Mobile Money</label>
                  <input type="tel" placeholder="+229 XX XX XX XX" className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2.5 text-white text-sm" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Nom du titulaire</label>
                  <input type="text" placeholder="Nom complet" className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2.5 text-white text-sm" />
                </div>
              </div>
            )}

            <button onClick={() => setStep(3)} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all">
              Payer {orderSummary.total.toLocaleString()} FCFA 🔒
            </button>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-4 text-center">
            <div className="bg-green-900/20 rounded-2xl p-8 border border-green-500/20">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-white mb-2">Paiement confirmé !</h2>
              <p className="text-sm text-slate-400">Votre commande est en cours de traitement</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">N° Commande</span>
                <span className="text-white font-mono font-bold">RP-2025-00847</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Montant</span>
                <span className="text-white font-bold">{orderSummary.total.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Escrow</span>
                <span className="text-yellow-400 font-bold">🔒 Sécurisé</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Livraison estimée</span>
                <span className="text-green-400 font-bold">Aujourd'hui - 2h</span>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🎁</span>
                <span className="text-sm font-bold text-yellow-400">+480 Rapid Points gagnés !</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '65%' }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">2,930 / 4,500 points — Prochain palier : Silver</p>
            </div>

            <div className="flex gap-3">
              <Link href="/orders" className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl text-center transition-all">
                Suivre la commande
              </Link>
              <Link href="/buyer" className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-center transition-all">
                Retour accueil
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
