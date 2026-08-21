
const videos = [...document.querySelectorAll('video')];
const audio = document.getElementById('nasheed');

function startMedia() {
  videos.forEach(v => v.play().catch(() => {}));
  if (audio) {
    audio.volume = 0.72;
    audio.play().catch(() => {});
  }
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const v = entry.target;
    if (entry.isIntersecting) v.play().catch(() => {});
    else v.pause();
  });
}, { threshold: 0.08 });

videos.forEach(v => observer.observe(v));

/*
  There is intentionally NO Enter Invitation screen and NO music icon.
  Modern browsers require a user gesture before audible autoplay.
  The first tap, click, touch, wheel, key press, or scroll starts the nasheed.
*/
["pointerdown", "touchstart", "wheel", "keydown", "scroll"].forEach(type => {
  window.addEventListener(type, startMedia, { passive: true, once: true });
});

window.addEventListener("load", () => {
  videos.forEach(v => v.play().catch(() => {}));
});
