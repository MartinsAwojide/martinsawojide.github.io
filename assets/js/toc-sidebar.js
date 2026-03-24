/**
 * toc-sidebar.js — custom TOC builder + IntersectionObserver active-link highlighter
 *
 * Replaces bootstrap-toc auto-discovery (which was unreliable for sub-headings).
 * Reads h2, h3, h4 headings directly from the article content, builds a nested
 * ul/li/a structure, then highlights the active link as the user scrolls.
 *
 * Cactus-style: # prefix for h2, ## for h3 (added via CSS ::before).
 * Sticky behaviour is handled in _sass/_layout.scss (#toc-sidebar).
 */

(function () {
  'use strict';

  var sidebar = document.getElementById('toc-sidebar');
  if (!sidebar) return;

  // ── 1. Find headings in the article content ──────────────────────────────
  // Prefer the main content column; fall back to article or body.
  var content =
    document.querySelector('.col-sm-9') ||
    document.querySelector('article') ||
    document.body;

  var headings = Array.from(
    content.querySelectorAll('h2[id], h3[id], h4[id]')
  );

  if (headings.length === 0) return;

  // ── 2. Build nested ul/li/a list ─────────────────────────────────────────
  var rootUl = document.createElement('ul');

  var currentH2Li  = null;
  var currentH2Ul  = null;
  var currentH3Li  = null;
  var currentH3Ul  = null;

  headings.forEach(function (heading) {
    // Strip the "## " ::before visual prefix from textContent if present
    // (CSS ::before is not in textContent, so this is just a safety strip)
    var text = heading.textContent.replace(/^[#\s]+/, '').trim();

    var a = document.createElement('a');
    a.href = '#' + heading.id;
    a.textContent = text;

    var li = document.createElement('li');
    li.appendChild(a);

    var tag = heading.tagName; // H2, H3, H4

    if (tag === 'H2') {
      rootUl.appendChild(li);
      currentH2Li  = li;
      currentH2Ul  = null;
      currentH3Li  = null;
      currentH3Ul  = null;
    } else if (tag === 'H3') {
      if (!currentH2Ul) {
        currentH2Ul = document.createElement('ul');
        (currentH2Li || rootUl).appendChild(currentH2Ul);
      }
      currentH2Ul.appendChild(li);
      currentH3Li = li;
      currentH3Ul = null;
    } else { // H4
      if (!currentH3Ul) {
        currentH3Ul = document.createElement('ul');
        (currentH3Li || currentH2Li || rootUl).appendChild(currentH3Ul);
      }
      currentH3Ul.appendChild(li);
    }
  });

  sidebar.appendChild(rootUl);

  // ── 3. IntersectionObserver — highlight active link on scroll ────────────
  var linkMap = {};
  sidebar.querySelectorAll('a[href^="#"]').forEach(function (a) {
    linkMap[a.getAttribute('href').slice(1)] = a;
  });

  var activeId = null;

  function setActive(id) {
    if (id === activeId) return;
    if (activeId && linkMap[activeId]) {
      linkMap[activeId].classList.remove('toc-active');
    }
    activeId = id;
    if (activeId && linkMap[activeId]) {
      linkMap[activeId].classList.add('toc-active');
    }
  }

  // rootMargin pushes the "trigger line" to the top 20% of the viewport so
  // the active heading updates just before it leaves the screen.
  var observer = new IntersectionObserver(
    function (entries) {
      // Pick the topmost intersecting heading
      var visible = entries
        .filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      if (visible.length > 0) {
        setActive(visible[0].target.id);
      }
    },
    { rootMargin: '-5% 0px -70% 0px', threshold: 0 }
  );

  headings.forEach(function (h) { observer.observe(h); });

  // Activate first heading immediately
  setActive(headings[0].id);
})();
