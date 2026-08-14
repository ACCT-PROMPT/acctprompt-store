import { supabase } from './supabase';

export interface StripeCheckoutResult {
  url: string | null;
  error: string | null;
}

export async function createCheckoutSession(orderId: string): Promise<StripeCheckoutResult> {
  const { data, error } = await supabase.functions.invoke('create-checkout-session', {
    body: { order_id: orderId },
  });

  if (error) {
    return { url: null, error: error.message };
  }

  const url = (data as { url?: string; error?: string } | null)?.url ?? null;
  const backendError = (data as { url?: string; error?: string } | null)?.error ?? null;

  if (!url) {
    return { url: null, error: backendError ?? 'ไม่สามารถสร้างรายการชำระเงินได้' };
  }

  return { url, error: null };
}
