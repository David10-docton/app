'use client';

import Link from 'next/link';
import { Star, ShoppingCart, MapPin, Clock, Shield, Truck, BadgeCheck } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  vehicle: string;
  price: number;
  oldPrice?: number;
  quality: string;
  seller: string;
  sellerBadge?: 'Verified' | 'Premium' | 'Top';
  rating: number;
  reviews: number;
  delivery: string;
  deliveryTime: string;
  inStock: boolean;
  image?: string;
  category: string;
}

export default function ProductCard({
  id, name, brand, vehicle, price, oldPrice, quality, seller,
  sellerBadge, rating, reviews, delivery, deliveryTime, inStock, category
}: ProductCardProps) {
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <Link href={`/offers/${id}`} className="group block bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:border-red-300 dark:hover:border-red-600 transition-all duration-200">
      {/* Image placeholder */}
      <div className="relative h-40 sm:h-48 bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
        <div className="text-5xl opacity-30">🔧</div>
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        <span className="absolute top-2 right-2 bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold px-2 py-0.5 rounded-full text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-600">
          {quality}
        </span>
      </div>

      <div className="p-3 sm:p-4">
        {/* Category & Vehicle */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded">{category}</span>
          <span className="text-[10px] text-gray-400 dark:text-slate-500">{vehicle}</span>
        </div>

        {/* Product name */}
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {name}
        </h3>

        {/* Brand */}
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{brand}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200 dark:fill-slate-600 dark:text-slate-600'}`} />
            ))}
          </div>
          <span className="text-[10px] text-gray-500 dark:text-slate-400">({reviews})</span>
        </div>

        {/* Seller */}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-xs text-gray-600 dark:text-slate-300">{seller}</span>
          {sellerBadge === 'Verified' && <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />}
          {sellerBadge === 'Premium' && <BadgeCheck className="w-3.5 h-3.5 text-purple-500" />}
          {sellerBadge === 'Top' && <BadgeCheck className="w-3.5 h-3.5 text-amber-500" />}
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400 dark:text-slate-500">
          <span className="flex items-center gap-0.5"><Truck className="w-3 h-3" /> {delivery}</span>
          <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {deliveryTime}</span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
          <div>
            {oldPrice && (
              <span className="text-xs text-gray-400 dark:text-slate-500 line-through block">{oldPrice.toLocaleString()} FCFA</span>
            )}
            <span className="text-lg font-bold text-gray-900 dark:text-white">{price.toLocaleString()} <span className="text-xs font-normal text-gray-400 dark:text-slate-500">FCFA</span></span>
          </div>
          <button className="w-9 h-9 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center shadow-md transition-colors">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Stock status */}
        <div className="mt-2">
          {inStock ? (
            <span className="text-[10px] text-green-600 dark:text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> En stock
            </span>
          ) : (
            <span className="text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Sur commande
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
