# Stablecoin Circuit Breaker

**Detect stablecoin stress. Trigger the pre-approved response. Prove every step on Solana.**

Built for **BUILD IRL Vol. 1** (Solana hackathon, Dogpatch Labs, Dublin, 26 September 2026).

> **Simulation and devnet only.** Prices come from scripted scenarios, not live markets. Tokens are devnet test tokens with no value. Thresholds are starting assumptions. It flags stress; it does not predict depegs. Not investment advice.

---

## The problem

In March 2023, USDC fell to roughly 87 cents over a weekend after Silicon Valley Bank, which held part of its reserves, failed. Everyone could see the price. What most firms lacked was **an agreed plan** for what to do in the moment, and **proof** afterwards of what they saw and did.

Detecting a depeg is already well served. Open-source monitors, commercial risk dashboards and data sites such as kcolbchain/depeg-monitor, Webacy, DefiLlama and S&P Global's stablecoin assessments all rate or alert on stablecoin stress. They stop at the alarm. Under stress, a treasury team must decide in minutes, often out of hours. Later it must prove to auditors what it did, and a spreadsheet or email trail can be edited after the fact.

**Our gap:** detection is crowded, so Circuit Breaker sits one step later, on **response and evidence**.

## The solution: Detect → Respond → Prove

| Layer | What it does | What you see |
|---|---|---|
| **Detect** | Rates each coin green / amber / red from price, volatility and supply signals. A colour must *hold* before it counts, so a one-minute blip does not trigger action. | Rating cards with a plain-English reason (e.g. "Price 4.4% below $1"), a price chart with shaded bands, an alert feed. |
| **Respond** | Checks the firm's pre-written policy (rules R1 to R3). When a rule fires, it proposes an action. A named manager approves or rejects it with a Phantom wallet signature. An approved move transfers test tokens from TREASURY to SAFE. | Editable policy panel, an approval card with a countdown, Approve / Reject, live wallet balances. |
| **Prove** | Writes every alert, proposal, decision and move to Solana devnet as a memo, giving each one a public timestamp and the signer's address. | An Auditor view: the full timeline with an Explorer link per event. |

**Who it is for:** treasury teams, fintechs and payment firms that hold or accept stablecoins, and the risk and compliance staff who oversee them. In the EU, the MiCA regulation raises the pressure on these firms to show how they manage stablecoin risk.

### What Solana does

| Role | How |
|---|---|
| **Notary** | Every event is a Memo program transaction on devnet: a public record nobody can edit afterwards. |
| **Sign-off** | The manager approves with their wallet signature, so the record shows *who* approved. |
| **Executor** | An approved move transfers SPL test tokens from TREASURY to SAFE **in the same transaction** as the approval memo. |

---

## Tiers completed

