'use client';

import Link from 'next/link';
import { Package, Truck, Clock, Check, MapPin, ChevronRight, Shield, Star } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { mockOrders } from '@/lib/mockData';

const statusConfig = {
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  confirmed: { label: 'Confirmée', color: 'bg-blue-100 text-blue-700', icon: Check },
  shipped: { label: 'Expédiée', color: 'bg-purple-100 text-purple-700', icon: Package },
  in_transit: { label: 'En transit', color: 'bg-orange-100 text-orange-700', icon: Truck },
  delivered: { label: 'Livrée', color: 'bg-green-100 text-green-700', icon: Check },
  completed: { label: 'Terminée', color: 'bg-rp-success/10 text-rp-success', icon: Check },
  cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-700', icon: Check },
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-rp-border">
        <div className="max-w-lg mx-auto">
          <h1 className="text-lg font-bold text-rp-text">Mes commandes</h1>
          <p className="text-xs text-rp-text-muted mt-1">Suivez toutes vos commandes en temps réel</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-3 pb-20">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-rp-primary">3</p>
            <p className="text-[10px] text-rp-text-muted">En cours</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-rp-success">12</p>
            <p className="text-[10px] text-rp-text-muted">Terminées</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-rp-accent">850</p>
            <p className="text-[10px] text-rp-text-muted">Rapid Points</p>
          </div>
        </div>

        {/* Order List */}
        {mockOrders.map((order) => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;
          
          return (
            <Link key={order.id} href={`/orders/${order.id}`} className="block bg-white rounded-2xl p-4 shadow-sm card-hover">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${status.color}`}>
                      {status.label}
                    </span>
                    {order.escrowStatus === 'held' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Escrow
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm text-rp-text mt-2">{order.partName}</h3>
                  <p className="text-xs text-rp-text-muted">{order.vehicle.brand} {order.vehicle.model} {order.vehicle.year}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-rp-primary">{order.price.toLocaleString()} <span className="text-xs">FCFA</span></p>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="bg-rp-bg rounded-xl p-3 mb-3">
                <div className="flex items-center justify-between">
                  {['Confirmée', 'Expédiée', 'En transit', 'Livrée'].map((step, i) => {
                    const isCompleted = ['pending', 'confirmed', 'shipped', 'in_transit', 'delivered', 'completed'].indexOf(order.status) >= i + 1;
                    const isCurrent = ['confirmed', 'shipped', 'in_transit', 'delivered'][i] === order.status;
                    return (
                      <div key={step} className="flex flex-col items-center flex-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCompleted ? 'bg-rp-success text-white' : isCurrent ? 'bg-rp-primary text-white animate-pulse' : 'bg-gray-200 text-gray-400'
                        }`}>
                          {isCompleted ? '✓' : i + 1}
                        </div>
                        <span className={`text-[9px] mt-1 text-center ${isCurrent ? 'text-rp-primary font-semibold' : 'text-rp-text-muted'}`}>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-rp-text-muted">
                <span>Vendeur: {order.sellerName}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </Link>
          );
        })}

        {/* Rapid Points Section */}
        <div className="bg-gradient-to-r from-rp-accent to-orange-400 rounded-2xl p-5 text-white">
          <h3 className="font-bold text-lg mb-1">🎯 Rapid Points</h3>
          <p className="text-white/80 text-sm mb-3">100 FCFA d&apos;achat = 1 point</p>
          <div className="bg-white/20 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Solde actuel</span>
              <span className="text-xl font-bold">850 pts</span>
            </div>
            <div className="flex justify-between items-center mt-2 text-xs text-white/70">
              <span>Prochain palier: 1 000 pts</span>
              <span>Livraison gratuite</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav role="buyer" />
    </div>
  );
}
