'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, FileText, ShoppingBag, User, Package, BarChart3, Settings, Store } from 'lucide-react';

const buyerTabs = [
  { href: '/', label: 'Accueil', icon: Home, isCenter: false, hasBadge: 0 },
  { href: '/search', label: 'Rechercher', icon: Search, isCenter: false, hasBadge: 0 },
  { href: '/requests/new', label: 'Demander', icon: FileText, isCenter: true, hasBadge: 0 },
  { href: '/orders', label: 'Commandes', icon: Package, isCenter: false, hasBadge: 0 },
  { href: '/profile', label: 'Profil', icon: User, isCenter: false, hasBadge: 0 },
];

const sellerTabs = [
  { href: '/seller', label: 'Dashboard', icon: Home, isCenter: false, hasBadge: 0 },
  { href: '/seller/requests', label: 'Demandes', icon: FileText, isCenter: false, hasBadge: 5 },
  { href: '/seller/catalogue', label: 'Catalogue', icon: Store, isCenter: true, hasBadge: 0 },
  { href: '/seller/orders', label: 'Ventes', icon: ShoppingBag, isCenter: false, hasBadge: 0 },
  { href: '/seller/profile', label: 'Profil', icon: User, isCenter: false, hasBadge: 0 },
];

const adminTabs = [
  { href: '/admin', label: 'Dashboard', icon: BarChart3, isCenter: false, hasBadge: 0 },
  { href: '/admin/sellers', label: 'Vendeurs', icon: Store, isCenter: false, hasBadge: 0 },
  { href: '/admin/orders', label: 'Transactions', icon: ShoppingBag, isCenter: false, hasBadge: 0 },
  { href: '/admin/requests', label: 'Demandes', icon: FileText, isCenter: false, hasBadge: 0 },
  { href: '/admin/settings', label: 'Config', icon: Settings, isCenter: false, hasBadge: 0 },
];

interface BottomNavProps {
  role?: 'buyer' | 'seller' | 'admin';
}

export default function BottomNav({ role = 'buyer' }: BottomNavProps) {
  const pathname = usePathname();
  const tabs = role === 'admin' ? adminTabs : role === 'seller' ? sellerTabs : buyerTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-rp-border z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));
          
          if (tab.isCenter) {
            return (
              <Link key={tab.href} href={tab.href} className="flex flex-col items-center -mt-4">
                <div className="w-14 h-14 bg-rp-primary rounded-full flex items-center justify-center shadow-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] mt-1 font-medium text-rp-primary">{tab.label}</span>
              </Link>
            );
          }
          
          return (
            <Link key={tab.href} href={tab.href} className="flex flex-col items-center relative">
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-rp-primary' : 'text-rp-text-muted'}`} />
                {tab.hasBadge > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-rp-danger text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    {tab.hasBadge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'text-rp-primary font-semibold' : 'text-rp-text-muted'}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
