// sections.jsx — seções do site (Hero, Sobre, Processo, Depoimentos, Encomendas, Contato, Footer, Nav)
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

// ─── Nav fixo
function Nav({ onJump }) {
  const [scrolled, setScrolled] = useStateS(false);
  const [open, setOpen] = useStateS(false);
  useEffectS(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    ['catalogo', 'Catálogo'],
    ['sobre', 'Sobre'],
    ['processo', 'Processo'],
    ['depoimentos', 'Depoimentos'],
    ['encomendas', 'Encomendas'],
  ];

  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`} data-screen-label="Nav">
      <div className="nav-inner">
        <button className="nav-brand" onClick={() => onJump('top')}>
          <Logo size={64} />
        </button>
        <div className="nav-links">
          {items.map(([id, label]) => (
            <button key={id} onClick={() => onJump(id)} className="nav-link">{label}</button>
          ))}
        </div>
        <a className="nav-cta" href={`https://wa.me/${window.PAPILLON_CONFIG.whatsapp}`} target="_blank" rel="noopener">
          <Icon.WhatsApp size={20} /> WhatsApp
        </a>
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="nav-mobile">
          {items.map(([id, label]) => (
            <button key={id} onClick={() => { onJump(id); setOpen(false); }}>{label}</button>
          ))}
          <a href={`https://wa.me/${window.PAPILLON_CONFIG.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero
function Hero({ onJump }) {
  return (
    <header className="hero" data-screen-label="01 Hero">
      <div className="hero-bg" />
      <div className="hero-deco" aria-hidden="true">crochê</div>
      <div className="hero-center">
        <Reveal delay={120}>
          <h1 className="hero-title">
            Pequenas <em>delicadezas</em><br />
            que duram<br />para sempre
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="hero-sub">
            Bolsas, roupas e presentes em crochê, tecidos um ponto de cada vez
          </p>
        </Reveal>
        <Reveal delay={320}>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => onJump('catalogo')}>
              ver catálogo <Icon.ArrowRight />
            </button>
            <button className="btn-ghost" onClick={() => onJump('sobre')}>
              conhecer a marca
            </button>
          </div>
        </Reveal>
      </div>
    </header>
  );
}

// ─── Sobre
function Sobre() {
  return (
    <section id="sobre" className="sobre" data-screen-label="02 Sobre">
      <div className="container sobre-grid">
        <Reveal>
          <div className="sobre-img">
            <img src="assets/founder.jpeg" alt="Maria Fernanda Pilotto — fundadora do ateliê Papillon" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </Reveal>
        <div className="sobre-text">
          <Reveal><div className="eyebrow"><span className="eyebrow-dot" />a marca</div></Reveal>
          <Reveal delay={100}>
            <h2 className="h2">
              Nasceu de um hobby<br/>e virou um <em>ateliê</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="lead">
              A Papillon Crochê é um pequeno ateliê tocado por <strong>Maria Fernanda Pilotto</strong>. Tudo começou em 2025, com o desejo de transformar o tempo livre em algo bonito e duradouro — e logo virou encomendas, conversas com clientes pelo WhatsApp e peças viajando o Brasil inteiro.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="lead">
              Cada peça é tecida à mão, sem pressa, com fios escolhidos com carinho. A borboleta no nome representa a ideia de transformação — do fio em algo que vai vestir, presentear e durar.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="sobre-sign">
              <div className="sign-script">Maria Fernanda</div>
              <div className="sign-line">fundadora & artesã</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Processo
function Processo() {
  const { PROCESS_STEPS } = window.PAPILLON_DATA;
  return (
    <section id="processo" className="processo" data-screen-label="03 Processo">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow"><span className="eyebrow-dot" />o processo</div>
            <h2 className="h2">Da conversa à <em>entrega</em></h2>
            <p className="lead lead-narrow">
              Toda peça Papillon passa por três etapas
            </p>
          </div>
        </Reveal>
        <div className="process-grid">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <article className="process-card">
                <div className="process-n">{s.n}</div>
                <h3 className="process-title">{s.title}</h3>
                <p className="process-text">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Depoimentos
function Depoimentos() {
  const { TESTIMONIALS } = window.PAPILLON_DATA;
  const [i, setI] = useStateS(0);
  useEffectS(() => {
    const t = setInterval(() => setI(x => (x + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(t);
  }, [TESTIMONIALS.length]);
  const cur = TESTIMONIALS[i];
  return (
    <section id="depoimentos" className="depo" data-screen-label="04 Depoimentos">
      <div className="container">
        <Reveal>
          <div className="section-head" style={{ textAlign: 'center', alignItems: 'center' }}>
            <div className="eyebrow"><span className="eyebrow-dot" />o que dizem</div>
            <h2 className="h2">Feedbacks de quem já <em>recebeu</em></h2>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="depo-card">
            <Icon.Quote size={36} />
            <blockquote key={i} className="depo-text">
              "{cur.text}"
            </blockquote>
            <div className="depo-meta">
              <div>
                <div className="depo-name">{cur.name}</div>
                <div className="depo-loc">{cur.location} · {cur.product}</div>
              </div>
              <div className="depo-dots">
                {TESTIMONIALS.map((_, j) => (
                  <button
                    key={j}
                    className={`depo-dot ${j === i ? 'on' : ''}`}
                    onClick={() => setI(j)}
                    aria-label={`Depoimento ${j + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Encomendas (formulário)
function Encomendas() {
  const [form, setForm] = useStateS({ nome: '', tipo: 'Bolsa', cor: '', tamanho: 'M', prazo: 'Sem pressa', detalhes: '' });
  const [sent, setSent] = useStateS(false);

  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    const msg = `Oi Maria Fernanda! Sou ${form.nome}.%0A%0AGostaria de encomendar uma peça personalizada:%0A• Tipo: ${form.tipo}%0A• Cor: ${form.cor || '—'}%0A• Tamanho: ${form.tamanho}%0A• Detalhes: ${form.detalhes || '—'}`;
    setSent(true);
    setTimeout(() => {
      window.open(`https://wa.me/${window.PAPILLON_CONFIG.whatsapp}?text=${msg}`, '_blank');
    }, 600);
  };

  return (
    <section id="encomendas" className="encomendas" data-screen-label="06 Encomendas">
      <div className="container enc-grid">
        <div className="enc-text">
          <Reveal><div className="eyebrow"><span className="eyebrow-dot" />sob encomenda</div></Reveal>
          <Reveal delay={100}>
            <h2 className="h2">Conta pra gente<br/>o que você <em>imagina</em></h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="lead">
              Bolsa em uma cor específica? Peça pra um momento especial? Preencha as informações e a gente continua a conversa pelo WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <ul className="enc-list">
              <li><span>·</span> prazo médio de 2 a 4 semanas</li>
              <li><span>·</span> sinal de 50% para iniciar</li>
              <li><span>·</span> envio para todo o Brasil</li>
            </ul>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <form className="enc-form" onSubmit={submit}>
            <label className="field">
              <span>seu nome</span>
              <input required value={form.nome} onChange={e => handle('nome', e.target.value)} placeholder="Como podemos te chamar?" />
            </label>
            <div className="field-row">
              <label className="field">
                <span>tipo de peça</span>
                <select value={form.tipo} onChange={e => handle('tipo', e.target.value)}>
                  <option>Bolsa</option><option>Roupa</option><option>Casa</option><option>Outro</option>
                </select>
              </label>
              <label className="field">
                <span>tamanho</span>
                <select value={form.tamanho} onChange={e => handle('tamanho', e.target.value)}>
                  <option>P</option><option>M</option><option>G</option><option>GG</option><option>Único</option>
                </select>
              </label>
            </div>
            <label className="field">
              <span>cor desejada</span>
              <input value={form.cor} onChange={e => handle('cor', e.target.value)} placeholder="Ex: rosa" />
            </label>
            <label className="field">
              <span>detalhes</span>
              <textarea rows="4" value={form.detalhes} onChange={e => handle('detalhes', e.target.value)} placeholder="Conte tudo: ocasião, referências, medidas…" />
            </label>
            <button type="submit" className="btn-primary" disabled={sent}>
              {sent ? 'abrindo WhatsApp…' : <>enviar pedido <Icon.WhatsApp /></>}
            </button>
            <small className="enc-disclaimer">Ao enviar, você abrirá uma conversa no WhatsApp com Maria Fernanda</small>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Contato/Footer
function Footer({ onJump }) {
  return (
    <footer id="contato" className="footer" data-screen-label="07 Contato">
      <div className="container">
        <div className="foot-top">
          <Reveal>
            <div className="foot-brand">
              <LogoMark size={92} dark />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="foot-col">
              <h4>navegar</h4>
              <button onClick={() => onJump('catalogo')}>Catálogo</button>
              <button onClick={() => onJump('sobre')}>Sobre</button>
              <button onClick={() => onJump('processo')}>Processo</button>
              <button onClick={() => onJump('encomendas')}>Encomendas</button>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="foot-col">
              <h4>onde estamos</h4>
              <a href="https://instagram.com/papiloncroche" target="_blank" rel="noopener">
                <Icon.Instagram size={16} /> @papiloncroche
              </a>
              <a href={`https://wa.me/${window.PAPILLON_CONFIG.whatsapp}`} target="_blank" rel="noopener">
                <Icon.WhatsApp size={16} /> WhatsApp
              </a>
              <span>atendimento seg–sáb · 08h às 18h</span>
              <span>envios para todo o Brasil</span>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="foot-col foot-letter">
              <h4>Ajuda</h4>
              <a>Tem alguma dúvida? Manda uma mensagem.</a>
              <form onSubmit={(e) => {
                e.preventDefault();
                const msg = encodeURIComponent(e.target.elements.msg.value);
                window.open(`https://wa.me/${window.PAPILLON_CONFIG.whatsapp}?text=${msg}`, '_blank');
              }}>
                <input name="msg" required placeholder="sua mensagem" />
                <button type="submit"><Icon.WhatsApp size={14} /></button>
              </form>
            </div>
          </Reveal>
        </div>
        <div className="foot-base">
          <span>Papillon Crochê</span>
          <span>Brasil</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, Sobre, Processo, Depoimentos, Encomendas, Footer });
