/**
 * shared/main.js
 * 所有页面共用的JavaScript功能
 */

// ── 顶部导航自动生成 ──
function buildTopNav(currentId) {
  const nav = document.getElementById('top-nav');
  if (!nav) return;

  let html = `<a href="../globe-travel-journal.html" class="nav-globe" title="返回地球">🌍</a>
<div class="nav-divider"></div>`;

  DESTINATIONS.forEach(d => {
    const isActive = d.id === currentId ? 'active' : '';
    const isComing = d.status === 'coming' ? 'coming' : '';
    const label = d.emoji + ' ' + d.nameEn;
    if (d.status === 'coming') {
      html += `<span class="nav-item coming" title="即将上线">${label}</span>`;
    } else {
      html += `<a href="../${d.page}" class="nav-item ${isActive}">${label}</a>`;
    }
  });

  nav.innerHTML = html;
}

// ── 幻灯片轮播 ──
function initSlideshow() {
  const slides = document.querySelectorAll('.media-slide');
  const dots = document.querySelectorAll('.dot');
  if (!slides.length) return;

  // 隐藏没有内容的slides
  slides.forEach(slide => {
    const img = slide.querySelector('img');
    const video = slide.querySelector('video');
    if (img) {
      img.addEventListener('error', () => {
        slide.style.display = 'none';
      });
    }
  });

  let current = 0;
  let timer = null;
  const visibleSlides = () => Array.from(slides).filter(s => s.style.display !== 'none');

  function goToSlide(n) {
    const visible = visibleSlides();
    if (!visible.length) return;
    slides[current]?.classList.remove('active');
    dots[current]?.classList.remove('active');
    current = n % visible.length;
    visible[current]?.classList.add('active');
    dots[current]?.classList.add('active');
    const vid = visible[current]?.querySelector('video');
    if (vid) { vid.currentTime = 0; vid.play(); }
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goToSlide(current + 1), 5500);
  }

  // 绑定dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  resetTimer();

  // 暴露给全局
  window.goToSlide = goToSlide;
}

// ── 图片自动识别格式 ──
function initAutoImg() {
  document.querySelectorAll('img[data-src]').forEach(el => {
    const base = el.getAttribute('data-src');
    if (!base) return;
    const exts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    let i = 0;
    function tryNext() {
      if (i >= exts.length) { el.style.display = 'none'; return; }
      el.src = base + '.' + exts[i];
      el.onerror = () => { i++; tryNext(); };
      el.onload = () => { el.onerror = null; };
    }
    tryNext();
  });
}

// ── 视频自动识别格式 ──
function initAutoVideo() {
  document.querySelectorAll('video[data-src]').forEach(el => {
    const base = el.getAttribute('data-src');
    if (!base) return;
    const exts = ['mp4', 'mov', 'webm'];
    let i = 0;
    function tryNext() {
      if (i >= exts.length) {
        // 没有视频文件，隐藏整个卡片
        const card = el.closest('.video-card');
        if (card) card.style.display = 'none';
        return;
      }
      el.src = base + '.' + exts[i];
      el.onerror = () => { i++; tryNext(); };
    }
    tryNext();
  });
}

// ── Scroll Reveal ──
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(r => obs.observe(r));
}

// ── Lightbox ──
function openLightbox(base) {
  const exts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  let i = 0;
  const lbc = document.getElementById('lightbox-content');
  const lb = document.getElementById('lightbox');
  function tryNext() {
    if (i >= exts.length) return;
    const img = new Image();
    img.onload = () => {
      lbc.innerHTML = `<img src="${base}.${exts[i-1]}">`;
      lb.classList.add('show');
    };
    img.onerror = () => { i++; tryNext(); };
    img.src = base + '.' + exts[i]; i++;
  }
  tryNext();
}

function openVideo(base) {
  const exts = ['mp4', 'mov', 'webm'];
  let i = 0;
  const lbc = document.getElementById('lightbox-content');
  const lb = document.getElementById('lightbox');
  function tryNext() {
    if (i >= exts.length) return;
    const v = document.createElement('video');
    v.controls = true; v.autoplay = true;
    v.style.cssText = 'max-width:90vw;max-height:88vh;border-radius:8px';
    v.onerror = () => { i++; tryNext(); };
    v.oncanplay = () => { lbc.innerHTML = ''; lbc.appendChild(v); lb.classList.add('show'); };
    v.src = base + '.' + exts[i]; i++;
  }
  tryNext();
}

function closeLightbox() {
  document.getElementById('lightbox')?.classList.remove('show');
  const lbc = document.getElementById('lightbox-content');
  if (lbc) lbc.innerHTML = '';
}

// ── 隐藏笔记 ──
function initHiddenNotes(pageId, password) {
  const toggle = document.getElementById('notes-toggle');
  const panel = document.getElementById('notes-panel');
  const pwScreen = document.getElementById('notes-password-screen');
  const content = document.getElementById('notes-content');
  const textarea = document.getElementById('notes-textarea');
  const pwInput = document.getElementById('notes-pw-input');

  if (!toggle || !panel) return;

  const storageKey = 'notes_' + pageId;

  toggle.addEventListener('click', () => {
    panel.classList.toggle('show');
  });

  document.getElementById('notes-pw-btn')?.addEventListener('click', () => {
    if (pwInput.value === password) {
      pwScreen.style.display = 'none';
      content.style.display = 'block';
      textarea.value = localStorage.getItem(storageKey) || '';
    } else {
      pwInput.style.borderColor = '#e85050';
      setTimeout(() => pwInput.style.borderColor = '', 1000);
    }
  });

  pwInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('notes-pw-btn')?.click();
  });

  // 自动保存
  textarea?.addEventListener('input', () => {
    localStorage.setItem(storageKey, textarea.value);
    document.getElementById('notes-save-status').textContent = '已保存';
    setTimeout(() => {
      document.getElementById('notes-save-status').textContent = '';
    }, 2000);
  });

  document.getElementById('notes-lock-btn')?.addEventListener('click', () => {
    pwScreen.style.display = 'block';
    content.style.display = 'none';
    pwInput.value = '';
    panel.classList.remove('show');
  });
}

// ── 键盘快捷键 ──
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ── 页面初始化 ──
document.addEventListener('DOMContentLoaded', () => {
  initAutoImg();
  initAutoVideo();
  initSlideshow();
  initReveal();
});
