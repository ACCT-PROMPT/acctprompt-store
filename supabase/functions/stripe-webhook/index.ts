// Deploy via Supabase Dashboard → Edge Functions → New function → name: stripe-webhook
// Secrets required: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
// After deploying, copy the function URL into Stripe Dashboard → Developers → Webhooks
// → Add endpoint → events: checkout.session.completed
//
// NOTE: verify the exact parameter name of grant_entitlements_for_order() before deploying —
// run: select pg_get_function_identity_arguments('public.grant_entitlements_for_order'::regproc);
// and update the `.rpc('grant_entitlements_for_order', { ... })` call below to match.

import Stripe from 'npm:stripe@17';
import { createClient } from 'npm:@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
});
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

Deno.serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature');
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature!, webhookSecret);
  } catch (err) {
    return new Response(`Webhook signature verification failed: ${(err as Error).message}`, {
      status: 400,
    });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (orderId) {
      const { data: updated } = await supabaseAdmin
        .from('orders')
        .update({ status: 'paid', paid_at: new Date().toISOString() })
        .eq('id', orderId)
        .eq('status', 'pending')
        .select('id');

      // Only grant once — skip if the order was already marked paid by a duplicate webhook delivery.
      if (updated && updated.length > 0) {
        await supabaseAdmin.rpc('grant_entitlements_for_order', { p_order_id: orderId });
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
