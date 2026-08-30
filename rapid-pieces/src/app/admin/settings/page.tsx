'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Shield, Percent, Truck, Globe, Bell, Users, Database, AlertTriangle, ChevronRight, BarChart3, ShoppingBag, Package, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/lib/auth';

const settingsGroups = [
  {
    title: 'Commission & Paiement',
    items: [
      { icon: Percent, label: 'Taux de commission', value: '5-7%', desc: 'Par catégorie' },
      { icon: Percent, label: 'Frais de sourcing', value: '5-15%', desc: 'Sourcing international' },
      { icon: Shield, label: 'Escrow', value: 'Activé', desc: 'Paiement sécurisé' },
    ]
  },
  {
    title: 'Livraison',
    items: [
      { icon: Truck, label: 'RAPID NOW', value: '< 1h', desc: 'Locale express' },
      { icon: Truck, label: 'RAPID CITY', value: '< 2h', desc: 'Intra-ville' },
      { icon: Globe, label: 'RAPID NIGERIA', value: '48h', desc: 'Sourcing Nigeria' },
      { icon: Globe, label: 'RAPID USA', value: '7 jours', desc: 'Sourcing USA' },
    ]
  },
  {
    title: 'Confiance',
    items: [
      { icon: Shield, label: 'Rapide Protection', value: 'Activé', desc: 'Garantie et retour' },
      { icon: Users, label: 'KYC Vendeurs', value: 'Obligatoire', desc: 'Vérification identité' },
      { icon: AlertTriangle, label: 'Détection fraude', value: 'Activée', desc: 'Coordonnées masquées' },
    ]
  },
  {
    title: 'Système',
    items: [
      { icon: Database, label: 'Base de données', value: '127 vendeurs', desc: 'Réseau actif' },
      { icon: Bell, label: 'Notifications', value: 'Temps réel', desc: 'Alertes push' },
    ]
  },
];

export default function AdminSettingsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) router.replace('/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) return <div className="min-h-screen bg-rp-bg flex items-center justify-center"><div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-rp-bg">
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/admin" className="text-slate-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-sm font-bold text-white">Configuration</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 pb-24 lg:pb-6">
        {/* Status */}
        <div className="bg-gradient-to-r from-emerald-600/20 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-emerald-400">Plateforme active</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-lg font-bold text-white">127</p><p className="text-[10px] text-emerald-400/70">Vendeurs</p></div>
            <div><p className="text-lg font-bold text-white">342</p><p className="text-[10px] text-emerald-400/70">Acheteurs</p></div>
            <div><p className="text-lg font-bold text-white">99.9%</p><p className="text-[10px] text-emerald-400/70">Uptime</p></div>
          </div>
        </div>

        {settingsGroups.map(group => (
          <div key={group.title}>
            <h2 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">{group.title}</h2>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
              {group.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button key={item.label} className={`w-full px-4 py-3.5 flex items-center gap-3 ${i < group.items.length - 1 ? 'border-b border-slate-700/50' : ''}`}>
                    <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-medium text-white">{item.label}</p>
                      <p className="text-[10px] text-slate-400">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-emerald-400">{item.value}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-red-400 mb-3">⚠️ Zone dangereuse</h3>
          <div className="space-y-2">
            <button className="w-full py-2.5 bg-slate-800/50 border border-red-500/20 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/10 transition-colors">Suspendre la plateforme</button>
            <button className="w-full py-2.5 bg-slate-800/50 border border-red-500/20 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/10 transition-colors">Exporter toutes les données</button>
          </div>
        </div>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 z-50">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {[
            { href: '/admin', label: 'Dashboard', icon: BarChart3 },
            { href: '/admin/sellers', label: 'Vendeurs', icon: Users },
            { href: '/admin/orders', label: 'Transactions', icon: ShoppingBag },
            { href: '/admin/requests', label: 'Demandes', icon: Package },
            { href: '/admin/settings', label: 'Config', icon: ShieldCheck },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <Link key={tab.href} href={tab.href} className="flex flex-col items-center">
                <Icon className={`w-5 h-5 ${tab.href === '/admin/settings' ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className={`text-[10px] mt-0.5 ${tab.href === '/admin/settings' ? 'text-emerald-400' : 'text-slate-400'}`}>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
