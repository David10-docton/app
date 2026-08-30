'use client';

import { useState } from 'react';
import { Plus, Search, Edit3, Trash2, Package, BarChart3, TrendingUp, Eye } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { POPULAR_BRANDS, POPULAR_CATEGORIES } from '@/lib/types';

const myCatalogue = [
  { id: '1', name: 'Plaquettes de frein avant OEM', brand: 'Toyota', category: 'Freins', stock: 12, price: 62000, views: 234, inquiries: 18, status: 'active' },
  { id: '2', name: 'Filtre à huile', brand: 'Toyota', category: 'Filtration', stock: 45, price: 8000, views: 567, inquiries: 42, status: 'active' },
  { id: '3', name: 'Huile moteur 5W30 4L', brand: 'Multi', category: 'Moteur', stock: 30, price: 15000, views: 890, inquiries: 67, status: 'active' },
  { id: '4', name: 'Batterie 60Ah', brand: 'Toyota', category: 'Électrique', stock: 8, price: 85000, views: 123, inquiries: 9, status: 'active' },
  { id: '5', name: 'Ampoule phare H7', brand: 'Multi', category: 'Éclairage', stock: 0, price: 5000, views: 45, inquiries: 3, status: 'out_of_stock' },
];

export default function SellerCataloguePage() {
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'catalogue' | 'stats'>('catalogue');
  const [newProduct, setNewProduct] = useState({ name: '', brand: '', category: '', stock: '', price: '', description: '' });

  const filtered = myCatalogue.filter(p => 
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-rp-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-rp-secondary to-rp-secondary-light text-white px-4 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold mb-1">Mon catalogue</h1>
          <p className="text-white/70 text-xs">{myCatalogue.length} produits • {myCatalogue.filter(p => p.stock > 0).length} en stock</p>
          
          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setSelectedTab('catalogue')}
              className={`px-4 py-2 rounded-full text-xs font-medium ${
                selectedTab === 'catalogue' ? 'bg-white text-rp-secondary' : 'bg-white/20 text-white'
              }`}
            >
              📦 Catalogue
            </button>
            <button
              onClick={() => setSelectedTab('stats')}
              className={`px-4 py-2 rounded-full text-xs font-medium ${
                selectedTab === 'stats' ? 'bg-white text-rp-secondary' : 'bg-white/20 text-white'
              }`}
            >
              📊 Statistiques
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 pb-20">
        {selectedTab === 'catalogue' && (
          <>
            {/* Search + Add */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rp-text-muted" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl text-sm border-0 outline-none focus:ring-2 focus:ring-rp-primary"
                />
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="w-10 h-10 bg-rp-primary rounded-xl flex items-center justify-center"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Add Product Form */}
            {showAddForm && (
              <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 slide-up">
                <h3 className="font-bold text-sm text-rp-text mb-3">Ajouter un produit</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nom du produit"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-rp-bg rounded-xl text-sm border-0 outline-none focus:ring-2 focus:ring-rp-primary"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newProduct.brand}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, brand: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-rp-bg rounded-xl text-sm border-0 outline-none"
                    >
                      <option value="">Marque</option>
                      {POPULAR_BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-rp-bg rounded-xl text-sm border-0 outline-none"
                    >
                      <option value="">Catégorie</option>
                      {POPULAR_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Stock"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-rp-bg rounded-xl text-sm border-0 outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Prix (FCFA)"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-rp-bg rounded-xl text-sm border-0 outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowAddForm(false)} className="flex-1 py-2.5 bg-rp-bg text-rp-text rounded-xl text-sm font-medium">Annuler</button>
                    <button className="flex-1 py-2.5 bg-rp-primary text-white rounded-xl text-sm font-semibold">Ajouter</button>
                  </div>
                </div>
              </div>
            )}

            {/* Product List */}
            <div className="space-y-2">
              {filtered.map((product) => (
                <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-rp-text">{product.name}</h3>
                        {product.stock === 0 && (
                          <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">Rupture</span>
                        )}
                      </div>
                      <p className="text-xs text-rp-text-muted">{product.brand} • {product.category}</p>
                    </div>
                    <p className="font-bold text-rp-primary text-sm">{product.price.toLocaleString()} <span className="text-[10px]">FCFA</span></p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-rp-text-muted">
                      <span className="flex items-center gap-1">
                        <Package className="w-3 h-3" /> Stock: <strong className={product.stock === 0 ? 'text-rp-danger' : 'text-rp-text'}>{product.stock}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {product.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> {product.inquiries}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button className="w-7 h-7 bg-rp-bg rounded-lg flex items-center justify-center">
                        <Edit3 className="w-3.5 h-3.5 text-rp-text-muted" />
                      </button>
                      <button className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center">
                        <Trash2 className="w-3.5 h-3.5 text-rp-danger" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedTab === 'stats' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-sm text-rp-text mb-3">Vue d&apos;ensemble</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-rp-bg rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-rp-text">1 859</p>
                  <p className="text-xs text-rp-text-muted">Vues totales</p>
                </div>
                <div className="bg-rp-bg rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-rp-primary">139</p>
                  <p className="text-xs text-rp-text-muted">Demandes reçues</p>
                </div>
                <div className="bg-rp-bg rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-rp-success">7.5%</p>
                  <p className="text-xs text-rp-text-muted">Taux conversion</p>
                </div>
                <div className="bg-rp-bg rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-rp-accent">12.4M</p>
                  <p className="text-xs text-rp-text-muted">CA mensuel FCFA</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-sm text-rp-text mb-3">Produits les plus demandés</h3>
              {myCatalogue.sort((a, b) => b.inquiries - a.inquiries).slice(0, 5).map((p, i) => (
                <div key={p.id} className={`flex items-center gap-3 py-2 ${i < 4 ? 'border-b border-rp-border/50' : ''}`}>
                  <span className="text-xs font-bold text-rp-text-muted w-4">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-rp-text">{p.name}</p>
                    <p className="text-xs text-rp-text-muted">{p.inquiries} demandes • {p.views} vues</p>
                  </div>
                  <span className="text-sm font-bold text-rp-primary">{p.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-rp-secondary to-rp-secondary-light rounded-2xl p-4 text-white">
              <h3 className="font-bold mb-1">💡 Rapid Price</h3>
              <p className="text-xs text-white/80 mb-3">Prix moyen du marché pour vos produits</p>
              {myCatalogue.slice(0, 3).map(p => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-white/20 last:border-0">
                  <span className="text-xs">{p.name}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-white/60">Marché: {Math.round(p.price * 1.1).toLocaleString()}</span>
                    <span className="font-bold">Vous: {p.price.toLocaleString()}</span>
                    {p.price < p.price * 1.1 && <span className="text-rp-gold">✓ Compétitif</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav role="seller" />
    </div>
  );
}
