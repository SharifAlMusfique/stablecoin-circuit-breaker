# CLAUDE.md — Stablecoin Circuit Breaker

Instructions for Claude Code. Read this whole file before doing anything in this repo.

## Project in one paragraph

Stablecoin Circuit Breaker is a hackathon demo for BUILD IRL Vol. 1 (Solana, Dublin, Saturday 26 September 2026). It **detects** stress in stablecoins (green / amber / red rating). It then **responds** by proposing a pre-approved treasury action that a named manager approves in Phantom. Finally it **proves** every step by writing it to Solana devnet as a memo transaction. The demo runs on a **simulated scenario player** with a Play button, not on live data.

It flags stress. It does NOT predict depegs, trade real money, or give investment advice.

## Who you are working with

- The builder is solo, focused on product and pitch, and **not an experienced coder**.
- Explain what you did in 2–4 plain-English sentences after each task. Avoid jargon, or define it in one line.
- Always say exactly how to run or test the result (which file to open, which command to type).
- Prefer simple, readable code over clever code. Comment the key sections.
- If a decision could take the project off track (new framework, big refactor, new dependency), **ask first**.

## Golden rules

1. **Never break the demo.** After every change the app must still open and play Scenario C end to end. If a Solana step fails, the app must carry on and mark the event "not on-chain".
2. **Devnet only.** Never connect to mainnet. Hard-code the cluster as `devnet` and show "DEVNET" in the UI.
3. **No secrets in the repo.** Never commit keypair files (`*.json` keypairs), seed phrases or private keys. Add them to `.gitignore`. Ask the user to paste public addresses only.
4. **One tier at a time.** Finish, test and commit a tier before starting the next. Do not start Tier 3 until Tier 1 passes its tests.
5. **Label honestly.** Always show a visible **SIMULATION** banner. Label thresholds "starting assumptions". Label Scenario C "stylised shape of the March 2023 event, not exact historical data".
6. **Deterministic demo.** Mock data uses a fixed random seed, so every run looks the same on stage.

## Tech stack

- **Tier 1:** one self-contained file, `circuit-breaker.html`, with inline CSS and JS. Chart.js is loaded from a CDN. No build step, no data files, and it opens by double-clicking.
- **Tiers 2–3:** add `@solana/web3.js` and `@solana/spl-token` with the Phantom wallet. If loading these from a CDN is unreliable, convert to a small **Vite** app (`npm install`, `npm run dev`). Explain the switch to the user and keep the same UI.
- Browser JavaScript only. No backend server and no Rust or on-chain program.

## Suggested structure (after any Vite conversion)

```
/index.html            main page (was circuit-breaker.html)
/src/scenarios.js      mock data generation (seeded)
/src/risk.js           signal + rating logic, time-in-colour rule
/src/policy.js         rules R1–R3, proposals, approvals, timeouts
/src/solana.js         Phantom connect, memo tx, token transfer, explorer links
/src/ui.js             cards, chart, alert log, auditor view
/README.md
/.gitignore
```

## Build tiers

| Tier | Scope | Acceptance test |
|---|---|---|
| 1. Must have | Scenario player, rating cards, price chart with bands, time-in-colour rule, alert log, method panel. No blockchain. | All 4 scenarios play; B logs nothing; C logs amber then red. |
| 2. Solid | Connect Phantom (devnet); a memo transaction per alert; Auditor view with Explorer links. | An alert's link opens a real devnet tx showing the memo text. |
| 3. Differentiator | Policy panel R1–R3; approval card; one Phantom-signed tx with SPL test-token transfer + memo. | Flagged → approved → tokens moved, all visible on Explorer; balances change. |
| 4. Stretch | Live Pyth price toggle; CSV export of the Auditor view; real March 2023 history. | Live cards show real prices (all green is expected). |

**Current tier:** 1. The user updates this line as tiers are completed.

## Spec: scenarios (mock data)

- Coins: USDC and USDT (PYUSD optional). One reading per simulated minute: `{ t, price, supply }`.
- Only the scenario's target coin (USDC) moves; the others stay calm, which makes the contrast visible.

| ID | Name | Price path | Expected result |
|---|---|---|---|
| A | Calm day | $1 ± 0.02% noise, 120 min | All green, no alerts |
| B | Flash wick | Calm, then −1.5% for under 1 min, then back | Red flicker on screen; **no alert, no proposal** |
| C | March 2023 USDC replay (stylised) | Fri calm → Sat slide to ~$0.87 → Sun ~$0.90–0.95 → Mon recovery ~$0.99 | Amber alert → red alert → R2 proposal → approval → move → back to green |
| D | Collapse (Terra-style) | Supply −5% in an hour first, then price slides, accelerates to ~$0.30, never recovers | Supply signal red before price; policy fires early |

Controls: scenario dropdown, Play, Pause, Reset, speed 1× / 10× / 60×.

## Spec: risk engine

