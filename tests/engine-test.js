// Headless check of the Tier 1 engine. Run from the project folder:  node tests/engine-test.js
// It pulls the <script id="engine"> block out of circuit-breaker.html and plays every scenario.
const fs = require('fs'), vm = require('vm'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'circuit-breaker.html'), 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(html.match(/<script id="engine">([\s\S]*?)<\/script>/)[1] + '\nthis.runScenario = runScenario;', ctx);

const results = {};
for (const id of 'ABCD') results[id] = ctx.runScenario(id);
const seq = id => results[id].alerts.map(a => `${a.coin}:${a.rating}`).join(' ');

const checks = [
  ['A: calm day, no alerts, all green', results.A.alerts.length === 0 && results.A.worst.USDC === 0 && results.A.worst.USDT === 0],
  ['B: red flicker on screen, but no alert', results.B.alerts.length === 0 && results.B.worst.USDC === 2],
  ['C: amber alert, then red alert', seq('C') === 'USDC:AMBER USDC:RED'],
  ['D: supply triggers the alerts first', seq('D') === 'USDC:AMBER USDC:RED' && results.D.alerts.every(a => a.reason.startsWith('Supply'))],
  ['USDT stays calm in every scenario', Object.values(results).every(r => r.worst.USDT === 0)],
];
let ok = true;
for (const [name, pass] of checks) { console.log((pass ? 'PASS ' : 'FAIL ') + name); ok = ok && pass; }
process.exit(ok ? 0 : 1);
