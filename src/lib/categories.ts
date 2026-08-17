export const CATEGORY_LABELS: Record<string, string> = {
  tax: 'ยื่นแบบและภาษี',
  doc: 'จัดการเอกสาร',
  ops: 'ระบบบัญชีและองค์กร',
};

export const CATEGORY_ORDER = ['tax', 'doc', 'ops'];

export function categoryLabel(category: string | null): string {
  if (!category) return 'อื่นๆ';
  return CATEGORY_LABELS[category] ?? category;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  tax: 'from-brand-700 to-brand-500',
  doc: 'from-teal-700 to-teal-400',
  ops: 'from-brand-500 to-teal-500',
};

export function categoryGradient(category: string | null): string {
  if (!category) return 'from-brand-500 to-brand-700';
  return CATEGORY_GRADIENTS[category] ?? 'from-brand-500 to-brand-700';
}
