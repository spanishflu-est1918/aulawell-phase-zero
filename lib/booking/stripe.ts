// Server-only Stripe client, created lazily so the site builds and runs
// without the env vars until payments are configured.

import "server-only"
import Stripe from "stripe"

let client: Stripe | null = null

export function isStripeClientConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY)
}

// Paid Checkout sessions are fulfilled exclusively by the signed webhook.
// Never advertise booking as available unless both pieces are configured.
export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET
  )
}

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set")
  }
  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY)
  }
  return client
}
