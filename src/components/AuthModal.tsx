import { useState } from 'react';
import { useAuth } from '../lib/auth';

interface Props {
  onClose: () => void;
}

export default function AuthModal({ onClose }: Props) {
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (tab === 'signup' && password !== confirmPassword) {
      setError('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }
    if (password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }

    setSubmitting(true);
    const result =
      tab === 'login'
        ? await signIn(email, password)
        : await signUp(email, password, fullName);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (tab === 'signup') {
      setNotice('สมัครสมาชิกสำเร็จ — เช็คอีเมลเพื่อยืนยันบัญชี (ถ้าระบบเปิดใช้การยืนยันอีเมล)');
      return;
    }

    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-ink-900/55 flex items-center justify-center z-100 p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-7 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex bg-line-100 rounded-lg p-1 gap-1 flex-1 mr-3">
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setError(null);
                setNotice(null);
              }}
              className={`flex-1 text-center py-2.5 rounded-md text-sm font-bold transition-colors ${
                tab === 'login' ? 'bg-white text-brand-700 shadow-sm' : 'text-ink-500'
              }`}
            >
              เข้าสู่ระบบ
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('signup');
                setError(null);
                setNotice(null);
              }}
              className={`flex-1 text-center py-2.5 rounded-md text-sm font-bold transition-colors ${
                tab === 'signup' ? 'bg-white text-brand-700 shadow-sm' : 'text-ink-500'
              }`}
            >
              สมัครสมาชิก
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-line-100 text-ink-500 shrink-0"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {tab === 'signup' && (
            <input
              required
              placeholder="ชื่อ-นามสกุล"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border border-line-200 rounded-lg px-3.5 py-3 text-sm outline-none focus:border-brand-500"
            />
          )}
          <input
            required
            type="email"
            placeholder="อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-line-200 rounded-lg px-3.5 py-3 text-sm outline-none focus:border-brand-500"
          />
          <input
            required
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-line-200 rounded-lg px-3.5 py-3 text-sm outline-none focus:border-brand-500"
          />
          {tab === 'signup' && (
            <input
              required
              type="password"
              placeholder="ยืนยันรหัสผ่าน"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-line-200 rounded-lg px-3.5 py-3 text-sm outline-none focus:border-brand-500"
            />
          )}

          {error && <div className="text-red-600 text-xs font-semibold">{error}</div>}
          {notice && <div className="text-brand-700 text-xs font-semibold">{notice}</div>}

          <button
            type="submit"
            disabled={submitting}
            className="bg-brand-950 text-white rounded-lg py-3 font-bold text-sm mt-1 disabled:opacity-60"
          >
            {submitting ? 'กำลังดำเนินการ…' : tab === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
          </button>
        </form>
      </div>
    </div>
  );
}
