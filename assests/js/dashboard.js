/* ══════════════════════════════════════════════════
   CORPERCOMPASS — Navigation JS  (nav-cc pattern)
══════════════════════════════════════════════════ */

const hamburger       = document.getElementById('hamburger');
const sideMenu        = document.getElementById('sideMenu');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');

/* ── Open / Close helpers ──────────────────────── */
function openSidebar() {
  sideMenu.classList.add('open');
  sidebarBackdrop.classList.add('visible');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.classList.add('sidebar-open');   /* locks page scroll */
}

function closeSidebar() {
  sideMenu.classList.remove('open');
  sidebarBackdrop.classList.remove('visible');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('sidebar-open');
}

/* ── Hamburger click ───────────────────────────── */
hamburger.addEventListener('click', () => {
  sideMenu.classList.contains('open') ? closeSidebar() : openSidebar();
});

/* ── Backdrop tap → close ──────────────────────── */
sidebarBackdrop.addEventListener('click', closeSidebar);

/* ── Escape key → close ────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSidebar();
});

/* ── Swipe left on sidebar → close ────────────── */
let touchStartX = 0;
sideMenu.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

sideMenu.addEventListener('touchend', e => {
  if (touchStartX - e.changedTouches[0].clientX > 60) closeSidebar();
}, { passive: true });

/* ── Auto-close when resizing to desktop ─────── */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeSidebar();
});

/* ── Sidebar nav links ─────────────────────────── */
document.querySelectorAll('.side-menu a').forEach(link => {
  link.addEventListener('click', function (e) {
    /* Prevent navigation for # demo links */
    if (this.getAttribute('href') === '#') e.preventDefault();

    /* Update active state */
    document.querySelectorAll('.side-menu a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    /* Close drawer on mobile after selection */
    if (window.innerWidth <= 768) closeSidebar();
  });
});