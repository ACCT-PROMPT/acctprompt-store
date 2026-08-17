import {
  Globe,
  Landmark,
  CreditCard,
  FileText,
  FileCheck2,
  Unlock,
  Receipt,
  Package,
  BarChart3,
  Upload,
  PieChart,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

const ICON_BY_SLUG: Record<string, LucideIcon> = {
  'online-fee': Globe,
  'kbank-fee': Landmark,
  'ktc-fee': CreditCard,
  'pnd53-txtfix': FileText,
  'pnd3-txtfix': FileText,
  'bai-50-thawi': FileCheck2,
  'pdf-unlock': Unlock,
  'bai-rub-rong': Receipt,
  'order-sku': Package,
  'reconcile-online': BarChart3,
  'flow-direct': Upload,
  'expense-allocation': PieChart,
};

export function toolIcon(slug: string): LucideIcon {
  return ICON_BY_SLUG[slug] ?? Wrench;
}
