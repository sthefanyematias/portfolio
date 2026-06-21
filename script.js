
const toggle = document.getElementById('themeToggle');
const body = document.body;

body.classList.remove('light');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light');
}

toggle.addEventListener('click', () => {
  body.classList.toggle('light');
  const theme = body.classList.contains('light') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});

const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
  menuBtn.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  menuBtn.textContent = isOpen ? '✕' : '☰';
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuBtn.textContent = '☰';
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menu de navegação');
  });
});

document.addEventListener('click', (event) => {
  if (menu.classList.contains('open')) {
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
      menu.classList.remove('open');
      menuBtn.textContent = '☰';
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Abrir menu de navegação');
    }
  }
});

const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

const searchData = [
  { name: "Início", id: "home", keywords: ["home", "inicio", "topo", "apresentação"] },
  { name: "Sobre Mim", id: "about", keywords: ["sobre", "quem sou", "biografia", "perfil", "sthefany"] },
  { name: "Projetos", id: "projects", keywords: ["projetos", "portfolio", "trabalhos", "petshop", "estoque", "angular", "elopet", "confeitaria", "java", "spring", "docker"] },
  { name: "Contato", id: "contact", keywords: ["contato", "email", "redes sociais", "github", "whatsapp"] }
];

const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('searchSuggestions');

searchInput.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase().trim();
  suggestionsBox.innerHTML = '';

  if (value.length > 0) {
    let filtered = searchData.filter(item =>
      item.name.toLowerCase().includes(value) ||
      item.keywords.some(key => key.includes(value))
    );

    filtered.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA.startsWith(value) && !nameB.startsWith(value)) return -1;
      if (!nameA.startsWith(value) && nameB.startsWith(value)) return 1;
      return nameA.localeCompare(nameB);
    });

    if (filtered.length > 0) {
      suggestionsBox.style.display = 'block';
      filtered.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.setAttribute('role', 'option');
        const regex = new RegExp(`(${value})`, 'gi');
        div.innerHTML = item.name.replace(regex, "<strong>$1</strong>");
        div.onclick = () => {
          document.getElementById(item.id).scrollIntoView({ behavior: 'smooth' });
          searchInput.value = '';
          suggestionsBox.style.display = 'none';
        };
        suggestionsBox.appendChild(div);
      });
    } else {
      suggestionsBox.style.display = 'none';
    }
  } else {
    suggestionsBox.style.display = 'none';
  }
});

document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target)) {
    suggestionsBox.style.display = 'none';
  }
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal, .reveal-left').forEach(el => {
  observer.observe(el);
});

window.addEventListener('scroll', () => {
  const navShortcuts = document.querySelector('.nav-shortcuts');
  if (navShortcuts) {
    navShortcuts.style.opacity = window.scrollY > 500 ? '1' : '0.7';
  }
});

(function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const wrapper = track.parentElement;
  const cards = track.querySelectorAll('.card');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dots = document.querySelectorAll('.carousel-dot');

  let current = 0;
  let autoPlayTimer = null;
  let touchStartX = 0;
  let isDragging = false;

  function updateCarousel(animated) {
    if (animated === false) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.55s cubic-bezier(0.25, 0.1, 0.25, 1)';
    }
    const cardWidth = wrapper.offsetWidth;
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));

    cards.forEach((card, i) => {
      const videos = card.querySelectorAll('video');
      videos.forEach(v => {
        if (i === current) {
          v.play().catch(() => { });
        } else {
          v.pause();
        }
      });
    });
  }

  function goTo(index) {
    current = ((index % cards.length) + cards.length) % cards.length;
    updateCarousel();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAutoPlay() {
    autoPlayTimer = setInterval(next, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => { prev(); resetAutoPlay(); });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => { next(); resetAutoPlay(); });
  }

  dots.forEach((d, i) => {
    d.addEventListener('click', () => { goTo(i); resetAutoPlay(); });
  });

  wrapper.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
  wrapper.addEventListener('mouseleave', startAutoPlay);

  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    isDragging = true;
    clearInterval(autoPlayTimer);
  }, { passive: true });

  wrapper.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    isDragging = false;
    startAutoPlay();
  }, { passive: true });

  window.addEventListener('resize', () => updateCarousel(false));

  updateCarousel(false);
  startAutoPlay();

  const videoIds = ['videoPetshop', 'videoEstoque', 'videoElopet', 'videoConfeitaria'];
  videoIds.forEach(id => {
    const video = document.getElementById(id);
    if (video) video.playbackRate = 1.5;
  });
})();
