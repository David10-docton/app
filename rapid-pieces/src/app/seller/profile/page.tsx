'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Star, Shield, Bell, TrendingUp, Award, MapPin, Phone, LogOut, Store, Package, DollarSign, ChevronRight, Settings, HelpCircle, Trophy } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function SellerProfilePage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'seller')) router.replace('/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) return <div className="min-h-screen bg-rp-bg flex items-center justify-center"><div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <header className="bg-gradient-to-b from-blue-600/20 to-transparent">
        <div className="max-w-2xl mx-auto px-4 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/seller" className="text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white dark:text-white flex-1">Mon profil</h1>
            <button onClick={logout} className="text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-red-600"><LogOut className="w-4 h-4" /></button>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-gray-900 dark:text-white text-2xl font-bold shadow-lg shadow-blue-600/30">AP</div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">Auto Pièces Cotonou</h2>
              <p className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500">Marché Dantokpa, Cotonou</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Verified Seller
                </span>
                <span className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">Depuis Juin 2024</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 space-y-4 pb-24 lg:pb-6">
        {/* Rapid Seller Score */}
        <section className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">Rapid Seller Score</h3>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400/20 to-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white">4.8</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/30 text-amber-400/30'}`} />)}
              </div>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">Basé sur 342 transactions</p>
              <span className="text-[9px] px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full font-medium flex items-center gap-1"><Trophy className="w-3 h-3" /> TOP 5% vendeurs</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              { label: 'Conformité', value: '97%', pct: 97 },
              { label: 'Réponse', value: '98%', pct: 98 },
              { label: 'Retours', value: '2%', pct: 40 },
              { label: 'Temps rép.', value: '12 min', pct: 85 },
              { label: 'Transactions', value: '342', pct: 100 },
            ].map(m => (
              <div key={m.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{m.label}</span>
                  <span className="text-[11px] font-semibold text-gray-900 dark:text-white">{m.value}</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Badge Progression */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-2">Progression des badges</p>
            <div className="flex items-center gap-1">
              {['New', 'Rapid', 'Verified', 'Premium', 'Top'].map((b, i) => (
                <div key={b} className="flex items-center gap-1 flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${i <= 2 ? 'bg-amber-400 text-slate-900' : 'bg-gray-200 text-gray-400 dark:text-slate-500 dark:text-slate-500'}`}>{i + 1}</div>
                  {i < 4 && <div className={`flex-1 h-0.5 ${i < 2 ? 'bg-amber-400' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
            <p className="text-[9px] text-gray-400 dark:text-slate-500 dark:text-slate-500 text-center mt-2">Badge: <strong className="text-amber-400">Verified Seller</strong></p>
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-blue-400">342</p>
            <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">Transactions</p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-emerald-400">42M</p>
            <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">CA Total</p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-amber-400">97%</p>
            <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">Conformité</p>
          </div>
        </div>

        {/* Spécialités */}
        <section className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4">
          <h3 className="text-xs font-bold text-gray-900 dark:text-white dark:text-white mb-2">Spécialités</h3>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {['Moteurs diesels', 'Systèmes de freinage', 'Importation'].map(s => (
              <span key={s} className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full">{s}</span>
            ))}
          </div>
          <h3 className="text-xs font-bold text-gray-900 dark:text-white dark:text-white mb-2">Marques</h3>
          <div className="flex flex-wrap gap-1.5">
            {['Toyota', 'Honda', 'Mercedes-Benz'].map(b => (
              <span key={b} className="text-[10px] px-2 py-0.5 bg-gray-200 text-gray-600 dark:text-slate-300 dark:text-slate-300 rounded-full">{b}</span>
            ))}
          </div>
        </section>

        {/* Menu */}
        <section className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden">
          {[
            { icon: Bell, label: 'Notifications', desc: 'Alertes nouvelles demandes' },
            { icon: TrendingUp, label: 'Statistiques', desc: 'Rapports et analyses' },
            { icon: MapPin, label: 'Magasin', desc: 'Informations et localisation' },
            { icon: Phone, label: 'Support vendeur', desc: 'Assistance dédiée' },
            { icon: HelpCircle, label: 'Guide vendeur', desc: 'Maximiser vos ventes' },
            { icon: Settings, label: 'Paramètres', desc: 'Compte et préférences' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <button key={item.label} className={`w-full px-4 py-3.5 flex items-center gap-3 ${i < 5 ? 'border-b border-gray-200' : ''}`}>
                <Icon className="w-4 h-4 text-gray-400 dark:text-slate-500 dark:text-slate-500" />
                <div className="flex-1 text-left">
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 dark:text-slate-500 dark:text-slate-500" />
              </button>
            );
          })}
        </section>
      </div>

      {/* Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white backdrop-blur-xl border-t border-gray-200 z-50">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {[
            { href: '/seller', label: 'Accueil', icon: Store },
            { href: '/seller/requests', label: 'Demandes', icon: Bell, badge: 5 },
            { href: '/seller/catalogue', label: 'Catalogue', icon: Package, center: true },
            { href: '/seller/orders', label: 'Ventes', icon: DollarSign },
            { href: '/seller/profile', label: 'Profil', icon: Star },
          ].map(tab => {
            const Icon = tab.icon;
            if (tab.center) return (
              <Link key={tab.href} href={tab.href} className="flex flex-col items-center -mt-4">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30"><Icon className="w-6 h-6 text-gray-900 dark:text-white" /></div>
                <span className="text-[10px] mt-1 text-blue-400 font-medium">{tab.label}</span>
              </Link>
            );
            return (
              <Link key={tab.href} href={tab.href} className="flex flex-col items-center relative">
                <Icon className={`w-5 h-5 ${tab.href === '/seller/profile' ? 'text-blue-400' : 'text-gray-400 dark:text-slate-500 dark:text-slate-500'}`} />
                {tab.badge && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">{tab.badge}</span>}
                <span className={`text-[10px] mt-0.5 ${tab.href === '/seller/profile' ? 'text-blue-400' : 'text-gray-400 dark:text-slate-500 dark:text-slate-500'}`}>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
