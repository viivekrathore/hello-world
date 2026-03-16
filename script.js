// =====================
//  CricketHub – script.js
// =====================

// ---- Navbar mobile toggle ----
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${section.id}`);
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ---- Score Ticker duplication for seamless loop ----
const track = document.querySelector('.ticker-track');
if (track) {
  track.innerHTML += track.innerHTML; // duplicate for seamless loop
}

// ---- Rankings tabs ----
const tabBtns = document.querySelectorAll('.tab-btn');
const tableRows = document.querySelectorAll('.ranking-table tbody tr');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const format = btn.dataset.format;
    tableRows.forEach(row => {
      row.style.display = row.dataset.format === format ? '' : 'none';
    });
  });
});

// ---- Live score "pulse" update simulation ----
// Updates the score of the live match card every 8 seconds to simulate live data
const liveScores = [
  { team: 'IND', score: '187/3', overs: '(32.2)' },
  { team: 'IND', score: '195/4', overs: '(34.1)' },
  { team: 'IND', score: '204/4', overs: '(36.0)' },
  { team: 'IND', score: '213/5', overs: '(38.3)' },
  { team: 'IND', score: '228/5', overs: '(41.2)' },
];

let liveIdx = 0;
const liveCard = document.querySelector('.score-card[data-live="true"]');
if (liveCard) {
  const scoreEl = liveCard.querySelector('.live-score');
  const oversEl = liveCard.querySelector('.live-overs');

  setInterval(() => {
    liveIdx = (liveIdx + 1) % liveScores.length;
    if (scoreEl) scoreEl.textContent = liveScores[liveIdx].score;
    if (oversEl) oversEl.textContent = liveScores[liveIdx].overs;
    // Flash effect
    scoreEl?.classList.add('updated');
    setTimeout(() => scoreEl?.classList.remove('updated'), 600);
  }, 8000);
}
