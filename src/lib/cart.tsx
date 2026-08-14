import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { BillingType, ToolWithPrices } from '../types';

export interface CartItem {
  toolId: string;
  toolName: string;
  billingType: BillingType;
  priceBaht: number;
  maxSessions: number | null;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (tool: ToolWithPrices, billingType: BillingType) => void;
  removeItem: (toolId: string, billingType: BillingType) => void;
  clear: () => void;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'acctprompt_cart';

function loadStored(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadStored);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(tool: ToolWithPrices, billingType: BillingType) {
    const price = tool.prices.find((p) => p.billing_type === billingType);
    if (!price) return;

    setItems((prev) => {
      const exists = prev.some(
        (i) => i.toolId === tool.id && i.billingType === billingType,
      );
      if (exists) return prev;
      return [
        ...prev,
        {
          toolId: tool.id,
          toolName: tool.name,
          billingType,
          priceBaht: price.price_baht,
          maxSessions: price.max_sessions,
        },
      ];
    });
  }

  function removeItem(toolId: string, billingType: BillingType) {
    setItems((prev) =>
      prev.filter((i) => !(i.toolId === toolId && i.billingType === billingType)),
    );
  }

  function clear() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.priceBaht, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
