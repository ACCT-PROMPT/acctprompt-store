import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Tool, ToolPrice, ToolWithPrices } from '../types';

interface UseToolsResult {
  tools: ToolWithPrices[];
  loading: boolean;
  error: string | null;
}

export function useTools(): UseToolsResult {
  const [tools, setTools] = useState<ToolWithPrices[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const [toolsRes, pricesRes] = await Promise.all([
        supabase
          .from('tools')
          .select('*')
          .eq('is_active', true)
          .order('name'),
        supabase
          .from('tool_prices')
          .select('*')
          .eq('is_active', true),
      ]);

      if (cancelled) return;

      if (toolsRes.error) {
        setError(toolsRes.error.message);
        setLoading(false);
        return;
      }
      if (pricesRes.error) {
        setError(pricesRes.error.message);
        setLoading(false);
        return;
      }

      const allTools = (toolsRes.data ?? []) as Tool[];
      const allPrices = (pricesRes.data ?? []) as ToolPrice[];

      const merged: ToolWithPrices[] = allTools.map((tool) => ({
        ...tool,
        prices: allPrices.filter((p) => p.tool_id === tool.id),
      }));

      setTools(merged);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { tools, loading, error };
}
