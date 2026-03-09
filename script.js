/* ══════════════════════════════════════════
   8 PUZZLE — script.js  (used by play.html)
══════════════════════════════════════════ */

const GOAL = [1, 2, 3, 4, 5, 6, 7, 8, 0];

const COLORS = {
  1: '#ffb3c1',
  2: '#ffd6a5',
  3: '#fdffb6',
  4: '#caffbf',
  5: '#9bf6ff',
  6: '#bdb2ff',
  7: '#ffc6ff',
  8: '#a0c4ff',
};

// ── State ──
let tiles   = [];
let moves   = 0;
let seconds = 0;
let timerID = null;

// ── DOM ──
const boardEl     = document.getElementById('board');
const moveCountEl = document.getElementById('move-count');
const timerEl     = document.getElementById('timer');
const newBtn      = document.getElementById('btn-new');

// ── Helpers ──
const fmt = s =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

function countInv(arr) {
  const a = arr.filter(x => x !== 0);
  let c = 0;
  for (let i = 0; i < a.length; i++)
    for (let j = i + 1; j < a.length; j++)
      if (a[i] > a[j]) c++;
  return c;
}

function solvable(arr) { return countInv(arr) % 2 === 0; }

function shuffle() {
  let a;
  do { a = [...GOAL].sort(() => Math.random() - 0.5); }
  while (a.join() === GOAL.join() || !solvable(a));
  return a;
}

function isWon() { return tiles.join() === GOAL.join(); }

// ── Timer ──
function startTimer() {
  clearInterval(timerID);
  timerID = setInterval(() => { seconds++; timerEl.textContent = fmt(seconds); }, 1000);
}

function stopTimer() { clearInterval(timerID); }

// ── Render ──
function render() {
  boardEl.innerHTML = '';
  tiles.forEach((n, i) => {
    const el = document.createElement('div');
    el.className = 'tile' + (n === 0 ? ' blank' : '');
    el.textContent = n || '';
    if (n) el.style.background = COLORS[n];
    el.addEventListener('click', () => handleClick(i));
    boardEl.appendChild(el);
  });
}

// ── Move ──
function handleClick(idx) {
  const bi = tiles.indexOf(0);
  const row = i => Math.floor(i / 3);

  const ok =
    idx === bi - 3 ||
    idx === bi + 3 ||
    (idx === bi - 1 && row(idx) === row(bi)) ||
    (idx === bi + 1 && row(idx) === row(bi));

  if (!ok) return;

  [tiles[bi], tiles[idx]] = [tiles[idx], tiles[bi]];
  moves++;
  moveCountEl.textContent = moves;
  render();

  // Animate the tile that just moved (now sits at bi)
  const movedEl = boardEl.children[bi];
  if (movedEl) {
    movedEl.classList.add('slide');
    movedEl.addEventListener('animationend', () => movedEl.classList.remove('slide'), { once: true });
  }

  if (isWon()) {
    stopTimer();
    sessionStorage.setItem('winMoves', moves);
    sessionStorage.setItem('winTime', fmt(seconds));
    setTimeout(() => { window.location.href = 'win.html'; }, 350);
  }
}

// ── New game ──
function newGame() {
  stopTimer();
  tiles   = shuffle();
  moves   = 0;
  seconds = 0;
  moveCountEl.textContent = '0';
  timerEl.textContent     = '00:00';
  render();
  startTimer();
}

newBtn.addEventListener('click', newGame);

// ── Boot ──
newGame();