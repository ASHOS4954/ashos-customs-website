/**
 * AshOS Customs — site configuration
 * Change CONTACT_EMAIL before launch.
 * Set FORMS_ENDPOINT to your Formspree (or similar) URL when ready, e.g.:
 *   FORMS_ENDPOINT: 'https://formspree.io/f/xxxxxxxx'
 */
const SITE_CONFIG = {
  CONTACT_EMAIL: 'hello@ashoscustoms.co.uk',
  FORMS_ENDPOINT: null,
};

const SCREENSHOTS = [
  { png: 'shipment-review.png', svg: 'shipment-review.svg' },
  { png: 'ai-review.png', svg: 'ai-review.svg' },
  { png: 'resolve-items.png', svg: 'resolve-items.svg' },
  { png: 'impact-dashboard.png', svg: 'impact-dashboard.svg' },
  { png: 'product-knowledge.png', svg: 'product-knowledge.svg' },
  { png: 'commercial-invoice.png', svg: 'commercial-invoice.svg' },
];

function screenshotSrc(baseName) {
  const entry = SCREENSHOTS.find((s) => s.png.startsWith(baseName));
  const dir = 'assets/screenshots/';
  if (!entry) return `${dir}${baseName}.svg`;
  return `${dir}${entry.png}`;
}

function initScreenshotFallbacks() {
  document.querySelectorAll('img[data-screenshot]').forEach((img) => {
    const name = img.getAttribute('data-screenshot');
    const entry = SCREENSHOTS.find((s) => s.png.replace('.png', '') === name);
    if (!entry) return;
    const png = `assets/screenshots/${entry.png}`;
    const svg = `assets/screenshots/${entry.svg}`;
    img.src = png;
    img.addEventListener('error', () => {
      img.src = svg;
    }, { once: true });
  });
}

function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const mobile = document.querySelector('.nav-mobile');
  if (!toggle || !mobile) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    mobile.classList.toggle('is-open', !open);
  });

  mobile.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobile.classList.remove('is-open');
    });
  });
}

function initFaq() {
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });
}

function buildMailto(subject, body) {
  return `mailto:${SITE_CONFIG.CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function showFormStatus(form, message, type) {
  let el = form.querySelector('.form-status');
  if (!el) {
    el = document.createElement('div');
    el.className = 'form-status';
    form.appendChild(el);
  }
  el.textContent = message;
  el.className = `form-status is-visible form-status--${type}`;
}

function handleFormSubmit(form, subjectPrefix) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const lines = [];
    for (const [key, value] of data.entries()) {
      if (key === 'consent' && value !== 'on') continue;
      lines.push(`${key}: ${value}`);
    }

    if (SITE_CONFIG.FORMS_ENDPOINT) {
      /*
       * Formspree integration (when FORMS_ENDPOINT is set):
       * fetch(SITE_CONFIG.FORMS_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
       */
      showFormStatus(form, 'Form endpoint is configured but POST handling is not wired yet. Use mailto below.', 'info');
      return;
    }

    const body = lines.join('\n');
    const subject = `${subjectPrefix} — AshOS Customs website`;
    showFormStatus(
      form,
      'No online form backend is connected yet. Your email app will open with a pre-filled message. Review and send when ready.',
      'info'
    );
    window.location.href = buildMailto(subject, body);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScreenshotFallbacks();
  initMobileNav();
  initFaq();

  const invoiceForm = document.getElementById('form-invoice');
  const demoForm = document.getElementById('form-demo');
  if (invoiceForm) handleFormSubmit(invoiceForm, 'Invoice request');
  if (demoForm) handleFormSubmit(demoForm, 'Software demo request');
});
