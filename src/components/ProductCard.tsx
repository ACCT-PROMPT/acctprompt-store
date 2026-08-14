import { useState } from 'react';
import type { ToolWithPrices } from '../types';
import { useCart } from '../lib/cart';

interface Props {
  tool: ToolWithPrices;
  onAddedToCart: () => void;
  onBuyNow: () => void;
}

function cheapestMonthly(tool: ToolWithPrices) {
  const monthly = tool.prices.filter((p) => p.billing_type === 'monthly');
  if (monthly.length === 0) return null;
  return monthly.reduce((min, p) => (p.price_baht < min.price_baht ? p : min), monthly[0]);
}

export default function ProductCard({ tool, onAddedToCart, onBuyNow }: Props) {
  const price = cheapestMonthly(tool);
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    if (!price) return;
    addItem(tool, 'monthly');
    setJustAdded(true);
    onAddedToCart();
    setTimeout(() => setJustAdded(false), 1500);
  }

  function handleBuyNow() {
    if (!price) return;
    addItem(tool, 'monthly');
    onBuyNow();
  }

  return (
    <div className="bg-white rounded-2xl border border-brand-100 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-250 flex flex-col overflow-hidden">
      <div className="p-5.5 flex flex-col gap-2.5 flex-1">
        <div className="text-2xl">{tool.name.split(' ')[0]}</div>
        <div className="font-bold text-[15.5px] text-ink-900">
          {tool.name.replace(/^\S+\s/, '')}
        </div>
        <div className="text-xs text-ink-500 leading-relaxed min-h-9">{tool.description}</div>

        <div className="mt-auto pt-2">
          {price ? (
            <div className="text-xs text-ink-300 font-semibold">
              เริ่มต้น{' '}
              <span className="font-serif text-lg font-bold text-brand-700">
                ฿{price.price_baht.toLocaleString()}
              </span>
              <span className="text-ink-300">/เดือน</span>
            </div>
          ) : (
            <div className="text-xs text-ink-300 font-semibold">ราคาเร็วๆ นี้</div>
          )}
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="button"
            disabled={!price}
            onClick={handleAdd}
            title="เพิ่มลงตะกร้า"
            className="w-11 h-10 flex items-center justify-center rounded-lg border-1.5 border-brand-500 text-brand-500 bg-white disabled:opacity-40"
          >
            {justAdded ? '✓' : '🛒'}
          </button>
          <button
            type="button"
            disabled={!price}
            onClick={handleBuyNow}
            className="flex-1 rounded-lg bg-brand-500 hover:bg-brand-700 text-white font-bold text-sm transition-colors disabled:opacity-40"
          >
            ซื้อ
          </button>
        </div>
      </div>
    </div>
  );
}
