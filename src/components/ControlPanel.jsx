const CLOVER = '\u{1F340}';

const recursosInteligentes = [
  'Equilibra pares e ímpares para evitar combinações muito extremas.',
  'Mantém a soma das dezenas em uma faixa mais consistente.',
  'Distribui os números entre as quatro faixas da cartela.',
  'Evita sequências longas e jogos muito parecidos com o histórico.'
];

export default function ControlPanel({
  quantidade,
  quantidadeJogos,
  onQuantidadeChange,
  onQuantidadeJogosChange,
  onGerar,
  onLimpar
}) {
  return (
    <aside className="panel control-panel">
      <div className="section-heading">
        <span>{CLOVER} 01</span>
        <div>
          <h2>Configuração do jogo</h2>
          <p>Escolha apenas o tamanho e a quantidade. A inteligência já trabalha por trás.</p>
        </div>
      </div>

      <div className="control-grid">
        <label>
          Dezenas por jogo
          <select value={quantidade} onChange={(event) => onQuantidadeChange(Number(event.target.value))}>
            {[6, 7, 8, 9, 10].map((valor) => (
              <option key={valor} value={valor}>
                {valor} dezenas
              </option>
            ))}
          </select>
        </label>

        <label>
          Quantos jogos gerar
          <select value={quantidadeJogos} onChange={(event) => onQuantidadeJogosChange(Number(event.target.value))}>
            {[1, 10, 20, 50].map((valor) => (
              <option key={valor} value={valor}>
                {valor} jogo{valor > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="smart-info-card">
        <div className="smart-info-icon" aria-hidden="true">{CLOVER}</div>
        <div>
          <h3>Filtros inteligentes ativos</h3>
          <p>O gerador analisa cada palpite antes de mostrar o resultado, sem você precisar configurar nada.</p>
          <ul>
            {recursosInteligentes.map((recurso) => (
              <li key={recurso}>{recurso}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sound-card">
        <div className="sound-dot" aria-hidden="true" />
        <div>
          <strong>Som mágico</strong>
          <span>Ativado automaticamente quando você gera novos jogos.</span>
        </div>
      </div>

      <div className="panel-actions">
        <button className="primary-action" type="button" onClick={onGerar}>
          Gerar bilhete mágico
        </button>
        <button className="ghost-action" type="button" onClick={onLimpar}>
          Limpar histórico
        </button>
      </div>
    </aside>
  );
}
