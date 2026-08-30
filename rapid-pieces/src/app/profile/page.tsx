'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, User, Car, Star, Shield, Settings, Bell, HelpCircle, LogOut, Package, Award, MapPin, Phone, Mail } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { vehicleHistory } from '@/lib/mockData';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-rp-secondary to-rp-secondary-light text-white px-4 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Jean Kakpassi</h1>
              <p className="text-white/70 text-sm">Mécanicien • Cotonou</p>
              <div className="flex items-center gap-1 mt-1">
                <Shield className="w-3 h-3 text-rp-gold" />
                <span className="text-xs text-rp-gold font-medium">Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-3">
        {/* Stats */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-rp-text">24</p>
              <p className="text-[10px] text-rp-text-muted">Commandes</p>
            </div>
            <div>
              <p className="text-lg font-bold text-rp-primary">850</p>
              <p className="text-[10px] text-rp-text-muted">Points</p>
            </div>
            <div>
              <p className="text-lg font-bold text-rp-accent">4.8</p>
              <p className="text-[10px] text-rp-text-muted">Note</p>
            </div>
            <div>
              <p className="text-lg font-bold text-rp-success">3</p>
              <p className="text-[10px] text-rp-text-muted">Véhicules</p>
            </div>
          </div>
        </div>

        {/* My Vehicles */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-rp-text">Mes véhicules</h2>
            <button className="text-xs text-rp-primary font-medium">+ Ajouter</button>
          </div>
          <div className="space-y-2">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-rp-primary/10 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-rp-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-rp-text">Toyota Corolla 2018</p>
                  <p className="text-xs text-rp-text-muted">1.8 essence • 5 pièces achetées</p>
                </div>
                <ChevronRight className="w-4 h-4 text-rp-text-muted" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-rp-text">Honda CR-V 2019</p>
                  <p className="text-xs text-rp-text-muted">1.5 Turbo • 2 pièces achetées</p>
                </div>
                <ChevronRight className="w-4 h-4 text-rp-text-muted" />
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle History */}
        <div className="mb-4">
          <h2 className="font-bold text-rp-text mb-3">Historique — {vehicleHistory.vehicle.brand} {vehicleHistory.vehicle.model}</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="space-y-3">
              {vehicleHistory.history.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-rp-primary rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-rp-text">{item.part}</p>
                    <p className="text-xs text-rp-text-muted">{item.seller} • {item.date}</p>
                  </div>
                  <span className="text-sm font-semibold text-rp-text">{item.price.toLocaleString()} FCFA</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rapid Points */}
        <div className="bg-gradient-to-r from-rp-accent to-orange-400 rounded-2xl p-4 text-white mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5" />
            <h3 className="font-bold">Rapid Points</h3>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold">850</p>
              <p className="text-xs text-white/70">points accumulés</p>
            </div>
            <div className="text-right text-xs text-white/70">
              <p>Prochain palier: 1 000</p>
              <p className="text-white font-medium">→ Livraison gratuite</p>
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: '85%' }} />
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow-sm mb-20 overflow-hidden">
          {[
            { icon: Bell, label: 'Notifications', desc: 'Gérer vos alertes' },
            { icon: MapPin, label: 'Adresses', desc: 'Vos adresses de livraison' },
            { icon: Shield, label: 'Rapid Protection', desc: 'Vos garanties actives' },
            { icon: Phone, label: 'Support', desc: 'Contacter Rapid Pièces' },
            { icon: HelpCircle, label: 'FAQ', desc: 'Questions fréquentes' },
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

      <BottomNav role="buyer" />
    </div>
  );
}
