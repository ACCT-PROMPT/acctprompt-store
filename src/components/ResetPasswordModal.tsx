import { useState } from 'react';
import { useAuth } from '../lib/auth';

export default function ResetPasswordModal() {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }
    if (password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }

    setSubmitting(true);
    const result = await updatePassword(password);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    setDone(true);
  }

  return (
    <div className="fixed inset-0 bg-ink-900/55 flex items-center justify-center z-100 p-5">
      <div className="bg-white rounded-2xl p-7 max-w-md w-full shadow-2xl">
        <h2 className="font-serif font-bold text-xl text-brand-950 mb-1">ตั้งรหัสผ่านใหม่</h2>

        {done ? (
          <>
            <p className="text-sm text-ink-500 mt-2 mb-5">
              ตั้งรหัสผ่านใหม่สำเร็จแล้ว ใช้รหัสผ่านนี้เข้าสู่ระบบได้ทันที
              ทั้งที่หน้าร้านและแอปเครื่องมือทุกตัว
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-brand-950 text-white rounded-lg py-3 font-bold text-sm w-full"
            >
              เสร็จสิ้น
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 mt-3">
            <input
              required
              type="password"
              placeholder="รหัสผ่านใหม่"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-line-200 rounded-lg px-3.5 py-3 text-sm outline-none focus:border-brand-500"
            />
            <input
              required
              type="password"
              placeholder="ยืนยันรหัสผ่านใหม่"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-line-200 rounded-lg px-3.5 py-3 text-sm outline-none focus:border-brand-500"
            />
            {error && <div className="text-red-600 text-xs font-semibold">{error}</div>}
            <button
              type="submit"
              disabled={submitting}
              className="bg-brand-950 text-white rounded-lg py-3 font-bold text-sm mt-1 disabled:opacity-60"
            >
              {submitting ? 'กำลังบันทึก…' : 'บันทึกรหัสผ่านใหม่'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
