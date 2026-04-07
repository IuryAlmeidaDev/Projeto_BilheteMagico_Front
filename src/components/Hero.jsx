const CLOVER = '\u{1F340}';

export default function Hero({ children, onGerar }) {
  return (
    <section className="hero-card">
      <div className="clover-field" aria-hidden="true">
        <span>{CLOVER}</span>
        <span>{CLOVER}</span>
        <span>{CLOVER}</span>
      </div>

      <div className="hero-copy">
        <div className="brand-mark">
          <span aria-hidden="true">{CLOVER}</span>
          <div>
            <p className="eyebrow">Bilhete Mágico Pro</p>
            <strong>Palpites equilibrados para Mega-Sena</strong>
          </div>
        </div>
        <h1>Gere jogos com equilíbrio e um toque de sorte.</h1>
        <p>
          Escolha quantas dezenas e quantos jogos quer criar. O sistema cuida
          automaticamente dos filtros inteligentes para entregar palpites mais organizados.
        </p>
        <button className="mega-action" type="button" onClick={onGerar}>
          {CLOVER} Gerar bilhete mágico
        </button>
      </div>

      {children}
    </section>
  );
}
