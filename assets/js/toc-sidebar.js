/**
 * toc-sidebar.js
 * Hextra-style IntersectionObserver that highlights the active heading link
 * in the #toc-sidebar nav as the user scrolls through the page.
 *
 * Activated when #toc-sidebar exists in the DOM (i.e., page has toc: sidebar frontmatter).
 * Adds/removes the .toc-active class on matching <a> links inside #toc-sidebar.
 */

(function () {
  'use strict';

  const sidebar = document.getElementById('toc-sidebar');
  if (!sidebar) return;

  // Collect all heading anchors tracked in the sidebar
  const sidebarLinks = Array.from(sidebar.querySelectorAll('a[href]'));
  if (sidebarLinks.length === 0) return;

  // Build a map: heading id → sidebar link element
  const linkMap = {};
  sidebarLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkMap[href.slice(1)] = link;
    }
  });

  let activeId = null;

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

  // IntersectionObserver: watch all h2 and h3 that have an id
  const headings = Array.from(
    document.querySelectorAll('h2[id], h3[id]')
  ).filter(function (h) {
    return linkMap[h.id] !== undefined;
  });

  if (headings.length === 0) return;

  // Threshold: trigger when heading enters top 20% of viewport
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: '0px 0px -75% 0px',
      threshold: 0,
    }
  );

  headings.forEach(function (h) {
    observer.observe(h);
  });

  // Fallback: set first link active initially if nothing is intersecting yet
  if (headings.length > 0 && !activeId) {
    setActive(headings[0].id);
  }
})();
