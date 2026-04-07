import { formatarNumero } from '../lib/ticketEngine';

const CLOVER = '\u{1F340}';

export default function HistoryList({ historico, favoritos, onFavoritar }) {
  function isFavorito(bilhete) {
    const chave = bilhete.numeros.join('-');
    return favoritos.some((favorito) => favorito.numeros.join('-') === chave);
  }

  return (
    <section className="panel history-list history-panel">
      <div className="section-heading">
        <span>{CLOVER} 03</span>
        <div>
          <h2>Teimosinha e Bolão</h2>
          <p>Jogos otimizados prontos para copiar ou favoritar.</p>
        </div>
      </div>

      {!historico.length && (
        <div className="empty-history">
          Nenhum jogo gerado ainda. O histórico aparece aqui em lotes de 1, 10, 20 ou 50.
        </div>
      )}

      {historico.map((bilhete, index) => (
        <article key={bilhete.id} className="history-item">
          <div>
            <span className="history-index">Jogo {index + 1}</span>
            <strong>{bilhete.numeros.map(formatarNumero).join(' - ')}</strong>
          </div>
          <div className="history-meta">
            <span>Soma {bilhete.metricas.soma}</span>
            <span>{bilhete.metricas.pares}P/{bilhete.metricas.impares}I</span>
            <span>Seq. {bilhete.metricas.maiorSequencia}</span>
            <span>{bilhete.aprovado ? 'Otimizado' : 'Livre'}</span>
          </div>
          <button type="button" onClick={() => onFavoritar(bilhete)}>
            {isFavorito(bilhete) ? 'Remover' : 'Favoritar'}
          </button>
        </article>
      ))}
    </section>
  );
}
