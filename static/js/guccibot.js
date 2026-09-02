// Marquee
const items = [
  'GBR6','Frame Perfect','Silicate Engine','17 Themes','4 Disciplines',
  'Brrr.','TPS 240','Backwards Stepping','SSB Fix','Lock Delta',
  'Type C Delta','Autoclicker','Noclip','Macro Diff','Brrr.',
  '.brrr','.toosii','.ja','.giddey','.bam','.sexyy','.juice','.butler',
  'Jupiter My Favourite Trainer','Click Deviation','Synced Music','BIG BRRRR','Brrr.',
  'Trainer Tab','Any Macro','Manual Frame Windows','140 BPM','Brrr.',
  'Compact Mode','JuiceBot','ButlerBot','Playoff Jimmy','Brrr.',
  'Click Indicators','Video Mode','RomoBot','GrizzleyBot','BrrrBot','Custom Themes','Brrr.',
];

// Shared across every page now that this is a real multi-page site
// (site/, not one guccibot.html) -- guarded so pages without a
// marquee (e.g. the changelog) don't error on the missing element.
const track = document.getElementById('marquee');
if (track) {
  const html = items.map(t =>
    `<span class="marquee-item">${t}</span><span class="marquee-item marquee-sep">·</span>`
  ).join('');
  track.innerHTML = html + html;
}

// Scroll reveal
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Stagger reveal children
document.querySelectorAll('.feature-grid.reveal, .themes-grid.reveal, .credits-grid.reveal, .changelog-list.reveal').forEach(grid => {
  [...grid.children].forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.08}s`;
  });
});

// Gag, Nigel's ask: clicking anywhere that ISN'T a real interactive
// control bounces the whole page to /dropped/ -- just a fullscreen
// video, no controls, nothing else. Deliberately scoped to real
// <a>/<button>/form controls only, so every actual link and button
// (nav, download, changelog, credits links) keeps working normally --
// but things that only LOOK clickable (theme cards, feature cards,
// credit cards, disc rows -- styled with a pointer cursor but no real
// destination) count as "not a button or anything" and trigger it,
// which is the whole bit.
// Guarded to skip on /dropped/ itself so the gag page doesn't gag itself.
if (!location.pathname.startsWith('/dropped')) {
  document.addEventListener('click', (e) => {
    const real = e.target.closest('a, button, input, textarea, select, label, [role="button"], [onclick]');
    if (!real) {
      window.location.href = '/dropped/';
    }
  });
}
