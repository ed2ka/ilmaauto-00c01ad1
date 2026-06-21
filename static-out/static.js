// Minimal vanilla interactions for the static export.
(function(){
  // Block form submissions — backend is not bundled.
  document.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Ovo je statična verzija — forme nisu aktivne. Za stvarne narudžbe koristite live verziju sajta.');
  }, true);

  // Make all "button" elements that look like dismiss-X close the announcement bar
  // (best-effort; the bar will simply not be dismissable in static export otherwise).
  document.querySelectorAll('[aria-label="Zatvori"]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var bar = btn.closest('div');
      while (bar && bar.parentElement && bar.parentElement.tagName !== 'BODY') bar = bar.parentElement;
      if (bar) bar.style.display = 'none';
    });
  });

  // FAQ accordions, mobile menu toggles, modal open/close: these are React-driven.
  // In the static snapshot they are captured in their default state. To preview the
  // open state, see the corresponding file in /modali/ if available.
  console.info('ILMA AUTO — statična verzija (samo dizajn, bez backend funkcionalnosti).');
})();
