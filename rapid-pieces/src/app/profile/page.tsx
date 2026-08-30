'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell, Car, Clock, Star, Gift, MessageCircle, Settings, ChevronRight, Plus, Trash2, Edit3 } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const vehicles = [
  { id: 1, brand: 'Toyota', model: 'Corolla', year: 2018, motor: '1.8 Essence', plate: 'CA-2018-4521' },
  { id: 2, brand: 'Honda', model: 'Civic', year: 2020, motor: '1.5 Turbo', plate: 'CA-2020-1187' },
];

const purchaseHistory = [
  { id: 1, part: 'Plaquettes de frein avant', date: '2025-06-10', amount: 45000, seller: 'BigMoteurs', vehicle: 'Toyota Corolla 2018' },
  { id: 2, part: 'Filtre à huile', date: '2025-05-22', amount: 12000, seller: 'Sotra Pièces', vehicle: 'Toyota Corolla 2018' },
  { id: 3, part: 'Amortisseur arrière gauche', date: '2025-04-15', amount: 85000, seller: 'Diallo & Frères', vehicle: 'Honda Civic 2020' },
];

const badges = [
  { icon: '⭐', name: 'Top Buyer', desc: 'Plus de 10 achats' },
  { icon: '✅', name: 'Fidèle', desc: '3 mois actif' },
  { icon: '⚡', name: 'Rapide', desc: 'Temps de réponse < 5min' },
];

const menuItems = [
  { icon: Bell, label: 'Notifications', desc: '3 nouvelles alertes', href: '/orders', color: 'text-blue-500' },
  { icon: Car, label: 'Mes véhicules', desc: '2 véhicules enregistrés', href: '/vehicle-history', color: 'text-purple-500' },
  { icon: Clock, label: 'Historique', desc: '3 achats précédents', href: '/orders', color: 'text-amber-500' },
  { icon: Star, label: 'Évaluations', desc: 'Vos avis donnés', href: '/search', color: 'text-yellow-500' },
  { icon: Gift, label: 'Rapid Points', desc: '2,450 points', href: '/orders', color: 'text-green-500' },
  { icon: MessageCircle, label: 'Support', desc: 'Contacter l\'équipe', href: '/whatsapp-contact', color: 'text-emerald-500' },
  { icon: Settings, label: 'Paramètres', desc: 'Compte et sécurité', href: '/login', color: 'text-gray-500' },
];

export default function BuyerProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'menu' | 'vehicles' | 'history'>('menu');
  const [showAddVehicle, setShowAddVehicle] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 backdrop-blur-xl border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black text-red-500">RAPID</span>
            <span className="text-xl font-black text-gray-900 dark:text-white">PIÈCES</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login" className="text-xs text-blue-500 hover:text-blue-600 font-medium">
              Vendeur
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Profile card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-3">
            A
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Mon Profil</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">Acheteur Rapide Pièces</p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">12</div>
              <div className="text-xs text-gray-400">Achats</div>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-slate-600" />
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-500">2,450</div>
              <div className="text-xs text-gray-400">Points</div>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-slate-600" />
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">4.9</div>
              <div className="text-xs text-gray-400">Note</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['menu', 'vehicles', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-slate-700'
              }`}
            >
              {tab === 'menu' ? 'Menu' : tab === 'vehicles' ? 'Véhicules' : 'Historique'}
            </button>
          ))}
        </div>

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <div className="space-y-2">
            {menuItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link key={i} href={item.href}
                  className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-600 hover:shadow-md transition-all">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-slate-700 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{item.label}</div>
                    <div className="text-xs text-gray-400">{item.desc}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 dark:text-slate-600" />
                </Link>
              );
            })}
          </div>
        )}

        {/* Vehicles Tab */}
        {activeTab === 'vehicles' && (
          <div className="space-y-3">
            {vehicles.map((v) => (
              <div key={v.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                      <Car className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{v.brand} {v.model}</div>
                      <div className="text-xs text-gray-400">{v.year} • {v.motor}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{v.plate}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-600">
                      <Edit3 className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="w-8 h-8 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/30">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link href="/requests/new" className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-lg text-center transition-all">
                    Commander une pièce
                  </Link>
                  <Link href="/vehicle-history" className="flex-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300 text-xs font-bold py-2.5 rounded-lg text-center transition-all">
                    Historique
                  </Link>
                </div>
              </div>
            ))}
            <button onClick={() => setShowAddVehicle(!showAddVehicle)}
              className="w-full bg-white dark:bg-slate-800 rounded-xl p-4 border border-dashed border-gray-300 dark:border-slate-600 text-center hover:border-red-400 dark:hover:border-red-500 transition-all">
              <Plus className="w-6 h-6 text-gray-400 mx-auto mb-1" />
              <div className="text-sm font-bold text-gray-500">Ajouter un véhicule</div>
            </button>
            {showAddVehicle && (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 space-y-3">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Nouveau véhicule</h3>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Marque" className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white" />
                  <input type="text" placeholder="Modèle" className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="Année" className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white" />
                  <input type="text" placeholder="Motorisation" className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white" />
                </div>
                <input type="text" placeholder="Immatriculation" className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white" />
                <button onClick={() => { alert('Véhicule ajouté ✅'); setShowAddVehicle(false); }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg text-sm transition-all">
                  Ajouter
                </button>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            {purchaseHistory.map((p) => (
              <div key={p.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{p.part}</div>
                      <div className="text-xs text-gray-400">{p.vehicle}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{p.amount.toLocaleString()} FCFA</div>
                    <div className="text-xs text-gray-400">{p.date}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Vendeur: {p.seller}</span>
                  <div className="flex gap-2">
                    <button onClick={() => alert(`Recommander ${p.part}`)}
                      className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
                      Recommander
                    </button>
                    <button onClick={() => alert(`Évaluer ${p.seller}`)}
                      className="text-xs bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 px-3 py-1.5 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all">
                      Évaluer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 z-50">
        <div className="flex items-center justify-around h-16">
          <Link href="/" className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[10px]">Accueil</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="text-[10px]">Rechercher</span>
          </Link>
          <Link href="/requests/new" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center -mt-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </Link>
          <Link href="/orders" className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            <span className="text-[10px]">Commandes</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-red-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-[10px] font-bold">Profil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
