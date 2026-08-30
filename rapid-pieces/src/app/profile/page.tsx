'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const vehicles = [
  { brand: 'Toyota', model: 'Corolla', year: 2018, motor: '1.8 Essence', plate: 'CA-2018-4521' },
  { brand: 'Honda', model: 'Civic', year: 2020, motor: '1.5 Turbo', plate: 'CA-2020-1187' },
];

const purchaseHistory = [
  { part: 'Plaquettes de frein avant', date: '2025-06-10', amount: 45000, seller: 'BigMoteurs' },
  { part: 'Filtre à huile', date: '2025-05-22', amount: 12000, seller: 'Sotra Pièces' },
  { part: 'Amortisseur arrière gauche', date: '2025-04-15', amount: 85000, seller: 'Diallo & Frères' },
];

const badges = [
  { icon: '⭐', name: 'Top Buyer', desc: 'Plus de 10 achats' },
  { icon: '✅', name: 'Fidèle', desc: '3 mois actif' },
  { icon: '⚡', name: 'Rapide', desc: 'Temps de réponse < 5min' },
];

const menu = [
  { icon: '🔔', label: 'Notifications', desc: 'Alertes et promotions' },
  { icon: '🚗', label: 'Mes véhicules', desc: 'Gérer vos véhicules' },
  { icon: '📋', label: 'Historique', desc: 'Achats précédents' },
  { icon: '⭐', label: 'Évaluations', desc: 'Vos avis donnés' },
  { icon: '🎁', label: 'Rapid Points', desc: 'Vos points fidélité' },
  { icon: '💬', label: 'Support', desc: "Contacter l'équipe" },
  { icon: '⚙️', label: 'Paramètres', desc: 'Compte et sécurité' },
];

export default function BuyerProfilePage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'menu' | 'vehicles' | 'history'>('menu');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black text-red-500">RAPID</span>
            <span className="text-xl font-black text-gray-900 dark:text-white">PIÈCES</span>
          </Link>
          <Link href="/login" className="text-xs text-blue-400 hover:text-blue-300">
            Espace Vendeur
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Profile card */}
        <div className="bg-white backdrop-blur-sm rounded-2xl p-6 border border-gray-200 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-3xl font-bold text-gray-900 dark:text-white mx-auto mb-3">
            {'A'}
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">Mon Profil</h2>
          <p className="text-sm text-gray-400 dark:text-slate-500 dark:text-slate-500">Acheteur Rapide Pièces</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">12</div>
              <div className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500">Achats</div>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-400">2,450</div>
              <div className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500">Points</div>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">4.9</div>
              <div className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500">Note</div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-400 dark:text-slate-500 dark:text-slate-500 uppercase tracking-wide mb-3">Vos badges</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {badges.map((b, i) => (
              <div key={i} className="shrink-0 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 text-center min-w-[100px]">
                <div className="text-2xl mb-1">{b.icon}</div>
                <div className="text-xs font-bold text-gray-900 dark:text-white dark:text-white">{b.name}</div>
                <div className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500 mt-0.5">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['menu', 'vehicles', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-50 text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white'
              }`}
            >
              {tab === 'menu' ? 'Menu' : tab === 'vehicles' ? 'Véhicules' : 'Historique'}
            </button>
          ))}
        </div>

        {/* Menu tab */}
        {activeTab === 'menu' && (
          <div className="space-y-2">
            {menu.map((m, i) => (
              <div key={i} className="bg-white backdrop-blur-sm rounded-xl p-4 border border-gray-200 flex items-center gap-3 hover:border-gray-300 dark:hover:border-slate-500 transition-all cursor-pointer">
                <span className="text-xl">{m.icon}</span>
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">{m.label}</div>
                  <div className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500">{m.desc}</div>
                </div>
                <svg className="w-4 h-4 text-gray-400 dark:text-slate-500 dark:text-slate-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            ))}
          </div>
        )}

        {/* Vehicles tab */}
        {activeTab === 'vehicles' && (
          <div className="space-y-3">
            {vehicles.map((v, i) => (
              <div key={i} className="bg-white backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚗</span>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">{v.brand} {v.model}</div>
                      <div className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500">{v.year} • {v.motor}</div>
                      <div className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500 mt-0.5">{v.plate}</div>
                    </div>
                  </div>
                  <button className="text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link href="/requests/new" className="flex-1 bg-red-600 hover:bg-red-500 text-gray-900 dark:text-white text-xs font-bold py-2 rounded-lg text-center transition-all">
                    Commander une pièce
                  </Link>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 dark:text-slate-300 dark:text-slate-300 text-xs font-bold px-3 py-2 rounded-lg transition-all">
                    Historique
                  </button>
                </div>
              </div>
            ))}
            <button className="w-full bg-white backdrop-blur-sm rounded-xl p-4 border border-dashed border-gray-200 text-center hover:border-red-500/30 transition-all">
              <span className="text-2xl">➕</span>
              <div className="text-sm font-bold text-gray-400 dark:text-slate-500 dark:text-slate-500 mt-1">Ajouter un véhicule</div>
            </button>
          </div>
        )}

        {/* History tab */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            {purchaseHistory.map((p, i) => (
              <div key={i} className="bg-white backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">{p.part}</div>
                    <div className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500 mt-0.5">Vendeur: {p.seller}</div>
                    <div className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500 mt-0.5">{p.date}</div>
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">{p.amount.toLocaleString()} FCFA</div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 bg-gray-50 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 dark:text-slate-300 text-xs font-bold py-2 rounded-lg transition-all">
                    Recommander
                  </button>
                  <button className="flex-1 bg-gray-50 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 dark:text-slate-300 text-xs font-bold py-2 rounded-lg transition-all">
                    Avis
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom nav placeholder */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white backdrop-blur-xl border-t border-gray-200 h-16" />
    </div>
  );
}