| Signal | Calculation | Green | Amber | Red |
|---|---|---|---|---|
| Price deviation | `abs(price − 1) × 100` (%) | < 0.3 | 0.3 – 1 | > 1 |
| Volatility | std dev of last 15 readings ÷ calm baseline | < 2× | 2× – 4× | > 4× |
| Supply change | % change over last 60 readings | < 1 | 1 – 3 | > 3 |

- Overall rating = **worst** of the three signals.
- Lights change instantly on screen.
- An **alert** is logged only when amber holds for **3** simulated minutes, or red holds for **5**.
- Each card shows a plain-English reason, e.g. "price 1.4% below $1".

## Spec: treasury policy

| Rule | Condition | Action |
|---|---|---|
| R1 | Coin amber for 3 min | Notify + log alert. No funds move. |
| R2 | Coin red for 5 min | Pause the simulation and show an approval card proposing to move 50% of that coin's holdings from TREASURY to SAFE. |
| R3 | No approval within 2 min | Log "escalated, no action taken". Nothing moves without a signature. |

Rules are editable in a Policy panel. Reject sends a `REJECTED` memo.

## Spec: Solana

- Cluster: **devnet** only. RPC: `https://api.devnet.solana.com`.
- Memo program ID: `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`.
- Explorer link: `https://explorer.solana.com/tx/<signature>?cluster=devnet`.
- Wallet: Phantom (`window.phantom.solana` / `window.solana`), set to Devnet by the user.
- On approval, send **one** transaction containing (a) an SPL transfer of the test token from TREASURY to SAFE and (b) a `MOVED` memo.
- Show both wallet balances on screen and refresh them after each move.
- Show a status for each event: pending / confirmed / failed / not on-chain.

Fill these in from the user's Friday setup. Public addresses only:

```
TEST_TOKEN_MINT = "<paste mint address>"
TREASURY_WALLET = "<paste public address>"
SAFE_WALLET     = "<paste public address>"
TOKEN_DECIMALS  = 6
```

### Memo format (keep exactly)

```
CB|v1|<EVENT>|<COIN>|<RATING>|<detail>|rule=<id>|sim=<simulated ISO time>|scn=<A-D>
EVENT ∈ ALERT, PROPOSED, APPROVED, REJECTED, ESCALATED, MOVED
```

Examples:

```
CB|v1|ALERT|USDC|RED|dev=-2.31|rule=R2|sim=2023-03-11T02:14|scn=C
CB|v1|MOVED|USDC|RED|amount=5000|to=SAFE|rule=R2|sim=2023-03-11T02:20|scn=C
```

Keep memos short, under about 200 characters.

## Spec: UI

One page, readable from the back of a room, clean and professional:

1. Header with the product name, **SIMULATION** and **DEVNET** badges, and the Connect Phantom button.
2. Controls bar: scenario, Play / Pause / Reset, speed.
3. Rating cards, one per coin, showing colour, rating and reason.
4. Price-vs-$1 line chart with shaded amber and red bands.
5. Policy panel with rules and pending approval cards (Approve / Reject + countdown).
6. Alert log showing sim time, event, status and Explorer link.
7. Auditor view tab: full timeline with coin, rating, event, signer address and link, plus CSV export (Tier 4).
8. Method panel listing thresholds as "starting assumptions".

## Testing checklist (run after every tier)

- [ ] Scenario A runs to the end with no alerts.
- [ ] Scenario B shows a red flicker but logs nothing.
- [ ] Scenario C logs amber, then red, then triggers R2.
- [ ] (Tier 2+) Every Explorer link opens and shows the memo text.
- [ ] (Tier 3) Approve moves tokens and balances update; Reject moves nothing.
- [ ] With Phantom disconnected, the simulation still runs and events show "not on-chain".
- [ ] No console errors during a full Scenario C run.

## Proof of project (what judges must see)

| # | Proof point | Evidence |
|---|---|---|
| P1 | Rating logic works (Scenario C) | Screenshot of red card + chart |
| P2 | No false alarms (Scenario B) | Short screen clip |
| P3 | Alerts are on-chain | 3+ devnet tx links in README |
| P4 | A named wallet approved | Tx link + approver address |
| P5 | The response executed | Before/after balances |
| P6 | Auditable record | Auditor view + exported CSV |
| P7 | Honest method | SIMULATION banner + assumptions panel |

## README.md requirements

When asked to write the README, include:

- Problem, solution (Detect → Respond → Prove), and who it's for.
- How to run it, in steps a non-coder can follow.
- Tiers completed.
- A **Proof on Solana** section with devnet tx links and wallet addresses (left as placeholders for the user to fill in).
- Honest limits: simulation, devnet, no prediction, thresholds are assumptions.
- A next step: enforce the policy in an on-chain program.

## Git habits

- Commit after each working tier, e.g. `tier 1: scenario player working`.
- Before any risky change, make sure the last working version is committed so it can be restored.

## Out of scope

Predicting depegs, mainnet, real money or trades, real exchange swaps, custom Rust or Anchor programs, user accounts and logins, backend servers.
