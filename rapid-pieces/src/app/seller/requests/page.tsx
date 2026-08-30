'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Clock, MapPin, Star, AlertCircle, Check, X, Send, Filter } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { QUALITY_LEVELS } from '@/lib/types';

const incomingRequests = [
  { id: '1', part: 'Plaquettes de frein avant', vehicle: 'Toyota Corolla 2018 • 1.8 essence', location: 'Cotonou', time: 'Il y a 15 min', urgent: true, budget: '65 000 FCFA', quality: 'OEM', buyerName: 'Jean K.', buyerRating: 4.7, responsesCount: 2 },
  { id: '2', part: 'Filtre à huile', vehicle: 'Honda CR-V 2019 • 1.5 Turbo', location: 'Abomey-Calavi', time: 'Il y a 32 min', urgent: false, budget: '30 000 FCFA', quality: '', buyerName: 'Garage Méca+', buyerRating: 4.9, responsesCount: 4 },
  { id: '3', part: 'Courroie alternateur', vehicle: 'Peugeot 308 2016 • 1.6 HDi', location: 'Porto-Novo', time: 'Il y a 1h', urgent: false, budget: '25 000 FCFA', quality: 'Premium', buyerName: 'Amadou D.', buyerRating: 4.5, responsesCount: 1 },
  { id: '4', part: 'Ampoule phare gauche H7', vehicle: 'Mercedes Classe C 2015 • 220d', location: 'Cotonou', time: 'Il y a 2h', urgent: false, budget: '', quality: '', buyerName: 'Fulbert M.', buyerRating: 4.3, responsesCount: 0 },
  { id: '5', part: 'Disque de frein arrière (x2)', vehicle: 'Toyota RAV4 2017 • 2.0', location: 'Cotonou', time: 'Il y a 3h', urgent: true, budget: '120 000 FCFA', quality: 'OEM', buyerName: 'Transport GTA', buyerRating: 4.8, responsesCount: 3 },
];

