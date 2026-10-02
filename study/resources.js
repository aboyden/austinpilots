/* Sticky reference-library bar for the IFR course and ACS pages.
   One file, loaded by every page under /study/. Edit the links here. */
(function () {
  if (window.__ifrRefBar) return;
  window.__ifrRefBar = true;

  var LINKS = [
    { label: 'IFR ACS', title: 'Instrument Rating Airplane ACS (FAA-S-ACS-8)',
      href: 'https://www.faa.gov/training_testing/testing/acs/instrument_rating_airplane_acs_8.pdf' },
    { label: 'FAR/AIM', title: '2027 FAR/AIM and free official sources', menu: [
      { label: 'FARs: 14 CFR Part 91 (eCFR)', href: 'https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-91' },
      { label: 'AIM (FAA, online)', href: 'https://www.faa.gov/air_traffic/publications/atpubs/aim_html/' },
      { label: 'Buy the 2027 FAR/AIM (Sporty’s)', href: 'https://www.sportys.com/far-aim-2027-asa.html' }
    ] },
    { label: 'IFH', title: 'Instrument Flying Handbook (FAA-H-8083-15B)',
      href: 'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/FAA-H-8083-15B.pdf' },
    { label: 'IPH', title: 'Instrument Procedures Handbook (FAA-H-8083-16B)',
      href: 'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/instrument_procedures_handbook/FAA-H-8083-16B.pdf' }
  ];

  var css = '' +
    '#ifr-refbar{position:fixed;left:0;right:0;bottom:0;z-index:2000;display:flex;justify-content:center;align-items:center;gap:8px;' +
    'padding:8px 12px calc(8px + env(safe-area-inset-bottom));background:var(--nav-bg,rgba(15,17,23,.96));' +
    'border-top:1px solid var(--border,#2e3348);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);' +
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;}' +
    '#ifr-refbar .rb-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted,#8892aa);margin-right:4px;}' +
    '#ifr-refbar .rb-btn{position:relative;display:inline-flex;align-items:center;gap:4px;padding:6px 14px;border-radius:999px;' +
    'border:1.5px solid var(--border,#2e3348);background:var(--surface2,#22263a);color:var(--text,#e2e8f0);font:inherit;font-size:13px;font-weight:700;' +
    'text-decoration:none;cursor:pointer;white-space:nowrap;}' +
    '#ifr-refbar .rb-btn:hover,#ifr-refbar .rb-btn:focus-visible{border-color:var(--accent,#4f8ef7);color:var(--accent,#4f8ef7);outline:none;}' +
    '#ifr-refbar .rb-wrap{position:relative;}' +
    '#ifr-refbar .rb-menu{position:absolute;bottom:calc(100% + 10px);left:50%;transform:translateX(-50%);min-width:250px;display:none;' +
    'background:var(--surface,#1a1d27);border:1px solid var(--border,#2e3348);border-radius:12px;padding:6px;box-shadow:0 8px 30px rgba(0,0,0,.35);}' +
    '#ifr-refbar .rb-menu.open{display:block;}' +
    '#ifr-refbar .rb-menu a{display:block;padding:9px 12px;border-radius:8px;color:var(--text,#e2e8f0);text-decoration:none;font-size:13.5px;font-weight:600;}' +
    '#ifr-refbar .rb-menu a:hover,#ifr-refbar .rb-menu a:focus-visible{background:rgba(127,127,127,.15);color:var(--accent,#4f8ef7);outline:none;}' +
    '@media (max-width:520px){#ifr-refbar .rb-label{display:none;}#ifr-refbar{gap:6px;padding-left:8px;padding-right:8px;}#ifr-refbar .rb-btn{padding:6px 11px;}' +
    '#ifr-refbar .rb-menu{left:auto;right:-60px;transform:none;min-width:230px;}}' +
    '@media print{#ifr-refbar{display:none;}}';

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.id = 'ifr-refbar';
    bar.setAttribute('role', 'navigation');
    bar.setAttribute('aria-label', 'Reference library');

    var label = document.createElement('span');
    label.className = 'rb-label';
    label.textContent = 'Reference';
    bar.appendChild(label);

    var openMenu = null;
    function closeMenu() { if (openMenu) { openMenu.menu.classList.remove('open'); openMenu.btn.setAttribute('aria-expanded', 'false'); openMenu = null; } }

    LINKS.forEach(function (l) {
      if (!l.menu) {
        var a = document.createElement('a');
        a.className = 'rb-btn'; a.href = l.href; a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.title = l.title; a.textContent = l.label;
        bar.appendChild(a);
        return;
      }
      var wrap = document.createElement('span'); wrap.className = 'rb-wrap';
      var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'rb-btn';
      btn.title = l.title; btn.setAttribute('aria-haspopup', 'true'); btn.setAttribute('aria-expanded', 'false');
      btn.textContent = l.label + ' ▴';
      var menu = document.createElement('div'); menu.className = 'rb-menu';
      l.menu.forEach(function (m) {
        var a = document.createElement('a'); a.href = m.href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = m.label;
        menu.appendChild(a);
      });
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var wasOpen = openMenu && openMenu.menu === menu;
        closeMenu();
        if (!wasOpen) { menu.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); openMenu = { menu: menu, btn: btn }; }
      });
      wrap.appendChild(btn); wrap.appendChild(menu); bar.appendChild(wrap);
    });

    document.addEventListener('click', closeMenu);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    document.body.appendChild(bar);

    // keep the last of the page clear of the bar
    var pad = parseInt(getComputedStyle(document.body).paddingBottom, 10) || 0;
    document.body.style.paddingBottom = (pad + bar.offsetHeight) + 'px';
  }

  if (document.body) init(); else document.addEventListener('DOMContentLoaded', init);
})();
