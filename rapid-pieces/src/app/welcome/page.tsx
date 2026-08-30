'use client';

import Link from 'next/link';
import { Search, Zap, Shield, Lock, CheckCircle2 } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl flex items-center justify-center shadow-xl">
          <span className="text-4xl font-black text-white tracking-tighter">RP</span>
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            RAPID <span className="text-red-600">PIÈCES</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 dark:text-slate-400 mt-2">La bourse des pièces automobiles</p>
          <p className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500 mt-1">Bénin • Cotonou & environs</p>
        </div>
        <div className="space-y-3 pt-4">
          <Link href="/login" className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl text-center transition-all shadow-lg text-lg">
            Se connecter
          </Link>
          <Link href="/" className="block w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-gray-300 text-gray-700 font-bold py-4 rounded-2xl text-center transition-all shadow-sm text-lg">
            Parcourir la boutique
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-2"><Search className="w-6 h-6 text-red-500" /></div>
            <div className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">Recherche</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-2"><Zap className="w-6 h-6 text-red-500" /></div>
            <div className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">Livraison rapide</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-2"><Shield className="w-6 h-6 text-red-500" /></div>
            <div className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">Protection</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 pt-6 text-gray-400 dark:text-slate-500 dark:text-slate-500">
          <span className="text-xs flex items-center gap-1"><Lock className="w-3 h-3" /> Paiement sécurisé</span>
          <span className="text-xs">•</span>
          <span className="text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Vendeurs vérifiés</span>
        </div>
      </div>
    </div>
  );
}
