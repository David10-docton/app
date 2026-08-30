'use client';

import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
      {/* Hero */}
      <div className="text-center space-y-6 max-w-md">
        {/* Logo */}
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-600/30">
          <span className="text-4xl font-black text-white tracking-tighter">RP</span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            RAPID <span className="text-red-500">PIÈCES</span>
          </h1>
          <p className="text-sm text-slate-400 mt-2">La bourse des pièces automobiles</p>
          <p className="text-xs text-slate-500 mt-1">Bénin • Cotonou & environs</p>
        </div>

        {/* CTA buttons */}
        <div className="space-y-3 pt-4">
          <Link
            href="/login"
            className="block w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-2xl text-center transition-all shadow-lg shadow-red-600/20 text-lg"
          >
            Se connecter
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 pt-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🔍</span>
            </div>
            <div className="text-[10px] text-slate-400">Recherche</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="text-[10px] text-slate-400">Livraison rapide</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🛡️</span>
            </div>
            <div className="text-[10px] text-slate-400">Protection</div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 pt-6 text-slate-500">
          <span className="text-xs">🔒 Paiement sécurisé</span>
          <span className="text-xs">•</span>
          <span className="text-xs">✅ Vendeurs vérifiés</span>
        </div>
      </div>
    </div>
  );
}
