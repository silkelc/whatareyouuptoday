/* Custom cursor: a circle that trails the pointer and grows over interactive
   elements. It is white with mix-blend-mode: difference, which renders it black
   on the white page and knocks out whatever it covers.
   Difference inverts, and inverting the accent yellow gives blue. So over the
   brand's yellow surfaces the dot drops the blend, turns solid black and stops
   growing: the yellow underneath is covered for a moment, never recoloured.
   Desktop pointers only, no-op on touch and without JS. */
(function () {
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  // Forced-colors / high-contrast users have deliberately taken over the
  // palette and usually the system cursor with it. Leave theirs alone.
  if (window.matchMedia('(forced-colors: active)').matches) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HOVER_TARGETS = 'a, button, [role="button"]';
  // Buttons and filter chips invert to black on hover, which is hover feedback
  // enough. Growing the dot on top of that would only cover the label. The logo
  // is here too: a 72px disc buries the 38px brand mark.
  var NO_GROW = '.btn, .filter-btn, .nav-logo';
  // Accent-yellow surfaces that must never be inverted to blue. The whole logo
  // link is listed, not just its dot: the disc is wider than the gap between the
  // mark and the wordmark, so growing on the wordmark reached across and turned
  // the mark blue.
  var ACCENT_TARGETS = '.nav-logo, .highlight-underline';

  var cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="cursor-dot"></span>';
  document.body.appendChild(cursor);
  document.documentElement.classList.add('cursor-enabled');

  var tx = window.innerWidth / 2, ty = window.innerHeight / 2;
  var x = tx, y = ty;
  var ease = reduce ? 1 : 0.18;
  var raf = null;

  function render() {
    x += (tx - x) * ease;
    y += (ty - y) * ease;
    cursor.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) {
      raf = requestAnimationFrame(render);
    } else {
      x = tx; y = ty;
      cursor.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      raf = null;
    }
  }

  function start() {
    if (raf === null) raf = requestAnimationFrame(render);
  }

  document.addEventListener('mousemove', function (e) {
    tx = e.clientX;
    ty = e.clientY;
    if (!cursor.classList.contains('is-visible')) {
      // First move: jump to the pointer instead of gliding in from the middle.
      x = tx; y = ty;
      cursor.classList.add('is-visible');
    }
    start();
  }, { passive: true });

  document.addEventListener('mouseover', function (e) {
    if (!e.target.closest) return;
    if (e.target.closest(HOVER_TARGETS) && !e.target.closest(NO_GROW)) cursor.classList.add('is-hover');
    if (e.target.closest(ACCENT_TARGETS)) cursor.classList.add('on-accent');
  });

  document.addEventListener('mouseout', function (e) {
    if (!e.target.closest) return;
    if (e.target.closest(HOVER_TARGETS)) cursor.classList.remove('is-hover');
    if (e.target.closest(ACCENT_TARGETS)) cursor.classList.remove('on-accent');
  });

  document.addEventListener('mousedown', function () { cursor.classList.add('is-down'); });
  document.addEventListener('mouseup', function () { cursor.classList.remove('is-down'); });

  document.addEventListener('mouseleave', function () { cursor.classList.remove('is-visible'); });
  document.addEventListener('mouseenter', function () { cursor.classList.add('is-visible'); });
  window.addEventListener('blur', function () { cursor.classList.remove('is-visible', 'is-hover', 'is-down', 'on-accent'); });
})();
