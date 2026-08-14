# AcctPrompt Store

หน้าเว็บขายเครื่องมือ — สมัครสมาชิก/ล็อกอิน, เลือกซื้อทีละเครื่องมือ (รอบบิล × จำนวนจอ), ตะกร้า, และสร้างคำสั่งซื้อจริงในฐานข้อมูลกลาง ([acctprompt-platform](https://github.com/acctprompt-cmyk/acctprompt-platform))

## สแตก

React 19 + Vite 6 + TypeScript + Tailwind CSS v4 ต่อกับ Supabase โดยตรงผ่าน `@supabase/supabase-js` (anon key เท่านั้น — ปลอดภัยเพราะมี Row Level Security คุมอยู่ ไม่ใช่ `service_role` ที่ห้ามโผล่ฝั่ง client เด็ดขาด)

## ทำอะไรได้แล้วบ้าง

- ดึงแคตตาล็อกจาก `tools` + `tool_prices` จริง — กรองตามหมวดหมู่ได้
- สมัครสมาชิก / เข้าสู่ระบบ ผ่าน Supabase Auth จริง
- ดูสิทธิ์ที่ซื้อแล้ว ("แอปที่คุณซื้อแล้ว") พร้อมวันหมดอายุจริงจาก `entitlements`
- ตะกร้า (เก็บใน localStorage ของเบราว์เซอร์) + "ซื้อเลย" แบบชิ้นเดียว
- กด "ยืนยันคำสั่งซื้อ" → สร้างแถวจริงใน `orders` + `order_items` ผ่าน `checkout()` (SECURITY DEFINER RPC ที่คำนวณราคาฝั่งเซิร์ฟเวอร์ ไม่เชื่อราคาจาก client)
- **ชำระเงินจริงผ่าน Stripe Checkout** — redirect ไปหน้า Stripe, จ่ายสำเร็จแล้ว webhook (`supabase/functions/stripe-webhook`) มาร์ค order เป็น `paid` และเรียก `grant_entitlements_for_order()` ให้อัตโนมัติ ไม่ต้องรอแอดมินกดยืนยันมืออีกต่อไป

## ยังไม่มี — ตั้งใจเว้นไว้

- ปุ่ม "เปิดใช้งานแอป" ยังไม่ผูกกับ `app_base_url` จริง เพราะ 12 tool repos ยังไม่ได้ deploy ขึ้น server จริง (คอลัมน์นี้ยัง `null` อยู่ในตาราง `tools`)
- ราคาสินค้าทุกตัวใน `tool_prices` ตอนนี้เป็นข้อมูลทดสอบ (฿0) ต้องอัปเดตราคาจริงก่อนเปิดขาย
- ใช้ Stripe **test mode** (`sk_test_...`) อยู่ — ตอนขึ้น production ต้องสลับเป็น live key และตั้ง webhook endpoint ใหม่ในโหมด Live

## ตั้งค่า (.env)

คัดลอก `.env.example` เป็น `.env` แล้วกรอกค่าจาก Supabase project (Project Settings → API):

- `VITE_SUPABASE_URL` — Project URL
- `VITE_SUPABASE_ANON_KEY` — anon public key

```
npm install
npm run dev
```

## Edge Functions (Stripe)

โค้ดอยู่ใน `supabase/functions/` — deploy ผ่าน Supabase Dashboard → Edge Functions (วางโค้ดตรงในหน้าเว็บได้ ไม่ต้องใช้ Supabase CLI):

- `create-checkout-session` — สร้าง Stripe Checkout Session จาก order ที่มีอยู่ ต้องตั้ง secret `STRIPE_SECRET_KEY`
- `stripe-webhook` — รับ webhook `checkout.session.completed` จาก Stripe แล้วมาร์ค order จ่ายแล้ว + grant entitlement ต้องตั้ง secret `STRIPE_WEBHOOK_SECRET` และ**ปิด "Verify JWT with legacy secret"** ในหน้า Settings ของฟังก์ชันนี้ (Stripe ไม่ส่ง Supabase JWT มาด้วย)

ทั้งสองฟังก์ชันใช้ Stripe SDK กับ `httpClient: Stripe.createFetchHttpClient()` เพราะ Supabase Edge Runtime (Deno) ใช้ default HTTP client ของ Stripe ไม่ได้
