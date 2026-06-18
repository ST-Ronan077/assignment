// =============================================
//  CET138 ePortfolio — script.js
// =============================================

// ── Progress bar ──────────────────────────────
window.addEventListener('scroll', function () {
  var scrollTop  = window.scrollY || document.documentElement.scrollTop;
  var docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  var progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  document.getElementById('progress-bar').style.width = progress + '%';
});

// ── Fade-in on scroll ─────────────────────────
var fadeEls = document.querySelectorAll('.fade-in');
function checkFade() {
  fadeEls.forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', checkFade);
window.addEventListener('load',   checkFade);

// ── Active sidebar link tracking ──────────────
var sections     = document.querySelectorAll('.section');
var sidebarLinks = document.querySelectorAll('.sidebar-link');

window.addEventListener('scroll', function () {
  var scrollMid = window.scrollY + window.innerHeight / 2;
  sections.forEach(function (section) {
    var top    = section.offsetTop;
    var bottom = top + section.offsetHeight;
    if (scrollMid >= top && scrollMid <= bottom) {
      var id = section.getAttribute('id');
      sidebarLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('data-section') === id);
      });
    }
  });
});

// ── Smooth scroll — sidebar + chips ──────────
document.querySelectorAll('.sidebar-link, .chip').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── HTML form demo ────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  var fb = document.getElementById('form-feedback');
  fb.style.display = 'block';
  fb.textContent   = 'Form submitted successfully! (In a real app, data would go to the server.)';
  setTimeout(function () { fb.style.display = 'none'; }, 3000);
}

// ── Counter ───────────────────────────────────
var count = 0;

function changeCount(n) {
  count += n;
  var el = document.getElementById('counter-val');
  el.textContent     = count;
  el.style.transform = 'scale(1.18)';
  setTimeout(function () { el.style.transform = 'scale(1)'; }, 120);
}

function resetCount() {
  count = 0;
  document.getElementById('counter-val').textContent = 0;
}

// ── Form validation ───────────────────────────
function validateForm() {
  var name  = document.getElementById('val-name').value.trim();
  var email = document.getElementById('val-email').value.trim();
  var out   = document.getElementById('val-output');

  out.className = '';

  if (!name && !email) {
    out.textContent = '✗  Please fill in both fields.';
    out.className   = 'output-error';
  } else if (!name) {
    out.textContent = '✗  Please enter your full name.';
    out.className   = 'output-error';
  } else if (!email.includes('@') || !email.includes('.')) {
    out.textContent = '✗  Please enter a valid email address (must contain @ and .).';
    out.className   = 'output-error';
  } else {
    out.textContent = '✓  Success! Hello, ' + name + '. Your details have been validated.';
    out.className   = 'output-success';
  }
}

// Allow Enter key to submit validation form
document.addEventListener('DOMContentLoaded', function () {
  var valInputs = document.querySelectorAll('#val-name, #val-email');
  valInputs.forEach(function (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') validateForm();
    });
  });
});

// ── Theme toggle ──────────────────────────────
function toggleTheme() {
  var box    = document.getElementById('theme-box');
  var isDark = box.classList.toggle('dark');

  document.getElementById('theme-btn').textContent   = isDark ? 'Switch to light' : 'Switch to dark';
  document.getElementById('theme-label').textContent = isDark ? '☾ Dark mode'     : '☀ Light mode';
}