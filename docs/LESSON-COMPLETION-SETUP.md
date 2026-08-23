# Tutor Lesson Log → Airtable automation

Every time a tutor submits the **"Tutor Lesson Log"** Google Form, a lesson
record is created in Airtable, linked to the matching Tutor and Student/Group.
`Lessons Remaining` on the Students & Groups table is a native Airtable
formula/rollup (`Package Size` − completed lessons), so it updates itself the
moment the link is made — nothing decrements a number directly, which avoids
any double-count risk from a resubmitted or duplicated form response.

Verified end-to-end locally: a real test submission took a 10-lesson test
package to 9 remaining automatically.

## 1. Fix the two data-integrity gaps this surfaced

**Tutor names don't match between the form and Airtable.** The form's Tutor
dropdown currently has: `Anna S`, `Ashai`, `Falaknaz`. Airtable's Tutors table
has: `Anna Schmidt`, `Ashai Thomas`, `Falaknaz`, `Stephanie` (the last two just
added). Matching is exact-string, so this must line up exactly or a
submission won't match and you'll get an "action needed" email instead of a
recorded lesson.

**Fix**: edit the form's Tutor question so its options are exactly:
- `Anna Schmidt`
- `Ashai Thomas`
- `Falaknaz`
- `Stephanie`

**The Student/Group dropdown only has a placeholder ("test").** Add each real
student/group's exact name from Airtable's Students & Groups table
(`Student/Group Name` field) as an option, and keep it in sync as new
students/packages are added — a mismatch here fails the same way.

## 2. Install the Apps Script on the form

1. Open the **Tutor Lesson Log** form → the three-dot menu (⋮) → **Script
   editor** (or Extensions → Apps Script if opened via Drive).
2. Delete any placeholder code and paste:

```javascript
// Aulawell — Tutor Lesson Log → website webhook.
// Fires once per form submission (installable trigger, set up in step 3).

var WEBHOOK_URL = "https://www.aulawell.co/api/webhooks/lesson-completion";
var SECRET = "PASTE_LESSON_COMPLETION_WEBHOOK_SECRET_HERE";

function onFormSubmit(e) {
  var answers = {};
  e.response.getItemResponses().forEach(function (item) {
    answers[item.getItem().getTitle()] = item.getResponse();
  });

  var payload = {
    secret: SECRET,
    tutor: answers["Tutor"],
    studentGroup: answers["Student/Group"],
    lessonDate: answers["Lesson Date"],
    status: answers["Lesson Status"],
    durationMinutes: answers["Duration (mins)"],
  };

  var res = UrlFetchApp.fetch(WEBHOOK_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });

  // Visible in Apps Script → Executions if something needs checking.
  Logger.log(res.getResponseCode() + " " + res.getContentText());
}
```

3. Replace `PASTE_LESSON_COMPLETION_WEBHOOK_SECRET_HERE` with the value of
   `LESSON_COMPLETION_WEBHOOK_SECRET` from `.env.local` (never paste the
   secret itself into chat — copy it directly from the file).
4. **Triggers** (clock icon, left sidebar) → **+ Add Trigger**:
   - Function: `onFormSubmit`
   - Event source: **From form**
   - Event type: **On form submit**
   - Save — Google will ask you to authorize the script (it's calling an
     external URL, so it needs your permission once).

## 3. Deploy + configure the live site

This webhook only exists on the `redesign/product-led-site` branch so far.
Once merged and deployed:

1. Add `LESSON_COMPLETION_WEBHOOK_SECRET` (same value as `.env.local`) to
   Vercel → Settings → Environment Variables (Production).
2. Confirm the Apps Script's `WEBHOOK_URL` points at the real production
   domain (already set above to `https://www.aulawell.co/...`).

Until deployed, the Apps Script will get connection errors when it tries to
call the live URL — that's expected and not a bug; submissions made before
deploy won't be lost, they just won't create a lesson record until the script
is re-run or the form is resubmitted... in practice, hold off wiring the real
trigger until the site is live, and use the manual "run test" option in the
Apps Script editor to test instead.

## 4. Field reference

| Form field | Sent as | Airtable |
| --- | --- | --- |
| Tutor | `tutor` | matched to Tutors → `Tutor Name` (exact) |
| Student/Group | `studentGroup` | matched to Students & Groups → `Student/Group Name` (exact) |
| Lesson Date | `lessonDate` | LESSONS → `Date` |
| Lesson Status | `status` | LESSONS → `Lesson Status` (form's "Cancelled" is mapped to Airtable's "Cancellation" in code — see `normalizeLessonStatus` in `lib/airtable.ts`) |
| Duration (mins) | `durationMinutes` | LESSONS → `Duration` |

If a tutor or student name doesn't match, **no lesson is silently dropped** —
you get an "action needed" email and can enter it manually.
