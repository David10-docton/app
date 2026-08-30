'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Store, Shield, ChevronRight, Star, Globe, Truck, ShieldCheck } from 'lucide-react';

const roles = [
  {
    id: 'buyer',
    title: 'Acheteur',
    subtitle: 'Trouvez la pièce dont vous avez besoin',
    description: 'Recherchez, comparez et commandez des pièces automobiles au meilleur prix.',
    icon: ShoppingCart,
    color: 'from-rp-primary to-rp-primary-dark',
    iconBg: 'bg-white/20',
    features: ['Recherche de pièces', 'Comparaison de prix', 'Sourcing international', 'Livraison rapide'],
    href: '/login',
  },
  {
    id: 'seller',
    title: 'Vendeur',
    subtitle: 'Vendez davantage sans ouvrir un nouveau magasin',
    description: 'Recevez des demandes de clients, proposez vos offres et gérez vos ventes.',
    icon: Store,
    color: 'from-rp-secondary to-rp-secondary-light',
    iconBg: 'bg-white/20',
    features: ['Demandes de clients', 'Gestion catalogue', 'Suivi des ventes', 'Score vendeur'],
    href: '/login',
  },
  {
    id: 'admin',
    title: 'Administration',
    subtitle: 'Supervisez la plateforme',
    description: 'Gérez les vendeurs, les transactions et la configuration de la plateforme.',
    icon: Shield,
    color: 'from-emerald-600 to-emerald-700',
    iconBg: 'bg-white/20',
    features: ['Dashboard KPI', 'Gestion vendeurs', 'Transactions', 'Configuration'],
    href: '/login',
  },
];

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-rp-primary via-rp-primary-dark to-rp-secondary text-white">
        <div className="max-w-6xl mx-auto px-4 pt-12 pb-16 sm:pt-16 sm:pb-20">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo_rapidePiece.jpeg"
              alt="Rapid Pièces"
              width={120}
              height={120}
              className="h-24 sm:h-32 w-auto object-contain rounded-2xl shadow-2xl"
              priority
            />
          </div>

          {/* Title */}
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              La bourse des pièces<br />automobiles
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-2">
              Trouvez. Comparez. Commandez. Recevez.
            </p>
            <p className="text-sm sm:text-base text-white/60 max-w-lg mx-auto">
              Rapid Pièces connecte acheteurs et vendeurs de pièces automobiles 
              pour les meilleures offres, localement et à l&apos;international.
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex justify-center gap-6 sm:gap-10 mt-10">
            {[
              { icon: Star, label: '127+ vendeurs' },
              { icon: Globe, label: 'Nigeria & USA' },
              { icon: Truck, label: 'Livraison < 2h' },
              { icon: ShieldCheck, label: 'Paiement sécurisé' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-rp-gold" />
                  <span className="text-[10px] sm:text-xs text-white/70 text-center">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 sm:-mt-10 relative z-10">
        <h2 className="text-center text-lg sm:text-xl font-bold text-rp-text mb-6">
          Comment souhaitez-vous utiliser Rapid Pièces ?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Link
                key={role.id}
                href={role.href}
                className="block group"
              >
                <div className={`bg-gradient-to-br ${role.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full`}>
                  <div className={`w-14 h-14 ${role.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{role.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{role.subtitle}</p>
                  <p className="text-white/60 text-xs mb-4 leading-relaxed">{role.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {role.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-xs text-white/70">
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3 group-hover:bg-white/20 transition-colors">
                    <span className="text-sm font-semibold">Commencer</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Login link */}
        <div className="text-center mt-8">
          <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-md text-sm font-semibold text-rp-text hover:shadow-lg transition-shadow">
            Déjà un compte ? <span className="text-rp-primary">Se connecter</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-8">
          <p className="text-xs text-rp-text-muted">
            © 2025 Rapid Pièces. Tous droits réservés.
          </p>
          <p className="text-xs text-rp-text-muted mt-1">
            La plateforme de référence pour les pièces automobiles en Afrique de l&apos;Ouest.
          </p>
        </div>
      </div>
    </div>
  );
}
