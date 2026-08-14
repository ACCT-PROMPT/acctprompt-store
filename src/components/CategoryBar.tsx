import { CATEGORY_ORDER, categoryLabel } from '../lib/categories';

interface Props {
  categories: string[];
  active: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryBar({ categories, active, onSelect }: Props) {
  const ordered = [
    ...CATEGORY_ORDER.filter((c) => categories.includes(c)),
    ...categories.filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  return (
    <div className="bg-white border-b border-line-200 px-10 py-3.5 flex gap-3 overflow-x-auto">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`shrink-0 px-4.5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
          active === null ? 'bg-brand-700 text-brand-100' : 'bg-line-100 text-brand-700'
        }`}
      >
        ทั้งหมด
      </button>
      {ordered.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelect(cat)}
          className={`shrink-0 px-4.5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
            active === cat ? 'bg-brand-700 text-brand-100' : 'bg-line-100 text-brand-700'
          }`}
        >
          {categoryLabel(cat)}
        </button>
      ))}
    </div>
  );
}
