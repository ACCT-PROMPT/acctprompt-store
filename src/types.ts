export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  app_base_url: string | null;
  is_active: boolean;
  category: string | null;
  created_at: string;
}

export type BillingType = 'monthly' | 'yearly' | 'one_time';

export interface ToolPrice {
  id: string;
  tool_id: string;
  billing_type: BillingType;
  price_baht: number;
  max_sessions: number | null;
  is_active: boolean;
}

export interface ToolWithPrices extends Tool {
  prices: ToolPrice[];
}
