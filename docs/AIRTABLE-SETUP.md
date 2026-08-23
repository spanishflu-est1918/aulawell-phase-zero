# Aulawell Airtable Setup

The website writes to Airtable as Aulawell's operational source of truth. This
document defines the **exact table and column names** the integration expects.
The single source of these names in code is [`lib/airtable.ts`](../lib/airtable.ts) —
if you change a name here, change it there too (or set the matching env var).

Base: `appLE4zXHreNWQt93` (override with `AIRTABLE_BASE_ID`).

> **Live status.** Two intake tables have been created in the base and wired up,
> feeding your existing ops tables (Clients, Programmes & Cycles, Students &
> Groups, Tutors, LESSONS, Tutor Fees) without disturbing them:
> - **Website Leads** — `tblnGCUZc49JKhG5W` (enquiries) — verified working.
> - **Website Bookings** — `tblaMd8QDAYgF4CkU` (paid bookings) — created; will
>   populate on the first real/test Stripe booking.
>
> These ids are pinned in `.env.local` (`AIRTABLE_LEADS_TABLE`,
> `AIRTABLE_PACKAGES_TABLE`); add the same values in Vercel for the live site.

## Turning it on

1. Create a **Personal Access Token**: airtable.com/create/tokens
   - Scopes: `data.records:write` and `data.records:read`
   - Access: the Aulawell base
2. Set it as `AIRTABLE_API_KEY` in `.env.local` (local) **and** in Vercel →
   Settings → Environment Variables (Production + Preview). Never commit it.
3. Make sure the tables/columns below exist (add the columns to your existing
   table, or import the CSVs in `docs/airtable/` to create fresh tables and point
   the `AIRTABLE_*_TABLE` env vars at them).

Until the token is set, enquiries and bookings still work — Aulawell is notified
by email — they simply are not written to Airtable.

---

## Table: Leads (enquiries)

Written by the enquiry form (`/enquire` → `/api/enquire`). Default table name:
`Website Leads` (id `tblnGCUZc49JKhG5W`). Override with `AIRTABLE_LEADS_TABLE`.

| Column              | Type              | Notes / options |
| ------------------- | ----------------- | --------------- |
| `Name`               | Single line text  | |
| `Email`               | Email             | |
| `WhatsApp`            | Phone number      | Cleaned/normalized before writing — see `lib/phone.ts` |
| `WhatsApp Consent`    | Checkbox          | True only if the visitor explicitly opted in |
| `Enquiry About`       | Single select     | Not sure which service fits · School English · Exam & Academic English · English Qualifications (IELTS / Cambridge) · University Applications · In-person tuition (Madrid / Lisbon) · Complex or additional learning needs · School or agency partnership · Aulawell Hub / Reading Hub waitlist |
| `Learner Stage`       | Single select     | KS2 · KS3 (Years 7–9) · US Middle School (Grades 6–8) · GCSE / IGCSE · A Level / IB / MYP · IELTS / Cambridge · University applications · Adult learner · Other |
| `Location`            | Single line text  | Location / time zone |
| `Message`             | Long text         | |
| `Source`              | Single select     | Website enquiry · Website booking · Consultation booking |
| `Status`              | Single select     | New · Contacted · Converted · Closed |
| `Created`             | Formula (`CREATED_TIME()`) | Native `createdTime` fields can't be created via the API, so this is a formula field instead — behaves the same for sorting/filtering |

> `Phone (legacy, unused — see WhatsApp)` still exists as a single-line-text
> field from before the schema fix — it was mistyped and is no longer written
> to. Safe to delete manually in the Airtable UI (the API can't delete fields).
>
> Single-select options are created automatically on first write (the API uses
> `typecast`), so you only need the **columns** to exist with the right names.

---

## Table: Packages (paid bookings)

Written by the Stripe webhook (`/api/stripe-webhook`) after a successful, paid
booking. Default table name: `Website Bookings` (id `tblaMd8QDAYgF4CkU`).
Override with `AIRTABLE_PACKAGES_TABLE`.

| Column              | Type             | Notes / options |
| ------------------- | ---------------- | --------------- |
| `Name`               | Single line text | |
| `Email`               | Email            | |
| `WhatsApp`            | Phone number     | Cleaned/normalized before writing — see `lib/phone.ts` |
| `WhatsApp Consent`    | Checkbox         | True only if the payer explicitly opted in |
| `Educator`            | Single select    | Aulawell Tutor · Head Tutor — Amy · In person — Aulawell Tutor |
| `Amount Paid`         | Currency (GBP)   | Stored as pounds (e.g. 280.00) |
| `Currency`            | Single line text | e.g. GBP |
| `Lessons Booked`      | Number (integer) | |
| `Lesson Dates`        | Long text        | One ISO datetime per line |
| `Stripe Session`      | Single line text | Stripe Checkout session id |
| `Status`              | Single select    | Paid · Scheduled · Completed |
| `Source`              | Single select    | Website booking |
| `Customer Type`       | Single select    | New · Returning — review 20% offer · Unknown — check manually |
| `Created`             | Formula (`CREATED_TIME()`) | See note under Leads above |

---

## Table: Lessons (reserved — future phase)

Individual lesson-level tracking (credits remaining, completion, tutor fees) is
part of Phase 2 (tuition operations). Table name `Lessons`, override with
`AIRTABLE_LESSONS_TABLE`. Not written by the current code — reserved so the name
is settled now.

---

## Changing column names

If the live base already uses different column names, keep the base as-is and
update the `LEAD_FIELDS` map (and the `createBookingRecord` field keys) in
[`lib/airtable.ts`](../lib/airtable.ts) — that is the one place to align names.
