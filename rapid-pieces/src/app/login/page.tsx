'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, ArrowLeft, ShoppingCart, Store, User, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { POPULAR_BRANDS, POPULAR_CATEGORIES } from '@/lib/types';

type Mode = 'login' | 'register';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [role, setRole] = useState<'buyer' | 'seller' | ''>('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLocation, setRegLocation] = useState('');
  const [regBrands, setRegBrands] = useState<string[]>([]);
  const [regCategories, setRegCategories] = useState<string[]>([]);

  const toggleBrand = (b: string) => setRegBrands(p => p.includes(b) ? p.filter(x => x !== b) : [...p, b]);
  const toggleCategory = (c: string) => setRegCategories(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      if (!role) {
        if (email === 'admin' && password === 'embr@y@ge') {
          login('admin', 'admin', 'embr@y@ge');
          router.push('/admin');
          return;
        }
        setError('Veuillez sélectionner un rôle ou identifiants incorrects');
        setIsLoading(false);
        return;
      }
      const success = login(role, email, password);
      if (success) router.push(role === 'buyer' ? '/buyer' : '/seller');
      else setError('Email ou mot de passe incorrect');
      setIsLoading(false);
    }, 500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!role) { setError('Veuillez choisir un rôle'); return; }
    if (!regName || !email || !password || !regPhone) { setError('Veuillez remplir tous les champs obligatoires'); return; }
    const success = register(role, { name: regName, email, password, phone: regPhone, location: regLocation });
    if (success) router.push(role === 'buyer' ? '/buyer' : '/seller');
  };

  const reset = () => { setEmail(''); setPassword(''); setError(''); setRegName(''); setRegPhone(''); setRegLocation(''); setRegBrands([]); setRegCategories([]); };

  return (
    <div className="min-h-screen bg-rp-bg flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Image src="/logo_rapidePiece.jpeg" alt="Rapide Pièces" width={72} height={72} className="h-20 w-auto object-contain rounded-2xl mx-auto mb-4 shadow-2xl shadow-red-600/20" priority />
            <h1 className="text-2xl font-extrabold text-white">Rapide Pièces</h1>
            <p className="text-sm text-slate-400 mt-1">La bourse des pièces automobiles</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
            {mode === 'login' && (
              <>
                <h2 className="text-center text-lg font-bold text-white mb-5">Se connecter</h2>
                {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl mb-4 text-center">{error}</div>}

                <div className="mb-4">
                  <label className="text-xs font-medium text-slate-400 mb-2 block">Vous êtes ?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setRole(role === 'buyer' ? '' : 'buyer')}
                      className={`py-3 rounded-xl text-xs font-semibold transition-all border-2 ${
                        role === 'buyer' ? 'bg-rp-primary text-white border-rp-primary shadow-lg shadow-red-600/20' : 'bg-slate-700/50 text-slate-300 border-slate-600/50 hover:border-red-500/30'
                      }`}>
                      <ShoppingCart className="w-5 h-5 mx-auto mb-1" /> Acheteur
                    </button>
                    <button type="button" onClick={() => setRole(role === 'seller' ? '' : 'seller')}
                      className={`py-3 rounded-xl text-xs font-semibold transition-all border-2 ${
                        role === 'seller' ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20' : 'bg-slate-700/50 text-slate-300 border-slate-600/50 hover:border-blue-500/30'
                      }`}>
                      <Store className="w-5 h-5 mx-auto mb-1" /> Vendeur
                    </button>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-400 mb-1 block">{role ? 'Email' : 'Identifiant'}</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input type="text" placeholder={role ? 'votre@email.com' : 'Identifiant'} value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-rp-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-400 mb-1 block">Mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-rp-primary" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading || !email || !password}
                    className="w-full py-3.5 bg-rp-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-red-600/30 hover:bg-rp-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {isLoading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Connexion...</> : 'Se connecter'}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-400">
                    Pas encore de compte ?{' '}
                    <button onClick={() => { setMode('register'); reset(); }} className="text-rp-primary font-semibold hover:underline">S&apos;inscrire</button>
                  </p>
                </div>
              </>
            )}

            {mode === 'register' && (
              <>
                <div className="flex items-center gap-2 mb-5">
                  <button onClick={() => { setMode('login'); reset(); }} className="text-slate-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></button>
                  <h2 className="text-lg font-bold text-white">S&apos;inscrire</h2>
                </div>
                {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl mb-4 text-center">{error}</div>}

                <div className="mb-4">
                  <label className="text-xs font-medium text-slate-400 mb-2 block">Vous souhaitez devenir *</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setRole(role === 'buyer' ? '' : 'buyer')}
                      className={`py-3 rounded-xl text-xs font-semibold transition-all border-2 ${role === 'buyer' ? 'bg-rp-primary text-white border-rp-primary' : 'bg-slate-700/50 text-slate-300 border-slate-600/50'}`}>
                      <ShoppingCart className="w-5 h-5 mx-auto mb-1" /> Acheteur
                    </button>
                    <button type="button" onClick={() => setRole(role === 'seller' ? '' : 'seller')}
                      className={`py-3 rounded-xl text-xs font-semibold transition-all border-2 ${role === 'seller' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-700/50 text-slate-300 border-slate-600/50'}`}>
                      <Store className="w-5 h-5 mx-auto mb-1" /> Vendeur
                    </button>
                  </div>
                </div>

                <form onSubmit={handleRegister} className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-400 mb-1 block">{role === 'seller' ? 'Nom du magasin' : 'Nom complet'} *</label>
                    <input type="text" placeholder={role === 'seller' ? 'Ex: BigMoteurs' : 'Votre nom'} value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-rp-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-slate-400 mb-1 block">Téléphone *</label>
                      <input type="tel" placeholder="+229 XX XX XX XX" value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-rp-primary" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400 mb-1 block">Ville</label>
                      <input type="text" placeholder="Cotonou" value={regLocation}
                        onChange={(e) => setRegLocation(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-rp-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-400 mb-1 block">Email *</label>
                    <input type="email" placeholder="votre@email.com" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-rp-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-400 mb-1 block">Mot de passe *</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 pr-10 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-rp-primary" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {role === 'seller' && (
                    <>
                      <div>
                        <label className="text-xs font-medium text-slate-400 mb-2 block">Marques</label>
                        <div className="flex flex-wrap gap-1.5">
                          {POPULAR_BRANDS.slice(0, 10).map(b => (
                            <button key={b} type="button" onClick={() => toggleBrand(b)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${regBrands.includes(b) ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>{b}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-400 mb-2 block">Catégories</label>
                        <div className="flex flex-wrap gap-1.5">
                          {POPULAR_CATEGORIES.slice(0, 8).map(c => (
                            <button key={c} type="button" onClick={() => toggleCategory(c)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${regCategories.includes(c) ? 'bg-rp-primary text-white' : 'bg-slate-700 text-slate-400'}`}>{c}</button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <button type="submit" disabled={!role || !email || !password || !regName || !regPhone}
                    className="w-full py-3.5 bg-rp-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-red-600/30 hover:bg-rp-primary-dark transition-colors disabled:opacity-50">
                    {role === 'seller' ? 'Créer mon compte vendeur' : 'Créer mon compte'}
                  </button>
                </form>

                {role === 'seller' && (
                  <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                    <p className="text-[10px] text-amber-400">⚠️ Votre compte sera en attente de vérification avant activation.</p>
                  </div>
                )}

                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-400">
                    Déjà un compte ?{' '}
                    <button onClick={() => { setMode('login'); reset(); }} className="text-rp-primary font-semibold hover:underline">Se connecter</button>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
