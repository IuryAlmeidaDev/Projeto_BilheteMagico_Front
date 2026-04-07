import { formatarNumero } from '../lib/ticketEngine';

const CLOVER = '\u{1F340}';

export default function TicketDisplay({
  bilhete,
  animacaoSeed,
  statusAtual,
  resumoSimulador,
  copiarStatus,
  onFavoritar,
  onCopiar,
  onExportar
}) {
  return (
    <section className="panel spotlight-panel">
      <div className="section-heading">
        <span>{CLOVER} 02</span>
        <div>
          <h2>Bilhete em Destaque</h2>
          <p>{statusAtual}</p>
        </div>
      </div>

      <div className="ticket-stage" key={animacaoSeed}>
        {!bilhete.numeros.length ? (
          <p className="empty-state">Clique em gerar para criar um jogo equilibrado automaticamente.</p>
        ) : (
          <div className="ball-grid" aria-label="Números gerados">
            {bilhete.numeros.map((numero, index) => (
              <span
                key={`${animacaoSeed}-${numero}`}
                className="lucky-ball"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                {formatarNumero(numero)}
              </span>
            ))}
          </div>
        )}
      </div>

      {bilhete.numeros.length > 0 && (
        <div className="insights-grid">
          <article>
            <span>Pares/Ímpares</span>
            <strong>{bilhete.metricas.pares} / {bilhete.metricas.impares}</strong>
          </article>
          <article>
            <span>Soma</span>
            <strong>{bilhete.metricas.soma}</strong>
          </article>
          <article>
            <span>Quadrantes</span>
            <strong>{bilhete.metricas.quadrantes.join('-')}</strong>
          </article>
          <article>
            <span>Simulador</span>
            <strong>{resumoSimulador}</strong>
          </article>
        </div>
      )}

      <div className="action-row">
        <button type="button" onClick={onFavoritar} disabled={!bilhete.numeros.length}>
          Favoritar
        </button>
        <button type="button" onClick={onCopiar} disabled={!bilhete.numeros.length}>
          {copiarStatus || 'Copiar jogos'}
        </button>
        <button type="button" onClick={onExportar} disabled={!bilhete.numeros.length}>
          Baixar bilhete
        </button>
      </div>
    </section>
  );
}
