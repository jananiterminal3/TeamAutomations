# T3 Q2 2026 — Project Planning Context

> This file contains all context from the Q2 planning session (April 14, 2026).
> Drop this file into the root of your TeamAutomations repo so Claude Code has full context.

---

## Status: Tickets Already Created in Linear

All tickets below have been created in Linear under the TOFF team. No need to re-create them.

---

## Project 1: MetaMask × Transak (10 tickets, 38 points)

**Deadline:** April 30 (hard, cannot move)
**Key risk:** No direct Transak engineering contact. PRD sent but no eng response.
**Reality:** T3 side can be done by April 30. Transak integration blocked until eng alignment.
**KYC flow via Veriff + VC issuance:** Working in production today.
**Regulatory Vault:** Partially built, needs more work.
**Design:** Done / not needed.

### Phase 0 — PM Tasks (Last week of April)
- Escalate for Transak eng contact (1pt) — Jan+Gary
- Prepare Transak alignment agenda (1pt) — Jan
- Confirm MetaMask SDK integration spec with Lorenzo (1pt) — Jan

Key questions for Transak call:
1. Does Auth Reliance accept externally KYC'd users, or only Sumsub?
2. What exact fields does Transak need at L1 vs L2?
3. Can T3 push VP via API, or does Transak initiate OID4VP request?
4. How does auth handoff work (email match? token? redirect?)
5. Transak's timeline for changes on their side?
6. Staging environment access?

### Phase 1 — T3-Side QA (Now through April)
- KYC E2E test suite (5pt) — Minh
  - Email OTP, L1/L2 collection, Veriff, VC issuance, VP generation, edge cases

### Phase 2 — Transak Integration (May W1–W2, all BLOCKED)
- Transak auth handoff implementation (6pt) — TBD
- VP delivery mechanism to Transak (6pt) — TBD
- Transak order status webhook/polling handler (4pt) — Tyson
- Verifier SDK package for Transak (4pt) — Edward
- Step-up KYC trigger handler (4pt) — Truong
- E2E integration testing with Transak staging (6pt) — Minh

### Reference Doc
- MetaMask x T3 x Transak PRD (Feb 20, 2026) — 20 pages
- Scope: Re-usable KYC Native Flow (Deposit) - US (& EU) via Transak
- Integration: T3 SDK embedded in MetaMask frontend (no backend)
- Flow: SDK init → email OTP login → KYC L1/L2 via Veriff → VC issuance (SD-JWT) → VP generation (OID4VP) → VP + auth handoff to Transak → payment → crypto fulfillment
- Data: SSN NOT shared with Transak. Passport/portrait/liveness stored in Regulatory Vault.

---

## Project 2: DNP NCR — Hotel Check-in (7 tickets, 30 points)

**Deadline:** June 2026 pilot launch
**Partner:** DNP (Dai Nippon Printing) via CATRINA platform
**Kiosk provider:** NCR (~700 hotels). USEN ALMEX (~4,300 hotels) already integrated separately.
**Jan 2026 POC result:** 84% reduction in form entry time, 52% reduction in check-in time at Loisir Hotel.

### Phase 0 — PM Research (This week, W16)
- NCR data schema discovery (2pt) — Jan
  - Confirm mandatory fields, image formats, PMS delivery structure
- Request Meeco/CATRINA verification flow docs from DNP (1pt) — Jan [BLOCKED]
  - Meeco never shared verification flow — can't test VCs against their verifier
- PRD — NCR passport VC data schema and integration spec (3pt) — Jan

### Phase 1 — Engineering (W17 onward)
- Update T3 ID Wallet passport VC schema for NCR (6pt) — Edward
- Veriff X509 cert for CATRINA HAIP compliance (6pt) — Edward+Truong [BLOCKED on Veriff]
  - CATRINA follows HAIP, requires X509 certs, not DNS resolution
  - Truong's suggestion: embed both iss (DNS) and x5c header (X509) in VCs
- Validate portrait format vs CATRINA/Meeco (4pt) — Truong
  - T3 converts Veriff binary to base64url — need Meeco to confirm format (TOFF-8116)
- E2E testing with DNP CATRINA (8pt) — Minh
  - Full flow: passport scan → VC issuance → booking → kiosk check-in → CATRINA verify → PMS

