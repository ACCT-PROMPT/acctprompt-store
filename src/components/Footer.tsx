import { useState } from 'react';
import logo from '../assets/logo.png';
import PolicyModal from './PolicyModal';

export default function Footer() {
  const year = new Date().getFullYear() + 543;
  const [showRefundPolicy, setShowRefundPolicy] = useState(false);

  return (
    <footer className="bg-brand-950 text-brand-100 mt-12 border-t-2 border-teal-500/40">
      <div className="px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="font-serif font-bold text-lg text-white flex items-center gap-2.5 mb-3">
            <img src={logo} alt="AcctPrompt" className="w-9 h-9 object-contain shrink-0" />
            AcctPrompt
          </div>
          <p className="text-sm leading-relaxed text-brand-100/80">
            Accounting Prompt มุ่งมั่นพัฒนาโซลูชันบัญชีดิจิทัลที่ตอบโจทย์ธุรกิจยุคใหม่
            เน้นการใช้เทคโนโลยีเพื่อเพิ่มประสิทธิภาพงานบัญชีและบริหารการเงิน
            รองรับธุรกิจหลายรูปแบบ
          </p>
        </div>

        <div>
          <div className="font-bold text-sm text-white mb-3">ข้อมูลบริษัท</div>
          <div className="text-sm leading-relaxed text-brand-100/80 space-y-1">
            <p>บริษัท แอคเคาน์ติ้ง พรอมพท์ จำกัด</p>
            <p className="text-brand-100/60">ACCOUNTING PROMPT CO., LTD.</p>
            <p>เลขทะเบียนนิติบุคคล 0105569067883</p>
          </div>
        </div>

        <div>
          <div className="font-bold text-sm text-white mb-3">ติดต่อเรา</div>
          <div className="text-sm leading-relaxed text-brand-100/80 space-y-1">
            <p>83/1 ห้องเลขที่ 2 ชั้นที่ 2 ซอยพหลโยธิน 32</p>
            <p>แขวงเสนานิคม เขตจตุจักร กรุงเทพมหานคร 10900</p>
            <p className="pt-1">เพจ Facebook: Accounting Prompt</p>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-100/15 px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-brand-100/60">
        <span>© {year} บริษัท แอคเคาน์ติ้ง พรอมพท์ จำกัด — สงวนลิขสิทธิ์</span>
        <div className="flex gap-4">
          <span>ข้อตกลงการใช้งาน</span>
          <span>นโยบายความเป็นส่วนตัว</span>
          <button
            type="button"
            onClick={() => setShowRefundPolicy(true)}
            className="hover:text-teal-300 hover:underline"
          >
            นโยบายคืนเงิน
          </button>
        </div>
      </div>

      {showRefundPolicy && <PolicyModal onClose={() => setShowRefundPolicy(false)} />}
    </footer>
  );
}
