import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import type { Tool } from '../types';

export interface Entitlement {
  id: string;
  status: 'active' | 'expired' | 'revoked';
  granted_at: string;
  expires_at: string | null;
  tools: Tool;
}

interface UseEntitlementsResult {
  entitlements: Entitlement[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useEntitlements(): UseEntitlementsResult {
  const { user } = useAuth();
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTick, setRefetchTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    if (!user) {
      setEntitlements([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    supabase
      .from('entitlements')
      .select('id, status, granted_at, expires_at, tools(*)')
      .eq('customer_id', user.id)
      .eq('status', 'active')
      .order('granted_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) {
          setError(err.message);
        } else {
          setEntitlements((data ?? []) as unknown as Entitlement[]);
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user, refetchTick]);

  return { entitlements, loading, error, refetch: () => setRefetchTick((t) => t + 1) };
}
