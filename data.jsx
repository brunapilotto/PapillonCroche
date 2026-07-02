// data.jsx — carrega data.json e config.json, expõe window.PAPILLON_DATA e window.PAPILLON_CONFIG
// Edite data.json para produtos/categorias/depoimentos. Edite config.json para configurações locais.
Promise.all([
  fetch('data.json').then(r => r.json()),
  fetch('config.json').then(r => r.json()),
]).then(([data, config]) => {
  window.PAPILLON_DATA = data;
  window.PAPILLON_CONFIG = config;
  window.dispatchEvent(new CustomEvent('papillon-data-ready'));
});
