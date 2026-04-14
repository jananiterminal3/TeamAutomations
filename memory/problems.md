# Problems & Blockers

Track bugs, blockers, and their resolutions. Never delete — mark resolved entries as RESOLVED or SUPERSEDED.

---

## 2026-04-14 — No Transak Engineering Contact
**Status:** OPEN
**Symptom:** 6 Phase 2 tickets (30pts) are fully blocked. PRD was sent to Transak but no engineering response received.
**Root Cause:** No direct eng contact established at Transak. Only business-level communication so far.
**Blocked tickets:** Transak auth handoff (6pt), VP delivery mechanism (6pt), webhook/polling handler (4pt), Verifier SDK (4pt), step-up KYC handler (4pt), E2E integration testing (6pt).
**Fix:** Jan + Gary to escalate and secure Transak eng contact. Alignment call to address 6 key questions (Auth Reliance, field requirements, OID4VP push vs pull, auth handoff, timeline, staging access).
**Prevention:** Establish eng contact at partner kickoff, not after PRD delivery.

---

## 2026-04-14 — Meeco/CATRINA Verification Flow Docs Not Shared
**Status:** OPEN
**Symptom:** Cannot test VCs against the CATRINA/Meeco verifier. DNP never shared the verification flow documentation.
**Root Cause:** Meeco has not provided their verification flow to DNP or T3.
**Blocked tickets:** Request Meeco/CATRINA verification flow docs (1pt, Jan), E2E testing with DNP CATRINA (8pt, Minh).
**Fix:** Jan to follow up with DNP to obtain Meeco verification flow docs. Escalate if unresponsive.
**Prevention:** Make verification flow documentation a hard prerequisite before integration work begins.

---

## 2026-04-14 — Veriff X509 Cert for CATRINA HAIP Compliance
**Status:** OPEN
**Symptom:** CATRINA platform follows HAIP standard which requires X509 certificates for VC verification. T3 currently uses DNS resolution only — incompatible.
**Root Cause:** HAIP compliance requires x5c header (X509) in VCs, not just iss (DNS). Veriff has not yet issued the required X509 cert.
**Blocked tickets:** Veriff X509 cert for CATRINA HAIP compliance (6pt, Edward + Truong).
**Proposed fix:** Truong's suggestion — embed both `iss` (DNS) and `x5c` header (X509) in VCs to satisfy both standards simultaneously. Pending Veriff cert issuance.
**Prevention:** Check compliance standard (HAIP vs OpenID4VC) for each new integration partner before engineering begins.

---

## 2026-04-14 — Portrait Format Mismatch Risk (TOFF-8116)
**Status:** OPEN
**Symptom:** T3 converts Veriff portrait from binary to base64url. It is not confirmed whether CATRINA/Meeco expects this format.
**Root Cause:** Format requirements for portrait images not documented by Meeco. Potential mismatch between T3 output and CATRINA input.
**Blocked tickets:** Validate portrait format vs CATRINA/Meeco (4pt, Truong).
**Fix:** Get Meeco to confirm expected portrait image format. Adjust conversion step if needed.
**Linear ticket:** TOFF-8116
**Prevention:** Confirm binary/base64 format expectations with verifier partners before implementing image pipelines.

---

## Template
```
## YYYY-MM-DD — <Problem Title>
**Status:** OPEN | RESOLVED | SUPERSEDED
**Symptom:** What went wrong / error message.
**Root Cause:** Why it happened.
**Fix:** What resolved it.
**Prevention:** How to avoid this in future (if applicable).
```
