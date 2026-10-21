// AeroSound - Round 1 Interactive Elements
document.addEventListener('DOMContentLoaded', () => {
  // Color Picker Interactivity
  const colorDots = document.querySelectorAll('.color-dot');
  const metallicRings = document.querySelectorAll('.metallic-ring');
  const productTag = document.querySelector('.product-tag');

  const colorConfig = {
    black: { name: 'Studio Black Edition', hex: '#ff5733' },
    silver: { name: 'Glacier Silver Edition', hex: '#38bdf8' },
    midnight: { name: 'Midnight Navy Edition', hex: '#c084fc' }
  };

  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      const selectedColor = dot.classList.contains('black') 
        ? 'black' 
        : dot.classList.contains('silver') 
          ? 'silver' 
          : 'midnight';

      const config = colorConfig[selectedColor];
      if (productTag) productTag.textContent = config.name;
      
      metallicRings.forEach(ring => {
        ring.style.borderColor = config.hex;
      });
    });
  });

  // Watch Demo button feedback
  const demoBtn = document.getElementById('hero-demo-btn');
  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      const originalText = demoBtn.innerHTML;
      demoBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        Playing Stream...
      `;
      setTimeout(() => {
        demoBtn.innerHTML = originalText;
      }, 2500);
    });
  }

  // 3. Workable Feature Mode Simulator
  const featModeBtns = document.querySelectorAll('.feat-mode-btn');
  const featCards = document.querySelectorAll('.feature-card');
  const testFeatBtns = document.querySelectorAll('.btn-test-feat');
  const simTitle = document.getElementById('sim-title');
  const simDesc = document.getElementById('sim-desc');
  const simBarFill = document.getElementById('sim-bar-fill');
  const simMeterVal = document.getElementById('sim-meter-val');
  const soundWaveBars = document.querySelectorAll('.wave-bar');

  const modeData = {
    anc: {
      title: 'Hybrid Active Noise Cancellation Active',
      desc: 'Triple feedforward and feedback microphones calibrate 48,000 times/sec to eliminate ambient rumble (-45dB).',
      barPct: '99%',
      meterText: '99.4% (-45dB Isolation)',
      waveStyle: 'scaleY(0.2)'
    },
    driver: {
      title: 'Custom Beryllium Spatial Audio Mode',
      desc: 'Ultra-wide soundstage unlocked with 360° binaural head-tracking and high-frequency resolution up to 45kHz.',
      barPct: '100%',
      meterText: '45 kHz Ultra-Res Bandwidth',
      waveStyle: 'scaleY(1.4)'
    },
    battery: {
      title: 'Turbo Flash Charge Protocol Active',
      desc: 'Dual-cell gallium nitride charge circuit delivering 6 hours playtime from a rapid 10-minute USB-C burst.',
      barPct: '88%',
      meterText: '10 Min Charge = 6 Hours',
      waveStyle: 'scaleY(0.7)'
    }
  };

  function activateFeatureMode(modeKey) {
    const data = modeData[modeKey];
    if (!data) return;

    // Update buttons
    featModeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === modeKey);
    });

    // Update cards
    featCards.forEach(card => {
      const isTarget = card.getAttribute('data-mode') === modeKey;
      card.classList.toggle('active', isTarget);
      const badge = card.querySelector('.card-status-badge');
      if (badge) badge.textContent = isTarget ? 'ACTIVE MODE' : 'STANDBY';
    });

    // Update banner output
    if (simTitle) simTitle.textContent = data.title;
    if (simDesc) simDesc.textContent = data.desc;
    if (simBarFill) simBarFill.style.width = data.barPct;
    if (simMeterVal) simMeterVal.textContent = data.meterText;

    // React on hero soundwave graphic
    soundWaveBars.forEach(bar => {
      bar.style.transform = data.waveStyle;
    });
  }

  featModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activateFeatureMode(btn.getAttribute('data-mode'));
    });
  });

  featCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-test-feat')) return;
      activateFeatureMode(card.getAttribute('data-mode'));
    });
  });

  testFeatBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetMode = btn.getAttribute('data-target');
      activateFeatureMode(targetMode);

      const originalText = btn.textContent;
      btn.textContent = 'Simulating... ✓';
      btn.style.background = 'var(--accent-primary)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 1500);
    });
  });

  // 4. Workable Technical Specifications Tabs
  const specTabs = document.querySelectorAll('.spec-tab');
  const specsContainer = document.getElementById('specs-container');

  const specsDatabase = {
    audio: [
      { label: 'TRANSDUCER TYPE', val: '40mm Custom Beryllium Foil', detail: 'Laser-annealed diaphragm with neodymium N52 motor system for zero distortion.' },
      { label: 'FREQUENCY RESPONSE', val: '5 Hz – 45,000 Hz', detail: 'Exceeds Hi-Res Audio certification standards with extended ultra-high treble extension.' },
      { label: 'TOTAL HARMONIC DISTORTION', val: '< 0.05% THD @ 1kHz', detail: 'Measured at 100 dB SPL reference output for absolute studio monitoring transparency.' },
      { label: 'ACOUSTIC CHAMBER', val: 'Dual-Vented Helmholtz Port', detail: 'Regulates internal back-pressure to provide effortless, visceral sub-bass articulation.' }
    ],
    wireless: [
      { label: 'BLUETOOTH VERSION', val: 'Bluetooth 5.4 Low Energy', detail: 'Dual-channel synchronous transmission with 24m uninterrupted line-of-sight range.' },
      { label: 'AUDIO CODECS', val: 'Sony LDAC, aptX Adaptive, AAC, SBC', detail: 'Transfers up to 990 kbps for bit-perfect 24-bit / 96kHz lossless streaming.' },
      { label: 'MULTIPOINT CONNECTION', val: 'Seamless 2-Device Switching', detail: 'Instant auto-handover between your laptop and smartphone when a call arrives.' },
      { label: 'LATENCY BENCHMARK', val: '18 ms Ultra-Low Latency', detail: 'Dedicated gaming and studio monitoring mode with zero audio-video lip sync delay.' }
    ],
    battery: [
      { label: 'PLAYTIME (ANC OFF)', val: '54 Hours Continuous Play', detail: 'Industry-leading battery capacity engineered with high-density lithium polymer cells.' },
      { label: 'PLAYTIME (ANC ON)', val: '42 Hours Continuous Play', detail: 'Full active noise cancellation running continuously at standard 70% listening volume.' },
      { label: 'RAPID CHARGE PROTOCOL', val: '10 Mins = 6 Hours Playtime', detail: 'USB-C Power Delivery with automated thermal throttling and overcharge protection.' },
      { label: 'WIRELESS CHARGING', val: 'Qi-Certified Magnetic Base', detail: 'Charge horizontally on any Qi-compatible pad or official AeroSound desktop stand.' }
    ],
    build: [
      { label: 'CHASSIS MATERIALS', val: 'CNC Aircraft-Grade Aluminum', detail: 'Precision-milled earcups with bead-blasted satin finish and diamond-cut beveled edges.' },
      { label: 'CUSHION ERGONOMICS', val: 'Memory Foam & Protein Lambskin', detail: 'Zero-pressure acoustic seal contours around glasses frames for all-day comfort.' },
      { label: 'TOTAL WEIGHT', val: '248 grams', detail: 'Lightweight headband weight distribution calibrated for zero fatigue during extended sessions.' },
      { label: 'WATER RESISTANCE', val: 'IPX4 Splash & Sweat Proof', detail: 'Hydrophobic nano-coating safeguards internal transducers against rain and workout sweat.' }
    ]
  };

  specTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      specTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');
      const specs = specsDatabase[category] || specsDatabase.audio;

      if (specsContainer) {
        specsContainer.innerHTML = specs.map(item => `
          <div class="spec-card">
            <span class="spec-label">${item.label}</span>
            <div class="spec-value">${item.val}</div>
            <p class="spec-detail">${item.detail}</p>
          </div>
        `).join('');
      }
    });
  });

  // 5. Workable Codec Bitrate Tester
  const codecBtns = document.querySelectorAll('.codec-btn');
  const codecBitrateText = document.getElementById('codec-bitrate-text');
  const codecBarFill = document.getElementById('codec-bar-fill');
  const codecQualityPill = document.getElementById('codec-quality-pill');

  codecBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      codecBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const bitrate = btn.getAttribute('data-bitrate');
      const quality = btn.getAttribute('data-quality');
      const pct = btn.getAttribute('data-pct');

      if (codecBitrateText) codecBitrateText.textContent = `${bitrate} kbps`;
      if (codecBarFill) codecBarFill.style.width = `${pct}%`;
      if (codecQualityPill) codecQualityPill.textContent = quality;
    });
  });

  // 6. Navigation Tabs Highlighting & ScrollSpy
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionIds = ['features', 'specs', 'reviews', 'support'];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  let isClickScrolling = false;
  let clickTimer = null;

  function setActiveTab(targetId) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${targetId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);

        // Immediately update tab highlighting so clicking Specifications highlights Specifications
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        if (targetEl) {
          e.preventDefault();
          isClickScrolling = true;
          clearTimeout(clickTimer);

          targetEl.scrollIntoView({ behavior: 'smooth' });

          clickTimer = setTimeout(() => {
            isClickScrolling = false;
          }, 800);
        }
      }
    });
  });

  // Dynamic ScrollSpy
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      if (isClickScrolling) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveTab(id);
          }
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0
    });

    sections.forEach(sec => observer.observe(sec));
  }
});

