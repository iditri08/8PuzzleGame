<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>8 Puzzle – README</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --purple:       #6d3fc8;
      --purple-light: #a78bfa;
      --purple-pale:  #f5f2ff;
      --pink:         #f472b6;
      --gold:         #f59e0b;
      --green:        #10b981;
      --blue:         #3b82f6;
      --text:         #2d1f5e;
      --muted:        #8b7aa8;
      --border:       rgba(167,139,250,0.25);
      --bg:           #f8f4ff;
    }

    body {
      font-family: 'Nunito', sans-serif;
      background: var(--bg);
      background-image:
        radial-gradient(ellipse at 10% 10%, #fde8f0 0%, transparent 45%),
        radial-gradient(ellipse at 90% 90%, #dff6ff 0%, transparent 45%),
        radial-gradient(ellipse at 50% 50%, #eae8fd 0%, transparent 65%);
      color: var(--text);
      min-height: 100vh;
    }

    /* ── Layout ── */
    .container { max-width: 860px; margin: 0 auto; padding: 40px 24px 80px; }

    /* ── Hero ── */
    .hero {
      text-align: center;
      padding: 48px 32px 36px;
      background: rgba(255,255,255,0.75);
      border-radius: 28px;
      border: 2px solid rgba(255,255,255,0.9);
      box-shadow: 0 20px 60px rgba(160,120,210,0.15);
      margin-bottom: 32px;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute; top: -80px; right: -80px;
      width: 260px; height: 260px; border-radius: 50%;
      background: radial-gradient(circle, rgba(196,181,253,0.2), transparent 70%);
    }

    .hero-emoji { font-size: 64px; display: block; margin-bottom: 12px; animation: float 3s ease-in-out infinite; }

    .hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: 44px; font-weight: 900;
      color: var(--purple); letter-spacing: -1.5px; margin-bottom: 10px;
    }

    .hero p { font-size: 16px; color: var(--muted); line-height: 1.7; max-width: 480px; margin: 0 auto 20px; }

    .badge-row { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
    .badge {
      padding: 5px 14px; border-radius: 50px; font-size: 12px; font-weight: 800;
      letter-spacing: 0.5px;
    }
    .badge-purple { background: #ede9fe; color: var(--purple); }
    .badge-pink   { background: #fce7f3; color: #be185d; }
    .badge-green  { background: #d1fae5; color: #065f46; }
    .badge-gold   { background: #fef3c7; color: #92400e; }

    /* ── Tabs ── */
    .tabs { display: flex; gap: 6px; margin-bottom: 20px; flex-wrap: wrap; }
    .tab {
      padding: 9px 20px; border-radius: 50px; font-size: 14px; font-weight: 800;
      cursor: pointer; border: 2px solid transparent;
      background: rgba(255,255,255,0.7); color: var(--muted);
      transition: all 0.2s; user-select: none;
    }
    .tab:hover { background: white; color: var(--purple); }
    .tab.active {
      background: linear-gradient(135deg, var(--purple-light), var(--pink));
      color: white; border-color: transparent;
      box-shadow: 0 6px 16px rgba(167,139,250,0.4);
    }

    /* ── Panels ── */
    .panel { display: none; }
    .panel.active { display: block; animation: fadeUp 0.3s ease; }

    /* ── Cards ── */
    .card {
      background: rgba(255,255,255,0.8);
      border-radius: 20px;
      border: 1.5px solid var(--border);
      padding: 28px 28px 24px;
      margin-bottom: 18px;
      box-shadow: 0 8px 24px rgba(160,120,210,0.08);
    }

    .card-title {
      font-family: 'Playfair Display', serif;
      font-size: 20px; font-weight: 700; color: var(--purple);
      margin-bottom: 14px; display: flex; align-items: center; gap: 10px;
    }

    .card-title .icon {
      width: 36px; height: 36px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center; font-size: 18px;
      background: var(--purple-pale); flex-shrink: 0;
    }

    p { color: #5a4880; font-size: 15px; line-height: 1.7; margin-bottom: 12px; }
    p:last-child { margin-bottom: 0; }

    /* ── File tree ── */
    .file-tree {
      background: #1e1438; border-radius: 14px; padding: 20px 22px;
      font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.9;
      margin: 12px 0;
    }
    .ft-folder { color: #a78bfa; font-weight: 600; }
    .ft-html   { color: #f472b6; }
    .ft-css    { color: #38bdf8; }
    .ft-js     { color: #fbbf24; }
    .ft-indent { padding-left: 22px; display: block; }
    .ft-comment { color: #6b5a8a; font-size: 11px; }

    /* ── Step list ── */
    .steps { display: flex; flex-direction: column; gap: 14px; }
    .step {
      display: flex; gap: 16px; align-items: flex-start;
      background: var(--purple-pale); border-radius: 14px; padding: 16px 18px;
      border: 1.5px solid rgba(167,139,250,0.2);
    }
    .step-num {
      width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg, var(--purple-light), var(--pink));
      color: white; font-weight: 900; font-size: 14px;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 10px rgba(167,139,250,0.4);
    }
    .step-body { flex: 1; }
    .step-title { font-weight: 800; color: var(--purple); font-size: 15px; margin-bottom: 4px; }
    .step-desc  { color: var(--muted); font-size: 14px; line-height: 1.6; }

    /* ── Feature grid ── */
    .feature-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
    .feature {
      background: var(--purple-pale); border-radius: 14px; padding: 18px 16px;
      border: 1.5px solid rgba(167,139,250,0.2);
      transition: transform 0.18s, box-shadow 0.18s;
    }
    .feature:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(160,120,210,0.15); }
    .feature-icon { font-size: 26px; margin-bottom: 8px; display: block; }
    .feature-name { font-weight: 800; color: var(--purple); font-size: 14px; margin-bottom: 4px; }
    .feature-desc { font-size: 13px; color: var(--muted); line-height: 1.5; }

    /* ── Screen flow ── */
    .screen-flow { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; justify-content: center; margin: 16px 0; }
    .screen-box {
      background: white; border-radius: 14px; padding: 14px 18px; text-align: center;
      border: 2px solid var(--border); min-width: 110px;
      box-shadow: 0 4px 12px rgba(160,120,210,0.1);
    }
    .screen-box .s-icon { font-size: 24px; display: block; margin-bottom: 4px; }
    .screen-box .s-name { font-size: 13px; font-weight: 800; color: var(--purple); }
    .screen-box .s-file { font-size: 11px; color: var(--muted); font-family: 'JetBrains Mono', monospace; margin-top: 2px; }
    .arrow { font-size: 20px; color: var(--purple-light); font-weight: 900; }

    /* ── Tile demo ── */
    .tile-demo { display: grid; grid-template-columns: repeat(3, 64px); gap: 7px; justify-content: center; margin: 16px auto; }
    .demo-tile {
      width: 64px; height: 64px; border-radius: 13px;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: #3a2b6b;
      box-shadow: 0 4px 10px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.6);
      cursor: pointer; user-select: none; transition: transform 0.14s;
      position: relative; overflow: hidden;
    }
    .demo-tile::after {
      content: ''; position: absolute; top:0; left:0; right:0; height:42%;
      background: linear-gradient(to bottom, rgba(255,255,255,0.45), transparent);
      border-radius: 13px 13px 0 0; pointer-events: none;
    }
    .demo-tile:hover { transform: scale(1.1) translateY(-2px); }
    .demo-tile:active { transform: scale(0.9); }
    .demo-tile.blank-tile { background: transparent !important; border: 2.5px dashed #ddd6fe; box-shadow: none; cursor: default; }
    .demo-tile.blank-tile:hover { transform: none; }
    .demo-tile.blank-tile::after { display: none; }
    .demo-note { text-align: center; font-size: 12px; color: var(--muted); font-style: italic; margin-top: 6px; }

    /* ── Highscore explainer ── */
    .hs-flow { display: flex; flex-direction: column; gap: 10px; }
    .hs-row {
      display: flex; align-items: center; gap: 14px;
      background: linear-gradient(135deg, #fff9e6, #ffedf5);
      border: 1.5px solid #fde68a; border-radius: 14px; padding: 14px 16px;
    }
    .hs-row-icon { font-size: 22px; flex-shrink: 0; }
    .hs-row-text { flex: 1; }
    .hs-row-title { font-weight: 800; color: #92400e; font-size: 14px; margin-bottom: 2px; }
    .hs-row-desc  { font-size: 13px; color: #b45309; line-height: 1.5; }

    /* ── Collapsible FAQ ── */
    .faq { display: flex; flex-direction: column; gap: 10px; }
    .faq-item { background: white; border-radius: 14px; border: 1.5px solid var(--border); overflow: hidden; }
    .faq-q {
      padding: 16px 20px; font-weight: 800; color: var(--purple); font-size: 14px;
      cursor: pointer; display: flex; justify-content: space-between; align-items: center;
      user-select: none; transition: background 0.15s;
    }
    .faq-q:hover { background: var(--purple-pale); }
    .faq-chevron { font-size: 12px; transition: transform 0.25s; color: var(--purple-light); font-weight: 900; }
    .faq-item.open .faq-chevron { transform: rotate(180deg); }
    .faq-a {
      max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s;
      font-size: 14px; color: var(--muted); line-height: 1.7; padding: 0 20px;
    }
    .faq-item.open .faq-a { max-height: 200px; padding: 0 20px 16px; }

    /* ── Scrollable code block ── */
    .code-block {
      background: #1e1438; border-radius: 12px; padding: 16px 18px;
      font-family: 'JetBrains Mono', monospace; font-size: 12.5px; line-height: 1.8;
      overflow-x: auto; margin: 10px 0; color: #e2d9f3;
    }
    .code-block .kw  { color: #c084fc; }
    .code-block .str { color: #86efac; }
    .code-block .cmt { color: #6b5a8a; font-style: italic; }
    .code-block .fn  { color: #67e8f9; }
    .code-block .num { color: #fbbf24; }

    /* ── CTA ── */
    .cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 24px; }
    .cta-btn {
      display: inline-block; text-decoration: none;
      padding: 13px 30px; border-radius: 50px; font-size: 15px; font-weight: 800;
      font-family: 'Nunito', sans-serif; cursor: pointer; border: none;
      transition: transform 0.16s, box-shadow 0.16s;
    }
    .cta-primary {
      background: linear-gradient(135deg, #a78bfa, #f472b6); color: white;
      box-shadow: 0 7px 20px rgba(167,139,250,0.42);
    }
    .cta-primary:hover { transform: scale(1.06) translateY(-2px); box-shadow: 0 12px 28px rgba(167,139,250,0.52); }
    .cta-secondary {
      background: white; color: var(--purple); border: 2px solid var(--border);
      box-shadow: 0 4px 12px rgba(160,120,210,0.1);
    }
    .cta-secondary:hover { background: var(--purple-pale); transform: scale(1.04); }

    /* ── Table ── */
    .info-table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .info-table th {
      background: var(--purple-pale); color: var(--purple); font-weight: 800;
      padding: 10px 14px; text-align: left; font-size: 12px; letter-spacing: 0.5px;
    }
    .info-table th:first-child { border-radius: 10px 0 0 0; }
    .info-table th:last-child  { border-radius: 0 10px 0 0; }
    .info-table td { padding: 10px 14px; border-bottom: 1px solid var(--border); color: #5a4880; vertical-align: top; }
    .info-table tr:last-child td { border-bottom: none; }
    .info-table tr:hover td { background: rgba(245,242,255,0.5); }
    .pill {
      display: inline-block; padding: 2px 10px; border-radius: 50px; font-size: 11px; font-weight: 800;
    }
    .pill-purple { background: #ede9fe; color: var(--purple); }
    .pill-pink   { background: #fce7f3; color: #be185d; }
    .pill-gold   { background: #fef3c7; color: #92400e; }

    /* ── Divider ── */
    .divider { height: 1.5px; background: linear-gradient(to right, transparent, var(--border), transparent); margin: 24px 0; }

    /* ── Animations ── */
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

    /* ── Responsive ── */
    @media(max-width:600px){
      .hero h1 { font-size: 32px; }
      .screen-flow { gap: 6px; }
      .screen-box { min-width: 90px; padding: 10px 12px; }
      .arrow { font-size: 16px; }
    }
  </style>
</head>
<body>
<div class="container">

  <!-- ░░ HERO ░░ -->
  <div class="hero">
    <span class="hero-emoji">🧩</span>
    <h1>8 Puzzle Game</h1>
    <p>A pastel-themed, browser-based sliding puzzle. No frameworks, no build steps — just three HTML files and pure fun.</p>
    <div class="badge-row">
      <span class="badge badge-purple">HTML · CSS · JS</span>
      <span class="badge badge-pink">3 Pages</span>
      <span class="badge badge-green">Zero Dependencies</span>
      <span class="badge badge-gold">Highscore Tracking</span>
    </div>
  </div>

  <!-- ░░ TABS ░░ -->
  <div class="tabs">
    <div class="tab active" data-tab="overview">📖 Overview</div>
    <div class="tab" data-tab="structure">🗂 Structure</div>
    <div class="tab" data-tab="howtoplay">🎮 How to Play</div>
    <div class="tab" data-tab="features">✨ Features</div>
    <div class="tab" data-tab="code">💻 Code</div>
    <div class="tab" data-tab="faq">❓ FAQ</div>
  </div>

  <!-- ░░ PANEL: OVERVIEW ░░ -->
  <div class="panel active" id="panel-overview">

    <div class="card">
      <div class="card-title"><span class="icon">🎯</span> What is this?</div>
      <p>The 8 Puzzle is a classic sliding tile game. You start with 8 numbered tiles scrambled in a 3×3 grid with one blank space. Your goal is to slide tiles into the correct order — as fast as possible and in as few moves as possible.</p>
      <p>This version is a clean, self-contained web app with pastel visuals, animated tiles, a live timer, move counter, and persistent highscore tracking.</p>
    </div>

    <div class="card">
      <div class="card-title"><span class="icon">🔀</span> Screen Flow</div>
      <div class="screen-flow">
        <div class="screen-box">
          <span class="s-icon">🏠</span>
          <div class="s-name">Home</div>
          <div class="s-file">index.html</div>
        </div>
        <div class="arrow">→</div>
        <div class="screen-box">
          <span class="s-icon">🎮</span>
          <div class="s-name">Play</div>
          <div class="s-file">play.html</div>
        </div>
        <div class="arrow">→</div>
        <div class="screen-box">
          <span class="s-icon">🏆</span>
          <div class="s-name">Win</div>
          <div class="s-file">win.html</div>
        </div>
        <div class="arrow">↩</div>
        <div class="screen-box">
          <span class="s-icon">🔄</span>
          <div class="s-name">Play Again</div>
          <div class="s-file">play.html</div>
        </div>
      </div>
      <p style="text-align:center;font-size:13px;color:var(--muted)">Each page links to the next. No JavaScript routing needed.</p>
    </div>

    <div class="card">
      <div class="card-title"><span class="icon">🚀</span> Quick Start</div>
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-body">
            <div class="step-title">Download all files</div>
            <div class="step-desc">Save <code>index.html</code>, <code>play.html</code>, and <code>win.html</code> into the same folder on your computer.</div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-body">
            <div class="step-title">Open index.html</div>
            <div class="step-desc">Double-click <code>index.html</code> to open it in any modern browser (Chrome, Firefox, Safari, Edge).</div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-body">
            <div class="step-title">Click ▶ Play Now</div>
            <div class="step-desc">A randomly shuffled, always-solvable puzzle generates instantly. Start sliding!</div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">4</div>
          <div class="step-body">
            <div class="step-title">Solve & beat your highscore</div>
            <div class="step-desc">When you reach the goal state, your best moves and time are saved automatically across sessions.</div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- ░░ PANEL: STRUCTURE ░░ -->
  <div class="panel" id="panel-structure">

    <div class="card">
      <div class="card-title"><span class="icon">📁</span> File Structure</div>
      <div class="file-tree">
        <span class="ft-folder">📁 8-puzzle/</span>
        <span class="ft-indent"><span class="ft-html">📄 index.html</span>  <span class="ft-comment">← Home screen (goal preview + highscore)</span></span>
        <span class="ft-indent"><span class="ft-html">📄 play.html</span>   <span class="ft-comment">← Game screen (puzzle grid + timer)</span></span>
        <span class="ft-indent"><span class="ft-html">📄 win.html</span>    <span class="ft-comment">← Win screen (stats + confetti)</span></span>
        <span class="ft-indent"><span class="ft-html">📄 README.html</span> <span class="ft-comment">← This file</span></span>
      </div>
      <p>All CSS is embedded inside each HTML file — <strong>no external stylesheet</strong> is needed, so nothing can fail to load when opened locally.</p>
      <p>Game logic (shuffling, move validation, timer) lives inline in <code>play.html</code>'s <code>&lt;script&gt;</code> tag.</p>
    </div>

    <div class="card">
      <div class="card-title"><span class="icon">📋</span> Page Responsibilities</div>
      <table class="info-table">
        <thead>
          <tr>
            <th>File</th>
            <th>Screen</th>
            <th>Key Responsibilities</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>index.html</code></td>
            <td><span class="pill pill-purple">Home</span></td>
            <td>Goal state grid preview, highscore display from <code>localStorage</code>, Play Now link</td>
          </tr>
          <tr>
            <td><code>play.html</code></td>
            <td><span class="pill pill-pink">Game</span></td>
            <td>Shuffle, render board, move validation, timer, detect win, write stats to <code>sessionStorage</code></td>
          </tr>
          <tr>
            <td><code>win.html</code></td>
            <td><span class="pill pill-gold">Win</span></td>
            <td>Read stats from <code>sessionStorage</code>, compare vs <code>localStorage</code>, save new highscore, confetti</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-title"><span class="icon">💾</span> Storage Strategy</div>
      <table class="info-table">
        <thead>
          <tr><th>Storage</th><th>Key</th><th>Value</th><th>Scope</th></tr>
        </thead>
        <tbody>
          <tr><td><code>sessionStorage</code></td><td><code>winMoves</code></td><td>Number of moves this game</td><td>Current tab session</td></tr>
          <tr><td><code>sessionStorage</code></td><td><code>winTime</code></td><td>Formatted time string (MM:SS)</td><td>Current tab session</td></tr>
          <tr><td><code>sessionStorage</code></td><td><code>winTimeSec</code></td><td>Raw seconds for comparison</td><td>Current tab session</td></tr>
          <tr><td><code>localStorage</code></td><td><code>hs_moves</code></td><td>Best move count ever</td><td>Persists across sessions</td></tr>
          <tr><td><code>localStorage</code></td><td><code>hs_time</code></td><td>Best time string ever</td><td>Persists across sessions</td></tr>
          <tr><td><code>localStorage</code></td><td><code>hs_time_sec</code></td><td>Best time in seconds for comparison</td><td>Persists across sessions</td></tr>
        </tbody>
      </table>
    </div>

  </div>

  <!-- ░░ PANEL: HOW TO PLAY ░░ -->
  <div class="panel" id="panel-howtoplay">

    <div class="card">
      <div class="card-title"><span class="icon">🎯</span> Live Demo Tile</div>
      <p style="text-align:center">Click a tile adjacent to the blank to move it:</p>
      <div class="tile-demo" id="demo-board"></div>
      <p class="demo-note" id="demo-note">Try sliding a tile into the blank space!</p>
    </div>

    <div class="card">
      <div class="card-title"><span class="icon">📜</span> Rules</div>
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-body">
            <div class="step-title">Click a tile to slide it</div>
            <div class="step-desc">Only tiles directly above, below, left, or right of the blank space can move. Diagonal moves are not allowed.</div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-body">
            <div class="step-title">Reach the goal state</div>
            <div class="step-desc">Arrange tiles so 1–8 read left-to-right, top-to-bottom, with the blank in the bottom-right corner.</div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-body">
            <div class="step-title">Minimise moves &amp; time</div>
            <div class="step-desc">A new highscore is set when you finish in fewer moves than your best. On a tie, faster time wins.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="icon">🏁</span> Goal State</div>
      <p>This is what you're aiming for:</p>
      <div class="tile-demo" style="pointer-events:none">
        <div class="demo-tile" style="background:#ffb3c1">1</div>
        <div class="demo-tile" style="background:#ffd6a5">2</div>
        <div class="demo-tile" style="background:#fdffb6">3</div>
        <div class="demo-tile" style="background:#caffbf">4</div>
        <div class="demo-tile" style="background:#9bf6ff">5</div>
        <div class="demo-tile" style="background:#bdb2ff">6</div>
        <div class="demo-tile" style="background:#ffc6ff">7</div>
        <div class="demo-tile" style="background:#a0c4ff">8</div>
        <div class="demo-tile blank-tile"></div>
      </div>
    </div>

  </div>

  <!-- ░░ PANEL: FEATURES ░░ -->
  <div class="panel" id="panel-features">

    <div class="card">
      <div class="card-title"><span class="icon">✨</span> Feature List</div>
      <div class="feature-grid">
        <div class="feature">
          <span class="feature-icon">🔀</span>
          <div class="feature-name">Solvable Shuffles</div>
          <div class="feature-desc">Only generates puzzles with an even number of inversions — always beatable, never frustrating.</div>
        </div>
        <div class="feature">
          <span class="feature-icon">⏱</span>
          <div class="feature-name">Live Timer</div>
          <div class="feature-desc">Starts the moment your puzzle loads. Stops exactly when you hit the goal state.</div>
        </div>
        <div class="feature">
          <span class="feature-icon">🎯</span>
          <div class="feature-name">Move Counter</div>
          <div class="feature-desc">Increments with every valid tile slide. Resets when you start a new puzzle.</div>
        </div>
        <div class="feature">
          <span class="feature-icon">🌟</span>
          <div class="feature-name">Highscore Tracking</div>
          <div class="feature-desc">Best moves &amp; time saved to <code>localStorage</code>. Persists even after closing the browser.</div>
        </div>
        <div class="feature">
          <span class="feature-icon">🎉</span>
          <div class="feature-name">Win Confetti</div>
          <div class="feature-desc">80 pastel confetti pieces rain down the screen when you solve the puzzle.</div>
        </div>
        <div class="feature">
          <span class="feature-icon">🎨</span>
          <div class="feature-name">Pastel Palette</div>
          <div class="feature-desc">Each tile has a unique soft pastel colour with a glass-shine overlay for a tactile feel.</div>
        </div>
        <div class="feature">
          <span class="feature-icon">📱</span>
          <div class="feature-name">Responsive</div>
          <div class="feature-desc">Grid and layout scale for mobile screens. Works on phones, tablets, and desktops.</div>
        </div>
        <div class="feature">
          <span class="feature-icon">📦</span>
          <div class="feature-name">Zero Dependencies</div>
          <div class="feature-desc">No npm, no build tools, no CDN libraries. Open locally from any file system.</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="icon">🏆</span> Highscore System</div>
      <div class="hs-flow">
        <div class="hs-row">
          <div class="hs-row-icon">🏠</div>
          <div class="hs-row-text">
            <div class="hs-row-title">Home Screen</div>
            <div class="hs-row-desc">Your best moves and time are shown before you even start playing. First visit shows "No highscore yet".</div>
          </div>
        </div>
        <div class="hs-row">
          <div class="hs-row-icon">✅</div>
          <div class="hs-row-text">
            <div class="hs-row-title">Win Screen — Comparison</div>
            <div class="hs-row-desc">Your current game is compared against your best. Previous best is always shown for reference.</div>
          </div>
        </div>
        <div class="hs-row">
          <div class="hs-row-icon">🌟</div>
          <div class="hs-row-text">
            <div class="hs-row-title">New Personal Best!</div>
            <div class="hs-row-desc">A golden badge appears if you beat the record. Fewer moves wins; ties broken by faster time.</div>
          </div>
        </div>
        <div class="hs-row">
          <div class="hs-row-icon">💾</div>
          <div class="hs-row-text">
            <div class="hs-row-title">Persistent Storage</div>
            <div class="hs-row-desc">Records saved to <code>localStorage</code> — they survive page refreshes, new tabs, and browser restarts.</div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- ░░ PANEL: CODE ░░ -->
  <div class="panel" id="panel-code">

    <div class="card">
      <div class="card-title"><span class="icon">🔀</span> Shuffle Algorithm</div>
      <p>The game only generates solvable puzzles by counting inversions — pairs of tiles that are out of order. A configuration is solvable if and only if the inversion count is even.</p>
      <div class="code-block">
<span class="kw">function</span> <span class="fn">countInversions</span>(arr) {
  <span class="kw">const</span> flat = arr.<span class="fn">filter</span>(x => x !== <span class="num">0</span>);
  <span class="kw">let</span> count = <span class="num">0</span>;
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; flat.length; i++)
    <span class="kw">for</span> (<span class="kw">let</span> j = i + <span class="num">1</span>; j &lt; flat.length; j++)
      <span class="kw">if</span> (flat[i] &gt; flat[j]) count++;
  <span class="kw">return</span> count;
}

<span class="kw">function</span> <span class="fn">shuffle</span>() {
  <span class="kw">let</span> arr;
  <span class="kw">do</span> {
    arr = [...GOAL].<span class="fn">sort</span>(() => Math.<span class="fn">random</span>() - <span class="num">0.5</span>);
  } <span class="kw">while</span> (
    arr.<span class="fn">join</span>() === GOAL.<span class="fn">join</span>() || <span class="cmt">// not already solved</span>
    <span class="fn">countInversions</span>(arr) % <span class="num">2</span> !== <span class="num">0</span>  <span class="cmt">// must be solvable</span>
  );
  <span class="kw">return</span> arr;
}
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="icon">🖱</span> Move Validation</div>
      <p>A tile can only slide if it's directly adjacent (not diagonal) to the blank. Row-boundary wrapping is prevented by checking that moving left/right doesn't cross a row boundary.</p>
      <div class="code-block">
<span class="kw">function</span> <span class="fn">move</span>(idx) {
  <span class="kw">const</span> bi   = tiles.<span class="fn">indexOf</span>(<span class="num">0</span>); <span class="cmt">// blank index</span>
  <span class="kw">const</span> row  = i => Math.<span class="fn">floor</span>(i / <span class="num">3</span>);

  <span class="kw">const</span> ok =
    idx === bi - <span class="num">3</span> || <span class="cmt">// tile above blank</span>
    idx === bi + <span class="num">3</span> || <span class="cmt">// tile below blank</span>
    (idx === bi - <span class="num">1</span> && <span class="fn">row</span>(idx) === <span class="fn">row</span>(bi)) || <span class="cmt">// left (same row!)</span>
    (idx === bi + <span class="num">1</span> && <span class="fn">row</span>(idx) === <span class="fn">row</span>(bi));   <span class="cmt">// right (same row!)</span>

  <span class="kw">if</span> (!ok) <span class="kw">return</span>; <span class="cmt">// ignore click</span>

  [tiles[bi], tiles[idx]] = [tiles[idx], tiles[bi]]; <span class="cmt">// swap</span>
  moves++;
}
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="icon">💾</span> Highscore Logic</div>
      <p>A new record is saved when the current game uses fewer moves, or equal moves in less time:</p>
      <div class="code-block">
<span class="kw">const</span> isNewRecord =
  !prevMoves ||               <span class="cmt">// first ever game</span>
  curMoves &lt; prevMoves ||    <span class="cmt">// fewer moves</span>
  (curMoves === prevMoves &&  <span class="cmt">// tie on moves...</span>
   curTimeSec &lt; prevTimeSec); <span class="cmt">// ...but faster</span>

<span class="kw">if</span> (isNewRecord) {
  localStorage.<span class="fn">setItem</span>(<span class="str">'hs_moves'</span>,    curMoves);
  localStorage.<span class="fn">setItem</span>(<span class="str">'hs_time'</span>,     curTimeStr);
  localStorage.<span class="fn">setItem</span>(<span class="str">'hs_time_sec'</span>, curTimeSec);
}
      </div>
    </div>

  </div>

  <!-- ░░ PANEL: FAQ ░░ -->
  <div class="panel" id="panel-faq">

    <div class="card">
      <div class="card-title"><span class="icon">❓</span> Frequently Asked Questions</div>
      <div class="faq">

        <div class="faq-item">
          <div class="faq-q">Why does every puzzle always have a solution? <span class="faq-chevron">▼</span></div>
          <div class="faq-a">The shuffle function keeps regenerating until it finds a configuration with an even number of inversions — the mathematical condition for solvability in a 3×3 puzzle.</div>
        </div>

        <div class="faq-item">
          <div class="faq-q">My highscore disappeared after clearing my browser data. Why? <span class="faq-chevron">▼</span></div>
          <div class="faq-a">The highscore is saved in <code>localStorage</code>, which is tied to your browser's local storage for that file path. Clearing browser data or using a private/incognito window will reset it.</div>
        </div>

        <div class="faq-item">
          <div class="faq-q">Can I play on mobile? <span class="faq-chevron">▼</span></div>
          <div class="faq-a">Yes! The layout is responsive and tiles respond to touch events. Tap any tile adjacent to the blank space to slide it.</div>
        </div>

        <div class="faq-item">
          <div class="faq-q">How is "better" defined for the highscore? <span class="faq-chevron">▼</span></div>
          <div class="faq-a">Fewer moves is always better. If you match your best move count, a faster time will still earn the "New Personal Best" badge and update the record.</div>
        </div>

        <div class="faq-item">
          <div class="faq-q">Do I need an internet connection? <span class="faq-chevron">▼</span></div>
          <div class="faq-a">Only for loading the Google Fonts (Nunito & Playfair Display). The game logic works fully offline — fonts will fall back to system serif/sans-serif if unavailable.</div>
        </div>

        <div class="faq-item">
          <div class="faq-q">Can I reset my highscore? <span class="faq-chevron">▼</span></div>
          <div class="faq-a">Open your browser's developer console and run: <code>localStorage.removeItem('hs_moves'); localStorage.removeItem('hs_time'); localStorage.removeItem('hs_time_sec');</code> — then reload the home page.</div>
        </div>

        <div class="faq-item">
          <div class="faq-q">What browsers are supported? <span class="faq-chevron">▼</span></div>
          <div class="faq-a">Any modern browser: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. Uses CSS Grid, CSS custom properties, and ES6 — no polyfills required.</div>
        </div>

      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="icon">🚀</span> Ready to play?</div>
      <p style="text-align:center">Open the game and challenge your best score!</p>
      <div class="cta-row">
        <a href="index.html" class="cta-btn cta-primary">🏠 Go to Home</a>
        <a href="play.html" class="cta-btn cta-secondary">▶ Jump into Game</a>
      </div>
    </div>

  </div>

</div><!-- /container -->

<script>
  /* ── Tab switching ── */
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
    });
  });

  /* ── FAQ collapsibles ── */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ── Live demo board ── */
  const COLORS = { 1:'#ffb3c1',2:'#ffd6a5',3:'#fdffb6',4:'#caffbf',5:'#9bf6ff',6:'#bdb2ff',7:'#ffc6ff',8:'#a0c4ff' };
  let demoTiles = [1,2,3,4,5,6,7,0,8]; // slightly shuffled
  let demoMoves = 0;

  function renderDemo() {
    const board = document.getElementById('demo-board');
    if (!board) return;
    board.innerHTML = '';
    demoTiles.forEach((n, i) => {
      const el = document.createElement('div');
      el.className = 'demo-tile' + (n === 0 ? ' blank-tile' : '');
      el.textContent = n || '';
      if (n) el.style.background = COLORS[n];
      el.addEventListener('click', () => {
        const bi = demoTiles.indexOf(0);
        const row = x => Math.floor(x / 3);
        const ok =
          i === bi-3 || i === bi+3 ||
          (i === bi-1 && row(i) === row(bi)) ||
          (i === bi+1 && row(i) === row(bi));
        if (!ok) return;
        [demoTiles[bi], demoTiles[i]] = [demoTiles[i], demoTiles[bi]];
        demoMoves++;
        renderDemo();
        const note = document.getElementById('demo-note');
        if (demoTiles.join() === '1,2,3,4,5,6,7,8,0') {
          note.textContent = '🎉 You solved the demo! Refresh to reset.';
        } else {
          note.textContent = `Move ${demoMoves} — keep going!`;
        }
      });
      board.appendChild(el);
    });
  }
  renderDemo();
</script>
</body>
</html>
