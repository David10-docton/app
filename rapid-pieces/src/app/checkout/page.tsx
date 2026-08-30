'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, CreditCard, Banknote, Smartphone, Lock, CheckCircle2, Gift } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} className="text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">Paiement</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Progress */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step >= s ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400 dark:text-slate-500 dark:text-slate-500'}`}>
                {s}
              </div>
              {s < 3 && <div className={`flex-1 h-0.5 mx-2 ${step > s ? 'bg-red-600' : 'bg-gray-100'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">
          <span>Résumé</span>
          <span>Paiement</span>
          <span>Confirmation</span>
        </div>

        {/* Step 1: Summary */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-white backdrop-blur-sm rounded-2xl p-5 border border-gray-200 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Résumé de la commande</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 dark:text-slate-500 dark:text-slate-500">Pièce</span>
                  <span className="text-gray-900 dark:text-white font-bold">{orderSummary.part}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 dark:text-slate-500 dark:text-slate-500">Qualité</span>
                  <span className="text-blue-400">{orderSummary.quality}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 dark:text-slate-500 dark:text-slate-500">Vendeur</span>
                  <span className="text-gray-900 dark:text-white">{orderSummary.seller}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 dark:text-slate-500 dark:text-slate-500">Livraison</span>
                  <span className="text-red-400 font-bold">{orderSummary.delivery}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 dark:text-slate-500 dark:text-slate-500">Pièce</span>
                  <span className="text-gray-900 dark:text-white">{orderSummary.price.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 dark:text-slate-500 dark:text-slate-500">Livraison</span>
                  <span className="text-gray-900 dark:text-white">{orderSummary.deliveryFee.toLocaleString()} FCFA</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg">
                  <span className="text-gray-900 dark:text-white font-bold">Total</span>
                  <span className="text-gray-900 dark:text-white font-black">{orderSummary.total.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>

            {/* Rapid Protection */}
            <div className="bg-green-900/20 rounded-xl p-4 border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg"><Shield className="w-5 h-5" /></span>
                <span className="text-sm font-bold text-green-400">Rapid Protection active</span>
              </div>
              <p className="text-xs text-green-300/70">Votre paiement est sécurisé par Escrow. L'argent est retenu jusqu'à confirmation de réception.</p>
            </div>

            <button onClick={() => setStep(2)} className="w-full bg-red-600 hover:bg-red-500 text-gray-900 dark:text-white font-bold py-3 rounded-xl transition-all">
              Continuer →
            </button>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Méthode de paiement</h3>
            
            {[
              { id: 'momo', icon: <Smartphone className="w-6 h-6" />, name: 'Mobile Money', desc: 'MTN MoMo, Moov Money' },
              { id: 'card', icon: <CreditCard className="w-6 h-6" />, name: 'Carte bancaire', desc: 'Visa, Mastercard' },
              { id: 'cod', icon: <Banknote className="w-6 h-6" />, name: 'Paiement à la livraison', desc: 'Payez quand vous recevez' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setPaymentMethod(m.id)}
                className={`w-full rounded-xl p-4 border text-left transition-all ${
                  paymentMethod === m.id
                    ? 'bg-red-600/10 border-red-500/50'
                    : 'bg-white border-gray-200 hover:border-gray-300 dark:hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  {m.icon}
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">{m.name}</div>
                    <div className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500">{m.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ml-auto flex items-center justify-center ${paymentMethod === m.id ? 'border-red-500 bg-red-500' : 'border-gray-300'}`}>
                    {paymentMethod === m.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
              </button>
            ))}

            {paymentMethod === 'momo' && (
              <div className="bg-white backdrop-blur-sm rounded-xl p-4 border border-gray-200 space-y-3">
                <div>
                  <label className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Numéro Mobile Money</label>
                  <input type="tel" placeholder="+229 XX XX XX XX" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Nom du titulaire</label>
                  <input type="text" placeholder="Nom complet" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 dark:text-white text-sm" />
                </div>
              </div>
            )}

            <button onClick={() => setStep(3)} className="w-full bg-red-600 hover:bg-red-500 text-gray-900 dark:text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-1.5">
              <Lock className="w-4 h-4" /> Payer {orderSummary.total.toLocaleString()} FCFA
            </button>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-4 text-center">
            <div className="bg-green-900/20 rounded-2xl p-8 border border-green-500/20">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Paiement confirmé !</h2>
              <p className="text-sm text-gray-400 dark:text-slate-500 dark:text-slate-500">Votre commande est en cours de traitement</p>
            </div>

            <div className="bg-white backdrop-blur-sm rounded-xl p-4 border border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 dark:text-slate-500 dark:text-slate-500">N° Commande</span>
                <span className="text-gray-900 dark:text-white font-mono font-bold">RP-2025-00847</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 dark:text-slate-500 dark:text-slate-500">Montant</span>
                <span className="text-gray-900 dark:text-white font-bold">{orderSummary.total.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 dark:text-slate-500 dark:text-slate-500">Escrow</span>
                <span className="text-yellow-400 font-bold inline-flex items-center gap-1"><Lock className="w-3 h-3" /> Sécurisé</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 dark:text-slate-500 dark:text-slate-500">Livraison estimée</span>
                <span className="text-green-400 font-bold">Aujourd'hui - 2h</span>
              </div>
            </div>

            <div className="bg-white backdrop-blur-sm rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg"><Gift className="w-5 h-5" /></span>
                <span className="text-sm font-bold text-yellow-400">+480 Rapid Points gagnés !</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '65%' }} />
              </div>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500 mt-1">2,930 / 4,500 points — Prochain palier : Silver</p>
            </div>

            <div className="flex gap-3">
              <Link href="/orders" className="flex-1 bg-red-600 hover:bg-red-500 text-gray-900 dark:text-white font-bold py-3 rounded-xl text-center transition-all">
                Suivre la commande
              </Link>
              <Link href="/" className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 dark:text-white font-bold py-3 rounded-xl text-center transition-all">
                Retour accueil
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
