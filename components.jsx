// components.jsx — átomos reutilizáveis: Logo SVG, placeholder, ícones, ProductCard, Modal
const { useState, useEffect, useRef } = React;

const LOGO_SRC = 'assets/logo.png';
const LOGO_LIGHT_SRC = 'assets/logo-light.png';

function Logo({ size = 64 }) {
  return (
    <img src={LOGO_SRC} alt="Papillon Crochê" height={size} style={{ display: 'block' }} />
  );
}

function LogoMark({ size = 80 }) {
  return (
    <img
      src={LOGO_LIGHT_SRC}
      alt="Papillon Crochê"
      style={{ display: 'block', height: size }}
    />
  );
}

// ─── Placeholder de produto (quando não temos foto real) — listras sutis no tom do produto
function ProductPlaceholder({ swatch = 'oklch(0.88 0.03 70)', label = 'foto do produto', aspect = '3/4' }) {
  // When aspect === 'auto' the parent already controls height (e.g. .prod-img-wrap has aspect-ratio).
  const sizeStyle = aspect === 'auto'
    ? { width: '100%', height: '100%' }
    : { width: '100%', aspectRatio: aspect };
  return (
    <div style={{
      position: 'relative',
      ...sizeStyle,
      background: swatch,
      overflow: 'hidden',
      borderRadius: 'inherit',
    }}>
      {/* trama de crochê sugerida com gradientes diagonais */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.10) 0 6px, transparent 6px 12px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.05) 0 6px, transparent 6px 12px)`,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        padding: '14px',
      }}>
        <span style={{
          fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          fontSize: 10, letterSpacing: '0.08em',
          color: 'rgba(0,0,0,0.45)',
          background: 'rgba(255,255,255,0.55)',
          padding: '4px 8px', borderRadius: 2,
          textTransform: 'lowercase',
        }}>{label}</span>
      </div>
    </div>
  );
}

// ─── Ícones inline (linha fina, estilo editorial)
const Icon = {
  WhatsApp: ({ size = 18 }) => (
    <img src="assets/whatsapp-icon.svg" alt="WhatsApp" width={size} height={size} style={{ display: 'block' }} />
  ),
  Instagram: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" />
    </svg>
  ),
  ArrowRight: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Close: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  Quote: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" opacity="0.5">
      <path d="M10 22H4l2-12h6l-2 12zm12 0h-6l2-12h6l-2 12z" />
    </svg>
  ),
  Plus: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
};

// ─── Hook: revela ao rolar
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current || shown) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setShown(true)),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [shown]);
  return [ref, shown];
}

function Reveal({ children, delay = 0, as: Tag = 'div', style, ...rest }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 700ms ease ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ─── Card de produto (suporta 3 estilos: minimal, framed, polaroid)
function ProductCard({ product, layoutStyle = 'minimal', view = 'grid', onOpen }) {
  const [hover, setHover] = useState(false);
  const isPolaroid = layoutStyle === 'polaroid';
  const isFramed = layoutStyle === 'framed';

  const imageBlock = product.imgs ? (
    <img
      src={product.imgs[0]}
      alt={product.name}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        transform: hover ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 900ms cubic-bezier(.2,.7,.2,1)',
      }}
    />
  ) : (
    <div style={{ width: '100%', height: '100%' }}>
      <ProductPlaceholder swatch={product.swatch} label={product.name.toLowerCase()} aspect="auto" />
    </div>
  );

  if (view === 'list') {
    return (
      <button
        onClick={() => onOpen(product)}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        className="prod-list"
      >
        <div className="prod-list-img">{imageBlock}</div>
        <div className="prod-list-body">
          <div className="prod-cat">{product.category.map(c => c.replace('-', ' ')).join(' · ')}</div>
          <div className="prod-name">{product.name}</div>
          <div className="prod-desc">{product.description}</div>
          <span className="prod-price">{product.price}</span>
        </div>
        <div className="prod-list-cta">
          ver peça <Icon.ArrowRight size={14} />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => onOpen(product)}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      className={`prod-card ${isPolaroid ? 'is-polaroid' : ''} ${isFramed ? 'is-framed' : ''}`}
    >
      <div className="prod-img-wrap">
        {imageBlock}
        {product.badge?.length > 0 && (
          <div className="prod-badges">
            {product.badge.map((b, i) => (
              <span key={i} className="prod-badge">{b}</span>
            ))}
          </div>
        )}
        <span className="prod-quick" style={{ opacity: hover ? 1 : 0 }}>
          mais informações <Icon.Plus size={12} />
        </span>
      </div>
      <div className="prod-card-body">
        <div className="prod-row">
          <div>
            <div className="prod-name">{product.name}</div>
          </div>
          <div className="prod-price">{product.price}</div>
        </div>
      </div>
    </button>
  );
}

// ─── Product Modal (quick-view)
function ProductModal({ product, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => { setImgIdx(0); }, [product]);

  useEffect(() => {
    if (!product) return;
    const imgs = product.imgs || (product.img ? [product.img] : []);
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowLeft') setImgIdx(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setImgIdx(i => Math.min(imgs.length - 1, i + 1));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [product, onClose]);

  if (!product) return null;
  const waMsg = encodeURIComponent(`Oi Maria Fernanda! Tenho interesse na peça "${product.name}" (${product.price}). Pode me contar mais?`);
  const waLink = `https://wa.me/${window.PAPILLON_CONFIG.whatsapp}?text=${waMsg}`;

  const imgs = product.imgs || (product.img ? [product.img] : []);
  const hasMany = imgs.length > 1;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <Icon.Close />
        </button>
        <div className="modal-img">
          <div className="mg-frame">
            {imgs.length > 0 ? (
              <img key={imgIdx} src={imgs[imgIdx]} alt={`${product.name} ${imgIdx + 1}`} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
            ) : (
              <ProductPlaceholder swatch={product.swatch} label={product.name.toLowerCase()} aspect="auto" />
            )}
          </div>
          {hasMany && (
            <>
              <button className="mg-prev" onClick={e => { e.stopPropagation(); setImgIdx(i => Math.max(0, i - 1)); }} disabled={imgIdx === 0} aria-label="Anterior">
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button className="mg-next" onClick={e => { e.stopPropagation(); setImgIdx(i => Math.min(imgs.length - 1, i + 1)); }} disabled={imgIdx === imgs.length - 1} aria-label="Próxima">
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
              <div className="mg-dots">
                {imgs.map((_, j) => (
                  <button key={j} className={`mg-dot ${j === imgIdx ? 'on' : ''}`} onClick={e => { e.stopPropagation(); setImgIdx(j); }} aria-label={`Imagem ${j + 1}`} />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="modal-body">
          <div className="prod-cat">{product.category.map(c => c.replace('-', ' ')).join(' · ')}</div>
          <h3 className="modal-title">{product.name}</h3>
          <div className="modal-price">{product.price}</div>
          <p className="modal-desc">{product.description}</p>
          <ul className="modal-details">
            {product.details.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
          <a href={waLink} target="_blank" rel="noopener" className="btn-primary">
            <Icon.WhatsApp /> Encomendar pelo WhatsApp
          </a>
          <div className="modal-foot">
            Outras cores sob encomenda
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  Logo, LogoMark, ProductPlaceholder, Icon, Reveal,
  ProductCard, ProductModal,
});
