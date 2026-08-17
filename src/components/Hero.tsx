const DOTS = [
  { top: '14%', right: '22%', size: 7, opacity: 0.9 },
  { top: '10%', right: '15%', size: 5, opacity: 0.7 },
  { top: '20%', right: '10%', size: 9, opacity: 0.85 },
  { top: '8%', right: '8%', size: 4, opacity: 0.5 },
  { top: '26%', right: '17%', size: 5, opacity: 0.6 },
  { top: '30%', right: '6%', size: 6, opacity: 0.75 },
  { top: '17%', right: '4%', size: 4, opacity: 0.55 },
  { top: '36%', right: '13%', size: 4, opacity: 0.45 },
];

export default function Hero() {
  return (
    <div className="m-7 mx-10 rounded-3xl bg-gradient-to-br from-brand-950 via-brand-700 to-teal-500/90 px-15 py-14 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {DOTS.map((dot, i) => (
          <span
            key={i}
            className="absolute rounded-[2px] bg-teal-300"
            style={{
              top: dot.top,
              right: dot.right,
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <span className="inline-flex items-center gap-1.5 bg-white/15 text-teal-300 border border-teal-300/40 text-xs font-bold px-3.5 py-1.5 rounded-full tracking-wide">
          สมาชิกพรีเมียม
        </span>
        <h1 className="font-serif font-bold text-4xl max-w-xl leading-snug mt-4">
          เครื่องมือภาษีและเอกสารครบวงจร
        </h1>
      </div>
    </div>
  );
}
