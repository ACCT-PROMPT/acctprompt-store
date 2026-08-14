import { useMemo, useState } from 'react';
import TopBar from './components/TopBar';
import CategoryBar from './components/CategoryBar';
import Hero from './components/Hero';
import MyApps from './components/MyApps';
import ProductCard from './components/ProductCard';
import AuthModal from './components/AuthModal';
import CartDrawer from './components/CartDrawer';
import { AuthProvider } from './lib/auth';
import { CartProvider } from './lib/cart';
import { useTools } from './hooks/useTools';

function StoreContent() {
  const { tools, loading, error } = useTools();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(tools.map((t) => t.category).filter((c): c is string => !!c))),
    [tools],
  );

  const visibleTools = activeCategory
    ? tools.filter((t) => t.category === activeCategory)
    : tools;

  return (
    <div className="w-full bg-white min-h-screen">
      <TopBar onOpenAuth={() => setShowAuth(true)} onOpenCart={() => setShowCart(true)} />
      <CategoryBar categories={categories} active={activeCategory} onSelect={setActiveCategory} />
      <Hero />
      <MyApps />

      <h2 className="font-serif font-bold text-2xl mx-10 mt-9 mb-1 text-brand-950">
        โปรแกรมทั้งหมด
      </h2>
      <p className="mx-10 mb-4.5 text-sm text-ink-500">
        ข้อมูลสด — ดึงตรงจากฐานข้อมูล Supabase ({tools.length} รายการ)
      </p>

      <div className="px-10 pb-12">
        {loading && <div className="text-ink-500 py-10 text-center">กำลังโหลดแคตตาล็อก…</div>}

        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-xl p-4 text-sm">
            โหลดข้อมูลไม่สำเร็จ: {error}
          </div>
        )}

        {!loading && !error && visibleTools.length === 0 && (
          <div className="text-ink-500 py-10 text-center">ยังไม่มีสินค้าในหมวดนี้</div>
        )}

        {!loading && !error && visibleTools.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleTools.map((tool) => (
              <ProductCard
                key={tool.id}
                tool={tool}
                onAddedToCart={() => {}}
                onBuyNow={() => setShowCart(true)}
              />
            ))}
          </div>
        )}
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      {showCart && (
        <CartDrawer
          onClose={() => setShowCart(false)}
          onRequireLogin={() => {
            setShowCart(false);
            setShowAuth(true);
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <StoreContent />
      </CartProvider>
    </AuthProvider>
  );
}
