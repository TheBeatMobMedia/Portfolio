$(function () {
  // Sidebar menu link active state
  $(".menu-link").click(function () {
    $(".menu-link").removeClass("is-active");
    $(this).addClass("is-active");
  });
});

$(function () {
  // Header main link active state
  $(".main-header-link").click(function () {
    $(".main-header-link").removeClass("is-active");
    $(this).addClass("is-active");
  });
});

// --- DROPDOWN HANDLING ---
const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdowns.forEach((c) => c.classList.remove("is-active"));
    dropdown.classList.add("is-active");
  });
});

// --- SEARCH BAR FOCUS EFFECT ---
$(".search-bar input")
  .focus(function () {
    $(".header").addClass("wide");
  })
  .blur(function () {
    $(".header").removeClass("wide");
  });

// --- CLOSE DROPDOWN WHEN CLICKING OUTSIDE ---
$(document).click(function (e) {
  var container = $(".status-button");
  var dd = $(".dropdown");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    dd.removeClass("is-active");
  }
});

// --- OVERLAY HANDLING FOR DROPDOWN ---
$(function () {
  $(".dropdown").on("click", function (e) {
    $(".content-wrapper").addClass("overlay");
    e.stopPropagation();
  });
  $(document).on("click", function (e) {
    if ($(e.target).is(".dropdown") === false) {
      $(".content-wrapper").removeClass("overlay");
    }
  });
});

// --- POPUP HANDLING ---
$(function () {
  // Show overlay app on status button click
  $(".status-button:not(.open)").on("click", function (e) {
    $(".overlay-app").addClass("is-active");
  });
  // Close overlay app on popup close
  $(".pop-up .close").click(function () {
    $(".overlay-app").removeClass("is-active");
  });
});

// Show popup on status button click
$(".status-button:not(.open)").click(function () {
  $(".pop-up").addClass("visible");
});

// Hide popup on close button click
$(".pop-up .close").click(function () {
  $(".pop-up").removeClass("visible");
});

// --- DARK/LIGHT MODE TOGGLE ---
const toggleButton = document.querySelector('.dark-light');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// --- SECTION SHOW/HIDE LOGIC USING CLASSES ---
// List all section IDs here
const sectionIds = [
  'about-section',
  'about-extra',
  'audio-section',
  'graphic-section',
  'video-section',
  'meta-section',
  'coding-section',
  'writer-section'
];

// Show only About sections on load
window.addEventListener('DOMContentLoaded', () => {
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === 'about-section' || id === 'about-extra') {
        el.classList.remove('section-hidden');
        el.classList.add('section-visible');
      } else {
        el.classList.remove('section-visible');
        el.classList.add('section-hidden');
      }
    }
  });
});

// Show only the selected section on category click
document.querySelectorAll('.category-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // Remove active from all, add to clicked
    document.querySelectorAll('.category-link').forEach(l => l.classList.remove('is-active'));
    this.classList.add('is-active');
    // Hide all sections
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('section-visible');
        el.classList.add('section-hidden');
      }
    });
    // Show the clicked section only
    const cat = this.getAttribute('data-category');
    const showEl = document.getElementById(cat);
    if (showEl) {
      showEl.classList.remove('section-hidden');
      showEl.classList.add('section-visible');
    }
  });
});

// --- AUDIO CAROUSEL & MODAL LOGIC ---

// Map image data-spotify to Spotify embed URLs (replace with your real URLs)
const spotifyTracks = {
  1: "https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp",
  2: "https://open.spotify.com/embed/track/7ouMYWpwJ422jRcDASZB7P",
  3: "https://open.spotify.com/embed/track/0VjIjW4GlUZAMYd2vXMi3b"
};

// Carousel DOM elements
const carousel = document.getElementById('audio-carousel');
const images = carousel.querySelectorAll('.carousel-img');
const leftBtn = document.getElementById('carousel-left');
const rightBtn = document.getElementById('carousel-right');
const dotsContainer = document.getElementById('carousel-dots');
const imgWidth = 120 + 16; // image width + margin (px)
let currentIndex = 0;
const visibleCount = 2;

