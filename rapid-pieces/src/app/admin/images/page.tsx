'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Image, Save, Trash2, Eye, Edit3, Check, X, Camera, Download, RefreshCw } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import ThemeToggle from '@/components/ThemeToggle';

interface ProductImage {
  id: string;
  name: string;
  currentImage: string;
  category: string;
}

const initialProducts: ProductImage[] = [
  { id: '1', name: 'Plaquettes de frein avant', currentImage: '/products/plaquettes_de_frein_avant.jpg', category: 'Freinage' },
  { id: '2', name: 'Filtre à huile moteur', currentImage: '/products/filtre_a_huile_moteur.webp', category: 'Filtration' },
  { id: '3', name: 'Alternateur reconditionné', currentImage: '/products/alternateur_reconditionne.webp', category: 'Moteur' },
  { id: '4', name: 'Amortisseur arrière gauche', currentImage: '/products/Amortisseur_arriere_gauche.webp', category: 'Suspension' },
  { id: '5', name: 'Kit d\'embrayage complet', currentImage: '/products/Kit_embrayage_complet.jpg', category: 'Transmission' },
  { id: '6', name: 'Batterie 60Ah', currentImage: '/products/batterie.webp', category: 'Électronique' },
  { id: '7', name: 'Pneu 205/55R16', currentImage: '/products/pneu.webp', category: 'Suspension' },
  { id: '8', name: 'Bobine d\'allumage', currentImage: '/products/bobine.jpg', category: 'Électronique' },
  { id: '9', name: 'Phare avant droit', currentImage: '/products/phare_avant_droit.jpg', category: 'Éclairage' },
  { id: '10', name: 'Radiateur moteur', currentImage: '/products/radiateur_moteur.jpg', category: 'Moteur' },
  { id: '11', name: 'Disque de frein avant', currentImage: '/products/disque_frein_avant.jpg', category: 'Freinage' },
  { id: '12', name: 'Courroie accessoires', currentImage: '/products/courroie_accessoires.jpg', category: 'Moteur' },
];

const svgFallbacks: Record<string, string> = {
  'Freinage': '/products/brake-pads.svg',
  'Filtration': '/products/oil-filter.svg',
  'Moteur': '/products/alternator.svg',
  'Suspension': '/products/shock-absorber.svg',
  'Transmission': '/products/clutch-kit.svg',
  'Électronique': '/products/battery.svg',
  'Éclairage': '/products/headlight.svg',
};

export default function AdminImagesPage() {
  const [products, setProducts] = useState<ProductImage[]>(initialProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentEditId, setCurrentEditId] = useState<string>('');

  const handleImageChange = (id: string, newImage: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, currentImage: newImage } : p));
    setEditingId(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentEditId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleImageChange(currentEditId, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFilePicker = (id: string) => {
    setCurrentEditId(id);
    fileInputRef.current?.click();
  };

  const resetToDefault = (id: string, category: string) => {
    const fallback = svgFallbacks[category] || '/products/brake-pads.svg';
    handleImageChange(id, fallback);
  };

  const handleSave = () => {
    // Save to localStorage
    const imageData: Record<string, string> = {};
    products.forEach(p => { imageData[p.id] = p.currentImage; });
    localStorage.setItem('rp_product_images', JSON.stringify(imageData));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 lg:pb-8">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-gray-400 hover:text-gray-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-sm font-bold text-gray-900 dark:text-white">Gestion des images</h1>
              <p className="text-[10px] text-gray-400">{products.length} produits</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={handleSave}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                saved ? 'bg-green-500 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}>
              {saved ? <><Check className="w-3 h-3" /> Sauvegardé</> : <><Save className="w-3 h-3" /> Sauvegarder</>}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Info banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
            <Camera className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Modifiez les images des produits. Cliquez sur une image pour la changer. Les modifications sont sauvegardées localement.</span>
          </p>
        </div>

        {/* Hidden file input */}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
              {/* Image */}
              <div className="relative group">
                <div className="h-48 bg-gray-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                  <img src={product.currentImage} alt={product.name} className="w-full h-full object-cover" />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => openFilePicker(product.id)}
                    className="bg-white text-gray-900 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-gray-100">
                    <Camera className="w-3 h-3" /> Changer
                  </button>
                  <button onClick={() => setPreviewImage(product.currentImage)}
                    className="bg-white/90 text-gray-900 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-white">
                    <Eye className="w-3 h-3" /> Voir
                  </button>
                  <button onClick={() => resetToDefault(product.id, product.category)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-red-600">
                    <Trash2 className="w-3 h-3" /> Reset
                  </button>
                </div>
              </div>
              {/* Info */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] bg-gray-100 dark:bg-slate-700 text-gray-500 px-2 py-0.5 rounded-full">{product.category}</span>
                </div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white truncate">{product.name}</h3>
                <p className="text-[10px] text-gray-400 truncate mt-0.5">{product.currentImage}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk actions */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Actions en masse</h3>
          <div className="flex gap-2">
            <button onClick={() => {
              const allData: Record<string, string> = {};
              products.forEach(p => { allData[p.id] = p.currentImage; });
              const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'product-images.json';
              a.click();
            }} className="flex-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-1.5">
              <Download className="w-3 h-3" /> Exporter config
            </button>
            <button onClick={() => {
              if (confirm('Réinitialiser toutes les images ?')) {
                setProducts(initialProducts);
              }
            }} className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-600 py-2 rounded-lg text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-all flex items-center justify-center gap-1.5">
              <RefreshCw className="w-3 h-3" /> Tout réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Preview modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setPreviewImage(null)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="h-96 bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
              <img src={previewImage} alt="Preview" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="p-4 flex justify-end">
              <button onClick={() => setPreviewImage(null)} className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-bold">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav role="admin" />
    </div>
  );
}
