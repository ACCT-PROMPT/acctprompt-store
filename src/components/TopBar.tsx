import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { useCart } from '../lib/cart';
import logo from '../assets/logo.png';

interface Props {
  onOpenAuth: () => void;
  onOpenCart: () => void;
}

export default function TopBar({ onOpenAuth, onOpenCart }: Props) {
  const { customer, user, signOut, loading } = useAuth();
  const { items } = useCart();

  return (
    <div className="bg-gradient-to-br from-brand-700 to-brand-950 px-10 py-4 flex items-center gap-7 border-b-2 border-teal-500/40">
      <div className="font-serif font-bold text-2xl text-white flex items-center gap-2.5">
        <img src={logo} alt="AcctPrompt" className="w-9 h-9 object-contain shrink-0" />
        AcctPrompt
      </div>

      <div className="flex-1 max-w-xl flex items-center bg-white rounded-full px-4.5 py-2.5 gap-2.5">
        <input
          placeholder="ค้นหาโปรแกรม เช่น E-Filing, PND Verify"
          className="border-none outline-none flex-1 text-sm bg-transparent"
        />
      </div>

      <div className="flex items-center gap-5 text-brand-100 text-sm font-semibold ml-auto">
        <button type="button" onClick={onOpenCart} className="flex items-center gap-1.5">
          <ShoppingCart size={17} />
          ตะกร้า
          {items.length > 0 && (
            <span className="bg-teal-500 text-brand-950 rounded-full text-[10.5px] font-extrabold px-1.5 py-0.5 min-w-4.5 text-center">
              {items.length}
            </span>
          )}
        </button>

        {loading ? null : user ? (
          <>
            <span className="text-brand-100/80">
              สวัสดี, {customer?.full_name || customer?.email || user.email}
            </span>
            <button type="button" onClick={() => signOut()}>ออกจากระบบ</button>
          </>
        ) : (
          <button type="button" onClick={onOpenAuth}>เข้าสู่ระบบ / สมัครสมาชิก</button>
        )}
      </div>
    </div>
  );
}
