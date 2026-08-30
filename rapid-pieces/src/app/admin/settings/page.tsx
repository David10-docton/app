'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, Shield, Percent, Truck, Globe, Bell, Users, Database, AlertTriangle } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const settingsGroups = [
  {
    title: 'Commission & Paiement',
    items: [
      { icon: Percent, label: 'Taux de commission', value: '5-7%', desc: 'Commission marketplace par catégorie' },
      { icon: Percent, label: 'Frais de sourcing', value: '5-15%', desc: 'Frais pour le sourcing international' },
      { icon: Shield, label: 'Escrow', value: 'Activé', desc: 'Paiement sécurisé pour toutes les transactions' },
    ]
  },
  {
    title: 'Livraison',
    items: [
      { icon: Truck, label: 'RAPID NOW', value: '< 1h', desc: 'Livraison locale express' },
      { icon: Truck, label: 'RAPID CITY', value: '< 2h', desc: 'Livraison intra-ville' },
      { icon: Globe, label: 'RAPID NIGERIA', value: '48h', desc: 'Sourcing depuis le Nigeria' },
      { icon: Globe, label: 'RAPID USA', value: '7 jours', desc: 'Sourcing depuis les États-Unis' },
    ]
  },
  {
    title: 'Système de confiance',
    items: [
      { icon: Shield, label: 'Rapid Protection', value: 'Activé', desc: 'Garantie et retour pour les acheteurs' },
      { icon: Users, label: 'Vérification KYC', value: 'Obligatoire', desc: 'Vérification identitaire des vendeurs' },
      { icon: AlertTriangle, label: 'Détection fraude', value: 'Activée', desc: 'Détection auto des coordonnées masquées' },
    ]
  },
  {
    title: 'Système',
    items: [
      { icon: Database, label: 'Base de données', value: '127 vendeurs', desc: 'Réseau de vendeurs actifs' },
      { icon: Bell, label: 'Notifications', value: 'Temps réel', desc: 'Alertes push pour les nouvelles demandes' },
    ]
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-rp-bg">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-rp-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-rp-text" />
            </Link>
            <h1 className="text-lg font-bold text-rp-text">Configuration</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-6 pb-20">
        {/* Platform Status */}
        <div className="bg-gradient-to-r from-rp-success to-emerald-600 rounded-2xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-semibold">Plateforme active</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-lg font-bold">127</p>
              <p className="text-[10px] text-white/70">Vendeurs</p>
            </div>
            <div>
              <p className="text-lg font-bold">342</p>
              <p className="text-[10px] text-white/70">Acheteurs</p>
            </div>
            <div>
              <p className="text-lg font-bold">99.9%</p>
              <p className="text-[10px] text-white/70">Uptime</p>
            </div>
          </div>
        </div>

        {settingsGroups.map((group) => (
          <div key={group.title}>
            <h2 className="font-bold text-sm text-rp-text mb-3">{group.title}</h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {group.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button key={item.label} className={`w-full px-4 py-3.5 flex items-center gap-3 ${i < group.items.length - 1 ? 'border-b border-rp-border/50' : ''}`}>
                    <div className="w-9 h-9 bg-rp-bg rounded-xl flex items-center justify-center">
                      <Icon className="w-4 h-4 text-rp-text-muted" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-rp-text">{item.label}</p>
                      <p className="text-[10px] text-rp-text-muted">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-rp-secondary">{item.value}</span>
                      <ChevronRight className="w-4 h-4 text-rp-text-muted" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
          <h3 className="font-bold text-sm text-red-700 mb-2">⚠️ Zone dangereuse</h3>
          <div className="space-y-2">
            <button className="w-full py-2.5 bg-white border border-red-200 text-red-700 rounded-xl text-xs font-medium">
              Suspendre la plateforme
            </button>
            <button className="w-full py-2.5 bg-white border border-red-200 text-red-700 rounded-xl text-xs font-medium">
              Exporter toutes les données
            </button>
          </div>
        </div>
      </div>

      <BottomNav role="admin" />
    </div>
  );
}
