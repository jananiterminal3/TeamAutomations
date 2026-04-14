# Team Context & Project Background

## Project Goals
TeamAutomations hosts the internal tooling for the T3 team — starting with a live Linear dashboard showing Q2 project status across all 8 active projects.

## Team
| Name | Role |
|------|------|
| Jan (Janani) | Product Lead / PM |
| Malcolm | Manager / Team Lead / CPO |
| Gary | CEO |
| Edward | BE Lead / Architect |
| Phuc | Backend |
| Truong | Backend |
| Tyson | Backend |
| Matt | Frontend |
| Quang | Frontend |
| Minh | QA |
| Nathan | Sales Engineer / Japan relationship |
| Charmaine | Commercial / BD |
| KF (Kung Fei) | Sales Engineer |

## Sprint Framework
- 1-week sprints
- PLAN/IMPL ticket structure
- 5-point cap per engineer
- Friday standups
- Monthly retro
- All tickets tracked in Linear under the **TOFF** team

---

## Q2 2026 Projects

### Project 1: MetaMask × Transak
**Tickets:** 10 | **Points:** 38 | **Deadline:** April 30, 2026 (hard)
**Key risk:** No direct Transak engineering contact. PRD sent, no eng response.
**Reality:** T3 side completable by April 30. Phase 2 fully BLOCKED until Transak eng alignment.

| Phase | Ticket | Points | Owner | Status |
|-------|--------|--------|-------|--------|
| 0 | Escalate for Transak eng contact | 1 | Jan + Gary | To Do |
| 0 | Prepare Transak alignment agenda | 1 | Jan | To Do |
| 0 | Confirm MetaMask SDK integration spec with Lorenzo | 1 | Jan | To Do |
| 1 | KYC E2E test suite | 5 | Minh | To Do |
| 2 | Transak auth handoff implementation | 6 | TBD | BLOCKED |
| 2 | VP delivery mechanism to Transak | 6 | TBD | BLOCKED |
| 2 | Transak order status webhook/polling handler | 4 | Tyson | BLOCKED |
| 2 | Verifier SDK package for Transak | 4 | Edward | BLOCKED |
| 2 | Step-up KYC trigger handler | 4 | Truong | BLOCKED |
| 2 | E2E integration testing with Transak staging | 6 | Minh | BLOCKED |

**Flow:** SDK init → email OTP login → KYC L1/L2 via Veriff → VC issuance (SD-JWT) → VP generation (OID4VP) → VP + auth handoff to Transak → payment → crypto fulfillment
**Note:** SSN NOT shared with Transak. Passport/portrait/liveness stored in Regulatory Vault.

---

### Project 2: DNP NCR — Hotel Check-in
**Tickets:** 7 | **Points:** 30 | **Deadline:** June 2026 pilot launch
**Partner:** DNP (Dai Nippon Printing) via CATRINA platform
**Kiosk provider:** NCR (~700 hotels). USEN ALMEX (~4,300 hotels) already integrated.
**POC result (Jan 2026):** 84% reduction in form entry time, 52% reduction in check-in time at Loisir Hotel.

| Phase | Ticket | Points | Owner | Status |
|-------|--------|--------|-------|--------|
| 0 | NCR data schema discovery | 2 | Jan | To Do |
| 0 | Request Meeco/CATRINA verification flow docs from DNP | 1 | Jan | BLOCKED |
| 0 | PRD — NCR passport VC data schema and integration spec | 3 | Jan | To Do |
| 1 | Update T3 ID Wallet passport VC schema for NCR | 6 | Edward | To Do |
| 1 | Veriff X509 cert for CATRINA HAIP compliance | 6 | Edward + Truong | BLOCKED |
| 1 | Validate portrait format vs CATRINA/Meeco (TOFF-8116) | 4 | Truong | To Do |
| 1 | E2E testing with DNP CATRINA | 8 | Minh | To Do |

**Data at booking:** Name (passport), email, phone
**Data at check-in:** Passport photo, passport number, nationality, name, DOB, gender, email, phone

---

### Project 3: DNP MyRoute — Mobility
**Tickets:** 3 | **Points:** 8 | **Deadline:** Sep 2026 pilot → Feb 2027 POC → Mar 2027 gov report
**Partner:** Toyota Financial Services / KINTO Technologies via MyRoute app
**Government:** MLIT (Ministry of Land, Infrastructure, Transport) funded

| Phase | Ticket | Points | Owner | Status |
|-------|--------|--------|-------|--------|
| 0 | Scope alignment call with Nathan | 2 | Jan | To Do |
| 0 | KYC SDK scoping | 3 | Jan | To Do |
| 0 | PRD — MyRoute scope & architecture | 3 | Jan | BLOCKED (needs above) |

**Key refs:** Internal Brief deck pp. 16–22 (system dev plan), pp. 28–29 (app-to-app handshake flow)

---

### Project 4: Trinity Integration
**Tickets:** 2 | **Points:** 10 | **Timeline:** W16–W17

| Ticket | Points | Status |
|--------|--------|--------|
| Planning & toolkit evaluation | 4 | In Progress |
| Execution & implementation | 6 | To Do |

---

### Project 5: Hedera × Accredify POC
**Tickets:** 2 | **Points:** 10 | **Timeline:** W16–W17

| Ticket | Points | Status |
|--------|--------|--------|
| Planning with Hedera Stablecoin Studio | 4 | In Progress |
| POC execution & delivery | 6 | To Do |

---

### Project 6: Anchorpoint Stablecoin
**Tickets:** TBD | **Timeline:** Planning W17, implementation W18+
**Status:** No tickets yet — scoping during planning week.

---

### Project 7: Octopus Cards
**Tickets:** TBD | **Timeline:** Mid-May start (dependent on sales close)
**Key context:** Compliance team (Myron, Lillian, Grandy) has PDPO/data storage concerns. Prefers H5 or SDK. 80% of users already KYC'd. Use cases: hotel (NCR), mobility (MyRoute), stablecoin (Anchorpoint).

---

### Project 8: Regulatory Vault Phase 2
**Tickets:** TBD | **Timeline:** June start, backlog grooming first
**Status:** Phase 1 partially built. Phase 2 scope TBD.

---

## Next Step: Live Dashboard
Next.js dashboard on Vercel pulling live data from Linear API (TOFF team). Board view + Gantt view (W15–W27). Dark theme, JetBrains Mono + DM Sans. Auto-refresh daily at 6pm SGT via Vercel cron.
