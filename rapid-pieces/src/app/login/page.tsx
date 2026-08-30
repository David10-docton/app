'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, ArrowLeft, Store, Lock, User } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { POPULAR_BRANDS, POPULAR_CATEGORIES } from '@/lib/types';

type Mode = 'login' | 'register';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
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
      if (email === 'admin' && password === 'embr@y@ge') {
        login('admin', 'admin', 'embr@y@ge');
        router.push('/admin');
        return;
      }
      if (email && password) {
        const success = login('seller', email, password);
        if (success) { router.push('/seller'); return; }
      }
      setError('Identifiant ou mot de passe incorrect');
      setIsLoading(false);
    }, 500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!regName || !email || !password || !regPhone) { setError('Veuillez remplir tous les champs obligatoires'); return; }
    const success = register('seller', { name: regName, email, password, phone: regPhone, location: regLocation });
    if (success) router.push('/seller');
  };

  const reset = () => { setEmail(''); setPassword(''); setError(''); setRegName(''); setRegPhone(''); setRegLocation(''); setRegBrands([]); setRegCategories([]); };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col">
      <div className="px-4 pt-4">
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-600 dark:text-slate-300 dark:text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour à la boutique
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Image src="/logo_rapidePiece.jpeg" alt="Rapide Pièces" width={72} height={72} className="h-20 w-auto object-contain rounded-2xl mx-auto mb-4 shadow-lg" priority />
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Espace Vendeur</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 dark:text-slate-400 mt-1">Gérez votre boutique et vos ventes</p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
            {mode === 'login' && (
              <>
                <h2 className="text-center text-lg font-bold text-gray-900 dark:text-white dark:text-white mb-5">Se connecter</h2>
                {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl mb-4 text-center">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-slate-400 dark:text-slate-400 mb-1 block">Email</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500 dark:text-slate-500" />
                      <input type="text" placeholder="votre@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-slate-400 dark:text-slate-400 mb-1 block">Mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500 dark:text-slate-500" />
                      <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-600 dark:text-slate-300 dark:text-slate-300">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading || !email || !password}
                    className="w-full py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {isLoading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Connexion...</> : 'Se connecter'}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500">
                    Pas encore de compte ?{' '}
                    <button onClick={() => { setMode('register'); reset(); }} className="text-blue-600 font-semibold hover:underline">S&apos;inscrire</button>
                  </p>
                </div>
              </>
            )}

            {mode === 'register' && (
              <>
                <div className="flex items-center gap-2 mb-5">
                  <button onClick={() => { setMode('login'); reset(); }} className="text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-600 dark:text-slate-300 dark:text-slate-300"><ArrowLeft className="w-5 h-5" /></button>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">Inscription Vendeur</h2>
                </div>
                {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl mb-4 text-center">{error}</div>}

                <form onSubmit={handleRegister} className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-slate-400 dark:text-slate-400 mb-1 block">Nom du magasin *</label>
                    <input type="text" placeholder="Ex: BigMoteurs" value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-slate-400 dark:text-slate-400 mb-1 block">Téléphone *</label>
                      <input type="tel" placeholder="+229 XX XX XX XX" value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-slate-400 dark:text-slate-400 mb-1 block">Ville</label>
                      <input type="text" placeholder="Cotonou" value={regLocation}
                        onChange={(e) => setRegLocation(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-slate-400 dark:text-slate-400 mb-1 block">Email *</label>
                    <input type="email" placeholder="votre@email.com" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-slate-400 dark:text-slate-400 mb-1 block">Mot de passe *</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 pr-10 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 dark:text-slate-500 hover:text-gray-600 dark:text-slate-300 dark:text-slate-300">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-slate-400 dark:text-slate-400 mb-2 block">Marques</label>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_BRANDS.slice(0, 10).map(b => (
                        <button key={b} type="button" onClick={() => toggleBrand(b)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${regBrands.includes(b) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 dark:text-slate-400 dark:text-slate-400'}`}>{b}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-slate-400 dark:text-slate-400 mb-2 block">Catégories</label>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_CATEGORIES.slice(0, 8).map(c => (
                        <button key={c} type="button" onClick={() => toggleCategory(c)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${regCategories.includes(c) ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 dark:text-slate-400 dark:text-slate-400'}`}>{c}</button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" disabled={!email || !password || !regName || !regPhone}
                    className="w-full py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50">
                    Créer mon compte vendeur
                  </button>
                </form>

                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-[10px] text-amber-600">⚠️ Votre compte sera en attente de vérification avant activation.</p>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-400 dark:text-slate-500 dark:text-slate-500">
                    Déjà un compte ?{' '}
                    <button onClick={() => { setMode('login'); reset(); }} className="text-blue-600 font-semibold hover:underline">Se connecter</button>
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
