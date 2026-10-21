// Blind & Build Master Arena Hub Engine
document.addEventListener('DOMContentLoaded', () => {
  // Round Configuration
  const rounds = {
    1: {
      number: 1,
      title: 'AeroSound — Acoustic Hardware Showcase',
      pill: 'ROUND 1: EASY',
      path: 'round1/index.html',
      previewDuration: 30, // 30 seconds
      buildDuration: 1800, // 30 mins
      colors: [
        { name: 'Background Main', hex: '#0c0e14' },
        { name: 'Card Surface', hex: '#141822' },
        { name: 'Accent Primary', hex: '#ff5733' },
        { name: 'Text Primary', hex: '#ffffff' },
        { name: 'Text Secondary', hex: '#94a3b8' },
        { name: 'Accent Blue', hex: '#38bdf8' }
      ],
      fonts: 'Plus Jakarta Sans (400, 500, 600, 700, 800)',
      coreSkills: 'Flexbox, Header navigation, 2-column hero with 3-stat counter, 3-card feature grid, clean footer.'
    },
    2: {
      number: 2,
      title: 'VeloxPay — Next-Gen Cross-Border Treasury',
      pill: 'ROUND 2: MEDIUM',
      path: 'round2/index.html',
      previewDuration: 45, // 45 seconds
      buildDuration: 2700, // 45 mins
      colors: [
        { name: 'Deep Midnight', hex: '#07090e' },
        { name: 'Glass Card', hex: '#121826' },
        { name: 'Cyan Glow', hex: '#00f0ff' },
        { name: 'Violet Accent', hex: '#8b5cf6' },
        { name: 'Emerald Status', hex: '#10b981' },
        { name: 'Text Pure', hex: '#f8fafc' }
      ],
      fonts: 'Space Grotesk (Display) & Plus Jakarta Sans',
      coreSkills: 'Glassmorphism backdrop-filter, 3D floating tilted credit card with EMV chip, currency calculator, 4-card asymmetric Bento grid with live rail comparison, interactive IBAN vault, real-time Treasury Ledger table with search/filters, speed corridor benchmarks, Monthly/Annual pricing switch, and FAQ accordion.'
    },
    3: {
      number: 3,
      title: 'Nexus Quantum — High-Throughput AI Studio',
      pill: 'ROUND 3: HARD / EXPERT',
      path: 'round3/index.html',
      previewDuration: 60, // 1 minute (60 seconds)
      buildDuration: 3600, // 1 hour (60 mins)
      colors: [
        { name: 'Void Black', hex: '#05070c' },
        { name: 'Carbon Panel', hex: '#0b0f17' },
        { name: 'Electric Cyan', hex: '#00f0ff' },
        { name: 'Cyber Emerald', hex: '#10b981' },
        { name: 'Neon Purple', hex: '#a855f7' },
        { name: 'Warning Amber', hex: '#f59e0b' }
      ],
      fonts: 'JetBrains Mono (Code/Stats) & Space Grotesk',
      coreSkills: 'High-density telemetry bar, 4 metric sparkline cards, prompt token counter, streaming inference simulator, 4-node pipeline flow, 8-node H100 GPU fleet topology heatmap, global Edge Point-of-Presence probe matrix, multi-language SDK studio, compute quota capacity meters, and immutable security audit log.'
    }
  };

  let currentRound = 1;
  let timerInterval = null;
  let timerMode = 'observe'; // 'observe' or 'build'
  let secondsRemaining = rounds[1].previewDuration;
  let isTimerRunning = false;

  // DOM Elements
  const tabRound1 = document.getElementById('tab-round-1');
  const tabRound2 = document.getElementById('tab-round-2');
  const tabRound3 = document.getElementById('tab-round-3');
  const tabJudge = document.getElementById('tab-judge');

  const roundPill = document.getElementById('current-round-pill');
  const roundHeading = document.getElementById('current-round-title');
  const targetFrame = document.getElementById('target-frame');
  const targetUrlLabel = document.getElementById('target-url-label');
  const openTargetBtn = document.getElementById('open-target-btn');

  const stageViewport = document.getElementById('stage-viewport');
  const controlPanel = document.getElementById('control-panel');
  const judgeSection = document.getElementById('judge-section');
  const blindOverlay = document.getElementById('blind-overlay');

  const timeDisplay = document.getElementById('time-display');
  const phaseLabel = document.getElementById('phase-label');
  const timerToggleBtn = document.getElementById('timer-toggle-btn');
  const timerResetBtn = document.getElementById('timer-reset-btn');
  const blindToggleBtn = document.getElementById('blind-toggle-btn');
  const unblindBtn = document.getElementById('unblind-btn');

  const modeObserveBtn = document.getElementById('mode-observe-btn');
  const modeBuildBtn = document.getElementById('mode-build-btn');

  const reloadIframeBtn = document.getElementById('reload-iframe-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  // Web Audio Context for Arena Beeps
  function playTone(freq, duration) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not permitted without interaction
    }
  }

  // Switch Active Round
  function switchRound(roundNum) {
    currentRound = roundNum;
    const config = rounds[roundNum];

    // Update active tab buttons
    [tabRound1, tabRound2, tabRound3, tabJudge].forEach(tab => tab.classList.remove('active'));
    if (roundNum === 1) tabRound1.classList.add('active');
    if (roundNum === 2) tabRound2.classList.add('active');
    if (roundNum === 3) tabRound3.classList.add('active');

    // Show Viewport, Hide Judge
    stageViewport.style.display = 'flex';
    controlPanel.style.display = 'flex';
    judgeSection.classList.add('hidden');

    // Update Headings & Iframe
    roundPill.textContent = config.pill;
    roundPill.style.color = roundNum === 1 ? 'var(--r1-color)' : roundNum === 2 ? 'var(--r2-color)' : 'var(--r3-color)';
    roundHeading.textContent = config.title;
    targetFrame.src = config.path;
    targetUrlLabel.textContent = `https://arena.internal/${config.path}`;
    openTargetBtn.href = config.path;

    // Reset Timer for this round
    resetTimer();

    // Hide blindfold if open
    blindOverlay.classList.add('hidden');
  }

  tabRound1.addEventListener('click', () => switchRound(1));
  tabRound2.addEventListener('click', () => switchRound(2));
  tabRound3.addEventListener('click', () => switchRound(3));

  // Judge Tab Switching
  tabJudge.addEventListener('click', () => {
    [tabRound1, tabRound2, tabRound3].forEach(tab => tab.classList.remove('active'));
    tabJudge.classList.add('active');
    stageViewport.style.display = 'none';
    controlPanel.style.display = 'none';
    judgeSection.classList.remove('hidden');

    if (typeof updateJudgeTarget === 'function') {
      const picker = document.getElementById('judge-round-picker');
      if (picker) picker.value = currentRound;
      updateJudgeTarget(currentRound);
    }
  });

  // Timer Formatting
  function formatTime(totalSecs) {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateTimerDisplay() {
    timeDisplay.textContent = formatTime(secondsRemaining);

    if (secondsRemaining <= 10 && secondsRemaining > 0 && timerMode === 'observe') {
      timeDisplay.classList.add('warning');
      playTone(520, 0.15); // Warning beep
    } else {
      timeDisplay.classList.remove('warning');
    }
  }

  function startTimer() {
    if (isTimerRunning) {
      // Pause
      clearInterval(timerInterval);
      isTimerRunning = false;
      timerToggleBtn.textContent = 'Resume Timer';
      timerToggleBtn.classList.remove('running');
    } else {
      // Start
      isTimerRunning = true;
      timerToggleBtn.textContent = 'Pause Timer';
      timerToggleBtn.classList.add('running');

      timerInterval = setInterval(() => {
        if (secondsRemaining > 0) {
          secondsRemaining--;
          updateTimerDisplay();
        } else {
          // Timer Expired!
          clearInterval(timerInterval);
          isTimerRunning = false;
          timerToggleBtn.textContent = 'Start Timer';
          timerToggleBtn.classList.remove('running');
          playTone(880, 0.8); // Long ending chime

          if (timerMode === 'observe') {
            // Automatically blind the screen!
            blindOverlay.classList.remove('hidden');
            // Auto switch mode to build
            setTimerMode('build');
          }
        }
      }, 1000);
    }
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerToggleBtn.textContent = 'Start Timer';
    timerToggleBtn.classList.remove('running');
    timeDisplay.classList.remove('warning');

    const config = rounds[currentRound];
    secondsRemaining = timerMode === 'observe' ? config.previewDuration : config.buildDuration;
    updateTimerDisplay();

    if (modeObserveBtn) {
      modeObserveBtn.textContent = `👁️ Preview Phase (${config.previewDuration}s)`;
    }
    if (modeBuildBtn) {
      const mins = Math.round(config.buildDuration / 60);
      const label = mins >= 60 ? (mins % 60 === 0 ? `${mins / 60}h` : `${mins}m`) : `${mins}m`;
      modeBuildBtn.textContent = `💻 Build Phase (${label})`;
    }
  }

  function setTimerMode(mode) {
    timerMode = mode;
    if (mode === 'observe') {
      modeObserveBtn.classList.add('active');
      modeBuildBtn.classList.remove('active');
      phaseLabel.textContent = 'PREVIEW TIME REMAINING';
    } else {
      modeBuildBtn.classList.add('active');
      modeObserveBtn.classList.remove('active');
      phaseLabel.textContent = 'BUILD TIME REMAINING';
    }
    resetTimer();
  }

  modeObserveBtn.addEventListener('click', () => setTimerMode('observe'));
  modeBuildBtn.addEventListener('click', () => setTimerMode('build'));
  timerToggleBtn.addEventListener('click', startTimer);
  timerResetBtn.addEventListener('click', resetTimer);

  // Manual Blindfold Toggle
  blindToggleBtn.addEventListener('click', () => {
    blindOverlay.classList.toggle('hidden');
  });

  unblindBtn.addEventListener('click', () => {
    blindOverlay.classList.add('hidden');
  });

  // Reload iframe
  reloadIframeBtn.addEventListener('click', () => {
    targetFrame.src = rounds[currentRound].path;
  });

  // Fullscreen Presentation Mode
  fullscreenBtn.addEventListener('click', () => {
    stageViewport.classList.toggle('fullscreen-mode');
    fullscreenBtn.textContent = stageViewport.classList.contains('fullscreen-mode') ? '✖' : '⛶';
  });

  // Specs & Palette Modal
  const specsBtn = document.getElementById('specs-btn');
  const specsModal = document.getElementById('specs-modal');
  const closeSpecsBtn = document.getElementById('close-specs-btn');
  const modalRoundTitle = document.getElementById('modal-round-title');
  const modalContent = document.getElementById('modal-content');

  specsBtn.addEventListener('click', () => {
    const config = rounds[currentRound];
    modalRoundTitle.textContent = `Round ${config.number}: ${config.title} — Cheat Sheet`;

    let swatchesHtml = config.colors.map(c => `
      <div class="swatch-item" onclick="navigator.clipboard.writeText('${c.hex}'); alert('Copied ${c.hex} to clipboard!');">
        <span class="swatch-color" style="background-color: ${c.hex}"></span>
        <div class="swatch-details">
          <span class="swatch-name">${c.name}</span>
          <span class="swatch-hex">${c.hex}</span>
        </div>
      </div>
    `).join('');

    modalContent.innerHTML = `
      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 0.95rem; margin-bottom: 6px; color: var(--accent-gold);">Recommended Fonts</h4>
        <p style="font-family: var(--font-mono); font-size: 0.85rem; color: #cbd5e1; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px;">${config.fonts}</p>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 0.95rem; margin-bottom: 6px; color: var(--accent-gold);">Core Scoring Focus & Layout Structure</h4>
        <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.6;">${config.coreSkills}</p>
      </div>

      <div>
        <h4 style="font-size: 0.95rem; margin-bottom: 8px; color: var(--accent-gold);">Color Palette (Click swatch to copy HEX)</h4>
        <div class="swatch-grid">${swatchesHtml}</div>
      </div>
    `;

    specsModal.classList.remove('hidden');
  });

  closeSpecsBtn.addEventListener('click', () => specsModal.classList.add('hidden'));

  // Rules Modal
  const rulesBtn = document.getElementById('rules-btn');
  const rulesModal = document.getElementById('rules-modal');
  const closeRulesBtn = document.getElementById('close-rules-btn');

  rulesBtn.addEventListener('click', () => rulesModal.classList.remove('hidden'));
  closeRulesBtn.addEventListener('click', () => rulesModal.classList.add('hidden'));

  // Close modals on outside click
  window.addEventListener('click', (e) => {
    if (e.target === specsModal) specsModal.classList.add('hidden');
    if (e.target === rulesModal) rulesModal.classList.add('hidden');
  });

  // ==========================================
  // Judge Evaluator Controls
  // ==========================================
  const judgeRoundPicker = document.getElementById('judge-round-picker');
  const modeSplitBtn = document.getElementById('mode-split-btn');
  const modeOverlayBtn = document.getElementById('mode-overlay-btn');
  const diffViewportsContainer = document.getElementById('diff-viewports-container');
  const opacitySlider = document.getElementById('opacity-slider');
  const opacityVal = document.getElementById('opacity-val');
  const participantInput = document.getElementById('participant-url-input');
  const loadParticipantBtn = document.getElementById('load-participant-btn');
  const participantFileInput = document.getElementById('participant-file-input');
  const diffTargetFrame = document.getElementById('diff-target-frame');
  const diffTargetLabel = document.getElementById('diff-target-label');
  const diffParticipantFrame = document.getElementById('diff-participant-frame');
  const diffParticipantLabel = document.getElementById('diff-participant-label');
  const presetBtns = document.querySelectorAll('.btn-preset');

  // Rubric Elements
  const scoreLayout = document.getElementById('score-layout');
  const scoreStyling = document.getElementById('score-styling');
  const scoreInteractivity = document.getElementById('score-interactivity');
  const scoreCode = document.getElementById('score-code');
  const totalScoreDisplay = document.getElementById('total-score-display');
  const scoreGradeBadge = document.getElementById('score-grade-badge');
  const copyScorecardBtn = document.getElementById('copy-scorecard-btn');

  let currentJudgeTargetRound = currentRound || 1;
  let activeJudgeMode = 'split'; // 'split' or 'overlay'

  function updateJudgeTarget(roundNum) {
    currentJudgeTargetRound = parseInt(roundNum, 10);
    const roundData = rounds[currentJudgeTargetRound];
    if (roundData && diffTargetFrame) {
      diffTargetFrame.src = roundData.path;
      if (diffTargetLabel) {
        diffTargetLabel.textContent = `ORIGINAL TARGET: Round ${roundData.number} (${roundData.title})`;
      }
    }
  }

  if (judgeRoundPicker) {
    judgeRoundPicker.addEventListener('change', (e) => {
      updateJudgeTarget(e.target.value);
    });
  }

  // View Mode: Split vs True Pixel Overlay
  function setJudgeMode(mode) {
    activeJudgeMode = mode;
    if (mode === 'overlay') {
      diffViewportsContainer.classList.add('mode-overlay');
      modeOverlayBtn.classList.add('active');
      modeSplitBtn.classList.remove('active');
      if (diffParticipantFrame && opacitySlider) {
        diffParticipantFrame.style.opacity = opacitySlider.value / 100;
      }
    } else {
      diffViewportsContainer.classList.remove('mode-overlay');
      modeSplitBtn.classList.add('active');
      modeOverlayBtn.classList.remove('active');
      if (diffParticipantFrame) {
        diffParticipantFrame.style.opacity = '1';
      }
    }
  }

  if (modeSplitBtn && modeOverlayBtn) {
    modeSplitBtn.addEventListener('click', () => setJudgeMode('split'));
    modeOverlayBtn.addEventListener('click', () => setJudgeMode('overlay'));
  }

  // Opacity Slider
  if (opacitySlider) {
    opacitySlider.addEventListener('input', (e) => {
      const val = e.target.value;
      opacityVal.textContent = `${val}%`;
      if (activeJudgeMode === 'overlay' && diffParticipantFrame) {
        diffParticipantFrame.style.opacity = val / 100;
      }
    });
  }

  // Load URL
  function loadParticipantUrl(url) {
    if (!url) return;
    diffParticipantFrame.src = url;
    const displayName = url.length > 40 ? url.substring(0, 37) + '...' : url;
    diffParticipantLabel.textContent = `PARTICIPANT: ${displayName}`;
  }

  if (loadParticipantBtn && participantInput) {
    loadParticipantBtn.addEventListener('click', () => {
      const url = participantInput.value.trim();
      loadParticipantUrl(url);
    });

    participantInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        loadParticipantUrl(participantInput.value.trim());
      }
    });
  }

  // File Upload via ObjectURL
  if (participantFileInput) {
    participantFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        diffParticipantFrame.src = fileUrl;
        diffParticipantLabel.textContent = `PARTICIPANT FILE: ${file.name}`;
        if (participantInput) participantInput.value = file.name;
      }
    });
  }

  // Quick Presets
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const path = btn.getAttribute('data-path');
      diffParticipantFrame.src = path;
      if (participantInput) participantInput.value = path;
      diffParticipantLabel.textContent = `PARTICIPANT: ${path}`;
    });
  });

  // Rubric Score Calculator
  function calculateTotalScore() {
    const clamp = (val, max) => {
      if (val === '' || val === null || val === undefined) return 0;
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 0) return 0;
      return num > max ? max : num;
    };

    const l = clamp(scoreLayout.value, 30);
    const s = clamp(scoreStyling.value, 30);
    const i = clamp(scoreInteractivity.value, 20);
    const c = clamp(scoreCode.value, 20);

    const total = l + s + i + c;
    totalScoreDisplay.textContent = `${total} / 100`;

    // Grade classification
    scoreGradeBadge.className = 'score-grade';
    if (total === 0) {
      scoreGradeBadge.textContent = 'PENDING EVALUATION';
    } else if (total >= 90) {
      scoreGradeBadge.classList.add('grandmaster');
      scoreGradeBadge.textContent = '🏆 GRANDMASTER (TIER S)';
    } else if (total >= 75) {
      scoreGradeBadge.classList.add('outstanding');
      scoreGradeBadge.textContent = '⭐ OUTSTANDING (TIER A)';
    } else if (total >= 50) {
      scoreGradeBadge.classList.add('proficient');
      scoreGradeBadge.textContent = '✓ PROFICIENT (TIER B)';
    } else {
      scoreGradeBadge.classList.add('needs-work');
      scoreGradeBadge.textContent = '⚠️ NEEDS WORK (TIER C)';
    }
  }

  [scoreLayout, scoreStyling, scoreInteractivity, scoreCode].forEach(input => {
    if (input) {
      input.addEventListener('input', calculateTotalScore);
      input.addEventListener('change', () => {
        // Enforce max bounds on blur/change
        const max = parseInt(input.getAttribute('max'), 10) || 100;
        let v = parseInt(input.value, 10);
        if (isNaN(v) || v < 0) input.value = 0;
        else if (v > max) input.value = max;
        calculateTotalScore();
      });
    }
  });

  // Copy Scorecard to Clipboard
  if (copyScorecardBtn) {
    copyScorecardBtn.addEventListener('click', () => {
      const targetData = rounds[currentJudgeTargetRound] || rounds[1];
      const contestant = (participantInput && participantInput.value.trim()) || 'Participant Submission';
      const l = scoreLayout.value || 0;
      const s = scoreStyling.value || 0;
      const i = scoreInteractivity.value || 0;
      const c = scoreCode.value || 0;
      const total = parseInt(l, 10) + parseInt(s, 10) + parseInt(i, 10) + parseInt(c, 10);
      const grade = scoreGradeBadge.textContent;

      const scorecard = `================================================
🏆 BLIND & BUILD — OFFICIAL JUDGE SCORECARD
================================================
Target Round: Round ${targetData.number} (${targetData.title})
Contestant Build: ${contestant}
------------------------------------------------
1. Layout & Grid Accuracy      : ${l} / 30 pts
2. Styling & Visual Fidelity   : ${s} / 30 pts
3. Interactivity & Micro-states: ${i} / 20 pts
4. Code Quality & Semantics    : ${c} / 20 pts
------------------------------------------------
FINAL COMPOSITE SCORE          : ${total} / 100 pts
AWARD RANK                     : ${grade}
================================================`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(scorecard).then(() => {
          const originalText = copyScorecardBtn.textContent;
          copyScorecardBtn.textContent = '✓ Copied!';
          copyScorecardBtn.style.borderColor = 'var(--accent-green)';
          copyScorecardBtn.style.color = 'var(--accent-green)';
          setTimeout(() => {
            copyScorecardBtn.textContent = originalText;
            copyScorecardBtn.style.borderColor = '';
            copyScorecardBtn.style.color = '';
          }, 2200);
        }).catch(err => {
          console.error('Failed to copy scorecard:', err);
        });
      } else {
        alert('Scorecard ready:\n\n' + scorecard);
      }
    });
  }

  // Initialize
  resetTimer();
});
