const videos = [...document.querySelectorAll('video')];
const audio = document.getElementById('nasheed');

let musicStarted = false;

function playMusic() {
  if (!audio || musicStarted) return;
  audio.volume = 0.72;
  audio.play().then(() => {
    musicStarted = true;
  }).catch(() => {
    // Browser blocked audible autoplay; the next user gesture will retry.
  });
}

function startMedia() {
  videos.forEach(v => v.play().catch(() => {}));
  playMusic();
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const v = entry.target;
    if (entry.isIntersecting) v.play().catch(() => {});
    else v.pause();
  });
}, { threshold: 0.08 });

videos.forEach(v => observer.observe(v));

// Start the nasheed on the first real interaction with the invitation.
['pointerdown', 'touchend', 'click', 'keydown', 'wheel', 'scroll'].forEach(type => {
  window.addEventListener(type, startMedia, { passive: true });
});

window.addEventListener('load', () => {
  videos.forEach(v => v.play().catch(() => {}));
  if (audio) {
    audio.load();
    // Try once on load; browsers may allow it if the user has previously interacted with the site.
    audio.play().then(() => {
      musicStarted = true;
    }).catch(() => {});
  }
});

if (audio) {
  audio.addEventListener('canplaythrough', playMusic, { once: true });
}
