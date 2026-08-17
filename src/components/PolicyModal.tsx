interface Props {
  onClose: () => void;
}

export default function PolicyModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-ink-900/55 flex items-center justify-center z-100 p-5" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-line-200 sticky top-0 bg-white">
          <h2 className="font-serif font-bold text-lg text-brand-950">นโยบายการคืนเงิน</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-line-100 text-ink-500"
          >
            ✕
          </button>
        </div>

        <div className="p-5 text-sm text-ink-700 leading-relaxed space-y-3">
          <p className="font-bold text-ink-900">
            บริษัท แอคเคาน์ติ้ง พรอมพท์ จำกัด ไม่มีนโยบายคืนเงินทุกกรณี
          </p>
          <p>
            เนื่องจากสินค้าที่จำหน่ายเป็นสิทธิ์การใช้งานซอฟต์แวร์ (สินค้าดิจิทัล) ที่ลูกค้าสามารถเข้าใช้งานได้ทันที
            หลังชำระเงินสำเร็จ เมื่อสั่งซื้อและชำระเงินเรียบร้อยแล้ว ถือว่าสิ้นสุดการทำรายการ
            บริษัทจะไม่คืนเงินไม่ว่ากรณีใดๆ ทั้งสิ้น
          </p>
          <p>
            หากพบปัญหาการใช้งานหรือข้อสงสัยเกี่ยวกับสิทธิ์การใช้งานของท่าน สามารถติดต่อทีมงานผ่านเพจ Facebook:
            Accounting Prompt เพื่อขอความช่วยเหลือได้
          </p>
        </div>
      </div>
    </div>
  );
}
