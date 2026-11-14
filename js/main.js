(() => {
  'use strict';

  // Patrón de "ItsGonzax" repetido (sección de contacto).
  // Filas y palabras se calculan según el tamaño real, así siempre cubre todo (sin huecos con ningún zoom).
  const pattern = document.getElementById('pattern');
  const buildPattern = () => {
    if (!pattern) return;
    const fs = parseFloat(getComputedStyle(pattern).fontSize) || 16;
    const rows = Math.ceil(pattern.offsetHeight / (fs * 1.22)) + 3;
    const words = Math.ceil(pattern.offsetWidth / (fs * 5)) + 4;
    const frag = document.createDocumentFragment();
    for (let r = 0; r < rows; r++) {
      const row = document.createElement('div');
      row.className = 'row';
      row.style.marginLeft = `${-((r * 1.3) % 5).toFixed(2)}em`;
      for (let i = 0; i < words; i++) {
        const s = document.createElement('span');
        s.textContent = 'ItsGonzax';
        row.appendChild(s);
      }
      frag.appendChild(row);
    }
    pattern.replaceChildren(frag);
  };
  buildPattern();
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(buildPattern, 200); });

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
