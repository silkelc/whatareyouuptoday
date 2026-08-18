/* Custom cursor: a circle that trails the pointer and grows over interactive
   elements. It is white with mix-blend-mode: difference, which renders it black
   on the white page and knocks out whatever it covers.
   Difference inverts, and inverting the accent yellow gives blue. So over the
   brand's yellow surfaces the dot drops the blend, turns solid black and stops
   growing: the yellow underneath is covered for a moment, never recoloured.

   Touch devices have no pointer to follow, so they get the same circle as a tap
   ripple: it lands where the finger does, expands and fades. Same dot, same
   blend, so the effect is recognisably the same on both.
   No-op without JS. */
(function () {
  if (!window.matchMedia) return;
  // Forced-colors / high-contrast users have deliberately taken over the
  // palette and usually the system cursor with it. Leave theirs alone.
  if (window.matchMedia('(forced-colors: active)').matches) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
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

  /* Touch: no pointer to follow, so the circle only appears on tap. iOS also
     needs a touch listener on the page before it will apply :active styles to
     the buttons, and this is that listener. */
  if (!finePointer) {
    var tapping = false;
    /* Buttons and chips already answer a tap by filling black, so a ripple on
       top is the same signal twice. The logo is here because the ripple inverts,
       and inverting the accent yellow gives blue. The whole link is excluded,
       not just the mark: the ripple expands to roughly 82px, far wider than the
       gap to the wordmark, so tapping the first letters would still wash blue
       across the mark. */
    var NO_RIPPLE = '.btn, .filter-btn, .nav-logo';

    document.addEventListener('touchstart', function (e) {
      if (reduce) return; // the ripple is decoration, nothing depends on it
      if (e.target.closest && e.target.closest(NO_RIPPLE)) return;
      var t = e.touches[0];
      if (!t) return;
      tapping = true;
      cursor.style.transform = 'translate3d(' + t.clientX + 'px,' + t.clientY + 'px,0)';
      cursor.classList.remove('is-tap');
      void cursor.offsetWidth; // restart the animation on a repeat tap
      cursor.classList.add('is-tap');
    }, { passive: true });

    // A finger that travels is a scroll, not a tap. Drop the ripple.
    document.addEventListener('touchmove', function () {
      if (tapping) {
        tapping = false;
        cursor.classList.remove('is-tap');
      }
    }, { passive: true });

    document.addEventListener('touchend', function () { tapping = false; }, { passive: true });
    return;
  }

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
