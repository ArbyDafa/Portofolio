(() => {
  const nav = document.querySelector('#site-nav');
  const menuButton = document.querySelector('.menu-toggle');
  const languageButton = document.querySelector('.language-toggle');
  let language = 'en';

  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });

  const translate = () => {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-en][data-id]').forEach((element) => {
      element.textContent = element.dataset[language === 'en' ? 'en' : 'id'];
    });
    languageButton.setAttribute('aria-label', language === 'en' ? 'Switch to Indonesian' : 'Switch to English');
    languageButton.classList.toggle('is-id', language === 'id');
  };

  languageButton.addEventListener('click', () => {
    language = language === 'en' ? 'id' : 'en';
    translate();
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  document.querySelectorAll('[data-placeholder]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });
})();