export default function SellerRequestsPage() {
  const [filter, setFilter] = useState<'all' | 'urgent' | 'new'>('all');
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [offerForm, setOfferForm] = useState({ price: '', quality: 'OEM', availability: 'immediate', warranty: '3 mois', delivery: 'RAPID_NOW', notes: '' });
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const filtered = incomingRequests.filter(r => {
    if (filter === 'urgent') return r.urgent;
    if (filter === 'new') return r.responsesCount === 0;
    return true;
  });

  const handleSubmit = (id: string) => {
    setSubmittedId(id);
    setTimeout(() => {
      setRespondingTo(null);
      setSubmittedId(null);
      setOfferForm({ price: '', quality: 'OEM', availability: 'immediate', warranty: '3 mois', delivery: 'RAPID_NOW', notes: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-rp-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/seller" className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-rp-text" />
            </Link>
            <h1 className="text-lg font-bold text-rp-text">Demandes reçues</h1>
            <span className="ml-auto bg-rp-primary text-white text-xs px-2 py-1 rounded-full font-bold">5</span>
          </div>
          <div className="flex gap-2">
            {[
              { key: 'all' as const, label: 'Toutes' },
              { key: 'urgent' as const, label: '🔴 Urgentes' },
              { key: 'new' as const, label: '✨ Nouvelles' },
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
        {filtered.map((req) => {
          const isResponding = respondingTo === req.id;
          const isSubmitted = submittedId === req.id;
          
          return (
            <div key={req.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {req.urgent && <AlertCircle className="w-4 h-4 text-rp-primary" />}
                    <h3 className="font-semibold text-sm text-rp-text">{req.part}</h3>
                  </div>
                  {req.responsesCount === 0 && (
                    <span className="text-[9px] bg-rp-success/10 text-rp-success px-2 py-0.5 rounded-full font-medium">PAS D&apos;OFFRE</span>
                  )}
                </div>
                <p className="text-xs text-rp-text-muted">{req.vehicle}</p>
                
                <div className="flex items-center gap-3 mt-2 text-xs text-rp-text-muted">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {req.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {req.time}</span>
                  {req.budget && <span className="font-medium text-rp-secondary">{req.budget}</span>}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-rp-bg rounded-full flex items-center justify-center">
                      <span className="text-[10px] font-bold text-rp-text">{req.buyerName.charAt(0)}</span>
                    </div>
                    <span className="text-xs text-rp-text-muted">{req.buyerName}</span>
                    <span className="flex items-center gap-0.5 text-xs">
                      <Star className="w-3 h-3 fill-rp-gold text-rp-gold" /> {req.buyerRating}
                    </span>
                  </div>
                  <span className="text-xs text-rp-text-muted">{req.responsesCount} offre{req.responsesCount > 1 ? 's' : ''}</span>
                </div>

                {/* Respond Button */}
                {!isResponding && !isSubmitted && (
                  <button
                    onClick={() => setRespondingTo(req.id)}
                    className="w-full mt-3 py-2.5 bg-rp-primary text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Proposer une offre
                  </button>
                )}
              </div>

              {/* Offer Form */}
              {isResponding && (
                <div className="bg-rp-bg p-4 border-t border-rp-border slide-up">
                  <h4 className="text-sm font-bold text-rp-text mb-3">Votre offre</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-rp-text-muted mb-1 block">Prix (FCFA) *</label>
                      <input
                        type="number"
                        placeholder="Ex: 62000"
                        value={offerForm.price}
                        onChange={(e) => setOfferForm(prev => ({ ...prev, price: e.target.value }))}
                        className="w-full px-3 py-2.5 bg-white rounded-xl text-sm border border-rp-border focus:ring-2 focus:ring-rp-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-rp-text-muted mb-1 block">Qualité</label>
                      <div className="flex flex-wrap gap-2">
                        {QUALITY_LEVELS.map(q => (
                          <button
                            key={q.value}
                            onClick={() => setOfferForm(prev => ({ ...prev, quality: q.value }))}
                            className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                              offerForm.quality === q.value ? 'text-white' : 'bg-white text-rp-text-muted border border-rp-border'
                            }`}
                            style={offerForm.quality === q.value ? { backgroundColor: q.color } : {}}
                          >
                            {q.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-medium text-rp-text-muted mb-1 block">Disponibilité</label>
                        <select
                          value={offerForm.availability}
                          onChange={(e) => setOfferForm(prev => ({ ...prev, availability: e.target.value }))}
                          className="w-full px-3 py-2.5 bg-white rounded-xl text-sm border border-rp-border outline-none"
                        >
                          <option value="immediate">Immédiate</option>
                          <option value="24h">24 heures</option>
                          <option value="48h">48 heures</option>
                          <option value="3-5days">3-5 jours</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-rp-text-muted mb-1 block">Garantie</label>
                        <select
                          value={offerForm.warranty}
                          onChange={(e) => setOfferForm(prev => ({ ...prev, warranty: e.target.value }))}
                          className="w-full px-3 py-2.5 bg-white rounded-xl text-sm border border-rp-border outline-none"
                        >
                          <option value="1 mois">1 mois</option>
                          <option value="3 mois">3 mois</option>
                          <option value="6 mois">6 mois</option>
                          <option value="12 mois">12 mois</option>
                        </select>
                      </div>
                    </div>
                    <textarea
                      placeholder="Notes additionnelles..."
                      value={offerForm.notes}
                      onChange={(e) => setOfferForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={2}
                      className="w-full px-3 py-2.5 bg-white rounded-xl text-sm border border-rp-border outline-none resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setRespondingTo(null)}
                        className="flex-1 py-2.5 bg-white border border-rp-border text-rp-text rounded-xl text-sm font-medium"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={() => handleSubmit(req.id)}
                        disabled={!offerForm.price}
                        className="flex-1 py-2.5 bg-rp-primary text-white rounded-xl text-sm font-semibold disabled:opacity-40 flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" /> Envoyer l&apos;offre
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {isSubmitted && (
                <div className="bg-rp-success/10 p-4 flex items-center gap-3 slide-up">
                  <Check className="w-6 h-6 text-rp-success" />
                  <div>
                    <p className="text-sm font-semibold text-rp-success">Offre envoyée !</p>
                    <p className="text-xs text-rp-text-muted">L&apos;acheteur sera notifié</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <BottomNav role="seller" />
    </div>
  );
}
