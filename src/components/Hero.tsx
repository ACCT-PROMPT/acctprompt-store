export default function Hero() {
  return (
    <div className="m-7 mx-10 rounded-3xl bg-gradient-to-br from-brand-950 via-brand-700 to-brand-500 px-15 py-14 text-white relative overflow-hidden">
      <div className="relative z-10">
        <span className="inline-flex items-center gap-1.5 bg-white/20 text-brand-100 text-xs font-bold px-3.5 py-1.5 rounded-full tracking-wide">
          สมาชิกพรีเมียม
        </span>
        <h1 className="font-serif font-bold text-4xl max-w-xl leading-snug mt-4">
          เครื่องมือภาษีและเอกสารครบวงจร สำหรับมืออาชีพ
        </h1>
        <p className="mt-3 text-brand-100/90 max-w-lg leading-relaxed">
          ลิขสิทธิ์แท้ ใช้งานได้ทันที พร้อมทีมซัพพอร์ตดูแลตลอดอายุการใช้งาน — ไว้วางใจโดยสำนักงานบัญชีกว่า 3,000
          แห่งทั่วประเทศ
        </p>
      </div>
    </div>
  );
}
