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

  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register fields (seller)
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLocation, setRegLocation] = useState('');
  const [regBrands, setRegBrands] = useState<string[]>([]);
  const [regCategories, setRegCategories] = useState<string[]>([]);

  const toggleRegBrand = (b: string) => setRegBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);
  const toggleRegCategory = (c: string) => setRegCategories(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  // ===== LOGIN =====
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      // No role selected → try admin
      if (!role) {
        if (email === 'admin' && password === 'embr@y@ge') {
          login('admin', 'admin', 'embr@y@ge');
          router.push('/admin');
          return;
        }
        setError('Veuillez effectuer un choix de rôle, ou identifiants incorrects');
        setIsLoading(false);
        return;
      }

      // Role selected → normal login
      const success = login(role, email, password);
      if (success) {
        router.push(role === 'buyer' ? '/buyer' : '/seller');
      } else {
        setError('Email ou mot de passe incorrect');
      }
      setIsLoading(false);
    }, 500);
  };

  // ===== REGISTER =====
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!role) {
      setError('Veuillez choisir un rôle');
      return;
    }

    if (!regName || !email || !password || !regPhone) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const success = register(role, {
      name: regName,
      email,
      password,
      phone: regPhone,
      location: regLocation,
    });

    if (success) {
      router.push(role === 'buyer' ? '/buyer' : '/seller');
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('');
    setRegName('');
    setRegPhone('');
    setRegLocation('');
    setRegBrands([]);
    setRegCategories([]);
  };

  return (
    <div className="min-h-screen bg-rp-bg flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-rp-primary via-rp-primary-dark to-rp-secondary text-white px-4 pt-10 pb-8 sm:pt-12">
        <div className="max-w-md mx-auto text-center">
          <Image src="/logo_rapidePiece.jpeg" alt="Rapid Pièces" width={72} height={72} className="h-18 w-auto object-contain rounded-2xl bg-white shadow-lg mx-auto mb-4" priority />
          <h1 className="text-2xl sm:text-3xl font-bold">Rapid Pièces</h1>
          <p className="text-white/70 text-sm mt-1">La bourse des pièces automobiles</p>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 -mt-5">
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 w-full max-w-md">

          {/* ===== MODE LOGIN ===== */}
          {mode === 'login' && (
            <>
              <h2 className="text-center text-lg font-bold text-rp-text mb-5">Se connecter</h2>

              {error && <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl mb-4 text-center">{error}</div>}

              {/* Role Selector */}
              <div className="mb-4">
                <label className="text-xs font-medium text-rp-text-muted mb-2 block">Vous êtes ?</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole(role === 'buyer' ? '' : 'buyer')}
                    className={`py-3 rounded-xl text-xs font-semibold transition-all border-2 ${
                      role === 'buyer'
                        ? 'bg-rp-primary text-white border-rp-primary'
                        : 'bg-rp-bg text-rp-text-muted border-transparent hover:border-rp-primary/30'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5 mx-auto mb-1" />
                    Acheteur
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole(role === 'seller' ? '' : 'seller')}
                    className={`py-3 rounded-xl text-xs font-semibold transition-all border-2 ${
                      role === 'seller'
                        ? 'bg-rp-secondary text-white border-rp-secondary'
                        : 'bg-rp-bg text-rp-text-muted border-transparent hover:border-rp-secondary/30'
                    }`}
                  >
                    <Store className="w-5 h-5 mx-auto mb-1" />
                    Vendeur
                  </button>
                  <div className="py-3 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-700 border-2 border-transparent text-center flex flex-col items-center justify-center">
                    <Lock className="w-5 h-5 mx-auto mb-1" />
                    Admin
                  </div>
                </div>
                {!role && (
                  <p className="text-[10px] text-rp-text-muted text-center mt-2">
                    Laissez vide et saisissez les identifiants admin pour accéder au panneau d&apos;administration
                  </p>
                )}
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-rp-text-muted mb-1 block">
                    {role ? 'Email' : 'Identifiant'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rp-text-muted" />
                    <input
                      type="text"
                      placeholder={role ? 'votre@email.com' : 'Identifiant ou email'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-rp-bg rounded-xl text-sm border-0 outline-none focus:ring-2 focus:ring-rp-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-rp-text-muted mb-1 block">Mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rp-text-muted" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-rp-bg rounded-xl text-sm border-0 outline-none focus:ring-2 focus:ring-rp-primary"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                      {showPassword ? <EyeOff className="w-4 h-4 text-rp-text-muted" /> : <Eye className="w-4 h-4 text-rp-text-muted" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email || !password}
                  className={`w-full py-3.5 text-white rounded-xl text-sm font-bold shadow-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${
                    role === 'buyer' ? 'bg-rp-primary hover:bg-rp-primary-dark' :
                    role === 'seller' ? 'bg-rp-secondary hover:bg-rp-secondary-light' :
                    'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {isLoading ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Connexion...</>
                  ) : 'Se connecter'}
                </button>
              </form>

              {/* Demo hint */}
              <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                <p className="text-[10px] text-blue-600 font-medium mb-1">💡 Identifiants de démo :</p>
                <div className="space-y-0.5">
                  <p className="text-[10px] text-blue-600">Acheteur : <strong>acheteur@rapidpieces.com</strong> / <strong>acheteur123</strong></p>
                  <p className="text-[10px] text-blue-600">Vendeur : <strong>vendeur@rapidpieces.com</strong> / <strong>vendeur123</strong></p>
                  <p className="text-[10px] text-blue-600">Admin : <strong>admin</strong> / <strong>embr@y@ge</strong> (sans choix de rôle)</p>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-rp-text-muted">
                  Pas encore de compte ?{' '}
                  <button onClick={() => { setMode('register'); resetForm(); }} className="text-rp-primary font-semibold hover:underline">
                    S&apos;inscrire
                  </button>
                </p>
              </div>
            </>
          )}

          {/* ===== MODE INSCRIPTION ===== */}
          {mode === 'register' && (
            <>
              <div className="flex items-center gap-2 mb-5">
                <button onClick={() => { setMode('login'); resetForm(); }} className="text-rp-text-muted hover:text-rp-text">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-bold text-rp-text">S&apos;inscrire</h2>
              </div>

              {error && <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl mb-4 text-center">{error}</div>}

              {/* Role Selector */}
              <div className="mb-4">
                <label className="text-xs font-medium text-rp-text-muted mb-2 block">Vous souhaitez devenir *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole(role === 'buyer' ? '' : 'buyer')}
                    className={`py-3 rounded-xl text-xs font-semibold transition-all border-2 ${
                      role === 'buyer'
                        ? 'bg-rp-primary text-white border-rp-primary'
                        : 'bg-rp-bg text-rp-text-muted border-transparent hover:border-rp-primary/30'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5 mx-auto mb-1" />
                    Acheteur
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole(role === 'seller' ? '' : 'seller')}
                    className={`py-3 rounded-xl text-xs font-semibold transition-all border-2 ${
                      role === 'seller'
                        ? 'bg-rp-secondary text-white border-rp-secondary'
                        : 'bg-rp-bg text-rp-text-muted border-transparent hover:border-rp-secondary/30'
                    }`}
                  >
                    <Store className="w-5 h-5 mx-auto mb-1" />
                    Vendeur
                  </button>
                </div>
              </div>

              <form onSubmit={handleRegister} className="space-y-3">
                {/* Common fields */}
                {role === 'buyer' && (
                  <div>
                    <label className="text-xs font-medium text-rp-text-muted mb-1 block">Nom complet *</label>
                    <input type="text" placeholder="Jean Kakpassi" value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-4 py-3 bg-rp-bg rounded-xl text-sm border-0 outline-none focus:ring-2 focus:ring-rp-primary" />
                  </div>
                )}

                {role === 'seller' && (
                  <div>
                    <label className="text-xs font-medium text-rp-text-muted mb-1 block">Nom du magasin *</label>
                    <input type="text" placeholder="Auto Pièces Cotonou" value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-4 py-3 bg-rp-bg rounded-xl text-sm border-0 outline-none focus:ring-2 focus:ring-rp-secondary" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-rp-text-muted mb-1 block">Téléphone *</label>
                    <input type="tel" placeholder="+229 XX XX XX XX" value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-rp-bg rounded-xl text-sm border-0 outline-none focus:ring-2 focus:ring-rp-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-rp-text-muted mb-1 block">Ville</label>
                    <input type="text" placeholder="Cotonou" value={regLocation}
                      onChange={(e) => setRegLocation(e.target.value)}
                      className="w-full px-4 py-3 bg-rp-bg rounded-xl text-sm border-0 outline-none focus:ring-2 focus:ring-rp-primary" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-rp-text-muted mb-1 block">Email *</label>
                  <input type="email" placeholder="votre@email.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-rp-bg rounded-xl text-sm border-0 outline-none focus:ring-2 focus:ring-rp-primary" />
                </div>

                <div>
                  <label className="text-xs font-medium text-rp-text-muted mb-1 block">Mot de passe *</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 pr-10 py-3 bg-rp-bg rounded-xl text-sm border-0 outline-none focus:ring-2 focus:ring-rp-primary" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                      {showPassword ? <EyeOff className="w-4 h-4 text-rp-text-muted" /> : <Eye className="w-4 h-4 text-rp-text-muted" />}
                    </button>
                  </div>
                </div>

                {/* Seller-specific fields */}
                {role === 'seller' && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-rp-text-muted mb-2 block">Marques que vous proposez</label>
                      <div className="flex flex-wrap gap-1.5">
                        {POPULAR_BRANDS.slice(0, 10).map(b => (
                          <button key={b} type="button" onClick={() => toggleRegBrand(b)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${
                              regBrands.includes(b) ? 'bg-rp-secondary text-white' : 'bg-rp-bg text-rp-text-muted'
                            }`}>
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-rp-text-muted mb-2 block">Catégories de pièces</label>
                      <div className="flex flex-wrap gap-1.5">
                        {POPULAR_CATEGORIES.slice(0, 8).map(c => (
                          <button key={c} type="button" onClick={() => toggleRegCategory(c)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${
                              regCategories.includes(c) ? 'bg-rp-primary text-white' : 'bg-rp-bg text-rp-text-muted'
                            }`}>
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <button type="submit" disabled={!role || !email || !password || !regName || !regPhone}
                  className={`w-full py-3.5 text-white rounded-xl text-sm font-bold shadow-lg transition-colors disabled:opacity-50 ${
                    role === 'buyer' ? 'bg-rp-primary hover:bg-rp-primary-dark' : 'bg-rp-secondary hover:bg-rp-secondary-light'
                  }`}>
                  {role === 'seller' ? 'Créer mon compte vendeur' : 'Créer mon compte'}
                </button>
              </form>

              {role === 'seller' && (
                <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-[10px] text-amber-700">
                    ⚠️ Votre compte sera en attente de vérification par l&apos;équipe Rapid Pièces avant activation.
                  </p>
                </div>
              )}

              <div className="mt-4 text-center">
                <p className="text-xs text-rp-text-muted">
                  Déjà un compte ?{' '}
                  <button onClick={() => { setMode('login'); resetForm(); }} className="text-rp-primary font-semibold hover:underline">
                    Se connecter
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="text-center py-4">
        <Link href="/welcome" className="text-xs text-rp-text-muted hover:text-rp-primary">← Retour à l&apos;accueil</Link>
      </div>
    </div>
  );
}
