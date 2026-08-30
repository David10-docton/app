// Types pour Rapid Pièces

export type UserRole = 'buyer' | 'seller' | 'admin';

export type PartQuality = 'OEM' | 'Genuine' | 'Premium Aftermarket' | 'Standard Aftermarket' | 'Used' | 'Reconditioned';

export type DeliveryType = 'RAPID_NOW' | 'RAPID_CITY' | 'RAPID_NIGERIA' | 'RAPID_USA';

export type SellerBadge = 'New Seller' | 'Rapid Seller' | 'Verified Seller' | 'Premium Seller' | 'Top Seller';

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'in_transit' | 'delivered' | 'completed' | 'cancelled';

export interface Vehicle {
  brand: string;
  model: string;
  year: number;
  engine: string;
  vin?: string;
}

export interface PartRequest {
  id: string;
  vehicle: Vehicle;
  partName: string;
  oemReference?: string;
  photo?: string;
  description: string;
  quantity: number;
  quality?: PartQuality;
  location: string;
  budgetIndicative?: number;
  status: 'open' | 'matched' | 'ordered' | 'completed';
  createdAt: string;
  responsesCount: number;
  buyerId: string;
}

export interface Offer {
  id: string;
  requestId: string;
  sellerId: string;
  sellerName: string;
  sellerBadge: SellerBadge;
  sellerScore: number;
  partName: string;
  quality: PartQuality;
  price: number;
  currency: string;
  availability: 'immediate' | '24h' | '48h' | '3-5days' | '7-10days' | 'import';
  deliveryType: DeliveryType;
  deliveryTime: string;
  warranty?: string;
  rapidScore: number;
  description?: string;
}

export interface Seller {
  id: string;
  name: string;
  location: string;
  phone: string;
  rating: number;
  totalTransactions: number;
  fulfillmentRate: number;
  responseRate: number;
  returnRate: number;
  badge: SellerBadge;
  isVerified: boolean;
  brands: string[];
  categories: string[];
  specialties: string[];
  joinDate: string;
}

export interface Buyer {
  id: string;
  name: string;
  type: 'individual' | 'mechanic' | 'garage' | 'fleet' | 'business';
  location: string;
  phone: string;
  rapidPoints: number;
  totalOrders: number;
  vehicles: Vehicle[];
}

export interface Order {
  id: string;
  requestId: string;
  offerId: string;
  buyerId: string;
  sellerId: string;
  sellerName: string;
  partName: string;
  vehicle: Vehicle;
  price: number;
  deliveryType: DeliveryType;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  escrowStatus: 'held' | 'released' | 'refunded';
}

export interface DeliveryOption {
  type: DeliveryType;
  label: string;
  description: string;
  timeframe: string;
  icon: string;
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { type: 'RAPID_NOW', label: 'RAPID NOW', description: 'Disponible chez un vendeur local', timeframe: '< 1 heure', icon: 'Zap' },
  { type: 'RAPID_CITY', label: 'RAPID CITY', description: 'Disponible à Cotonou ou principales villes', timeframe: '< 2 heures', icon: 'MapPin' },
  { type: 'RAPID_NIGERIA', label: 'RAPID NIGERIA', description: 'Sourcé au Nigeria', timeframe: '48 heures', icon: 'Globe' },
  { type: 'RAPID_USA', label: 'RAPID USA', description: 'Sourcé aux États-Unis', timeframe: '7 jours', icon: 'Globe' },
];

export const QUALITY_LEVELS: { value: PartQuality; label: string; description: string; color: string }[] = [
  { value: 'OEM', label: 'OEM', description: 'Original Equipment Manufacturer', color: '#E63946' },
  { value: 'Genuine', label: 'Genuine', description: 'Pièce distribuée sous la marque constructeur', color: '#1D3557' },
  { value: 'Premium Aftermarket', label: 'Premium', description: 'Fabricant reconnu', color: '#457B9D' },
  { value: 'Standard Aftermarket', label: 'Standard', description: 'Fabricant alternatif', color: '#6C757D' },
  { value: 'Used', label: 'Occasion', description: "Pièce d'occasion", color: '#F4A261' },
  { value: 'Reconditioned', label: 'Reconditionné', description: 'Pièce remise en état', color: '#2D6A4F' },
];

// Brandes populaires au Bénin
export const POPULAR_BRANDS = [
  'Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Volkswagen', 'Hyundai', 
  'Nissan', 'Ford', 'Peugeot', 'Renault', 'Kia', 'Mazda',
  'Suzuki', 'Mitsubishi', 'Isuzu', 'Land Rover'
];

export const POPULAR_CATEGORIES = [
  'Moteur', 'Freins', 'Transmission', 'Suspension', 'Électrique',
  'Carrosserie', 'Climatisation', 'Échappement', 'Direction', 'Filtration',
  'Éclairage', 'Accessoires', 'Pneumatique', 'Système de refroidissement'
];

export const BENIN_LOCATIONS = [
  'Cotonou', 'Abomey-Calavi', 'Porto-Novo', 'Parakou', 'Bohicon',
  'Ouidah', 'Kandi', 'Natitingou', 'Abomey', 'Lokossa'
];
