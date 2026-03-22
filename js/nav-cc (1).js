const hamburger       = document.getElementById('hamburger');
const sideMenu        = document.getElementById('sideMenu');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');

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