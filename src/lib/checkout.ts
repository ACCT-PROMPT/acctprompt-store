import { supabase } from './supabase';
import type { CartItem } from './cart';

export interface CheckoutResult {
  orderId: string | null;
  error: string | null;
  /** true when the backend hasn't exposed an order-creation path yet (RPC missing / RLS blocks insert) */
  backendNotReady: boolean;
}

/**
 * Calls the `checkout` RPC (SECURITY DEFINER, to be added in acctprompt-platform).
 * Server must re-validate tool_prices itself — never trust priceBaht from the client.
 */
export async function submitOrder(items: CartItem[]): Promise<CheckoutResult> {
  if (items.length === 0) {
    return { orderId: null, error: 'ตะกร้าว่างเปล่า', backendNotReady: false };
  }

  const payload = {
    p_items: items.map((i) => ({
      tool_id: i.toolId,
      billing_type: i.billingType,
    })),
  };

  const { data, error } = await supabase.rpc('checkout', payload);

  if (error) {
    // PGRST202 = function not found in schema cache → backend gap, not a user error.
    const notReady = error.code === 'PGRST202' || error.message.includes('schema cache');
    return { orderId: null, error: error.message, backendNotReady: notReady };
  }

  const orderId = (data as { order_id?: string } | null)?.order_id ?? null;
  return { orderId, error: null, backendNotReady: false };
}
