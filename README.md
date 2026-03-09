# 🧩 8 Puzzle Game

> A pastel-themed, browser-based sliding tile puzzle — no frameworks, no build steps, no dependencies. Just three HTML files and pure fun.

![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-purple?style=flat-square)

---

## 📖 Overview

The **8 Puzzle** is a classic sliding tile game. You start with 8 numbered tiles scrambled in a 3×3 grid with one blank space. Your goal is to slide tiles into the correct order — as fast as possible and in as few moves as possible.

```
Goal State:

┌───┬───┬───┐
│ 1 │ 2 │ 3 │
├───┼───┼───┤
│ 4 │ 5 │ 6 │
├───┼───┼───┤
│ 7 │ 8 │   │
└───┴───┴───┘
```

---

## 🚀 Quick Start

1. **Download** `index.html`, `play.html`, and `win.html` into the same folder
2. **Open** `index.html` in any modern browser (Chrome, Firefox, Safari, Edge)
3. **Click** ▶ Play Now — a randomly shuffled, always-solvable puzzle is generated
4. **Solve** it and chase your personal best!

> ⚡ No install, no terminal, no build step required.

---

## 🗂 File Structure

```
📁 8-puzzle/
├── 📄 index.html     ← Home screen (goal preview + highscore display)
├── 📄 play.html      ← Game screen (puzzle grid + timer + move counter)
├── 📄 win.html       ← Win screen (stats + confetti + highscore compare)
└── 📄 README.md      ← This file
```

> All CSS is embedded inside each HTML file — no external stylesheet needed, so nothing can fail to load when opened locally. Game logic lives inline in `play.html`'s `<script>` tag.

---

## 🔀 Screen Flow

```
┌─────────────┐     ▶ Play Now     ┌─────────────┐    Puzzle Solved    ┌─────────────┐
│  index.html │ ─────────────────► │  play.html  │ ──────────────────► │  win.html   │
│  Home       │                    │  Game       │                      │  Win        │
└─────────────┘                    └─────────────┘                      └─────────────┘
       ▲                                  ▲                                     │
       │         ← Home                  │           🔄 Play Again              │
       └─────────────────────────────────┴─────────────────────────────────────┘
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔀 **Solvable Shuffles** | Only generates puzzles with an even inversion count — always beatable |
| ⏱ **Live Timer** | Starts when the puzzle loads, stops exactly when you win |
| 🎯 **Move Counter** | Increments on every valid tile slide, resets on new puzzle |
| 🌟 **Highscore Tracking** | Best moves & time saved to `localStorage` — persists across sessions |
| 🎉 **Win Confetti** | 80 pastel confetti pieces rain down when you solve the puzzle |
| 🎨 **Pastel Palette** | Each tile has a unique soft pastel colour with a glass-shine overlay |
| 📱 **Responsive** | Grid and layout scale for mobile, tablet, and desktop |
| 📦 **Zero Dependencies** | No npm, no CDN libraries — open directly from any file system |

---

## 🎮 How to Play

1. **Click a tile** adjacent (up, down, left, or right) to the blank space to slide it
2. **Diagonal moves are not allowed** — only the 4 direct neighbours can move
3. **Arrange tiles 1–8** left-to-right, top-to-bottom, blank in bottom-right
4. **Minimise your moves and time** to beat your personal highscore

---

## 🏆 Highscore System

The highscore system tracks your **best moves** and **best time** using `localStorage`.

```
Better score = fewer moves
Tie on moves = faster time wins
```

**How it works across screens:**

- **Home (`index.html`)** — Shows your previous best before you start playing. Displays "No highscore yet" on first visit.
- **Win (`win.html`)** — Compares your current game against your best. Previous best is always shown for reference.
- **New Record** — A golden ✨ "New Personal Best!" badge appears if you beat the record. New score is saved automatically.

**Storage keys used:**

| Key | Value | Storage |
|---|---|---|
| `hs_moves` | Best move count | `localStorage` |
| `hs_time` | Best time (MM:SS) | `localStorage` |
| `hs_time_sec` | Best time in seconds | `localStorage` |
| `winMoves` | Current game moves | `sessionStorage` |
| `winTime` | Current game time | `sessionStorage` |
| `winTimeSec` | Current game seconds | `sessionStorage` |

---

## 💻 Key Algorithms

### Solvable Shuffle

A puzzle is solvable if and only if it has an **even number of inversions** (pairs of tiles out of order). The shuffle keeps retrying until this condition is met:

```js
function countInversions(arr) {
  const flat = arr.filter(x => x !== 0);
  let count = 0;
  for (let i = 0; i < flat.length; i++)
    for (let j = i + 1; j < flat.length; j++)
      if (flat[i] > flat[j]) count++;
  return count;
}

