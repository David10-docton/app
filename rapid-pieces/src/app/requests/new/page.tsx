'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Camera, Upload, MapPin, ChevronDown, X, Check, FileText, Car, Phone, MessageSquare, Truck, Zap, Globe, Rocket, ArrowRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import BottomActionBar from '@/components/BottomActionBar';


const brands = ['Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Volkswagen', 'Hyundai', 'Nissan', 'Ford', 'Peugeot', 'Renault', 'Kia', 'Mitsubishi', 'Isuzu', 'Land Rover', 'Suzuki', 'Mazda'];

const categories = ['Freinage', 'Moteur', 'Éclairage', 'Climatisation', 'Filtration', 'Suspension', 'Électrique', 'Carrosserie', 'Direction', 'Échappement', 'Transmission'];

const cities = ['Cotonou', 'Abomey-Calavi', 'Porto-Novo', 'Parakou', 'Bohicon', 'Ouidah', 'Kandi', 'Natitingou'];

const searchModes = [
  { id: 'text', label: 'Décrire la pièce', icon: FileText, desc: 'Décrivez la pièce dont vous avez besoin' },
  { id: 'photo', label: 'Pièce selon photo', icon: Camera, desc: 'Photographiez la pièce pour identification' },
  { id: 'vin', label: 'Commande externe (VIN)', icon: Car, desc: 'Via numéro VIN du véhicule' },
];

const deliveryTypes = [
  { id: 'RAPID_NOW', label: 'RAPID NOW', time: '< 1h', icon: <Zap className="w-5 h-5" />, desc: 'Vendeur local' },
  { id: 'RAPID_CITY', label: 'RAPID CITY', time: '< 2h', icon: <MapPin className="w-5 h-5" />, desc: 'Intra-ville' },
  { id: 'RAPID_NIGERIA', label: 'RAPID NIGERIA', time: '48h', icon: <Globe className="w-5 h-5" />, desc: 'Sourcing Nigeria' },
  { id: 'RAPID_USA', label: 'RAPID USA', time: '7j', icon: <Globe className="w-5 h-5" />, desc: 'Sourcing USA' },
];

