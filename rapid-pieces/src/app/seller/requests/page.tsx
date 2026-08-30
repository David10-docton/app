'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Bell, Package, MapPin, Clock, AlertCircle, Check, Send, Star, Store, DollarSign, ChevronRight, AlertTriangle, Sparkles } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/lib/auth';

const incomingRequests = [
  { id: '1', part: 'Plaquettes de frein avant Toyota Corolla 2018', buyer: 'Koffi Germain', type: 'Mécanicien', location: 'Marcory', time: 'Il y a 15 min', urgent: true, budget: '65 000 FCFA', responses: 2 },
  { id: '2', part: 'Filtre à huile Honda CR-V 2019 1.5T', buyer: 'Massa Garage', type: 'Garage', location: 'Marcory', time: 'Il y a 32 min', urgent: false, budget: '30 000 FCFA', responses: 4 },
  { id: '3', part: 'Courroie alternateur Peugeot 308 2016', buyer: 'Amadou D.', type: 'Pro', location: 'Adjamé', time: 'Il y a 1h', urgent: false, budget: '25 000 FCFA', responses: 1 },
  { id: '4', part: 'Ampoule phare gauche H7 Mercedes Classe C 2015', buyer: 'Fulbert M.', type: 'Particulier', location: 'Cotonou', time: 'Il y a 2h', urgent: false, responses: 0 },
  { id: '5', part: 'Disque de frein arrière Toyota RAV4 2017', buyer: 'Transport GTA', type: 'Flotte', location: 'Cotonou', time: 'Il y a 3h', urgent: true, budget: '120 000 FCFA', responses: 3 },
];

const qualityOptions = ['OEM', 'Genuine', 'Premium', 'Standard', 'Occasion', 'Reconditionné'];

export default function SellerRequestsPage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [filter, setFilter] = useState<'all' | 'urgent' | 'new'>('all');
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [offerForm, setOfferForm] = useState({ price: '', quality: 'OEM', availability: 'immédiate', warranty: '3 mois', notes: '' });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'seller')) router.replace('/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) return <div className="min-h-screen bg-rp-bg flex items-center justify-center"><div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  const filtered = incomingRequests.filter(r => {
    if (filter === 'urgent') return r.urgent;
    if (filter === 'new') return r.responses === 0;
    return true;
  });

  const handleSubmit = (id: string) => {
    setSubmittedId(id);
    setTimeout(() => {
      setRespondingTo(null);
      setSubmittedId(null);
      setOfferForm({ price: '', quality: 'OEM', availability: 'immédiate', warranty: '3 mois', notes: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <header className="bg-white backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/seller" className="text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-sm font-bold text-gray-900 dark:text-white dark:text-white flex-1">Demandes reçues</h1>
          <span className="w-6 h-6 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">5</span>
        </div>
        <div className="max-w-2xl mx-auto px-4 pb-3 flex gap-2">
          {[
            { key: 'all' as const, label: 'Toutes' },
            { key: 'urgent' as const, label: 'Urgentes', icon: <AlertTriangle className="w-3 h-3" /> },
            { key: 'new' as const, label: 'Nouvelles', icon: <Sparkles className="w-3 h-3" /> },
          ].map((f: { key: 'all' | 'urgent' | 'new'; label: string; icon?: ReactNode }) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${
                filter === f.key ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400 dark:text-slate-500 dark:text-slate-500 border border-gray-200'
              }`}>{f.icon}{f.label}</button>
          ))}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3 pb-24 lg:pb-6">
        {filtered.map(req => {
          const isResponding = respondingTo === req.id;
          const isSubmitted = submittedId === req.id;

          return (
            <div key={req.id} className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {req.urgent && <AlertCircle className="w-4 h-4 text-red-600" />}
                    <h3 className="text-xs font-semibold text-gray-900 dark:text-white">{req.part}</h3>
                  </div>
                  {req.responses === 0 && <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">PAS D&apos;OFFRE</span>}
                </div>

                <div className="flex items-center gap-3 text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-2">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {req.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {req.time}</span>
                  {req.budget && <span className="text-red-600 font-medium">{req.budget}</span>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"><span className="text-[9px] font-bold text-gray-900 dark:text-white">{req.buyer.charAt(0)}</span></div>
                    <span className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{req.buyer}</span>
                    <span className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">• {req.type}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{req.responses} offre{req.responses > 1 ? 's' : ''}</span>
                </div>

                {!isResponding && !isSubmitted && (
                  <button onClick={() => setRespondingTo(req.id)}
                    className="w-full mt-3 py-2.5 bg-red-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 hover:bg-red-600-dark transition-colors">
                    <Send className="w-3.5 h-3.5" /> Proposer une offre
                  </button>
                )}
              </div>

              {/* Offer Form */}
              {isResponding && (
                <div className="bg-gray-100 p-4 border-t border-gray-200 slide-up">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white dark:text-white mb-3">Votre offre</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Prix (FCFA) *</label>
                      <input type="number" placeholder="Ex: 62000" value={offerForm.price} onChange={(e) => setOfferForm(p => ({ ...p, price: e.target.value }))}
                        className="w-full px-3 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Qualité</label>
                      <div className="flex flex-wrap gap-1.5">
                        {qualityOptions.map(q => (
                          <button key={q} type="button" onClick={() => setOfferForm(p => ({ ...p, quality: q }))}
                            className={`px-2 py-1 rounded-full text-[10px] font-medium transition-all ${
                              offerForm.quality === q ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400 dark:text-slate-500 dark:text-slate-500 border border-gray-200'
                            }`}>{q}</button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Disponibilité</label>
                        <select value={offerForm.availability} onChange={(e) => setOfferForm(p => ({ ...p, availability: e.target.value }))}
                          className="w-full px-3 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white outline-none">
                          <option>Immédiate</option><option>24 heures</option><option>48 heures</option><option>3-5 jours</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Garantie</label>
                        <select value={offerForm.warranty} onChange={(e) => setOfferForm(p => ({ ...p, warranty: e.target.value }))}
                          className="w-full px-3 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white outline-none">
                          <option>1 mois</option><option>3 mois</option><option>6 mois</option><option>12 mois</option>
                        </select>
                      </div>
                    </div>
                    <textarea placeholder="Notes..." value={offerForm.notes} onChange={(e) => setOfferForm(p => ({ ...p, notes: e.target.value }))} rows={2}
                      className="w-full px-3 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-slate-500 outline-none resize-none" />
                    <div className="flex gap-2">
                      <button onClick={() => setRespondingTo(null)} className="flex-1 py-2.5 bg-gray-200 text-gray-900 dark:text-white rounded-lg text-xs font-medium">Annuler</button>
                      <button onClick={() => handleSubmit(req.id)} disabled={!offerForm.price}
                        className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-xs font-semibold disabled:opacity-40 flex items-center justify-center gap-2">
                        <Check className="w-3.5 h-3.5" /> Envoyer
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {isSubmitted && (
                <div className="bg-emerald-500/10 border-t border-emerald-500/30 p-4 flex items-center gap-3 slide-up">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-400">Offre envoyée !</p>
                    <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">L&apos;acheteur sera notifié</p>
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
