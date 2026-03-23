/**
 * anime-setup.js
 * Initializes anime.js animations declared via data attributes in HTML.
 * Loaded only on pages/posts with `anime: true` in frontmatter.
 *
 * ─── USAGE IN POSTS / PAGES ──────────────────────────────────────────────────
 *
 * 1. Add `anime: true` to your post/page frontmatter.
 *
 * 2. Use data attributes on any element to trigger animations on page load:
 *
 *    <div class="anime-on-load"
 *         data-anime-props='{"opacity":[0,1],"translateY":[40,0]}'
 *         data-anime-duration="800"
 *         data-anime-easing="easeOutExpo"
 *         data-anime-delay="200">
 *      Animated content here
 *    </div>
 *
 * 3. Or write custom anime.js directly in a <script> block in your Markdown:
 *
 *    <script>
 *    document.addEventListener('DOMContentLoaded', function () {
 *      anime({
 *        targets: '#my-element',
 *        translateX: 250,
 *        duration: 800,
 *        easing: 'easeInOutQuad'
 *      });
 *    });
 *    </script>
 *
 * ─── DATA ATTRIBUTE OPTIONS ──────────────────────────────────────────────────
 *  data-anime-props     JSON object of anime.js animatable properties
 *                       e.g. '{"opacity":[0,1],"scale":[0.8,1],"translateY":[-20,0]}'
 *  data-anime-duration  Duration in ms (default: 600)
 *  data-anime-delay     Delay in ms (default: 0)
 *  data-anime-easing    anime.js easing string (default: "easeOutExpo")
 *  data-anime-stagger   If set, staggers children by this ms value instead of animating the element itself
 *
 * ─── SCROLL-TRIGGERED ANIMATIONS ────────────────────────────────────────────
 *  Add class `anime-on-scroll` instead of `anime-on-load` to trigger when the
 *  element enters the viewport (uses IntersectionObserver).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  if (typeof anime === 'undefined') {
    console.warn('[anime-setup] anime.js not loaded.');
    return;
  }

  /** Parse data-anime-* attributes and run an animation on a target */
  function runAnime(el) {
    var props = {};
    try {
      props = JSON.parse(el.dataset.animeProps || '{}');
    } catch (e) {
      console.warn('[anime-setup] Invalid data-anime-props JSON on element:', el);
    }

    var duration = parseInt(el.dataset.animeDuration, 10) || 600;
    var delay    = parseInt(el.dataset.animeDelay, 10)    || 0;
    var easing   = el.dataset.animeEasing || 'easeOutExpo';
    var stagger  = el.dataset.animeStagger;

    var config = Object.assign({}, props, {
      duration: duration,
      easing:   easing,
      delay:    stagger ? anime.stagger(parseInt(stagger, 10), { start: delay }) : delay,
    });

    if (stagger) {
      config.targets = el.children;
    } else {
      config.targets = el;
    }

    anime(config);
  }

  document.addEventListener('DOMContentLoaded', function () {

    // ── On-load animations ───────────────────────────────────────────────────
    var onLoadEls = document.querySelectorAll('.anime-on-load');
    onLoadEls.forEach(function (el) {
      runAnime(el);
    });

    // ── Scroll-triggered animations (IntersectionObserver) ──────────────────
    var onScrollEls = document.querySelectorAll('.anime-on-scroll');
    if (onScrollEls.length === 0) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runAnime(entry.target);
          observer.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.15 });

    onScrollEls.forEach(function (el) {
      observer.observe(el);
    });

  });
})();
