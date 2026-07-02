// app.jsx — orquestra tudo: Tweaks, navegação, renderização principal
const { useState: useStateA, useMemo: useMemoA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "marfim",
  "typography": "classico",
  "catalogLayout": "grid",
  "cardStyle": "minimal",
  "dark": false
}/*EDITMODE-END*/;

const PALETTES = {
  marfim:   { '--cream': '#f7f1e5', '--cream-2': '#efe6d3', '--ink': '#1e2a55', '--ink-soft': '#2c3866', '--accent': '#c9a876', '--accent-2': '#b8945e' },
  rose:     { '--cream': '#faf2ee', '--cream-2': '#f3e3dc', '--ink': '#3a1d2c', '--ink-soft': '#5d3247', '--accent': '#d49aa1', '--accent-2': '#b97683' },
  sage:     { '--cream': '#f4f2eb', '--cream-2': '#e7e6da', '--ink': '#2b3a2a', '--ink-soft': '#41523f', '--accent': '#a3a878', '--accent-2': '#8b9263' },
  azulego:  { '--cream': '#f5f1ea', '--cream-2': '#ebe1cf', '--ink': '#142046', '--ink-soft': '#2a3970', '--accent': '#d4b27a', '--accent-2': '#b78f54' },
};

const TYPOGRAPHIES = {
  classico: { '--display': "'Cormorant Garamond', Georgia, serif", '--body': "'Inter', system-ui, sans-serif" },
  editorial:{ '--display': "'Playfair Display', Georgia, serif", '--body': "'DM Sans', system-ui, sans-serif" },
  moderno:  { '--display': "'Fraunces', Georgia, serif", '--body': "'Manrope', system-ui, sans-serif" },
};

function App() {
  const [dataReady, setDataReady] = useStateA(!!window.PAPILLON_DATA);
  useEffectA(() => {
    if (dataReady) return;
    const handler = () => setDataReady(true);
    window.addEventListener('papillon-data-ready', handler);
    return () => window.removeEventListener('papillon-data-ready', handler);
  }, [dataReady]);

  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [openProduct, setOpenProduct] = useStateA(null);

  // aplicar variáveis de paleta + tipografia ao :root
  useEffectA(() => {
    const root = document.documentElement;
    const pal = PALETTES[t.palette] || PALETTES.marfim;
    const typ = TYPOGRAPHIES[t.typography] || TYPOGRAPHIES.classico;
    Object.entries(pal).forEach(([k, v]) => root.style.setProperty(k, v));
    Object.entries(typ).forEach(([k, v]) => root.style.setProperty(k, v));
    document.body.classList.toggle('dark', !!t.dark);
  }, [t.palette, t.typography, t.dark]);

  if (!dataReady) return null;

  const onJump = (id) => {
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Nav onJump={onJump} />
      <Hero onJump={onJump} />
      <Catalogo
        layoutStyle={t.catalogLayout}
        cardStyle={t.cardStyle}
        onOpen={setOpenProduct}
      />
      <Sobre />
      <Processo />
      <Depoimentos />
      <Encomendas />
      <Footer onJump={onJump} />

      <ProductModal product={openProduct} onClose={() => setOpenProduct(null)} />

      {/* WhatsApp flutuante */}
      <a
        href={`https://wa.me/${window.PAPILLON_CONFIG.whatsapp}`}
        target="_blank" rel="noopener"
        className="wa-float"
        aria-label="WhatsApp Papillon"
      >
        <Icon.WhatsApp size={22} />
      </a>

      <TweaksPanel>
        <TweakSection label="Paleta" />
        <TweakRadio
          label="Cor"
          value={t.palette}
          options={[
            { value: 'marfim', label: 'Marfim' },
            { value: 'rose', label: 'Rosé' },
            { value: 'sage', label: 'Sage' },
            { value: 'azulego', label: 'Azulejo' },
          ]}
          onChange={(v) => setTweak('palette', v)}
        />
        <TweakToggle label="Modo escuro" value={t.dark} onChange={(v) => setTweak('dark', v)} />

        <TweakSection label="Tipografia" />
        <TweakRadio
          label="Combinação"
          value={t.typography}
          options={[
            { value: 'classico', label: 'Clássico' },
            { value: 'editorial', label: 'Editorial' },
            { value: 'moderno', label: 'Moderno' },
          ]}
          onChange={(v) => setTweak('typography', v)}
        />

        <TweakSection label="Catálogo" />
        <TweakRadio
          label="Layout"
          value={t.catalogLayout}
          options={[
            { value: 'grid', label: 'Grade' },
            { value: 'masonry', label: 'Tijolo' },
            { value: 'list', label: 'Lista' },
          ]}
          onChange={(v) => setTweak('catalogLayout', v)}
        />
        <TweakRadio
          label="Estilo do card"
          value={t.cardStyle}
          options={[
            { value: 'minimal', label: 'Minimal' },
            { value: 'framed', label: 'Moldura' },
            { value: 'polaroid', label: 'Polaroid' },
          ]}
          onChange={(v) => setTweak('cardStyle', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
