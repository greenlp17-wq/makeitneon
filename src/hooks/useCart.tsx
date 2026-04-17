// ═══════════════════════════════════════════════
// Make It Neon — Cart State (Context + localStorage)
// ═══════════════════════════════════════════════
/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { CartItem, Product } from '../data/types';
import { neonColors } from '../data/neonColors';
import { ADDON_OUTDOOR_MULTIPLIER } from '../data/pricing';

// ─── Context Type ───

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    product: Product,
    selectedColorId: string,
    selectedSizeId: string,
    quantity: number,
    isOutdoor: boolean,
  ) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

// ─── Persistence Key ───
const CART_STORAGE_KEY = 'makeitneon_cart';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

// ─── Get item price ───
function getItemPrice(item: CartItem): number {
  const size = item.product.availableSizes.find(s => s.id === item.selectedSizeId);
  const basePrice = size?.price ?? 0;
  const outdoorMultiplier = item.isOutdoor ? ADDON_OUTDOOR_MULTIPLIER : 1;
  return Math.round(basePrice * outdoorMultiplier * item.quantity);
}

// ─── Provider ───

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());
  const [isOpen, setIsOpen] = useState(false);

  // Persist on change
  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addToCart = useCallback(
    (
      product: Product,
      selectedColorId: string,
      selectedSizeId: string,
      quantity: number,
      isOutdoor: boolean,
    ) => {
      setItems(prev => {
        // Check for duplicate (same product + color + size + outdoor)
        const existing = prev.find(
          i =>
            i.product.id === product.id &&
            i.selectedColorId === selectedColorId &&
            i.selectedSizeId === selectedSizeId &&
            i.isOutdoor === isOutdoor,
        );

        if (existing) {
          return prev.map(i =>
            i.cartId === existing.cartId
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }

        const cartId = `${product.id}_${selectedColorId}_${selectedSizeId}_${Date.now()}`;
        return [
          ...prev,
          { cartId, product, selectedColorId, selectedSizeId, quantity, isOutdoor },
        ];
      });
      setIsOpen(true); // Open cart sidebar on add
    },
    [],
  );

  const removeFromCart = useCallback((cartId: string) => {
    setItems(prev => prev.filter(i => i.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.cartId !== cartId));
      return;
    }
    setItems(prev =>
      prev.map(i => (i.cartId === cartId ? { ...i, quantity } : i)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, i) => acc + getItemPrice(i), 0),
    [items],
  );

  const ctx = useMemo<CartContextType>(
    () => ({
      items,
      totalItems,
      totalPrice,
      isOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [items, totalItems, totalPrice, isOpen, openCart, closeCart, addToCart, removeFromCart, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={ctx}>{children}</CartContext.Provider>;
}

// ─── Hook ───

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}

// ─── Utility: get color name for display ───
export function getColorName(colorId: string): string {
  return neonColors.find(c => c.id === colorId)?.name ?? colorId;
}

// ─── Utility: get item price for a single cart item ───
export { getItemPrice };
