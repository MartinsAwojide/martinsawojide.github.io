/**
 * audio-player-setup.js
 * Initializes WaveSurfer.js waveform players for all .wavesurfer-container elements.
 *
 * Features:
 *  - Theme-aware waveform colors (reads --global-theme-color CSS variable)
 *  - Re-colors waveform when dark/light mode toggles (MutationObserver on html[data-theme])
 *  - Supports multiple independent players on one page
 *  - Play/pause button with icon swap
 *  - Current time / duration display
 *
 * Requires: WaveSurfer.js v7 loaded before this script (via head.liquid when page.audio: true)
 * NOTE: Remote audio sources must be CORS-enabled (Access-Control-Allow-Origin: *)
 */

(function () {
  'use strict';

  // Wait for WaveSurfer to be available
  if (typeof WaveSurfer === 'undefined') {
    console.warn('[audio-player-setup] WaveSurfer.js not loaded.');
    return;
  }

  /** Read the current theme accent color from CSS custom properties */
  function getThemeColor() {
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue('--global-theme-color')
        .trim() || '#f02e18'
    );
  }

  /** Format seconds as M:SS */
  function formatTime(seconds) {
    if (!isFinite(seconds)) return '--:--';
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  var players = []; // Track all WaveSurfer instances for theme updates

  /** Initialize a single player */
  function initPlayer(container) {
    var id = container.id;
    var src = container.dataset.audioSrc;
    var autoplay = container.dataset.autoplay === 'true';

    if (!src) {
      console.warn('[audio-player-setup] No data-audio-src on #' + id);
      return;
    }

    var waveEl = container.querySelector('.wavesurfer-wave');
    var playBtn = container.querySelector('.wavesurfer-play-btn');
    var iconPlay = container.querySelector('.wavesurfer-icon-play');
    var iconPause = container.querySelector('.wavesurfer-icon-pause');
    var currentEl = container.querySelector('.wavesurfer-current');
    var durationEl = container.querySelector('.wavesurfer-duration');

    var color = getThemeColor();

    var ws = WaveSurfer.create({
      container: waveEl,
      waveColor: color,
      progressColor: color,
      height: 60,
      barWidth: 2,
      barGap: 1,
      barRadius: 0,
      cursorWidth: 1,
      cursorColor: color,
      url: src,
      interact: true,
    });

    // Show duration once decoded
    ws.on('decode', function (duration) {
      if (durationEl) durationEl.textContent = formatTime(duration);
    });

    // Update current time
    ws.on('timeupdate', function (currentTime) {
      if (currentEl) currentEl.textContent = formatTime(currentTime);
    });

    // Swap play/pause icons
    ws.on('play', function () {
      if (iconPlay) iconPlay.style.display = 'none';
      if (iconPause) iconPause.style.display = '';
    });
    ws.on('pause', function () {
      if (iconPlay) iconPlay.style.display = '';
      if (iconPause) iconPause.style.display = 'none';
    });
    ws.on('finish', function () {
      if (iconPlay) iconPlay.style.display = '';
      if (iconPause) iconPause.style.display = 'none';
    });

    // Play/pause button
    if (playBtn) {
      playBtn.addEventListener('click', function () {
        ws.playPause();
      });
    }

    if (autoplay) {
      ws.play();
    }

    players.push(ws);
  }

  /** Re-color all waveforms when theme changes */
  function updateAllColors() {
    var color = getThemeColor();
    players.forEach(function (ws) {
      try {
        ws.setOptions({
          waveColor: color,
          progressColor: color,
          cursorColor: color,
        });
      } catch (e) {
        // Ignore if player was destroyed
      }
    });
  }

  // Watch for dark/light mode toggle via html[data-theme] attribute mutation
  var themeObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'data-theme') {
        // Small delay to allow CSS variables to update first
        setTimeout(updateAllColors, 50);
      }
    });
  });
  themeObserver.observe(document.documentElement, { attributes: true });

  // Initialize all players on page load
  document.addEventListener('DOMContentLoaded', function () {
    var containers = document.querySelectorAll('.wavesurfer-container');
    containers.forEach(initPlayer);
  });
})();