function shuffle() {
  let arr;
  do {
    arr = [...GOAL].sort(() => Math.random() - 0.5);
  } while (arr.join() === GOAL.join() || countInversions(arr) % 2 !== 0);
  return arr;
}
```

### Move Validation

Prevents diagonal moves and row-wrap bugs by checking the clicked tile is directly adjacent to the blank:

```js
function move(idx) {
  const bi  = tiles.indexOf(0);          // blank index
  const row = i => Math.floor(i / 3);

  const ok =
    idx === bi - 3 ||                              // tile above
    idx === bi + 3 ||                              // tile below
    (idx === bi - 1 && row(idx) === row(bi)) ||    // left (same row only)
    (idx === bi + 1 && row(idx) === row(bi));       // right (same row only)

  if (!ok) return;
  [tiles[bi], tiles[idx]] = [tiles[idx], tiles[bi]];
  moves++;
}
```

### Highscore Comparison

```js
const isNewRecord =
  !prevMoves ||                                   // first ever game
  curMoves < parseInt(prevMoves) ||              // fewer moves
  (curMoves === parseInt(prevMoves) &&           // tie on moves...
   curTimeSec < prevTimeSec);                    // ...but faster time

if (isNewRecord) {
  localStorage.setItem('hs_moves',    curMoves);
  localStorage.setItem('hs_time',     curTimeStr);
  localStorage.setItem('hs_time_sec', curTimeSec);
}
```

---

## 📋 Page Responsibilities

| File | Screen | Key Responsibilities |
|---|---|---|
| `index.html` | 🏠 Home | Goal state grid preview, highscore from `localStorage`, Play Now link |
| `play.html` | 🎮 Game | Shuffle, render board, move validation, timer, detect win, write to `sessionStorage` |
| `win.html` | 🏆 Win | Read `sessionStorage`, compare vs `localStorage`, save new highscore, confetti |

---

## ❓ FAQ

<details>
<summary><strong>Why does every puzzle always have a solution?</strong></summary>

The shuffle function keeps regenerating until it finds a configuration with an even number of inversions — the mathematical condition for solvability in a 3×3 sliding puzzle.
</details>

<details>
<summary><strong>My highscore disappeared. Why?</strong></summary>

The highscore is saved in `localStorage`, which is tied to your browser's local storage for that file path. Clearing browser data or using a private/incognito window will reset it.
</details>

<details>
<summary><strong>Can I play on mobile?</strong></summary>

Yes! The layout is responsive and tiles respond to touch events. Tap any tile adjacent to the blank space to slide it.
</details>

<details>
<summary><strong>How do I reset my highscore?</strong></summary>

Open your browser's developer console (F12) and run:

```js
localStorage.removeItem('hs_moves');
localStorage.removeItem('hs_time');
localStorage.removeItem('hs_time_sec');
```

Then reload the home page.
</details>

<details>
<summary><strong>Do I need an internet connection?</strong></summary>

Only for loading Google Fonts (Nunito & Playfair Display). The game logic works fully offline — fonts will gracefully fall back to system fonts if unavailable.
</details>

<details>
<summary><strong>What browsers are supported?</strong></summary>

Any modern browser: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. Uses CSS Grid, CSS custom properties, and ES6 — no polyfills required.
</details>

---

## 🎨 Design

- **Fonts:** Playfair Display (tile numbers & headings) + Nunito (UI text)
- **Palette:** Soft pastel per tile — pink `#ffb3c1`, peach `#ffd6a5`, yellow `#fdffb6`, mint `#caffbf`, sky `#9bf6ff`, lavender `#bdb2ff`, lilac `#ffc6ff`, blue `#a0c4ff`
- **Background:** Layered radial gradients for a dreamy frosted-glass aesthetic
- **Animations:** Float, tile-slide spring, confetti fall, win-card pop-in

---

## 📄 License

MIT — free to use, modify, and distribute.

---

<div align="center">
  Made with 🧩 and pastel colours
</div>
