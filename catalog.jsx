// catalog.jsx — seção Catálogo com filtro
const { useState: useStateC, useMemo: useMemoC } = React;

function Catalogo({ layoutStyle, cardStyle, onOpen }) {
  const { PRODUCTS, CATEGORIES } = window.PAPILLON_DATA;
  const [cat, setCat] = useStateC('todos');
  const [view, setView] = useStateC(layoutStyle);

  React.useEffect(() => { setView(layoutStyle); }, [layoutStyle]);

  const list = useMemoC(() => (
    cat === 'todos' ? PRODUCTS : PRODUCTS.filter(p => p.category.includes(cat))
  ), [cat, PRODUCTS]);

  const gridClass = view === 'list' ? 'cat-list' : view === 'masonry' ? 'cat-masonry' : 'cat-grid';

  return (
    <section id="catalogo" className="catalogo" data-screen-label="Catálogo">
      <div className="container">
        <Reveal>
          <div className="section-head section-head-row">
            <div>
              <div className="eyebrow"><span className="eyebrow-dot" />catálogo</div>
              <h2 className="h2 h2-cat">Peças <em>disponíveis</em></h2>
            </div>
            <p className="lead lead-narrow" style={{ marginTop: 'auto' }}>
              {list.length} {list.length === 1 ? 'peça' : 'peças'} · cores podem ser personalizadas sob encomenda
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="cat-bar">
            <div className="cat-tabs" role="tablist">
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  className={`cat-tab ${cat === c.id ? 'on' : ''}`}
                  onClick={() => setCat(c.id)}
                >{c.label}</button>
              ))}
            </div>
            <div className="cat-views">
              {[['grid','grade'],['list','lista']].map(([v, lbl]) => (
                <button
                  key={v}
                  className={`view-btn ${view === v ? 'on' : ''}`}
                  onClick={() => setView(v)}
                  aria-label={lbl}
                  title={lbl}
                >
                  {v === 'grid' && (<svg width="14" height="14" viewBox="0 0 14 14"><rect x="1" y="1" width="5" height="5"/><rect x="8" y="1" width="5" height="5"/><rect x="1" y="8" width="5" height="5"/><rect x="8" y="8" width="5" height="5"/></svg>)}
                  {v === 'list' && (<svg width="14" height="14" viewBox="0 0 14 14"><rect x="1" y="2" width="12" height="2"/><rect x="1" y="6" width="12" height="2"/><rect x="1" y="10" width="12" height="2"/></svg>)}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className={gridClass}>
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 6) * 70}>
              <ProductCard
                product={p}
                layoutStyle={cardStyle}
                view={view === 'list' ? 'list' : 'grid'}
                onOpen={onOpen}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Catalogo = Catalogo;
