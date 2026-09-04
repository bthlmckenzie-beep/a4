// LayerDistrict - Outerwear Layering Interactive Scripts
document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggler (Glacier Night / Alpine Snow Light)
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const rootElement = document.documentElement;
  const savedTheme = localStorage.getItem('ld_theme') || 'dark';
  rootElement.setAttribute('data-theme', savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      rootElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('ld_theme', nextTheme);
    });
  });

  // 2. Mobile Drawer
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerClose = document.querySelector('.drawer-close');

  if (hamburgerBtn && drawer && drawerOverlay) {
    hamburgerBtn.addEventListener('click', () => {
      drawer.classList.add('active');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      drawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  // 3. Reading Progress Bar
  const progressBar = document.querySelector('.reading-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
      }
    });
  }

  // 4. Accordion FAQ
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 5. Interactive Climate Layering Simulator
  const climateBtns = document.querySelectorAll('[data-climate]');
  const shellVal = document.querySelector('#val-shell');
  const midVal = document.querySelector('#val-mid');
  const baseVal = document.querySelector('#val-base');
  const headVal = document.querySelector('#val-head');
  const retVal = document.querySelector('#val-ret');
  const climateTitle = document.querySelector('#climate-display-title');

  const climateData = {
    'arctic-blizzard': {
      title: 'Sub-Zero Alpine Blizzard (-25°C to -10°C)',
      shell: '3-Layer 70D ePTFE Hard Shell',
      mid: '850+ Fill Power Box-Baffle Goose Down',
      base: '260g/m² Heavyweight Merino Wool',
      head: '28,000 mm H₂O (Stormproof)',
      ret: 'RET < 6 (Extreme Breathability)'
    },
    'monsoon-downpour': {
      title: 'Torrential High-Altitude Rain (5°C to 15°C)',
      shell: '3-Layer eVent Direct-Venting Membrane',
      mid: 'Polartec Alpha 90 Active Fleece',
      base: '150g/m² Grid-Knit Hydrophobic Poly',
      head: '30,000 mm H₂O (Maximum Barrier)',
      ret: 'RET < 4 (Maximum Vapor Transfer)'
    },
    'urban-transit': {
      title: 'Windy Urban Commute (0°C to 10°C)',
      shell: 'Halley Stevensons Waxed Cotton Field Shell',
      mid: 'PrimaLoft Gold 60g Synthetic Cardigan',
      base: '200g/m² Midweight Merino Blend',
      head: '10,000 mm H₂O (Heritage Weatherproof)',
      ret: '0.5 CFM Wind-Blocking Comfort'
    }
  };

  climateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      climateBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-climate');
      const d = climateData[key];
      if (d && climateTitle) {
        climateTitle.textContent = d.title;
        if (shellVal) shellVal.textContent = d.shell;
        if (midVal) midVal.textContent = d.mid;
        if (baseVal) baseVal.textContent = d.base;
        if (headVal) headVal.textContent = d.head;
        if (retVal) retVal.textContent = d.ret;
      }
    });
  });

  // 6. Blog Live Search & Category Filter
  const searchInput = document.querySelector('.search-input');
  const filterChips = document.querySelectorAll('.category-filter-chip');
  const blogCards = document.querySelectorAll('.blog-card');

  if (searchInput || filterChips.length > 0) {
    let currentCategory = 'all';
    let currentQuery = '';

    const filterArticles = () => {
      blogCards.forEach(card => {
        const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
        const desc = (card.querySelector('p')?.textContent || '').toLowerCase();
        const cat = (card.getAttribute('data-category') || '').toLowerCase();

        const matchesQuery = !currentQuery || title.includes(currentQuery) || desc.includes(currentQuery);
        const matchesCategory = currentCategory === 'all' || cat === currentCategory;

        if (matchesQuery && matchesCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentQuery = e.target.value.toLowerCase().trim();
        filterArticles();
      });
    }

    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentCategory = (chip.getAttribute('data-filter') || 'all').toLowerCase();
        filterArticles();
      });
    });
  }
});