# Aulawell Owner Guide — Bookings, Zoom, Reminders & Invoicing

Written for the site owner. No coding needed except where marked.

## How lessons flow now (once set up)

**Standard families (pay upfront):**
1. Parent opens `/book` (or their private link `/book?rate=familyname`), picks lesson times, pays by card.
2. The lessons appear in your Cal.com calendar automatically. If a slot was taken during payment, that lesson is refunded automatically.
3. Cal.com emails you and the parent calendar invitations **with the Zoom link inside** (after the Zoom setup below).
4. Cal.com emails the parent automatic reminders before each lesson (after the Workflow setup below).
5. You get an email per booking. You teach. Done — nothing to invoice.

**Trusted post-pay families:**
1. Same booking flow via their private link, but no payment step — the button says "Book lessons".
2. Every morning (08:00/09:00 Madrid time) the site checks for their lessons that have now taken place and emails the parent a Stripe invoice with a secure payment link. One invoice per lesson, due in 7 days.
3. Stripe chases unpaid invoices with automatic reminder emails (after the Stripe setup below). You never send a payment link manually.
4. You get a summary email whenever invoices go out.

## One-time setup checklist

### 1. Cal.com — Zoom links on every booking
1. Log in at app.cal.com → **Settings → Apps** (or the App Store) → install **Zoom** and sign in to your Zoom account when prompted.
2. Open your **Lesson (60 min)** event type → **Location** → choose **Zoom** → Save.

From now on every booking gets its own Zoom meeting link automatically, shown in the calendar invite both sides receive.

### 2. Cal.com — automatic lesson reminders
1. In Cal.com go to **Workflows → New workflow**.
2. Trigger: **Before event starts**, set **24 hours**. Action: **Send email to attendees**. Activate it for the Lesson event type.
3. Create a second workflow the same way for **1 hour** before.

Parents now get reminder emails (including the Zoom link) with no involvement from you.

### 3. Stripe — automatic chasing of unpaid invoices
1. In the Stripe Dashboard go to **Settings → Billing → Invoices** (called "Invoicing" on some accounts).
2. Under **Manage advanced invoicing features / Reminders**, turn on **Send reminders if a one-off invoice hasn't been paid**, e.g. 3, 7 and 14 days after it's due.
3. While there, check **Settings → Emails** has "Email customers about…" successful payments enabled, so parents get receipts.

### 4. Vercel — turn on the daily invoicing job
1. In the Vercel project (aulawell) go to **Settings → Environment Variables**.
2. Add `CRON_SECRET` with a long random value (any password generator; 30+ characters). Vercel's scheduler uses it automatically — nothing else to configure.
3. Redeploy the site once after adding it.

Without `CRON_SECRET` the site still works, but post-pay invoices will not be sent.

## Prices, tutor tiers & bundle discounts

Public prices live in `lib/booking/config.ts` under `TUTOR_TIERS`:

- **Online — Lead Tutor (you): €45/lesson.**
- **Online — Associate Tutor: €25/lesson.**
- **In person — Associate Tutor (Madrid): €35/lesson.**

Booking several lessons in one checkout discounts every lesson automatically: **5+ lessons → €2 off each, 10+ lessons → €3 off each** (the `bundleUnitCents` rule in the same file). The homepage packages section, the calendar and Stripe all read these same numbers, so changing them in this one file updates everything.

**Associate-tutor bookings:** both options show on the booking page, but say "arranged personally — contact us" until your associate tutor has their own Cal.com event types. Add the online event id in Vercel as `CAL_EVENT_TYPE_ID_ASSOCIATE` and the in-person event id as `CAL_EVENT_TYPE_ID_PRESENCIAL`. Each option then becomes bookable and payable online. (Simplest setup: add the tutor to your Cal.com as a team member with two event types, setting the second event's location to "In person".)

## Adding or changing a family rate (small code edit)

Rates live in `lib/booking/rates.ts`. Each family gets a lowercase code:

```ts
export const RATE_CODES: Record<string, FamilyRate> = {
  garcia: { cents: 3000 },                 // pays €30/lesson upfront
  smith: { cents: 3500, postPay: true },   // €35/lesson, invoiced after each lesson
}
```

- `cents` is the per-lesson price in euro cents (3500 = €35).
- Add `postPay: true` only for families you trust to pay after lessons.
- Send the family their private link: `https://YOUR-DOMAIN/book?rate=garcia`.
- Deploy the change (or ask your developer). Anyone without a code pays the standard tier price.
- Family rates apply to your **online Lead Tutor lessons only** (associate lessons always use their tier price), and families with a negotiated rate don&apos;t get the bundle discount stacked on top.

**Important:** removing `postPay` later only affects new bookings; already-booked lessons still invoice normally.

## Homepage numbers & success stories

Both homepage sections read from one file: `lib/site-content.ts`.

- **Outcome counters:** two values are placeholders (marked `PLACEHOLDER` in the file) — replace them with your real figures before deploying. Only publish numbers you could stand behind if a parent asked.
- **Success stories:** written in Aulawell&apos;s voice as factual stories, deliberately *not* in quotation marks. To upgrade one into a quoted testimonial, send the person the suggested wording, get a written "yes, that's fine", and only then present it as a quote with their name. Never publish invented quotes attributed to real people — fake reviews are illegal under EU consumer rules and word travels fast between school parents.

## Day-to-day: what still needs you

- **Teach the lessons.** Everything around them — Zoom links, reminders, payment collection, receipts, refunds for clashes, invoice chasing — is automatic.
- **Watch your email** for the site's notifications: new bookings, invoices sent, and any message marked **"action needed"** (rare — e.g. a slot that couldn't be booked, or an invoice that failed).
- **Once a week, glance at Stripe → Invoices** filtered to "Open/Past due" to see if any post-pay family has ignored all reminders — that's the one thing automation can't do: decide when to have a word with a parent.
- **Cancellations/rescheduling** happen through the links in the Cal.com emails; if you cancel a prepaid lesson yourself, refund it from the Stripe dashboard (Payments → find the payment → Refund).
