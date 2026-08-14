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
