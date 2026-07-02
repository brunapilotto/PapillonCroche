// data.jsx — carrega config.json, depois busca os dados do produto via config.data_url
// Localmente: data_url aponta para data.json local.
// Em produção: data_url aponta para o GitHub Gist (gerado pelo Netlify via env var).
fetch('config.json')
  .then(r => r.json())
  .then(config => {
    window.PAPILLON_CONFIG = config;
    return fetch(config.data_url).then(r => r.json());
  })
  .then(data => {
    window.PAPILLON_DATA = data;
    window.dispatchEvent(new CustomEvent('papillon-data-ready'));
  });
