/**
 * shared/main.js
 * 所有页面共用的JavaScript功能
 */

// ── 顶部导航自动生成 ──
function buildTopNav(currentId) {
  var nav = document.getElementById('top-nav');
  if (!nav) return;
  var html = '<a href="../globe-travel-journal.html" class="nav-globe" title="返回地球">🌍</a><div class="nav-divider"></div>';
  DESTINATIONS.forEach(function(d) {
    var isActive = d.id === currentId ? 'active' : '';
    var label = d.emoji + ' ' + d.nameEn;
    if (d.status === 'coming') {
      html += '<span class="nav-item coming" title="即将上线">' + label + '</span>';
    } else {
      html += '<a href="../' + d.page + '" class="nav-item ' + isActive + '">' + label + '</a>';
    }
  });
  nav.innerHTML = html;
}

// ── 图片自动识别格式 ──
function initAutoImg() {
  var imgs = document.querySelectorAll('img[data-src]');
  var loadCount = 0;
  var totalCount = imgs.length;

  imgs.forEach(function(el) {
    var base = el.getAttribute('data-src');
    if (!base) { totalCount--; return; }
    var exts = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
    var i = 0;
    function tryNext() {
      if (i >= exts.length) {
        // 没找到图片，隐藏这个slide
        var slide = el.closest('.media-slide');
        if (slide) slide.style.display = 'none';
        el.style.display = 'none';
        loadCount++;
        if (loadCount >= totalCount) initSlideshow();
        return;
      }
      el.src = base + '.' + exts[i];
      el.onerror = function() { i++; tryNext(); };
      el.onload = function() {
        el.onerror = null;
        loadCount++;
        if (loadCount >= totalCount) initSlideshow();
      };
      i++;
    }
    tryNext();
  });

  // 如果没有任何图片，也启动轮播
  if (totalCount === 0) initSlideshow();
}

// ── 视频自动识别格式 ──
function initAutoVideo() {
  document.querySelectorAll('video[data-src]').forEach(function(el) {
    var base = el.getAttribute('data-src');
    if (!base) return;
    var exts = ['mp4', 'mov', 'webm'];
    var i = 0;
    function tryNext() {
      if (i >= exts.length) {
        // 没有视频文件，隐藏整个卡片
        var card = el.closest('.video-card');
        if (card) card.style.display = 'none';
        return;
      }
      el.src = base + '.' + exts[i];
      el.onerror = function() { i++; tryNext(); };
      el.onload = null;
      el.oncanplay = function() {
        el.onerror = null;
        // 自动静音循环播放
        el.muted = true;
        el.loop = true;
        el.play();
      };
      i++;
    }
    tryNext();
  });
}

// ── 幻灯片轮播（只在有图片的slide里循环）──
function initSlideshow() {
  var allSlides = document.querySelectorAll('.media-slide');
  var allDots = document.querySelectorAll('.dot');
  if (!allSlides.length) return;

  // 只保留有内容的slides
  var slides = [];
  allSlides.forEach(function(s) {
    if (s.style.display !== 'none') slides.push(s);
  });
  if (!slides.length) return;

  // 隐藏多余的dots
  allDots.forEach(function(dot, i) {
    if (i >= slides.length) dot.style.display = 'none';
  });

  // 确保第一张显示
  slides.forEach(function(s) { s.classList.remove('active'); });
  slides[0].classList.add('active');
  if (allDots[0]) allDots[0].classList.add('active');

  var cur = 0;
  var t = null;

  function go(n) {
    slides[cur].classList.remove('active');
    if (allDots[cur]) allDots[cur].classList.remove('active');
    cur = n % slides.length;
    slides[cur].classList.add('active');
    if (allDots[cur]) allDots[cur].classList.add('active');
  }

  // 绑定dots点击
  allDots.forEach(function(dot, i) {
    if (i < slides.length) {
      dot.onclick = function() {
        go(i);
        clearInterval(t);
        t = setInterval(function() { go(cur + 1); }, 5000);
      };
    }
  });

  t = setInterval(function() { go(cur + 1); }, 5000);
  window.goToSlide = go;
}

// ── Scroll Reveal ──
function initReveal() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function(r) { obs.observe(r); });
}

// ── Lightbox ──
function openLightbox(base) {
  var exts = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
  var i = 0;
  var lbc = document.getElementById('lightbox-content');
  var lb = document.getElementById('lightbox');
  function tryNext() {
    if (i >= exts.length) return;
    var img = new Image();
    var idx = i;
    img.onload = function() {
      lbc.innerHTML = '<img src="' + base + '.' + exts[idx] + '">';
      lb.classList.add('show');
    };
    img.onerror = function() { i++; tryNext(); };
    img.src = base + '.' + exts[i];
    i++;
  }
  tryNext();
}

function openVideo(base) {
  var exts = ['mp4', 'mov', 'webm'];
  var i = 0;
  var lbc = document.getElementById('lightbox-content');
  var lb = document.getElementById('lightbox');
  function tryNext() {
    if (i >= exts.length) return;
    var v = document.createElement('video');
    v.controls = true;
    v.autoplay = true;
    v.style.cssText = 'max-width:90vw;max-height:88vh;border-radius:8px';
    v.onerror = function() { i++; tryNext(); };
    v.oncanplay = function() {
      lbc.innerHTML = '';
      lbc.appendChild(v);
      lb.classList.add('show');
    };
    v.src = base + '.' + exts[i];
    i++;
  }
  tryNext();
}

function closeLightbox() {
  var lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('show');
  var lbc = document.getElementById('lightbox-content');
  if (lbc) lbc.innerHTML = '';
}

// ── 隐藏笔记 ──
function initHiddenNotes(pageId, password) {
  var toggle = document.getElementById('notes-toggle');
  var panel = document.getElementById('notes-panel');
  var pwScreen = document.getElementById('notes-password-screen');
  var content = document.getElementById('notes-content');
  var textarea = document.getElementById('notes-textarea');
  var pwInput = document.getElementById('notes-pw-input');
  if (!toggle || !panel) return;
  var storageKey = 'notes_' + pageId;

  toggle.addEventListener('click', function() { panel.classList.toggle('show'); });

  document.getElementById('notes-pw-btn').addEventListener('click', function() {
    if (pwInput.value === password) {
      pwScreen.style.display = 'none';
      content.style.display = 'block';
      textarea.value = localStorage.getItem(storageKey) || '';
    } else {
      pwInput.style.borderColor = '#e85050';
      setTimeout(function() { pwInput.style.borderColor = ''; }, 1000);
    }
  });

  pwInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('notes-pw-btn').click();
  });

  textarea.addEventListener('input', function() {
    localStorage.setItem(storageKey, textarea.value);
    var status = document.getElementById('notes-save-status');
    if (status) { status.textContent = '已保存'; setTimeout(function() { status.textContent = ''; }, 2000); }
  });

  document.getElementById('notes-lock-btn').addEventListener('click', function() {
    pwScreen.style.display = 'block';
    content.style.display = 'none';
    pwInput.value = '';
    panel.classList.remove('show');
  });
}

// ── 键盘快捷键 ──
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
});

// ── 页面初始化 ──
document.addEventListener('DOMContentLoaded', function() {
  initAutoImg();
  initAutoVideo();
  initReveal();
});
