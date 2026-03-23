module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  safelist: {
    // Patterns for classes added dynamically via JS or conditionally rendered
    greedy: [
      // Theme & dark mode
      /^data-theme/,
      /^html\[data-theme/,
      // Hero & about page
      /^about-hero/,
      /^feature-card/,
      // Post cards
      /^post-card/,
      // Project cards & overlay
      /^project-card/,
      /^card-overlay/,
      // Callout boxes
      /^callout/,
      // Sidebar TOC
      /^toc-/,
      // WaveSurfer audio player
      /^wavesurfer/,
      // Language switcher
      /^lang-switcher/,
      // anime.js trigger classes
      /^anime-on/,
      // Bootstrap dynamic classes used by JS
      /^show$/,
      /^active$/,
      /^collapse$/,
      /^collapsing$/,
      /^dropdown/,
    ],
  },
};