### Data sent to PMS at booking:
- Name (as on passport), email (from wallet), phone (from wallet)

### Data sent to PMS at check-in:
- Passport holder info page photo, passport number, nationality, name, DOB, gender, email, phone

---

## Project 3: DNP MyRoute — Mobility (3 tickets, 8 points)

**Deadline:** September 2026 pilot launch → February 2027 POC period → March 2027 government report
**Partner:** Toyota Financial Services / KINTO Technologies via MyRoute app
**Government:** MLIT (Ministry of Land, Infrastructure, Transport) funded project
**Status:** Early stage — scope not defined. All tickets are PM research.

### Phase 0 — Scope Discovery (April–May)
- Scope alignment call with Nathan (2pt) — Jan
  - Clarify: what T3 builds, stakeholder names, DNP vs T3 roles, wallet choice, gov reporting requirements
- KYC SDK scoping (3pt) — Jan
  - Same T3 SDK as MetaMask or different? H5 vs native vs API-only?
  - Express booking flow: app-to-app handshake via T3 Cloud Agent session
  - Consent management UI, anonymization, Insights DB scope
- PRD — MyRoute scope & architecture (3pt) — Jan [BLOCKED until above done]

### Key architecture refs:
- System dev plan in Internal Brief deck pages 16–22
- App-to-app handshake flow pages 28–29
- T3 components: T3 Identity, T3 Smart VC, T3 Network, T3 Enterprise (Analytics/Segments/Email)

---

## Project 4: Trinity Integration (2 tickets, 10 points)

**Timeline:** W16–W17 (this week + next week), then done
- Planning & toolkit evaluation (4pt) — In Progress
- Execution & implementation (6pt) — To Do

---

## Project 5: Hedera × Accredify POC (2 tickets, 10 points)

**Timeline:** W16–W17 (this week + next week), then done
- Planning with Hedera Stablecoin Studio (4pt) — In Progress
- POC execution & delivery (6pt) — To Do

---

## Project 6: Anchorpoint Stablecoin (TBD tickets)

**Timeline:** Planning starts W17 (next week), implementation W18 onward
**Status:** No tickets created yet — will be scoped during planning

---

## Project 7: Octopus Cards (TBD tickets)

**Timeline:** Work begins mid-May, dependent on sales closing
**Status:** No tickets created yet — generic breakdown needed later
**Key context:** Octopus compliance team (Myron, Lillian, Grandy) has data storage/PDPO concerns.
Octopus prefers H5 or SDK integration. 80% of users already KYC'd.
Three use cases pitched: hotel (NCR), mobility (MyRoute), stablecoin (Anchorpoint).

---

## Project 8: Regulatory Vault Phase 2 (TBD tickets)

**Timeline:** Starts June — backlog grooming first
**Status:** Phase 1 partially built. Needs scoping for Phase 2.

---

## Team

- **Jan (Janani)** — Product Lead / PM
- **Malcolm** — Manager / Team Lead / CPO
- **Gary** — CEO
- **Edward** — BE Lead / Architect
- **Phuc** — Backend
- **Truong** — Backend
- **Tyson** — Backend
- **Matt** — Frontend
- **Quang** — Frontend
- **Minh** — QA
- **Nathan** — Sales Engineer / Japan relationship
- **Charmaine** — Commercial / BD
- **KF (Kung Fei)** — Sales Engineer

---

## Sprint Framework

- 1-week sprints
- PLAN/IMPL ticket structure
- 5-point cap per engineer
- Friday standups
- Monthly retro

---

## Next Step: Build Live Dashboard

The goal is a Next.js dashboard deployed on Vercel (TeamAutomations repo) that:
1. Pulls live data from Linear API (TOFF team tickets)
2. Shows Monday.com-style board view (grouped by project, timeline bars, color-coded status)
3. Shows Gantt view (W15–W27, weekly bars)
4. Auto-refreshes daily at 6pm SGT via Vercel cron
5. Dark theme, JetBrains Mono + DM Sans

Linear GraphQL endpoint: https://api.linear.app/graphql
Auth: Authorization: Bearer {LINEAR_API_KEY}
