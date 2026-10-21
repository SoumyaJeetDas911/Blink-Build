# ⚡ BLIND & BUILD ARENA 2026

Welcome to the **Blind & Build Arena** — an event platform and challenge suite designed for hackathons, tech fests, and front-end coding competitions.

In a **Blind & Build** challenge, participants study a target website during a brief **Observation / Preview Phase**, after which the website is concealed (**Blindfolded**). Participants must then recreate the webpage as accurately as possible from memory using standard HTML, CSS, and JavaScript.

---

## 🏆 Round Structure & Calibrated Difficulty

Each round increases in structural complexity, visual density, and state interactivity:

| Round | Difficulty | Codename | Primary Focus & Challenges | Preview Time | Build Time |
|---|---|---|---|---|---|
| **Round 1** | **Easy** | **AeroSound** | Clean box model, modern Flexbox navbar, 2-column hero with 3-item stat counters, 3-card feature grid, color theme picker, clean footer. | 90s | 20m |
| **Round 2** | **Medium** | **VeloxPay** | Asymmetric CSS Grid, glassmorphism (`backdrop-filter`), 3D tilted credit card, live currency exchange calculator, 4-card Bento grid (rail comparison, virtual card customizer, IBAN generator, tax checklist), real-time Treasury Ledger table with search/filters, speed corridor benchmarks, Monthly/Annual pricing switch, and FAQ accordion. | 120s | 25m |
| **Round 3** | **Hard / Expert** | **Nexus Quantum** | High-density dev observability console, top telemetry bar, 4 metric sparkline cards, prompt token counter, streaming inference simulator, 4-node pipeline visualizer, auto-tail terminal logs, 8-node H100 GPU fleet topology heatmap, global Edge Point-of-Presence probe matrix, multi-language SDK studio (Python, TS, Go, Rust, cURL), compute quota capacity meters, and immutable security audit log. | 180s | 30m |

---

## 🚀 How to Run the Event

### 1. Master Event Hub (Recommended for Organizers & Projectors)
Open `index.html` in any modern web browser (Google Chrome, Firefox, Edge, Safari):
```bash
# Simply double-click index.html or open via local static server:
npx serve .
# or Python
python -m http.server 3000
```
- **Round Switcher**: Seamlessly switch between Round 1, Round 2, and Round 3 at the top.
- **Dual-Phase Timers**:
  - **👁️ Preview Phase**: Counts down (e.g., 90s). Emits audio warning beeps in the final 10 seconds.
  - **🕶️ Automatic Blind Screen**: When preview time expires, the target website is automatically blacked out and concealed with a message: *"PREVIEW PHASE ENDED — Start your editors!"*
  - **💻 Build Phase**: Counts down the recreation window (30m for R1, 45m for R2, 1 hour for R3).
- **🎨 Specs & Palette Inspector**: Click the top button to open a quick modal showing official HEX swatches (with click-to-copy), recommended font families, and core scoring criteria.
- **⛶ Fullscreen Presentation Mode**: Perfect for big stage projectors and auditorium screens.

### 2. Standalone Target Websites
Each round is also completely self-contained in its own directory, with zero external build tools required:
- **Round 1**: `round1/index.html`
- **Round 2**: `round2/index.html`
- **Round 3**: `round3/index.html`

Participants or judges can inspect and run them independently.

---

## ⚖️ Built-in Judge Evaluator & Scoring Rubric

Click the **⚖️ JUDGING Diff Tool** tab on the master hub to open the evaluator:
1. Enter the participant's local URL or file path (e.g. `http://localhost:5500/participant_sub/`).
2. The original target website and participant's submission are displayed side-by-side.
3. Use the **Overlay Opacity Slider (0% to 100%)** to overlay the participant's layout directly on top of the target site to inspect exact pixel and margin alignment!

### Official 100-Point Scoring Rubric:
1. **Layout & Grid Accuracy (30 Pts)**:
   - Proportions, Flexbox/Grid alignment, padding, and spacing hierarchy.
2. **Styling & Visual Fidelity (30 Pts)**:
   - Color accuracy, typography hierarchy, border-radius, shadows, gradients, and icons.
3. **Interactivity & Micro-states (20 Pts)**:
   - Button hover states, toggles (e.g., pricing switch in R2, color picker in R1, tabs in R3).
4. **Code Quality & Speed (20 Pts)**:
   - Semantic HTML5 tags, clean CSS structure, and submission speed.

---

## 🛠️ File Structure
```
Blind and Build/
├── index.html                   # Master Event Hub (Round launcher, timers, judge tool)
├── hub.css                      # Master Arena styles
├── hub.js                       # Timer logic, round switching, Web Audio cues, diff slider
├── README.md                    # Event manual & judge rubric
├── round1/                      # [EASY] AeroSound landing page
│   ├── index.html
│   ├── style.css
│   └── script.js
├── round2/                      # [MEDIUM] VeloxPay fintech platform
│   ├── index.html
│   ├── style.css
│   └── script.js
└── round3/                      # [HARD] Nexus Quantum AI console & telemetry
    ├── index.html
    ├── style.css
    └── script.js
```

Happy competing and may the best front-end architect win! ⚡
