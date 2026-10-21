// Nexus Quantum - Round 3 Interactive Dashboard Logic
document.addEventListener('DOMContentLoaded', () => {
  // 1. Model Switching
  const modelTabs = document.querySelectorAll('.m-tab');
  const codeOutput = document.getElementById('code-output');
  const breadcrumbActive = document.querySelector('.bc-item.active');

  const modelSnippets = {
    deepseek: `// CUDA Tiled SGEMM Kernel - Nexus Auto-Generated
__global__ void sgemm_tiled(const float* A, const float* B, float* C, int N) {
    __shared__ float sA[TILE_DIM][TILE_DIM];
    __shared__ float sB[TILE_DIM][TILE_DIM];
    
    int bx = blockIdx.x, by = blockIdx.y;
    int tx = threadIdx.x, ty = threadIdx.y;
    float acc = 0.0f;
    /* Loop over sub-matrices with zero bank conflicts */
}`,
    claude: `// Rust High-Performance Async Vector Search
pub async fn query_hnsw_shard(
    query_vector: &[f32; 1536],
    top_k: usize,
    index: &Arc<HnswIndex>
) -> Result<Vec<SearchResult>, EngineError> {
    let ef_search = 128;
    index.search_parallel(query_vector, top_k, ef_search).await
}`,
    llama: `// Triton FlashAttention-3 Kernel Dispatcher
@triton.jit
def _fwd_kernel(
    Q, K, V, sm_scale,
    L, M,
    Out,
    stride_qz, stride_qh, stride_qm, stride_qk,
    Z, H, N_CTX,
    BLOCK_M: tl.constexpr, BLOCK_DMODEL: tl.constexpr, BLOCK_N: tl.constexpr,
):
    start_m = tl.program_id(0)`
  };

  modelTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modelTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const modelKey = tab.getAttribute('data-model');
      if (breadcrumbActive) breadcrumbActive.textContent = tab.textContent;
      if (codeOutput && modelSnippets[modelKey]) {
        codeOutput.textContent = modelSnippets[modelKey];
      }
    });
  });

  // 2. Token & Char Counter
  const promptInput = document.getElementById('prompt-input');
  const tokenLabel = document.getElementById('prompt-tokens');

  if (promptInput && tokenLabel) {
    promptInput.addEventListener('input', () => {
      const chars = promptInput.value.length;
      const tokens = Math.max(1, Math.round(chars / 4.2));
      tokenLabel.textContent = `${tokens} tokens | ${chars} chars`;
    });
  }

  // 3. Streaming Inference Simulation
  const runBtn = document.getElementById('run-inference-btn');
  if (runBtn && codeOutput) {
    runBtn.addEventListener('click', () => {
      const originalText = codeOutput.textContent;
      codeOutput.textContent = 'Allocating memory tensors... \nConnecting to cluster node #04 [OK]\nStreaming response:\n\n';
      runBtn.disabled = true;
      runBtn.style.opacity = '0.6';

      let i = 0;
      const streamText = `>>> Compiling optimized kernel graph...\n>>> TTFT: 16.4ms | Speed: 294 tok/sec\n\nResult:\n` + originalText;
      
      const interval = setInterval(() => {
        if (i < streamText.length) {
          codeOutput.textContent += streamText.charAt(i);
          i += 3; // stream 3 chars at a time
        } else {
          clearInterval(interval);
          runBtn.disabled = false;
          runBtn.style.opacity = '1';
        }
      }, 20);
    });
  }

  // 4. Live Ping Jitter Simulation
  const pingElement = document.getElementById('live-ping');
  if (pingElement) {
    setInterval(() => {
      const randomPing = (11.5 + Math.random() * 2.5).toFixed(1);
      pingElement.textContent = `${randomPing} ms`;
    }, 3000);
  }

  // 5. Copy Code Snippet Button
  const copyBtn = document.getElementById('copy-code-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(`curl https://api.nexus-quantum.cloud/v1/chat/completions -H "Authorization: Bearer nx_live_89f0294c..." -d '{"model":"deepseek-r1-671b","stream":true}'`);
      const original = copyBtn.innerHTML;
      copyBtn.innerHTML = '✓ Copied';
      copyBtn.style.borderColor = 'var(--emerald)';
      copyBtn.style.color = 'var(--emerald)';
      setTimeout(() => {
        copyBtn.innerHTML = original;
        copyBtn.style.borderColor = '';
        copyBtn.style.color = '';
      }, 2000);
    });
  }

  // 6. Live Telemetry Logger
  const logConsole = document.getElementById('log-console');
  if (logConsole) {
    const sampleEvents = [
      { tag: 'tag-cyan', prefix: '[KV-CACHE]', msg: 'Prefetching tensor buffer block #1042' },
      { tag: 'tag-ok', prefix: '[HEARTBEAT]', msg: 'Node cluster health check passed (1,024 alive)' },
      { tag: 'tag-purple', prefix: '[ROUTER]', msg: 'Inbound gRPC stream routed to replica us-east-4a' },
      { tag: 'tag-cyan', prefix: '[LATENCY]', msg: 'Cross-datacenter sync completed in 2.1ms' }
    ];

    let eventIdx = 0;
    setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      const ev = sampleEvents[eventIdx % sampleEvents.length];
      eventIdx++;

      const line = document.createElement('div');
      line.className = 'log-line';
      line.innerHTML = `<span class="log-time">${timeStr}</span> <span class="${ev.tag}">${ev.prefix}</span> ${ev.msg}`;
      logConsole.appendChild(line);

      if (logConsole.children.length > 8) {
        logConsole.removeChild(logConsole.firstElementChild);
      }
      logConsole.scrollTop = logConsole.scrollHeight;
    }, 4500);
  }

  // 7. GPU Node Inspector
  const gpuCards = document.querySelectorAll('.gpu-card');
  const inspNodeName = document.getElementById('insp-node-name');

  gpuCards.forEach(card => {
    card.addEventListener('click', () => {
      gpuCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const gpuId = card.querySelector('.gpu-id')?.textContent || 'H100-SXM-01';
      if (inspNodeName) inspNodeName.textContent = gpuId;
    });
  });

  // 8. Probe All Edges Button
  const probeEdgeBtn = document.getElementById('probe-edge-btn');
  const pingVa = document.getElementById('ping-va');
  const pingDe = document.getElementById('ping-de');
  const pingJp = document.getElementById('ping-jp');
  const pingIe = document.getElementById('ping-ie');

  if (probeEdgeBtn) {
    probeEdgeBtn.addEventListener('click', () => {
      probeEdgeBtn.disabled = true;
      const originalText = probeEdgeBtn.innerHTML;
      probeEdgeBtn.innerHTML = 'Probing...';

      setTimeout(() => {
        if (pingVa) pingVa.textContent = (10.0 + Math.random() * 3).toFixed(1) + ' ms';
        if (pingDe) pingDe.textContent = (15.0 + Math.random() * 4).toFixed(1) + ' ms';
        if (pingJp) pingJp.textContent = (32.0 + Math.random() * 6).toFixed(1) + ' ms';
        if (pingIe) pingIe.textContent = (19.0 + Math.random() * 5).toFixed(1) + ' ms';

        probeEdgeBtn.innerHTML = '✓ Probed';
        setTimeout(() => {
          probeEdgeBtn.disabled = false;
          probeEdgeBtn.innerHTML = originalText;
        }, 1200);
      }, 700);
    });
  }

  // 9. Multi-Language SDK Code Switcher
  const sdkTabs = document.querySelectorAll('.sdk-tab');
  const sdkCodeDisplay = document.getElementById('sdk-code-display');

  const sdkSnippets = {
    python: `<code class="language-python">import asyncio
from nexus_quantum import AsyncNexusClient

client = AsyncNexusClient(api_key="nx_live_89f0294c771b...")

async def main():
    stream = await client.chat.completions.create(
        model="deepseek-r1-671b",
        messages=[{"role": "user", "content": "Generate CUDA SGEMM kernel"}],
        stream=True,
        temperature=0.7,
        max_tokens=2048
    )
    async for chunk in stream:
        print(chunk.delta.content or "", end="", flush=True)

asyncio.run(main())</code>`,
    ts: `<code class="language-typescript">import { NexusClient } from "@nexus-quantum/sdk";

const nexus = new NexusClient({ apiKey: "nx_live_89f0294c771b..." });

async function streamInference() {
  const stream = await nexus.chat.completions.create({
    model: "deepseek-r1-671b",
    messages: [{ role: "user", content: "Optimize FlashAttention-3" }],
    stream: true
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
}

streamInference();</code>`,
    go: `<code class="language-go">package main

import (
    "context"
    "fmt"
    "github.com/nexus-quantum/go-sdk/nexus"
)

func main() {
    client := nexus.NewClient("nx_live_89f0294c771b...")
    stream, err := client.ChatStream(context.Background(), &nexus.ChatReq{
        Model: "deepseek-r1-671b",
        Prompt: "Explain FP8 Tensor Core quantization",
    })
    for token := range stream.Tokens {
        fmt.Print(token.Text)
    }
}</code>`,
    rust: `<code class="language-rust">use nexus_quantum::Client;
use tokio_stream::StreamExt;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new("nx_live_89f0294c771b...");
    let mut stream = client.chat_stream("deepseek-r1-671b", "H100 NVLink topology").await?;

    while let Some(chunk) = stream.next().await {
        print!("{}", chunk?.content);
    }
    Ok(())
}</code>`,
    curl: `<code class="language-bash">curl -X POST https://api.nexus-quantum.cloud/v1/chat/completions \\
  -H "Authorization: Bearer nx_live_89f0294c771b..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-r1-671b",
    "messages": [{"role": "user", "content": "Write high-throughput matrix multiply"}],
    "stream": true,
    "temperature": 0.7
  }'</code>`
  };

  sdkTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      sdkTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const langKey = tab.getAttribute('data-lang');
      if (sdkCodeDisplay && sdkSnippets[langKey]) {
        sdkCodeDisplay.innerHTML = sdkSnippets[langKey];
      }
    });
  });

  // Toggle API Key Mask
  const toggleKeyBtn = document.getElementById('toggle-key-btn');
  let isKeyMasked = true;
  if (toggleKeyBtn && sdkCodeDisplay) {
    toggleKeyBtn.addEventListener('click', () => {
      isKeyMasked = !isKeyMasked;
      if (isKeyMasked) {
        toggleKeyBtn.textContent = '👁️ Show API Key';
        sdkCodeDisplay.innerHTML = sdkCodeDisplay.innerHTML.replace(/nx_live_89f0294c[a-zA-Z0-9._-]+/g, 'nx_live_••••••••••••••••');
      } else {
        toggleKeyBtn.textContent = '🔒 Hide API Key';
        sdkCodeDisplay.innerHTML = sdkCodeDisplay.innerHTML.replace(/nx_live_•+/g, 'nx_live_89f0294c771b802a');
      }
    });
  }

  // Copy SDK Code Button
  const copySdkBtn = document.getElementById('copy-sdk-code-btn');
  if (copySdkBtn && sdkCodeDisplay) {
    copySdkBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(sdkCodeDisplay.textContent);
      const originalText = copySdkBtn.textContent;
      copySdkBtn.textContent = '✓ Copied';
      copySdkBtn.style.color = 'var(--emerald)';
      setTimeout(() => {
        copySdkBtn.textContent = originalText;
        copySdkBtn.style.color = '';
      }, 1800);
    });
  }

  // 10. Toggle Autoscaling
  const toggleAutoscaleBtn = document.getElementById('toggle-autoscale-btn');
  const autoscaleBadge = document.getElementById('autoscale-badge');
  let isAutoscaleOn = true;

  if (toggleAutoscaleBtn && autoscaleBadge) {
    toggleAutoscaleBtn.addEventListener('click', () => {
      isAutoscaleOn = !isAutoscaleOn;
      if (isAutoscaleOn) {
        autoscaleBadge.textContent = 'ENABLED';
        autoscaleBadge.className = 'badge-status-on';
        toggleAutoscaleBtn.textContent = 'Disable Autoscaling';
      } else {
        autoscaleBadge.textContent = 'PAUSED';
        autoscaleBadge.className = 'badge-status-on';
        autoscaleBadge.style.color = 'var(--amber)';
        autoscaleBadge.style.borderColor = 'rgba(245, 158, 11, 0.3)';
        autoscaleBadge.style.background = 'rgba(245, 158, 11, 0.12)';
        toggleAutoscaleBtn.textContent = 'Enable Autoscaling';
      }
    });
  }

  // 11. Simulate Anomaly Event in Security Audit
  const simAnomalyBtn = document.getElementById('simulate-anomaly-btn');
  const auditTbody = document.getElementById('audit-tbody');

  if (simAnomalyBtn && auditTbody) {
    simAnomalyBtn.addEventListener('click', () => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      const randomIp = `198.51.100.${Math.floor(Math.random() * 250 + 1)}`;
      const randomHash = Math.random().toString(16).substring(2, 8);

      const newRow = document.createElement('tr');
      newRow.style.animation = 'fadeIn 0.5s ease';
      newRow.innerHTML = `
        <td class="font-mono text-dim">${timeStr}</td>
        <td><span class="sev-pill sev-crit">CRIT</span></td>
        <td class="font-mono">${randomIp} (Anomalous Probe)</td>
        <td>DDoS Shield triggered: 28,000 SYN packets dropped from suspicious ASN #4820</td>
        <td class="font-mono text-cyan">sha256:${randomHash}...9f21</td>
      `;

      auditTbody.prepend(newRow);
      simAnomalyBtn.textContent = 'Anomaly Logged ✓';
      setTimeout(() => {
        simAnomalyBtn.textContent = '⚠️ Simulate Anomaly Event';
      }, 1500);
    });
  }
});
