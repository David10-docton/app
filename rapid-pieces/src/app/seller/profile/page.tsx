'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, User, Star, Shield, Settings, Bell, HelpCircle, LogOut, MapPin, Phone, Award, TrendingUp, CheckCircle, Clock, AlertTriangle, BarChart3 } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function SellerProfilePage() {
  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-rp-secondary to-rp-secondary-light text-white px-4 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">AP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Auto Pièces Cotonou</h1>
              <p className="text-white/70 text-sm">Marché Dantokpa, Cotonou</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] bg-rp-gold/30 text-rp-gold px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Verified Seller
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Depuis Juin 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-3">
        {/* Rapid Seller Score */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-rp-gold" />
            <h2 className="font-bold text-rp-text">Rapid Seller Score</h2>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-rp-primary/10 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-rp-primary">4.8</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'fill-rp-gold text-rp-gold' : 'fill-rp-gold/30 text-rp-gold/30'}`} />
                ))}
              </div>
              <p className="text-sm text-rp-text-muted">Basé sur 342 transactions</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[10px] bg-rp-gold/20 text-yellow-700 px-2 py-0.5 rounded-full font-medium">🏆 TOP 5% vendeurs</span>
              </div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="space-y-2.5">
            {[
              { label: 'Taux de conformité', value: '97%', target: '95%', good: true, icon: CheckCircle },
              { label: 'Taux de réponse', value: '98%', target: '90%', good: true, icon: Clock },
              { label: 'Taux de retour', value: '2%', target: '<5%', good: true, icon: AlertTriangle },
              { label: 'Temps moyen réponse', value: '12 min', target: '<30 min', good: true, icon: Clock },
              { label: 'Transactions totales', value: '342', target: '100+', good: true, icon: BarChart3 },
            ].map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${metric.good ? 'text-rp-success' : 'text-rp-danger'}`} />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-xs text-rp-text-muted">{metric.label}</span>
                      <span className="text-xs font-semibold text-rp-text">{metric.value}</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-rp-text-muted">Objectif: {metric.target}</span>
                </div>
              );
            })}
          </div>

          {/* Badge Progression */}
          <div className="mt-4 pt-4 border-t border-rp-border">
            <p className="text-xs font-semibold text-rp-text-muted mb-2">Progression des badges</p>
            <div className="flex items-center gap-1">
              {['New Seller', 'Rapid Seller', 'Verified Seller', 'Premium Seller', 'Top Seller'].map((badge, i) => (
                <div key={badge} className="flex items-center gap-1 flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    i <= 2 ? 'bg-rp-gold text-white' : 'bg-rp-bg text-rp-text-muted'
                  }`}>
                    {i + 1}
                  </div>
                  {i < 4 && <div className={`flex-1 h-0.5 ${i < 2 ? 'bg-rp-gold' : 'bg-rp-bg'}`} />}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-rp-text-muted mt-2 text-center">Badge actuel: <strong className="text-rp-gold">Verified Seller</strong></p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-rp-primary">342</p>
            <p className="text-[10px] text-rp-text-muted">Transactions</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-rp-success">42M</p>
            <p className="text-[10px] text-rp-text-muted">CA Total (FCFA)</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-rp-accent">97%</p>
            <p className="text-[10px] text-rp-text-muted">Conformité</p>
          </div>
        </div>

        {/* Marques & Spécialités */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <h3 className="font-bold text-sm text-rp-text mb-2">Spécialités</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {['Moteurs diesels', 'Systèmes de freinage', 'Importation'].map(s => (
              <span key={s} className="text-xs bg-rp-primary/10 text-rp-primary px-2 py-1 rounded-full">{s}</span>
            ))}
          </div>
          <h3 className="font-bold text-sm text-rp-text mb-2">Marques</h3>
          <div className="flex flex-wrap gap-2">
            {['Toyota', 'Honda', 'Mercedes-Benz'].map(b => (
              <span key={b} className="text-xs bg-rp-bg text-rp-text px-2 py-1 rounded-full">{b}</span>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow-sm mb-20 overflow-hidden">
          {[
            { icon: Bell, label: 'Notifications', desc: 'Alertes de nouvelles demandes' },
            { icon: TrendingUp, label: 'Statistiques', desc: 'Rapports et analyses' },
            { icon: MapPin, label: 'Magasin', desc: 'Informations et localisation' },
            { icon: Phone, label: 'Support vendeur', desc: 'Assistance dédiée' },
            { icon: HelpCircle, label: 'Guide vendeur', desc: 'Comment maximiser vos ventes' },
            { icon: Settings, label: 'Paramètres', desc: 'Compte et préférences' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <button key={item.label} className="w-full px-4 py-3.5 flex items-center gap-3 border-b border-rp-border/50 last:border-0">
                <Icon className="w-5 h-5 text-rp-text-muted" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-rp-text">{item.label}</p>
                  <p className="text-xs text-rp-text-muted">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-rp-text-muted" />
              </button>
            );
          })}
          <button className="w-full px-4 py-3.5 flex items-center gap-3 text-rp-danger">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Déconnexion</span>
          </button>
        </div>
      </div>

      <BottomNav role="seller" />
    </div>
  );
}
