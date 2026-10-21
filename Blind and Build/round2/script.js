// VeloxPay - Round 2 JavaScript Interactivity
document.addEventListener('DOMContentLoaded', () => {
  // 1. Currency Conversion Logic
  const sendInput = document.getElementById('send-amount');
  const receiveInput = document.getElementById('receive-amount');
  const fxRate = 0.924;

  if (sendInput && receiveInput) {
    sendInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value) || 0;
      const converted = (val * fxRate).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      receiveInput.value = converted;
    });
  }

  // 2. Billing Toggle (Monthly vs Annual)
  const billingBtn = document.getElementById('billing-btn');
  const monthlyLabel = document.getElementById('monthly-label');
  const annualLabel = document.getElementById('annual-label');
  const priceAmounts = document.querySelectorAll('.price-amount');

  let isAnnual = true;

  if (billingBtn) {
    billingBtn.addEventListener('click', () => {
      isAnnual = !isAnnual;

      if (isAnnual) {
        billingBtn.classList.remove('monthly');
        annualLabel.classList.add('active');
        monthlyLabel.classList.remove('active');
      } else {
        billingBtn.classList.add('monthly');
        monthlyLabel.classList.add('active');
        annualLabel.classList.remove('active');
      }

      // Update pricing digits
      priceAmounts.forEach(elem => {
        const targetVal = isAnnual 
          ? elem.getAttribute('data-annual') 
          : elem.getAttribute('data-monthly');
        
        elem.textContent = targetVal;
      });
    });
  }

  // 3. 3D Hover perspective on Credit Card
  const creditCard = document.getElementById('main-credit-card');
  if (creditCard) {
    creditCard.addEventListener('mousemove', (e) => {
      const rect = creditCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 20;
      const rotateY = (x / rect.width) * 20;

      creditCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    creditCard.addEventListener('mouseleave', () => {
      creditCard.style.transform = 'rotate(-4deg)';
    });
  }

  // 4. Bento Card Customizer (Interactive Color Swatches)
  const cardSwatches = document.querySelectorAll('.card-swatch');
  const miniCard = document.getElementById('interactive-mini-card');
  const cardEditionName = document.getElementById('card-edition-name');

  const cardThemes = {
    obsidian: { bg: 'linear-gradient(135deg, #0c0f17 0%, #1f2937 100%)', text: '#fff' },
    cyan: { bg: 'linear-gradient(135deg, #083344 0%, #00f0ff 100%)', text: '#000' },
    emerald: { bg: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)', text: '#fff' },
    purple: { bg: 'linear-gradient(135deg, #3b0764 0%, #a855f7 100%)', text: '#fff' }
  };

  cardSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      cardSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      const colorKey = swatch.getAttribute('data-color');
      const themeName = swatch.getAttribute('data-name');

      if (miniCard && cardThemes[colorKey]) {
        miniCard.style.background = cardThemes[colorKey].bg;
      }
      if (cardEditionName) {
        cardEditionName.textContent = themeName;
      }
    });
  });

  // 5. Virtual IBAN Generator Tab Switcher
  const countryTabs = document.querySelectorAll('.c-tab');
  const ibanDisplay = document.getElementById('iban-display');
  const ibanBankName = document.getElementById('iban-bank-name');
  const copyIbanBtn = document.getElementById('copy-iban-btn');

  countryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      countryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const iban = tab.getAttribute('data-iban');
      const bank = tab.getAttribute('data-bank');

      if (ibanDisplay) ibanDisplay.textContent = iban;
      if (ibanBankName) ibanBankName.textContent = bank;
    });
  });

  if (copyIbanBtn && ibanDisplay) {
    copyIbanBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(ibanDisplay.textContent);
      const originalText = copyIbanBtn.textContent;
      copyIbanBtn.textContent = 'Copied ✓';
      copyIbanBtn.style.background = '#10b981';
      copyIbanBtn.style.color = '#fff';

      setTimeout(() => {
        copyIbanBtn.textContent = originalText;
        copyIbanBtn.style.background = '';
        copyIbanBtn.style.color = '';
      }, 1800);
    });
  }

  // 6. Real-time Treasury Ledger Filter & Search
  const filterBtns = document.querySelectorAll('.tbl-filter');
  const searchInput = document.getElementById('tx-search-input');
  const txRows = document.querySelectorAll('#tx-tbody tr');

  function applyTableFilters() {
    const activeFilter = document.querySelector('.tbl-filter.active')?.getAttribute('data-filter') || 'all';
    const query = (searchInput?.value || '').toLowerCase().trim();

    txRows.forEach(row => {
      const status = row.getAttribute('data-status');
      const text = row.textContent.toLowerCase();

      const matchesStatus = (activeFilter === 'all') || (status === activeFilter);
      const matchesSearch = !query || text.includes(query);

      row.style.display = (matchesStatus && matchesSearch) ? '' : 'none';
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyTableFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyTableFilters);
  }

  // 7. Simulate Payout Action Button
  const simulateBtn = document.getElementById('simulate-tx-btn');
  const txTbody = document.getElementById('tx-tbody');

  if (simulateBtn && txTbody) {
    simulateBtn.addEventListener('click', () => {
      const randomId = Math.floor(100000 + Math.random() * 900000);
      const newRow = document.createElement('tr');
      newRow.setAttribute('data-status', 'settling');
      newRow.style.animation = 'fadeIn 0.5s ease';
      newRow.innerHTML = `
        <td class="font-mono text-cyan">TX-${randomId}-LIVE</td>
        <td>
          <div class="cell-entity">
            <span class="flag-circle">⚡</span>
            <div><strong>Vercel Global Rail</strong><span class="cell-sub">Automated Contractor Payout</span></div>
          </div>
        </td>
        <td><span class="rail-tag">Instant SEPA</span></td>
        <td><strong class="text-white">€12,450.00</strong></td>
        <td class="font-mono text-dim">1.0840 USD</td>
        <td><span class="status-pill status-pending"><span class="dot pulse"></span> Settling (0.9s)</span></td>
      `;

      txTbody.prepend(newRow);
      setTimeout(() => {
        const pill = newRow.querySelector('.status-pill');
        if (pill) {
          pill.className = 'status-pill status-success';
          pill.innerHTML = '<span class="dot"></span> Completed';
          newRow.setAttribute('data-status', 'completed');
        }
      }, 2000);
    });
  }

  // 8. Global Speed Corridors Switcher
  const corridorTabs = document.querySelectorAll('.corridor-tab');
  const latencyDisplay = document.getElementById('corridor-latency');
  const savingsDisplay = document.getElementById('corridor-savings');
  const feeDisplay = document.getElementById('corridor-fee');

  const corridorData = {
    'us-eu': { latency: '0.82s', savings: '84.2%', fee: '0.12%' },
    'uk-sg': { latency: '1.24s', savings: '88.6%', fee: '0.15%' },
    'jp-au': { latency: '0.94s', savings: '79.4%', fee: '0.10%' }
  };

  corridorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      corridorTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const corridorKey = tab.getAttribute('data-corridor');
      const data = corridorData[corridorKey];

      if (data) {
        if (latencyDisplay) latencyDisplay.textContent = data.latency;
        if (savingsDisplay) savingsDisplay.textContent = data.savings;
        if (feeDisplay) feeDisplay.textContent = data.fee;
      }
    });
  });

  // 9. FAQ Accordion Toggle
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const head = item.querySelector('.accordion-head');
    if (head) {
      head.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        accordionItems.forEach(i => {
          i.classList.remove('active');
          i.querySelector('.accordion-head')?.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          head.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 10. Workable Bento Features: Rail Speed Benchmark
  const benchmarkBtn = document.getElementById('benchmark-rail-btn');
  const benchFeedback = document.getElementById('bench-feedback-text');
  const veloxBarFill = document.getElementById('velox-bar-fill');
  const veloxTimeText = document.getElementById('velox-time-text');

  if (benchmarkBtn) {
    benchmarkBtn.addEventListener('click', () => {
      benchmarkBtn.disabled = true;
      benchmarkBtn.textContent = '⏱️ Running Multi-Hop Probe...';
      if (benchFeedback) benchFeedback.textContent = 'Simulating direct liquidity lock...';

      setTimeout(() => {
        if (veloxBarFill) veloxBarFill.style.width = '8%';
        if (veloxTimeText) veloxTimeText.textContent = '0.94 Seconds (Ultra-Fast)';
        if (benchFeedback) benchFeedback.textContent = '✓ Direct route verified: 0.94s settlement achieved!';

        benchmarkBtn.textContent = '✓ Benchmark Completed';
        setTimeout(() => {
          benchmarkBtn.disabled = false;
          benchmarkBtn.textContent = '⚡ Run Live Speed Benchmark';
        }, 2500);
      }, 1000);
    });
  }

  // 11. Workable Bento Features: Freeze Card & Reveal CVV
  const freezeCardBtn = document.getElementById('freeze-card-btn');
  const miniCardBadge = document.getElementById('mini-card-status-badge');
  const revealCvvBtn = document.getElementById('reveal-cvv-btn');
  const cardCvvVal = document.getElementById('card-cvv-val');
  let isCardFrozen = false;
  let isCvvRevealed = false;

  if (freezeCardBtn && miniCardBadge) {
    freezeCardBtn.addEventListener('click', () => {
      isCardFrozen = !isCardFrozen;
      if (isCardFrozen) {
        miniCardBadge.textContent = 'FROZEN';
        miniCardBadge.className = 'mini-card-status frozen';
        freezeCardBtn.textContent = '🔥 Unfreeze Card';
        if (miniCard) miniCard.style.filter = 'grayscale(0.6) brightness(0.85)';
      } else {
        miniCardBadge.textContent = 'ACTIVE';
        miniCardBadge.className = 'mini-card-status';
        freezeCardBtn.textContent = '❄️ Freeze Card';
        if (miniCard) miniCard.style.filter = '';
      }
    });
  }

  if (revealCvvBtn && cardCvvVal) {
    revealCvvBtn.addEventListener('click', () => {
      isCvvRevealed = !isCvvRevealed;
      if (isCvvRevealed) {
        cardCvvVal.textContent = '842';
        cardCvvVal.style.color = 'var(--primary-cyan)';
        revealCvvBtn.textContent = '🔒 Hide CVV';
      } else {
        cardCvvVal.textContent = '•••';
        cardCvvVal.style.color = '';
        revealCvvBtn.textContent = '👁️ Reveal CVV';
      }
    });
  }

  // 12. Workable Bento Features: Generate Fresh IBAN Sub-Account
  const genFreshIbanBtn = document.getElementById('generate-fresh-iban-btn');
  if (genFreshIbanBtn && ibanDisplay) {
    genFreshIbanBtn.addEventListener('click', () => {
      const activeTab = document.querySelector('.c-tab.active');
      const country = activeTab?.getAttribute('data-country') || 'DE';
      const randomDigits = Math.floor(10000000 + Math.random() * 90000000);

      let newIban = '';
      if (country === 'DE') newIban = `DE89 3704 0044 ${randomDigits}`;
      else if (country === 'GB') newIban = `GB29 NWBK 6016 ${randomDigits}`;
      else if (country === 'US') newIban = `Routing: 026009593 • Acc: ${randomDigits}`;
      else newIban = `SG78 DBSS 0039 ${randomDigits}`;

      ibanDisplay.textContent = newIban;
      genFreshIbanBtn.textContent = 'Generated ✓';
      setTimeout(() => {
        genFreshIbanBtn.textContent = '🔄 Generate New Sub-Account';
      }, 1500);
    });
  }

  // 13. Workable Bento Features: Interactive Compliance Checklist
  const chkItems = document.querySelectorAll('#compliance-checklist .chk-item');
  const compScoreText = document.getElementById('compliance-score-text');

  chkItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
      const dot = item.querySelector('.chk-dot');

      if (item.classList.contains('active')) {
        if (dot) dot.textContent = '✓';
      } else {
        if (dot) dot.textContent = '○';
      }

      const activeCount = document.querySelectorAll('#compliance-checklist .chk-item.active').length;
      const pct = Math.round((activeCount / chkItems.length) * 100);

      if (compScoreText) {
        compScoreText.textContent = `${pct}% Audit Ready (${activeCount}/${chkItems.length} Verifications Active)`;
        compScoreText.style.color = pct === 100 ? 'var(--accent-emerald)' : '#f59e0b';
      }
    });
  });

  // 14. Workable Specifications Tabs for Round 2
  const r2SpecTabs = document.querySelectorAll('.specs-tab-bar .spec-tab');
  const r2SpecsContainer = document.getElementById('round2-specs-container');

  const r2SpecsDb = {
    rails: [
      { label: 'SETTLEMENT ENGINE', val: 'Direct RTGS & FedNow API', detail: 'Sub-second atomic commitment across bilateral settlement corridors with zero intermediary banking delays.' },
      { label: 'MAX SINGLE TICKET SIZE', val: '$5,000,000.00 / txn', detail: 'Dynamic liquidity pooling through Tier-1 bank syndicates with instant pre-funded balance verification.' },
      { label: 'CLEARING WINDOW', val: '24 / 7 / 365 Continuous', detail: 'Zero weekend freeze windows or bank holiday freezes across European SEPA and US FedNow corridors.' },
      { label: 'FX LIQUIDITY SPREAD', val: '0.12% – 0.25% Fixed', detail: 'Direct wholesale institutional mid-market rates with transparent, pre-negotiated tier discounts.' }
    ],
    security: [
      { label: 'HARDWARE SECURITY MODULE', val: 'FIPS 140-3 Level 3 HSM', detail: 'Private keys stored exclusively in tamper-proof cryptographic enclaves with automated key rotation.' },
      { label: 'TRANSPORT ENCRYPTION', val: 'Mutual TLS 1.3 (mTLS)', detail: 'Zero plain-text ingress. Both client certificate and server identity verified for every API dispatch.' },
      { label: 'TRANSACTION SIGNING', val: 'Ed25519 Elliptic Curve', detail: 'Every payout payload signed with deterministic nonces preventing payload modification or replay attacks.' },
      { label: 'CUSTODIAL ISOLATION', val: '100% Legally Ring-Fenced', detail: 'Deposits held strictly with regulated central banking partners; zero commingling or rehypothecation.' }
    ],
    api: [
      { label: 'RATE LIMIT BURST CAPACITY', val: '10,000 Requests / min', detail: 'Token bucket rate-limiting with dedicated burst surge queues for batch end-of-month contractor payroll.' },
      { label: 'IDEMPOTENCY GUARANTEE', val: 'UUIDv4 Header Enforced', detail: 'All payment initiation requests cached with a 72-hour idempotency guarantee to prevent double debits.' },
      { label: 'WEBHOOK DISPATCH SPEED', val: '< 150ms Delivery SLA', detail: 'Automatic event retries with exponential backoff and HMAC-SHA256 signature verification.' },
      { label: 'API SDK SUPPORT', val: 'Node, Python, Go, Rust, Java', detail: 'Native strongly-typed libraries with integrated mock sandbox environments and test credit card numbers.' }
    ],
    iso: [
      { label: 'ISO 20022 CORE SCHEMA', val: 'pacs.008.001.08 Standard', detail: 'Full rich remittance metadata and structured customer address models conforming to EPC rulebook.' },
      { label: 'RECONCILIATION FEED', val: 'camt.053 & camt.054 Feeds', detail: 'End-of-day bank-to-customer electronic balance statements formatted for instant NetSuite & SAP ingestion.' },
      { label: 'PAYMENT INITIATION', val: 'pain.001 Batch Protocol', detail: 'Multi-currency batch payroll instructions processed atomically in a single multi-entity instruction.' },
      { label: 'EXCEPTION & INVESTIGATION', val: 'camt.056 Recall Messages', detail: 'Automated electronic investigation tracing with instant SWIFT GPI tracking UETR integration.' }
    ]
  };

  r2SpecTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      r2SpecTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');
      const specs = r2SpecsDb[category] || r2SpecsDb.rails;

      if (r2SpecsContainer) {
        r2SpecsContainer.innerHTML = specs.map(item => `
          <div class="spec-card">
            <span class="spec-label">${item.label}</span>
            <div class="spec-value">${item.val}</div>
            <p class="spec-detail">${item.detail}</p>
          </div>
        `).join('');
      }
    });
  });

  // 15. Workable ISO 20022 Rail Picker & Payload Inspector
  const railPickerBtns = document.querySelectorAll('.rail-picker-btn');
  const railProtoVal = document.getElementById('rail-proto-val');
  const railSpeedVal = document.getElementById('rail-speed-val');
  const railLimitVal = document.getElementById('rail-limit-val');
  const railIdempVal = document.getElementById('rail-idemp-val');
  const payloadFilename = document.getElementById('payload-filename');
  const payloadCodeDisplay = document.getElementById('payload-code-display');
  const copyPayloadBtn = document.getElementById('copy-payload-btn');

  const railPayloads = {
    sepa: {
      proto: 'ISO 20022 (pacs.008.001.08)',
      speed: '0.82 Seconds (Final)',
      limit: '€100,000 / Transfer',
      idemp: '72 Hours Guaranteed',
      filename: 'sepa_instant_transfer.json',
      json: `{
  "message_id": "MSG-2026-VELOX-0918",
  "settlement_rail": "SEPA_INSTANT",
  "creditor_iban": "DE89370400440532013000",
  "debtor_account": "ACC_CORP_894120",
  "instructed_amount": {
    "currency": "EUR",
    "value": 45200.00
  },
  "charge_bearer": "SLEV",
  "purpose_code": "TREASURY_TRANSFER",
  "idempotency_key": "idem_8f912a_b0c"
}`
    },
    fednow: {
      proto: 'FedLine Direct API / ISO 20022',
      speed: '0.65 Seconds (Real-Time)',
      limit: '$500,000 / Transfer',
      idemp: '96 Hours Guaranteed',
      filename: 'fednow_direct_payout.json',
      json: `{
  "instruction_id": "FED-2026-NX-8419",
  "rail": "FEDNOW_DIRECT",
  "routing_number": "026009593",
  "account_number": "894120842",
  "settlement": {
    "currency": "USD",
    "amount": 120000.00,
    "finality": "IMMEDIATE"
  },
  "settlement_source": "JPMORGAN_CHASE_VAULT",
  "client_reference": "PO_SUPABASE_OCT26"
}`
    },
    fps: {
      proto: 'UK Faster Payments Core Protocol',
      speed: '1.20 Seconds (Instant)',
      limit: '£1,000,000 / Transfer',
      idemp: '48 Hours Guaranteed',
      filename: 'fps_direct_settlement.json',
      json: `{
  "fps_id": "FPS_GB_2026_99410",
  "sort_code": "60-16-13",
  "account_number": "13319268",
  "payment_details": {
    "currency": "GBP",
    "amount": 18500.00
  },
  "clearing_bank": "CLEARBANK_UK",
  "remittance_info": "INVOICE-MONZO-4412"
}`
    },
    swift: {
      proto: 'SWIFT GPI / MT103 + pacs.009',
      speed: '15–30 Minutes (Global)',
      limit: 'Unlimited Institutional Tier',
      idemp: '7 Days Tracked',
      filename: 'swift_gpi_crossborder.json',
      json: `{
  "uetr": "97b9ee3e-28d8-4f76-88a2-20c24294b419",
  "message_type": "MT103_GPI",
  "beneficiary_bic": "DBEUMM21",
  "originating_bic": "CHASUS33",
  "currency": "USD",
  "amount": 850000.00,
  "gpi_tracking_status": "ACSP_SETTLED"
}`
    }
  };

  railPickerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      railPickerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const railKey = btn.getAttribute('data-rail');
      const data = railPayloads[railKey];

      if (data) {
        if (railProtoVal) railProtoVal.textContent = data.proto;
        if (railSpeedVal) railSpeedVal.textContent = data.speed;
        if (railLimitVal) railLimitVal.textContent = data.limit;
        if (railIdempVal) railIdempVal.textContent = data.idemp;
        if (payloadFilename) payloadFilename.textContent = data.filename;
        if (payloadCodeDisplay) payloadCodeDisplay.textContent = data.json;
      }
    });
  });

  if (copyPayloadBtn && payloadCodeDisplay) {
    copyPayloadBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(payloadCodeDisplay.textContent);
      const originalText = copyPayloadBtn.textContent;
      copyPayloadBtn.textContent = 'Copied ✓';
      copyPayloadBtn.style.background = 'var(--primary-cyan)';
      copyPayloadBtn.style.color = '#000';

      setTimeout(() => {
        copyPayloadBtn.textContent = originalText;
        copyPayloadBtn.style.background = '';
        copyPayloadBtn.style.color = '';
      }, 1800);
    });
  }

  // 15. Navigation Tabs Highlighting & ScrollSpy for Round 2
  const navItems = document.querySelectorAll('.nav-item');
  const r2SectionIds = ['features', 'specs', 'ledger', 'pricing', 'faq'];
  const r2Sections = r2SectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  let isR2ClickScrolling = false;
  let r2ClickTimer = null;

  function setActiveR2Tab(targetId) {
    navItems.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${targetId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  navItems.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);

        navItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        if (targetEl) {
          e.preventDefault();
          isR2ClickScrolling = true;
          clearTimeout(r2ClickTimer);

          targetEl.scrollIntoView({ behavior: 'smooth' });

          r2ClickTimer = setTimeout(() => {
            isR2ClickScrolling = false;
          }, 800);
        }
      }
    });
  });

  // Dynamic ScrollSpy for Round 2
  if ('IntersectionObserver' in window && r2Sections.length > 0) {
    const r2Observer = new IntersectionObserver((entries) => {
      if (isR2ClickScrolling) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveR2Tab(id);
          }
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0
    });

    r2Sections.forEach(sec => r2Observer.observe(sec));
  }
});