export default function NewRequestPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [searchMode, setSearchMode] = useState<'text' | 'photo' | 'vin'>('text');
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    brand: '', model: '', year: '', engine: '', vin: '',
    partName: '', description: '', quantity: '1',
    location: '', city: '', address: '',
    deliveryType: 'RAPID_NOW',
    contactMethod: 'whatsapp',
    photo: null as File | null,
    carteGrise: null as File | null,
  });

  const update = (field: string, value: string) => setForm(p => ({ ...p, [field]: value }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'carteGrise') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'photo') setPhotoPreview(reader.result as string);
        setForm(p => ({ ...p, [type]: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };



  if (submitted) {
    return (
      <div className="min-h-screen bg-rp-bg flex items-center justify-center px-4">
        <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 text-center max-w-sm w-full">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Demande envoyée !</h2>
          <p className="text-sm text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-6">Votre demande a été diffusée aux vendeurs. Vous recevrez des offres sous peu.</p>
          <div className="bg-gray-100 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1">Pièce recherchée</p>
            <p className="font-semibold text-sm text-gray-900 dark:text-white">{form.partName || 'Pièce auto'}</p>
            <p className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500 mt-1">{form.brand} {form.model} {form.year}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/orders" className="flex-1 py-3 bg-red-600 text-white rounded-xl text-sm font-semibold text-center">Voir mes commandes</Link>
            <Link href="/" className="flex-1 py-3 bg-gray-200 text-gray-900 dark:text-white rounded-xl text-sm font-semibold text-center">Accueil</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <header className="bg-white backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-900 dark:text-white"><ArrowLeft className="w-5 h-5" /></Link>
          <div className="flex-1">
            <h1 className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">Nouvelle demande</h1>
            <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">Étape {step}/3</p>
          </div>
          <Image src="/logo_rapidePiece.jpeg" alt="RP" width={32} height={32} className="h-8 w-auto object-contain rounded-lg" />
        </div>
        {/* Progress */}
        <div className="max-w-2xl mx-auto px-4 pb-3">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-red-600 rounded-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">

        {/* ===== ÉTAPE 1 : Mode de recherche + Véhicule ===== */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Search Mode */}
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">Comment souhaitez-vous rechercher ?</h2>
              <div className="space-y-2">
                {searchModes.map(mode => {
                  const Icon = mode.icon;
                  return (
                    <button key={mode.id} onClick={() => setSearchMode(mode.id as typeof searchMode)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                        searchMode === mode.id
                          ? 'bg-red-600/10 border-red-300 shadow-lg shadow-red-600/10'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300 dark:hover:border-slate-500'
                      }`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        searchMode === mode.id ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-400 dark:text-slate-500 dark:text-slate-500'
                      }`}><Icon className="w-5 h-5" /></div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{mode.label}</p>
                        <p className="text-[11px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{mode.desc}</p>
                      </div>
                      {searchMode === mode.id && <Check className="w-5 h-5 text-red-600 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photo Upload (if photo mode) */}
            {searchMode === 'photo' && (
              <div>
                <label className="text-xs font-medium text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-2 block">Photo de la pièce *</label>
                <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-red-300 transition-colors">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhoto(e, 'photo')} />
                  {photoPreview ? (
                    <img src={photoPreview} alt="Pièce" className="max-h-40 mx-auto rounded-lg object-contain" />
                  ) : (
                    <>
                      <Camera className="w-10 h-10 text-gray-400 dark:text-slate-500 dark:text-slate-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-400 dark:text-slate-500 dark:text-slate-500">Appuyez pour ajouter une photo</p>
                      <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500 mt-1">Aide l&apos;expert à identifier la pièce précisément</p>
                    </>
                  )}
                </label>
              </div>
            )}

            {/* Vehicle Info */}
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">Informations du véhicule</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Marque *</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {brands.slice(0, 8).map(b => (
                      <button key={b} type="button" onClick={() => update('brand', b)}
                        className={`py-2 px-1 rounded-lg text-[10px] font-medium text-center transition-all ${
                          form.brand === b ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 dark:text-slate-300 dark:text-slate-300 border border-gray-200 hover:border-slate-500'
                        }`}>{b}</button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Modèle *</label>
                    <input type="text" placeholder="Ex: Corolla" value={form.model} onChange={(e) => update('model', e.target.value)}
                      className="w-full px-3 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-rp-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Année *</label>
                    <select value={form.year} onChange={(e) => update('year', e.target.value)}
                      className="w-full px-3 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-rp-primary">
                      <option value="">Année</option>
                      {Array.from({ length: 20 }, (_, i) => 2025 - i).map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Motorisation</label>
                    <input type="text" placeholder="Ex: 1.8 essence" value={form.engine} onChange={(e) => update('engine', e.target.value)}
                      className="w-full px-3 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-rp-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">VIN / Châssis</label>
                    <input type="text" placeholder={searchMode === 'vin' ? 'Requis *' : 'Optionnel'} value={form.vin} onChange={(e) => update('vin', e.target.value)}
                      className="w-full px-3 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-rp-primary" />
                  </div>
                </div>
                {searchMode === 'vin' && !form.vin && (
                  <p className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg">
                    ⚠️ VIN manquant (requis pour commande externe)
                  </p>
                )}
              </div>
            </div>

            </div>
        )}

        {/* ===== ÉTAPE 2 : Pièce + Description ===== */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">Pièce recherchée</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Nom de la pièce *</label>
                  <input type="text" placeholder="Ex: Plaquettes de frein avant" value={form.partName} onChange={(e) => update('partName', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-rp-primary" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Catégorie</label>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map(c => (
                      <button key={c} type="button" onClick={() => update('partName', c)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${
                          form.partName === c ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:bg-slate-600'
                        }`}>{c}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Description détaillée *</label>
                  <textarea placeholder="Décrivez votre besoin en détail. Plus c&apos;est précis, plus les vendeurs pourront vous aider." value={form.description}
                    onChange={(e) => update('description', e.target.value)} rows={4}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-rp-primary resize-none" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Quantité</label>
                    <input type="number" min="1" value={form.quantity} onChange={(e) => update('quantity', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-rp-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Photo (optionnel)</label>
                    <label className="block py-3 px-4 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-400 dark:text-slate-500 dark:text-slate-500 cursor-pointer hover:border-slate-500 transition-colors text-center flex items-center justify-center gap-1.5">
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhoto(e, 'photo')} />
                      {photoPreview ? <><Check className="w-4 h-4" /> Photo ajoutée</> : <><Camera className="w-4 h-4" /> Ajouter photo</>}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            </div>
        )}

        {/* ===== ÉTAPE 3 : Livraison + Contact ===== */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">Mode de livraison</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {deliveryTypes.map(dt => (
                  <button key={dt.id} onClick={() => update('deliveryType', dt.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      form.deliveryType === dt.id
                        ? 'bg-red-600/10 border-red-300 shadow-lg shadow-red-600/10'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300 dark:hover:border-slate-500'
                    }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {dt.icon}
                      <span className="text-xs font-bold text-gray-900 dark:text-white dark:text-white">{dt.label}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 dark:text-slate-500 dark:text-slate-500">{dt.desc}</p>
                    <span className="text-[10px] text-red-600 font-medium">{dt.time}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">Localisation</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Ville *</label>
                  <select value={form.city} onChange={(e) => update('city', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-rp-primary">
                    <option value="">Sélectionner</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400 dark:text-slate-500 dark:text-slate-500 mb-1 block">Adresse / Quartier</label>
                  <input type="text" placeholder="Ex: Marché Dantokpa, face à..." value={form.address} onChange={(e) => update('address', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-rp-primary" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">Contact</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <button onClick={() => update('contactMethod', 'whatsapp')}
                  className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                    form.contactMethod === 'whatsapp' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-gray-50 border-gray-200'
                  }`}>
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium text-gray-900 dark:text-white">WhatsApp</span>
                </button>
                <button onClick={() => update('contactMethod', 'call')}
                  className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                    form.contactMethod === 'call' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-gray-50 border-gray-200'
                  }`}>
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-medium text-gray-900 dark:text-white">Appel direct</span>
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white dark:text-white mb-2">Résumé</h3>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-gray-400 dark:text-slate-500 dark:text-slate-500">Véhicule</span><span className="text-gray-900 dark:text-white font-medium">{form.brand} {form.model} {form.year}</span></div>
                <div className="flex justify-between"><span className="text-gray-400 dark:text-slate-500 dark:text-slate-500">Pièce</span><span className="text-gray-900 dark:text-white font-medium">{form.partName}</span></div>
                <div className="flex justify-between"><span className="text-gray-400 dark:text-slate-500 dark:text-slate-500">Livraison</span><span className="text-gray-900 dark:text-white font-medium">{deliveryTypes.find(d => d.id === form.deliveryType)?.label}</span></div>
                <div className="flex justify-between"><span className="text-gray-400 dark:text-slate-500 dark:text-slate-500">Ville</span><span className="text-gray-900 dark:text-white font-medium">{form.city || '—'}</span></div>
              </div>
            </div>
          </div>
        )}

        <BottomActionBar>
          {step === 1 && (
            <button onClick={() => setStep(2)} disabled={!form.brand || !form.model || !form.year || (searchMode === 'vin' && !form.vin)}
              className="flex-1 py-3.5 bg-red-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-600/20 hover:bg-red-600-dark transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
              Continuer
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {step === 2 && (
            <>
              <button onClick={() => setStep(1)} className="py-3 px-5 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl text-sm font-medium">Retour</button>
              <button onClick={() => setStep(3)} disabled={!form.partName}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-600/20 disabled:opacity-40 flex items-center justify-center gap-2">
                Continuer
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <button onClick={() => setStep(2)} className="py-3 px-5 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl text-sm font-medium">Retour</button>
              <button onClick={handleSubmit} disabled={!form.city}
                className="flex-1 py-3.5 bg-red-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-600/20 disabled:opacity-40 flex items-center justify-center gap-2">
                <Rocket className="w-4 h-4" /> Publier la demande
              </button>
            </>
          )}
        </BottomActionBar>
      </div>

      <BottomNav />
    </div>
  );
}
