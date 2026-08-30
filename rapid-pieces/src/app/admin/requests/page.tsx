'use client';

import Link from 'next/link';
import { ChevronLeft, Package, MapPin, Clock, Eye, AlertTriangle, Check, Filter } from 'lucide-react';
import { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import { mockRequests } from '@/lib/mockData';

export default function AdminRequestsPage() {
  const [filter, setFilter] = useState<'all' | 'open' | 'matched' | 'completed'>('all');

  const allRequests = [
    ...mockRequests,
    { id: 'r5', vehicle: { brand: 'Volkswagen', model: 'Golf VII', year: 2017, engine: '1.6 TDI' }, partName: 'Turbo complet', description: 'Turbo pour Golf 7 1.6 TDI', quantity: 1, location: 'Cotonou', status: 'open' as const, createdAt: '2025-01-15T10:00:00', responsesCount: 0, buyerId: 'b4' },
    { id: 'r6', vehicle: { brand: 'Ford', model: 'Ranger', year: 2019, engine: '3.2 Diesel' }, partName: 'Boîtier de direction', description: 'Boîtier de direction assistée', quantity: 1, location: 'Parakou', status: 'open' as const, createdAt: '2025-01-15T07:00:00', responsesCount: 1, buyerId: 'b5' },
  ];

  const filtered = allRequests.filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  return (
    <div className="min-h-screen bg-rp-bg">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-rp-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/admin" className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-rp-text" />
            </Link>
            <h1 className="text-lg font-bold text-rp-text">Demandes</h1>
            <span className="ml-auto bg-rp-primary text-white text-xs px-2 py-1 rounded-full font-bold">{allRequests.filter(r => r.status === 'open').length}</span>
          </div>
          <div className="flex gap-2">
            {[
              { key: 'all' as const, label: 'Toutes' },
              { key: 'open' as const, label: '🟢 Ouvertes' },
              { key: 'matched' as const, label: '🔵 Correspondance' },
              { key: 'completed' as const, label: '✅ Terminées' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  filter === f.key ? 'bg-rp-primary text-white' : 'bg-rp-bg text-rp-text-muted'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-3 pb-20">
        {filtered.map((req) => (
          <div key={req.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    req.status === 'open' ? 'bg-green-100 text-green-700' :
                    req.status === 'matched' ? 'bg-blue-100 text-blue-700' :
                    'bg-rp-success/10 text-rp-success'
                  }`}>
                    {req.status === 'open' ? 'Ouverte' : req.status === 'matched' ? 'Correspondance' : 'Terminée'}
                  </span>
                  {req.responsesCount === 0 && (
                    <span className="text-[9px] bg-rp-danger/10 text-rp-danger px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Aucune offre
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-sm text-rp-text">{req.partName}</h3>
                <p className="text-xs text-rp-text-muted">{req.vehicle.brand} {req.vehicle.model} {req.vehicle.year}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-rp-primary">{req.responsesCount}</p>
                <p className="text-[10px] text-rp-text-muted">offres</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-rp-text-muted">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {req.location}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(req.createdAt).toLocaleDateString('fr-FR')}</span>
              {req.quality && <span className="bg-rp-bg px-1.5 py-0.5 rounded">{req.quality}</span>}
            </div>

            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 bg-rp-bg text-rp-text rounded-xl text-xs font-medium flex items-center justify-center gap-1">
                <Eye className="w-3 h-3" /> Voir détails
              </button>
              {req.status === 'open' && req.responsesCount === 0 && (
                <button className="flex-1 py-2 bg-rp-primary text-white rounded-xl text-xs font-medium">
                  ⚡ Trouver des vendeurs
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <BottomNav role="admin" />
    </div>
  );
}
