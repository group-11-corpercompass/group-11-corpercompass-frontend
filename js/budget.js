/* STATE*/
const ALLOWANCE = 77000;

const expenses = [
  { name: 'Accommodation', amount: 17500 },
  { name: 'Food',          amount:  6500 },
  { name: 'Transportation',amount:  3200 },
  { name: 'Airtime/Data',  amount:  1300 },
  { name: 'Miscellaneous', amount:   900 },
];

/* DOM REFERENCES */
const progressBar     = document.getElementById('progressBar');
const progressMeta    = document.getElementById('progressMeta');
const expenseList     = document.getElementById('expenseList');
const overlay         = document.getElementById('overlay');
const addForm         = document.getElementById('addForm');
const hamburger       = document.getElementById('hamburger');
const sideMenu        = document.getElementById('sideMenu');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');

/* HELPERS */

/** Format a number as Nigerian Naira */
const fmt = n => '₦' + n.toLocaleString('en-NG');

/** Sum all expense amounts */
function getTotal() {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

/* ══════════════════════════════════════════════════
   RENDER — redraws progress bar + expense list
══════════════════════════════════════════════════ */
function render() {
  const total = getTotal();
  const pct   = Math.min((total / ALLOWANCE) * 100, 100);

  /* ── Progress bar ── */
  progressBar.style.width = pct + '%';
  progressBar
    .closest('[role="progressbar"]')
    .setAttribute('aria-valuenow', Math.round(pct));

  /* ── Spent / Left labels ── */
  progressMeta.innerHTML = `
    <span>Spent: ${fmt(total)}</span>
    <span>Left: ${fmt(Math.max(ALLOWANCE - total, 0))}</span>
  `;

  /* ── Expense rows ── */
  expenseList.innerHTML = '';
  expenses.forEach((exp, i) => {
    const li = document.createElement('li');
    li.className = 'expense-row';
    li.style.animationDelay = (i * 0.05 + 0.04) + 's';
    li.innerHTML = `
      <span class="expense-name">${exp.name}</span>
      <span class="expense-amount">${fmt(exp.amount)}</span>
    `;
    expenseList.appendChild(li);
  });
}

/* HAMBURGER — toggles the side menu on mobile ONLY */
function openSidebar() {
  sideMenu.classList.add('open');
  sidebarBackdrop.classList.add('visible');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';   /* lock page scroll */
}

function closeSidebar() {
  sideMenu.classList.remove('open');
  sidebarBackdrop.classList.remove('visible');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/* Toggle on hamburger click */
hamburger.addEventListener('click', () => {
  sideMenu.classList.contains('open') ? closeSidebar() : openSidebar();
});

/* Close when backdrop is tapped */
sidebarBackdrop.addEventListener('click', closeSidebar);

/* Close on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeSidebar();
    closeModal();
  }
});

/* Auto-close when viewport returns to desktop width */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeSidebar();
});

/* ══════════════════════════════════════════════════
   SIDEBAR NAV — active state + close on mobile tap
══════════════════════════════════════════════════ */
document.querySelectorAll('.side-menu a').forEach(link => {
  link.addEventListener('click', function (e) {
    /* Prevent navigation for # links (demo only) */
    if (this.getAttribute('href') === '#') e.preventDefault();

    /* Swap active class */
    document.querySelectorAll('.side-menu a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    /* On mobile, close the drawer after selection */
    if (window.innerWidth <= 768) closeSidebar();
  });
});

/* ══════════════════════════════════════════════════
   MODAL — open / close
══════════════════════════════════════════════════ */
function openModal() {
  /* Always restore scroll before opening — sidebar may have locked it */
  document.body.style.overflow = 'hidden';
  overlay.classList.add('open');
  /* Small delay so the overlay is painted before focusing the input,
     prevents iOS from scrolling the page behind the modal */
  setTimeout(() => document.getElementById('fName').focus(), 50);
}

function closeModal() {
  overlay.classList.remove('open');
  addForm.reset();
  /* Restore body scroll (modal locks it; sidebar also locks it — only
     restore if sidebar is also closed) */
  if (!sideMenu.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

document.getElementById('openModalBtn').addEventListener('click', openModal);
document.getElementById('closeModalBtn').addEventListener('click', closeModal);

/* Close on backdrop click — use touchend as well for mobile reliability */
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});
overlay.addEventListener('touchend', e => {
  if (e.target === overlay) closeModal();
});

/* ══════════════════════════════════════════════════
   FORM SUBMIT — add a new expense entry
══════════════════════════════════════════════════ */
addForm.addEventListener('submit', e => {
  e.preventDefault();

  const name   = document.getElementById('fName').value.trim();
  const amount = parseInt(document.getElementById('fAmount').value, 10);

  if (!name || !amount || amount < 1) {
    document.getElementById('fName').focus();
    return;
  }

  expenses.push({ name, amount });
  render();
  closeModal();
});

/* INIT — animate progress bar on first paint */
requestAnimationFrame(() => setTimeout(render, 80));