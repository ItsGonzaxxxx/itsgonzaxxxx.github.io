(() => {
  'use strict';

  // Patrón de "ItsGonzax" repetido (sección de contacto)
  const pattern = document.getElementById('pattern');
  if (pattern) {
    const frag = document.createDocumentFragment();
    for (let r = 0; r < 26; r++) {
      const row = document.createElement('div');
      row.className = 'row';
      row.style.marginLeft = `${-((r * 1.3) % 5).toFixed(2)}em`;
      for (let i = 0; i < 12; i++) {
        const s = document.createElement('span');
        s.textContent = 'ItsGonzax';
        row.appendChild(s);
      }
      frag.appendChild(row);
    }
    pattern.appendChild(frag);
  }

  // Aparición de elementos al hacer scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  // Clic en el contacto de Discord: copia el usuario
  const btn = document.getElementById('discord');
  const toast = document.getElementById('toast');
  if (btn && toast) {
    btn.addEventListener('click', async () => {
      const user = btn.dataset.copy;
      try { await navigator.clipboard.writeText(user); toast.textContent = 'Usuario copiado: ' + user; }
      catch { toast.textContent = 'Discord: ' + user; }
      toast.classList.add('show');
      clearTimeout(btn._t);
      btn._t = setTimeout(() => toast.classList.remove('show'), 2200);
    });
  }
})();