// --- MODAL LOGIC ---
const audioModal = document.getElementById('audio-modal');
const spotifyIframe = document.getElementById('spotify-iframe');
const modalClose = document.getElementById('audio-modal-close');

// Open modal with Spotify player on image click
images.forEach(img => {
  img.addEventListener('click', function() {
    const trackId = this.getAttribute('data-spotify');
    spotifyIframe.src = spotifyTracks[trackId] || "";
    audioModal.classList.add('visible');
  });
});
// Close modal on close button
modalClose.addEventListener('click', function() {
  audioModal.classList.remove('visible');
  spotifyIframe.src = "";
});
// Close modal when clicking outside modal content
audioModal.addEventListener('click', function(e) {
  if (e.target === audioModal) {
    audioModal.classList.remove('visible');
    spotifyIframe.src = "";
  }
});

// --- CAROUSEL SLIDING LOGIC ---
function goToIndex(idx) {
  if (idx < 0) idx = images.length - visibleCount;
  if (idx > images.length - visibleCount) idx = 0;
  currentIndex = idx;
  carousel.scrollTo({ left: imgWidth * currentIndex, behavior: 'smooth' });
  updateDots();
}

// --- DOTS/INDICATORS LOGIC ---
function updateDots() {
  dotsContainer.innerHTML = '';
  for (let i = 0; i <= images.length - visibleCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
    dot.addEventListener('click', () => goToIndex(i));
    dotsContainer.appendChild(dot);
  }
}
updateDots();

// --- ARROW BUTTONS LOGIC ---
leftBtn.addEventListener('click', () => goToIndex(currentIndex - 1));
rightBtn.addEventListener('click', () => goToIndex(currentIndex + 1));

// --- AUTO-SCROLL LOGIC ---
let autoScroll = setInterval(() => goToIndex(currentIndex + 1), 4000);
carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
carousel.addEventListener('mouseleave', () => autoScroll = setInterval(() => goToIndex(currentIndex + 1), 4000));

// --- KEYBOARD NAVIGATION LOGIC ---
document.addEventListener('keydown', (e) => {
  if (document.getElementById('audio-section').classList.contains('section-visible')) {
    if (e.key === 'ArrowLeft') goToIndex(currentIndex - 1);
    if (e.key === 'ArrowRight') goToIndex(currentIndex + 1);
  }
});

// --- TOUCH/SWIPE SUPPORT LOGIC ---
let startX = 0;
carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 30) goToIndex(currentIndex - 1);
  if (startX - endX > 30) goToIndex(currentIndex + 1);
});

// --- INITIALIZE CAROUSEL POSITION ---
goToIndex(0);

// Example usage: showSection('audio-section');

const imgElement = $0;
const parentElement = $0.parentElement;

// Try setting image size to 100% of parent and object-fit
await setElementStyles(imgElement, {
  width: '100%',
  height: '100%',
  objectFit: 'contain' // or 'cover', 'scale-down', 'none' - 'contain' is a good starting point
});

// Get updated styles
const updatedElementStyles = window.getComputedStyle(imgElement);
const updatedParentElementStyles = window.getComputedStyle(parentElement);

const data = {
  updatedElementStyles: {
    width: updatedElementStyles['width'],
    height: updatedElementStyles['height'],
    objectFit: updatedElementStyles['object-fit']
  },
  updatedParentElementStyles: {
    width: updatedParentElementStyles['width'],
    height: updatedParentElementStyles['height'],
    display: updatedParentElementStyles['display']
  },
   parentElementChildren: Array.from(parentElement.children).map(child => child.tagName)
};
sections.forEach(sec => { if (sec) sec.classList.add('section-hidden'); });
// To show:
section.classList.remove('section-hidden');