| Tier | Scope | Status |
|---|---|---|
| 1. Must have | Scenario player, rating cards, chart with bands, time-in-colour rule, alert log, method panel | **Done.** All four scenarios pass the automated tests. |
| 2. Solid | Connect Phantom (devnet), a memo transaction per alert, Auditor view with Explorer links | **Built.** Devnet proof links: see [Proof on Solana](#proof-on-solana). |
| 3. Differentiator | Policy panel R1 to R3, approval card, one Phantom-signed transaction with an SPL transfer and memos | **Built.** Devnet proof links: see [Proof on Solana](#proof-on-solana). |
| 4. Stretch | Live Pyth prices, CSV export of the Auditor view, real March 2023 history | Not started |

---

## How to run it

### Option A: just the simulation (no wallet, nothing to install)

1. Download this repository: green **Code** button → **Download ZIP**, then unzip it.
2. Double-click **`circuit-breaker.html`**. It opens in your browser.
3. Pick a scenario and press **Play**.

You need internet the first time, for the fonts, the chart library and the Solana library. Without a wallet, every event is clearly marked **"not on-chain"** and the demo still runs end to end.

### Option B: with Phantom on Solana devnet (the full demo)

Wallets cannot connect to a double-clicked file, so the page needs to be opened from a tiny local web server.

1. Install **Node.js** (the LTS version) from [nodejs.org](https://nodejs.org).
2. Open a terminal in the project folder and run:
   ```
   node serve.js
   ```
3. Open **http://localhost:5173** in the browser where Phantom is installed.
4. In Phantom, switch the network to **Devnet** (Settings → Developer Settings → Testnet mode).
5. Get free devnet SOL for the wallet at [faucet.solana.com](https://faucet.solana.com).
6. Click **Connect Phantom** in the top bar.

`serve.js` needs no installs. It only serves page files and never serves `.json` files, so a keypair saved in the folder cannot leak.

### Option C: add the treasury move (Tier 3)

Do this once, before the demo. It creates two devnet wallets and a test "stablecoin". Install the [Solana CLI](https://solana.com/docs/intro/installation) first; on Windows, run these inside WSL.

```
solana config set --url devnet
solana-keygen new -o treasury.json
solana-keygen new -o safe.json
solana airdrop 2 $(solana-keygen pubkey treasury.json)

spl-token create-token --decimals 6 --fee-payer treasury.json
spl-token create-account <TOKEN_MINT> --owner treasury.json --fee-payer treasury.json
spl-token mint <TOKEN_MINT> 10000 --fee-payer treasury.json
spl-token create-account <TOKEN_MINT> --owner safe.json --fee-payer treasury.json
```

Then:

1. Import `treasury.json` into Phantom (set to Devnet). **Never commit this file.** `.gitignore` already blocks `*.json`.
2. In the app, scroll to **Treasury policy → Setup** and paste the **public** addresses: the token mint, TREASURY and SAFE. They are saved in your browser only.
3. The status line should read **"Ready: TREASURY is connected and can sign a move."**

### The 40-second demo (Scenario C)

1. Choose **C · March 2023 replay** at **60×** and press **Play**.
2. USDC drifts below $1 and turns **amber**. After 3 simulated minutes an alert is logged (R1). Sign the memo in Phantom.
3. USDC holds **red** for 5 minutes. Another alert is logged, the simulation **pauses**, and the approval card proposes moving 50% of USDC holdings to SAFE (R2).
4. Click **Approve & sign** and sign once in Phantom. Test tokens move from TREASURY to SAFE, and the balances update.
5. Click **View on Explorer** to show the public record. Then click **Resume simulation** to watch the recovery.
6. Open the **Auditor view** tab: flagged → proposed → approved → moved, each with its link.

Keyboard shortcuts: `Space` play / pause, `R` reset, `1` to `4` pick scenario A to D.

---

## Scenarios

The demo runs on four built-in scenarios generated with a **fixed random seed**, so every run looks the same on stage. One reading per simulated minute. Only USDC (the target) moves; USDT stays calm for contrast. Speed: 60× = one simulated minute per real second.

| ID | Name | What happens | Expected result |
|---|---|---|---|
| A | Calm day | $1 ± 0.02% noise for 2 hours | All green, no alerts |
| B | Flash wick | USDC drops 1.5% for a single minute, then snaps back | A red flicker on screen, **no alert, no proposal** |
| C | March 2023 USDC replay (stylised) | Friday calm → Saturday slide to ~$0.87 → Sunday ~$0.90 to 0.95 → Monday recovery | Amber alert → red alert → R2 proposal → decision → back to green |
| D | Collapse (Terra-style) | Supply drains 5% in an hour while the price looks fine, then the price slides to ~$0.30 and never recovers | The supply signal fires the alerts **before** the price moves |

Scenario C is a **stylised shape of the March 2023 event, not exact historical data**, and it is time-compressed into 110 simulated minutes.

## Method (starting assumptions)

| Signal | How it is calculated | Green | Amber | Red |
|---|---|---|---|---|
| Price deviation | \|price − 1\| × 100 | < 0.3% | 0.3 to 1% | > 1% |
| Volatility | Standard deviation of minute-to-minute price moves over the last 15 readings, vs the calm level (the 2 most extreme moves are left out, so a single spike does not count) | < 2× | 2 to 4× | > 4× |
| Supply change | % change over the last 60 readings | < 1% | 1 to 3% | > 3% |

- **Overall rating = the worst signal.** If any light is red, the coin is red.
- **Time-in-colour rule:** lights change instantly, but an alert is logged only when amber (or worse) holds for 3 simulated minutes, or red holds for 5.
- **One alert per episode:** each level alerts once; the episode ends after 5 green minutes.

### Default treasury policy (editable in the app)

| Rule | Condition | Action |
|---|---|---|
| R1 | Coin amber for 3 minutes | Notify the risk manager and log an alert. No funds move. |
| R2 | Coin red for 5 minutes | Pause and propose moving 50% of that coin's holdings from TREASURY to SAFE. Needs a signed approval. |
| R3 | No decision within 2 minutes | Log "escalated, no action taken". Nothing moves without a signature. |

### Memo format

Every on-chain record uses one short, readable format:

```
CB|v1|<EVENT>|<COIN>|<RATING>|<detail>|rule=<id>|sim=<simulated ISO time>|scn=<A-D>
EVENT ∈ ALERT, PROPOSED, APPROVED, REJECTED, ESCALATED, MOVED
```

```
CB|v1|ALERT|USDC|RED|dev=-4.36|rule=R2|sim=2023-03-10T22:29|scn=C
CB|v1|APPROVED|USDC|RED|move=50%|rule=R2|sim=2023-03-10T22:29|scn=C
CB|v1|MOVED|USDC|RED|amount=5000|to=SAFE|rule=R2|sim=2023-03-10T22:29|scn=C
```

An approval is **one transaction**: PROPOSED memo + APPROVED memo + SPL `TransferChecked` (TREASURY → SAFE) + MOVED memo, signed once by the TREASURY wallet.

---

## Proof on Solana

<!-- Fill these in after the live devnet runs. Public addresses and transaction links only. -->

**Cluster:** devnet

| Item | Address |
|---|---|
| TREASURY wallet (approver) | `<paste TREASURY public address>` |
| SAFE wallet | `<paste SAFE public address>` |
| Test token mint | `<paste mint address>` |

| # | Proof point | Evidence |
|---|---|---|
| P1 | The rating logic works (Scenario C) | `<screenshot: red card + chart>` |
| P2 | It doesn't cry wolf (Scenario B) | `<screen clip: red flicker, nothing logged>` |
| P3 | Alerts are on-chain | [ALERT amber](<paste Explorer link>) · [ALERT red](<paste Explorer link>) · [ESCALATED or REJECTED](<paste Explorer link>) |
| P4 | A named wallet approved | [PROPOSED + APPROVED + MOVED transaction](<paste Explorer link>), signed by `<TREASURY address>` |
| P5 | The response executed | TREASURY `<before>` → `<after>` · SAFE `<before>` → `<after>` (`<before/after screenshot>`) |
| P6 | Auditable record | `<screenshot: Auditor view>` |
| P7 | Honest method | `<screenshot: SIMULATION banner + method panel>` |

Explorer links look like `https://explorer.solana.com/tx/<signature>?cluster=devnet`, and the app shows one next to every confirmed event.

---

## How it is built

- **One web page:** [`circuit-breaker.html`](circuit-breaker.html), with inline CSS and JavaScript. No build step and no backend.
  - Chart.js and `@solana/web3.js` load from a CDN.
  - If either fails, the app keeps running: the chart hides, and events are marked "not on-chain".
- **Devnet only, hard-coded.** Phantom only *signs*; the page then sends the signed transaction to `https://api.devnet.solana.com` itself, so nothing can reach mainnet whatever network Phantom is set to.
- **No custom smart contract.** It uses the Memo program and the SPL Token program. The token instructions are built by hand and were checked byte for byte against the official `@solana/spl-token` library, for both Token and Token-2022.
- **No secrets.** The app never sees a private key. Addresses in the Setup form are public ones, saved only in the browser.
- **Design:** dark theme following [`design.md`](design.md).

| File | Purpose |
|---|---|
| `circuit-breaker.html` | The whole app: scenario engine, risk engine, policy, Solana layer, UI |
| `serve.js` | Tiny local server for the Phantom demo (`node serve.js`) |
| `tests/engine-test.js` | Automated checks of the scenarios and the memo format |
| `CLAUDE.md` | Build instructions and spec used with Claude Code |
| `Stablecoin_Circuit_Breaker_Project_Brief.pdf` | The project brief |

### Tests

```
node tests/engine-test.js
```

It checks that A logs nothing, that B flickers red but logs nothing, that C logs amber then red, that D alerts on supply first, that USDT stays calm, and that memos match the spec format exactly.

Manual checklist: Approve moves tokens and the balances update; Reject moves nothing; with Phantom disconnected, the simulation still runs and events show "not on-chain".

---

## Honest limits

- **Simulated data.** Scenarios are scripted, and Scenario C is a stylised, time-compressed shape of March 2023, not historical data.
- **Devnet only.** Test tokens with no value; no real money moves and no trades happen.
- **No prediction.** It flags stress with rules anyone can check. Depegs are rare and often driven by confidence shocks.
- **Thresholds are starting assumptions.** They are slightly more cautious than the 0.5 to 1% bands common in existing tools, and would need calibrating against past events.
- **The policy is enforced by the app, not by the chain.** The chain records and executes what the app proposes and a human signs.

## Next step

**Enforce the policy on-chain.** A Solana program would hold the treasury funds and only release a move when the rule conditions and the named approver's signature are both met. The rules would then be guaranteed by the chain, not just recorded on it. After that: live Pyth price feeds, CSV export for auditors, and thresholds calibrated on real events.
