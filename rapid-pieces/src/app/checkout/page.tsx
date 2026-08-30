'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Shield, CreditCard, Smartphone, Check, Lock, Clock, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card' | 'cash'>('momo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const order = {
    part: 'Alternateur Toyota Hilux 2018',
    seller: 'Nigeria Auto Parts',
    quality: 'Premium Aftermarket',
    price: 120000,
    delivery: 'RAPID NIGERIA',
    deliveryTime: '3-5 jours',
    rapidProtection: 2000,
    deliveryFee: 5000,
  };

  const total = order.price + order.rapidProtection + order.deliveryFee;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 3000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-rp-bg flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full shadow-lg">
          <div className="w-16 h-16 bg-rp-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-rp-success" />
          </div>
          <h2 className="text-xl font-bold text-rp-text mb-2">Paiement confirmé !</h2>
          <p className="text-sm text-rp-text-muted mb-6">
            Votre paiement de {total.toLocaleString()} FCFA est sécurisé en escrow. Le vendeur sera notifié.
          </p>
          <div className="bg-rp-bg rounded-xl p-4 mb-4 text-left">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-rp-text-muted">Pièce</span><span className="font-medium text-rp-text">{order.part}</span></div>
              <div className="flex justify-between"><span className="text-rp-text-muted">Vendeur</span><span className="font-medium text-rp-text">{order.seller}</span></div>
              <div className="flex justify-between"><span className="text-rp-text-muted">Livraison</span><span className="font-medium text-rp-text">{order.delivery}</span></div>
              <div className="flex justify-between"><span className="text-rp-text-muted">Délai estimé</span><span className="font-medium text-rp-text">{order.deliveryTime}</span></div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 mb-6 flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <p className="text-xs text-purple-700">Rapid Protection active — votre paiement est sécurisé jusqu&apos;à réception</p>
          </div>
          <Link href="/orders" className="block w-full py-3 bg-rp-primary text-white rounded-xl text-sm font-bold text-center">
            Suivre ma commande
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rp-bg">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-rp-border">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/search" className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-rp-text" />
            </Link>
            <h1 className="text-lg font-bold text-rp-text">Paiement sécurisé</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-sm text-rp-text mb-3">📦 Résumé de la commande</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-rp-text-muted">Pièce</span><span className="font-medium text-rp-text">{order.part}</span></div>
            <div className="flex justify-between"><span className="text-rp-text-muted">Qualité</span><span className="font-medium text-rp-text">{order.quality}</span></div>
            <div className="flex justify-between"><span className="text-rp-text-muted">Vendeur</span><span className="font-medium text-rp-text">{order.seller}</span></div>
            <div className="flex justify-between"><span className="text-rp-text-muted">Livraison</span><span className="font-medium text-rp-text">{order.delivery} ({order.deliveryTime})</span></div>
          </div>
        </div>

        {/* Escrow Info */}
        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-sm text-purple-700">Paiement Escrow</h3>
          </div>
          <div className="space-y-2 text-xs text-purple-700">
            <div className="flex items-center gap-2"><Check className="w-3 h-3" /> Votre paiement est sécurisé</div>
            <div className="flex items-center gap-2"><Check className="w-3 h-3" /> Le vendeur est payé après livraison confirmée</div>
            <div className="flex items-center gap-2"><Check className="w-3 h-3" /> Remboursement possible en cas de problème</div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-sm text-rp-text mb-3">💰 Détail du prix</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-rp-text-muted">Pièce</span><span className="text-rp-text">{order.price.toLocaleString()} FCFA</span></div>
            <div className="flex justify-between"><span className="text-rp-text-muted">Livraison {order.delivery}</span><span className="text-rp-text">{order.deliveryFee.toLocaleString()} FCFA</span></div>
            <div className="flex justify-between"><span className="text-rp-text-muted">Rapid Protection</span><span className="text-rp-text">{order.rapidProtection.toLocaleString()} FCFA</span></div>
            <div className="border-t border-rp-border pt-2 flex justify-between">
              <span className="font-bold text-rp-text">Total</span>
              <span className="font-bold text-rp-primary text-lg">{total.toLocaleString()} FCFA</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-sm text-rp-text mb-3">💳 Mode de paiement</h3>
          <div className="space-y-2">
            {[
              { key: 'momo' as const, icon: Smartphone, label: 'Mobile Money', desc: 'Moov Money, MTN Mobile Money', color: 'text-yellow-600' },
              { key: 'card' as const, icon: CreditCard, label: 'Carte bancaire', desc: 'Visa, Mastercard', color: 'text-blue-600' },
              { key: 'cash' as const, icon: Truck, label: 'Paiement à la livraison', desc: 'Payez quand vous recevez', color: 'text-green-600' },
            ].map(method => {
              const Icon = method.icon;
              return (
                <button
                  key={method.key}
                  onClick={() => setPaymentMethod(method.key)}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 text-left ${
                    paymentMethod === method.key ? 'bg-rp-primary/10 border-2 border-rp-primary' : 'bg-rp-bg border-2 border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${method.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-rp-text">{method.label}</p>
                    <p className="text-xs text-rp-text-muted">{method.desc}</p>
                  </div>
                  {paymentMethod === method.key && <Check className="w-5 h-5 text-rp-primary" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full py-4 bg-rp-primary text-white rounded-2xl text-base font-bold shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Traitement en cours...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Payer {total.toLocaleString()} FCFA
            </>
          )}
        </button>

        <p className="text-center text-[10px] text-rp-text-muted pb-10">
          🔒 Paiement sécurisé par Rapid Pièces • Rapid Protection incluse
        </p>
      </div>
    </div>
  );
}
