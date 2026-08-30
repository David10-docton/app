'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Camera, MapPin, DollarSign, FileText, Check, Upload } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { POPULAR_BRANDS, POPULAR_CATEGORIES, BENIN_LOCATIONS, DELIVERY_OPTIONS } from '@/lib/types';

export default function NewRequestPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brand: '', model: '', year: '', engine: '', vin: '',
    partName: '', oemReference: '', description: '', quantity: '1',
    quality: '', location: '', budgetMin: '', budgetMax: '',
    deliveryPreference: '', photo: null as File | null
  });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  if (submitted) {
    return (
      <div className="min-h-screen bg-rp-bg flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full shadow-lg">
          <div className="w-16 h-16 bg-rp-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-rp-success" />
          </div>
          <h2 className="text-xl font-bold text-rp-text mb-2">Demande envoyée !</h2>
          <p className="text-sm text-rp-text-muted mb-6">
            Votre demande a été diffusée aux vendeurs pertinents. Vous recevrez des offres sous peu.
          </p>
          <div className="bg-rp-bg rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-rp-text-muted mb-1">Pièce recherchée</p>
            <p className="font-semibold text-sm text-rp-text">{formData.partName || 'Plaquettes de frein'}</p>
            <p className="text-xs text-rp-text-muted mt-1">{formData.brand || 'Toyota'} {formData.model || 'Corolla'} {formData.year || '2018'}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/requests" className="flex-1 py-3 bg-rp-primary text-white rounded-xl text-sm font-semibold text-center">
              Voir mes demandes
            </Link>
            <Link href="/" className="flex-1 py-3 bg-rp-bg text-rp-text rounded-xl text-sm font-semibold text-center">
              Accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-rp-border">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-rp-text" />
            </Link>
            <h1 className="text-lg font-bold text-rp-text">Nouvelle demande</h1>
          </div>
          {/* Progress Bar */}
          <div className="h-1.5 bg-rp-bg rounded-full overflow-hidden">
            <div className="h-full bg-rp-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-2">
            {['Véhicule', 'Pièce', 'Détails', 'Confirmer'].map((label, i) => (
              <span key={label} className={`text-[10px] ${step > i ? 'text-rp-primary font-semibold' : step === i + 1 ? 'text-rp-text font-semibold' : 'text-rp-text-muted'}`}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Step 1: Vehicle */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-bold text-rp-text text-lg">Informations du véhicule</h2>
            <div>
              <label className="text-sm font-medium text-rp-text mb-2 block">Marque *</label>
              <div className="grid grid-cols-4 gap-2">
                {POPULAR_BRANDS.slice(0, 8).map(brand => (
                  <button
                    key={brand}
                    onClick={() => updateField('brand', brand)}
                    className={`py-2 px-1 rounded-xl text-xs font-medium text-center ${
                      formData.brand === brand ? 'bg-rp-primary text-white' : 'bg-white border border-rp-border text-rp-text'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-rp-text mb-1 block">Modèle *</label>
              <input
                type="text"
                placeholder="Ex: Corolla, Hilux..."
                value={formData.model}
                onChange={(e) => updateField('model', e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-xl text-sm border border-rp-border focus:ring-2 focus:ring-rp-primary outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-rp-text mb-1 block">Année *</label>
                <select
                  value={formData.year}
                  onChange={(e) => updateField('year', e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl text-sm border border-rp-border focus:ring-2 focus:ring-rp-primary outline-none"
                >
                  <option value="">Année</option>
                  {Array.from({ length: 20 }, (_, i) => 2025 - i).map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-rp-text mb-1 block">Motorisation</label>
                <input
                  type="text"
                  placeholder="Ex: 1.8 essence"
                  value={formData.engine}
                  onChange={(e) => updateField('engine', e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl text-sm border border-rp-border focus:ring-2 focus:ring-rp-primary outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-rp-text mb-1 block">Numéro VIN / Châssis</label>
              <input
                type="text"
                placeholder="Optionnel - aide à identifier la pièce exacte"
                value={formData.vin}
                onChange={(e) => updateField('vin', e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-xl text-sm border border-rp-border focus:ring-2 focus:ring-rp-primary outline-none"
              />
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!formData.brand || !formData.model || !formData.year}
              className="w-full py-3 bg-rp-primary text-white rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuer
            </button>
          </div>
        )}

        {/* Step 2: Part */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-bold text-rp-text text-lg">Pièce recherchée</h2>
            <div>
              <label className="text-sm font-medium text-rp-text mb-2 block">Catégorie</label>
              <div className="grid grid-cols-3 gap-2">
                {POPULAR_CATEGORIES.slice(0, 9).map(cat => (
                  <button
                    key={cat}
                    onClick={() => updateField('partName', cat)}
                    className={`py-2 px-2 rounded-xl text-xs font-medium ${
                      formData.partName === cat ? 'bg-rp-primary text-white' : 'bg-white border border-rp-border text-rp-text'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-rp-text mb-1 block">Nom de la pièce *</label>
              <input
                type="text"
                placeholder="Ex: Plaquettes de frein avant"
                value={formData.partName}
                onChange={(e) => updateField('partName', e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-xl text-sm border border-rp-border focus:ring-2 focus:ring-rp-primary outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-rp-text mb-1 block">Référence OEM</label>
                <input
                  type="text"
                  placeholder="Ex: 04465-02200"
                  value={formData.oemReference}
                  onChange={(e) => updateField('oemReference', e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl text-sm border border-rp-border focus:ring-2 focus:ring-rp-primary outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-rp-text mb-1 block">Quantité</label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => updateField('quantity', e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl text-sm border border-rp-border focus:ring-2 focus:ring-rp-primary outline-none"
                />
              </div>
            </div>
            {/* Photo Upload */}
            <button className="w-full border-2 border-dashed border-rp-border rounded-xl py-6 flex flex-col items-center gap-2 hover:border-rp-primary transition-colors">
              <Camera className="w-8 h-8 text-rp-text-muted" />
              <span className="text-sm text-rp-text-muted">Ajouter une photo de la pièce</span>
              <span className="text-xs text-rp-text-muted/70">Aide les vendeurs à identifier la pièce</span>
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!formData.partName}
              className="w-full py-3 bg-rp-primary text-white rounded-xl text-sm font-semibold disabled:opacity-40"
            >
              Continuer
            </button>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-bold text-rp-text text-lg">Détails supplémentaires</h2>
            <div>
              <label className="text-sm font-medium text-rp-text mb-2 block">Qualité souhaitée</label>
              <div className="grid grid-cols-3 gap-2">
                {['OEM', 'Genuine', 'Premium', 'Standard', 'Occasion', 'Reconditionné'].map(q => (
                  <button
                    key={q}
                    onClick={() => updateField('quality', q)}
                    className={`py-2 px-2 rounded-xl text-xs font-medium ${
                      formData.quality === q ? 'bg-rp-primary text-white' : 'bg-white border border-rp-border text-rp-text'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-rp-text mb-1 block">Localisation *</label>
              <select
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-xl text-sm border border-rp-border focus:ring-2 focus:ring-rp-primary outline-none"
              >
                <option value="">Sélectionner</option>
                {BENIN_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-rp-text mb-1 block">Description / Notes</label>
              <textarea
                placeholder="Décrivez votre besoin en détail..."
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-white rounded-xl text-sm border border-rp-border focus:ring-2 focus:ring-rp-primary outline-none resize-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-rp-text mb-2 block">Budget indicatif (FCFA)</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={formData.budgetMin}
                  onChange={(e) => updateField('budgetMin', e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl text-sm border border-rp-border focus:ring-2 focus:ring-rp-primary outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={formData.budgetMax}
                  onChange={(e) => updateField('budgetMax', e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl text-sm border border-rp-border focus:ring-2 focus:ring-rp-primary outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-rp-text mb-2 block">Mode de livraison préféré</label>
              <div className="space-y-2">
                {DELIVERY_OPTIONS.map(opt => (
                  <button
                    key={opt.type}
                    onClick={() => updateField('deliveryPreference', opt.type)}
                    className={`w-full p-3 rounded-xl flex items-center gap-3 text-left ${
                      formData.deliveryPreference === opt.type ? 'bg-rp-primary/10 border-2 border-rp-primary' : 'bg-white border border-rp-border'
                    }`}
                  >
                    <span className="text-xl">{opt.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-rp-text">{opt.label}</p>
                      <p className="text-[10px] text-rp-text-muted">{opt.timeframe}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setStep(4)}
              disabled={!formData.location}
              className="w-full py-3 bg-rp-primary text-white rounded-xl text-sm font-semibold disabled:opacity-40"
            >
              Continuer
            </button>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-bold text-rp-text text-lg">Confirmer la demande</h2>
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🔧</span>
                <div>
                  <h3 className="font-bold text-rp-text">{formData.partName}</h3>
                  <p className="text-sm text-rp-text-muted">{formData.brand} {formData.model} {formData.year}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                {formData.engine && <div className="flex justify-between"><span className="text-rp-text-muted">Motorisation</span><span className="text-rp-text font-medium">{formData.engine}</span></div>}
                {formData.oemReference && <div className="flex justify-between"><span className="text-rp-text-muted">Réf. OEM</span><span className="text-rp-text font-medium">{formData.oemReference}</span></div>}
                <div className="flex justify-between"><span className="text-rp-text-muted">Quantité</span><span className="text-rp-text font-medium">{formData.quantity}</span></div>
                {formData.quality && <div className="flex justify-between"><span className="text-rp-text-muted">Qualité</span><span className="text-rp-text font-medium">{formData.quality}</span></div>}
                <div className="flex justify-between"><span className="text-rp-text-muted">Localisation</span><span className="text-rp-text font-medium">{formData.location || 'Cotonou'}</span></div>
                {formData.budgetMax && <div className="flex justify-between"><span className="text-rp-text-muted">Budget max</span><span className="text-rp-text font-medium">{parseInt(formData.budgetMax).toLocaleString()} FCFA</span></div>}
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-xs text-blue-700">
                💡 Votre demande sera envoyée aux vendeurs pertinents dans votre zone. Vous recevrez les offres en temps réel.
              </p>
            </div>
            <button
              onClick={() => setSubmitted(true)}
              className="w-full py-4 bg-rp-primary text-white rounded-xl text-base font-bold shadow-lg"
            >
              Publier la demande 🚀
            </button>
          </div>
        )}

        {/* Back button */}
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="w-full py-3 mt-4 bg-white border border-rp-border text-rp-text rounded-xl text-sm font-medium">
            Retour
          </button>
        )}
      </div>

      <BottomNav role="buyer" />
    </div>
  );
}
