// ============================================================
// Content Data
// ============================================================

const SERVICES = [
  "Personal Assistant Service",
  "Homemaker",
  "24/7 Living-In Care",
  "Companion Care",
  "Companion Travel Services",
  "Alzheimer's & Dementia Care",
  "Postoperative Care",
  "Assistance with Bathing, Feeding & Grooming",
  "Medication Management",
  "Meal Preparation",
  "Shopping & Running Errands",
  "Light House Keeping",
  "Laundry",
  "Accompanying to Appointments",
  "Activities of Daily Living"
];

const TEAM = [
  "Direct Care Worker",
  "Nurses Assistant",
  "Home Health Aide",
  "Personal Care Assistant"
];

const WHY_US = [
  "Urgent help and assistance",
  "Locally owned in Colorado — fully insured and affordable rates",
  "Highly professional, relationship-based care",
  "Medicaid provider",
  "Private insurance / private pay accepted",
  "Services tailored to your needs"
];

// Icons for services
const SERVICE_ICONS = [
  'fa-user-circle',
  'fa-home',
  'fa-clock',
  'fa-hand-holding-heart',
  'fa-plane',
  'fa-brain',
  'fa-heartbeat',
  'fa-bath',
  'fa-pills',
  'fa-utensils',
  'fa-shopping-cart',
  'fa-broom',
  'fa-tshirt',
  'fa-calendar-check',
  'fa-star'
];

// Icons for Why Us
const WHY_ICONS = [
  'fa-bolt',
  'fa-building',
  'fa-handshake',
  'fa-hospital',
  'fa-credit-card',
  'fa-sliders-h'
];

const WHY_DESCRIPTIONS = [
  'Immediate response when you need it most — we\'re here for emergencies and urgent care needs.',
  'Proudly serving Colorado with competitive rates and comprehensive insurance coverage.',
  'Building meaningful connections through compassionate, one-on-one care relationships.',
  'Certified Medicaid provider making quality care accessible to those who need it.',
  'Flexible payment options including private insurance and private pay arrangements.',
  'Customized care plans designed specifically for your loved one\'s unique needs.'
];

// Team avatar icons
const TEAM_ICONS = [
  'fa-user-md',
  'fa-user-nurse',
  'fa-user-plus',
  'fa-user-friends'
];

// ============================================================
// Render Functions
// ============================================================

function renderServiceCards(id, items) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = items.map((text, index) => `
    <div class="service-card" style="transition-delay: ${index * 60}ms">
      <div class="flex items-center gap-3">
        <i class="fas ${SERVICE_ICONS[index % SERVICE_ICONS.length]} icon text-lg"></i>
        <span class="service-name flex-1 text-sm font-semibold text-[#1A2E2A]">${text}</span>
        <span class="service-number text-xs">${String(index + 1).padStart(2, '0')}</span>
      </div>
    </div>
  `).join('');

  // Trigger show animation with staggered delays
  const cards = el.querySelectorAll('.service-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('show');
    }, 150 + (index * 60));
  });
}

function renderTeamCards(id, items) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = items.map((text, index) => `
    <div class="team-card" style="transition-delay: ${index * 100}ms">
      <div class="flex flex-col items-center text-center">
        <div class="team-avatar">
          <i class="fas ${TEAM_ICONS[index % TEAM_ICONS.length]}"></i>
        </div>
        <span class="team-role">${text}</span>
        <span class="team-badge">✦ Certified</span>
      </div>
    </div>
  `).join('');

  // Trigger show animation with staggered delays
  const cards = el.querySelectorAll('.team-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('show');
    }, 100 + (index * 100));
  });
}

function renderWhyCards(id, items) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = items.map((text, index) => `
    <div class="why-card" style="transition-delay: ${index * 80}ms">
      <div class="why-number">${String(index + 1).padStart(2, '0')}</div>
      <div class="flex items-start gap-3">
        <div class="why-icon">
          <i class="fas ${WHY_ICONS[index % WHY_ICONS.length]}"></i>
        </div>
        <div>
          <div class="why-title">${text}</div>
          <div class="why-text">${WHY_DESCRIPTIONS[index % WHY_DESCRIPTIONS.length]}</div>
        </div>
      </div>
    </div>
  `).join('');

  // Trigger show animation with staggered delays
  const cards = el.querySelectorAll('.why-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('show');
    }, 100 + (index * 80));
  });
}

// Render all content
renderServiceCards('serviceList', SERVICES);
renderTeamCards('teamList', TEAM);
renderWhyCards('whyList', WHY_US);

// ============================================================
// Mobile Menu Toggle
// ============================================================

const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

// ============================================================
// Scroll Reveal Animation
// ============================================================

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
} else {
  // Fallback for older browsers
  revealElements.forEach(el => el.classList.add('in-view'));
}

// ============================================================
// Navbar Scroll Effect
// ============================================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============================================================
// Active Nav Link Highlighting
// ============================================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ============================================================
// Smooth Scroll for Anchor Links
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 80;
      const targetPosition = targetElement.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================================
// Footer Year
// ============================================================

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ============================================================
// Lazy Load Animation for Service Cards on Scroll
// ============================================================

const serviceContainer = document.getElementById('serviceList');

if (serviceContainer && 'IntersectionObserver' in window) {
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.service-card:not(.show)');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('show');
          }, 100 + (index * 60));
        });
        serviceObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  serviceObserver.observe(serviceContainer);
}

// ============================================================
// Console Branding
// ============================================================

console.log('%c Promise Comfort Care LLC ', 'background: #14314F; color: #7FC48C; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
console.log('%c Compassionate in-home care you can trust. ', 'color: #4A5E59; font-size: 14px;');
console.log('%c 📞 800-428-9139 | 🌐 promisecomfortcare.net', 'color: #4F9B5C; font-size: 13px;');