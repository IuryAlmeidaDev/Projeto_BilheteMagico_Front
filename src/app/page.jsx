'use client';

import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'bilhete-magico-pro-favoritos';
const concursosDemo = [
  [4, 5, 10, 34, 58, 59],
  [9, 18, 23, 42, 47, 49],
  [13, 16, 17, 34, 41, 47],
  [1, 12, 33, 41, 53, 56],
  [6, 17, 22, 29, 40, 59],
  [10, 25, 31, 37, 38, 57],
  [3, 15, 27, 36, 48, 60],
  [2, 11, 28, 32, 37, 49]
];

function formatarNumero(numero) {
  return numero.toString().padStart(2, '0');
}

function analisarNumeros(numeros) {
  const pares = numeros.filter((numero) => numero % 2 === 0).length;
  const soma = numeros.reduce((total, numero) => total + numero, 0);
  const quadrantes = [0, 0, 0, 0];

  numeros.forEach((numero) => {
    quadrantes[Math.min(Math.floor((numero - 1) / 15), 3)] += 1;
  });

  return {
    pares,
    impares: numeros.length - pares,
    soma,
    quadrantes
  };
}

function simularHistorico(numeros) {
  const resultado = concursosDemo.map((concurso) => {
    const acertos = numeros.filter((numero) => concurso.includes(numero)).length;
    return { concurso, acertos };
  });

  return {
    melhorAcerto: Math.max(0, ...resultado.map((item) => item.acertos)),
    resultado
  };
}

function validarTendencias(metricas, quantidade) {
  if (!metricas.soma) {
    return false;
  }

  const paresEquilibrados = metricas.pares >= 2 && metricas.pares <= Math.max(4, quantidade - 2);
  const somaEquilibrada = metricas.soma >= quantidade * 20 && metricas.soma <= quantidade * 41;
  const quadrantesAtivos = metricas.quadrantes.filter(Boolean).length >= 3;

  return paresEquilibrados && somaEquilibrada && quadrantesAtivos;
}

function criarBilhete(numeros, quantidade) {
  const metricas = analisarNumeros(numeros);
  const simulacao = simularHistorico(numeros);

  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    numeros,
    metricas,
    simulacao,
    aprovado: validarTendencias(metricas, quantidade)
  };
}

function sortearNumeros(quantidade) {
  const numeros = new Set();

  while (numeros.size < quantidade) {
    numeros.add(Math.floor(Math.random() * 60) + 1);
  }

  return [...numeros].sort((a, b) => a - b);
}

function carregarFavoritos() {
  try {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  } catch {
    return [];
  }
}

function salvarFavoritos(lista) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  } catch {
    // O app continua funcionando mesmo se o navegador bloquear o armazenamento.
  }
}

export default function Home() {
  const [quantidade, setQuantidade] = useState(6);
  const [quantidadeJogos, setQuantidadeJogos] = useState(1);
  const [usarFiltros, setUsarFiltros] = useState(true);
  const [somAtivo, setSomAtivo] = useState(false);
  const [animacaoSeed, setAnimacaoSeed] = useState(0);
  const [historicoBilhetes, setHistoricoBilhetes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [bilheteAtual, setBilheteAtual] = useState(() => criarBilhete([], 6));

  useEffect(() => {
    setFavoritos(carregarFavoritos());
  }, []);

  useEffect(() => {
    salvarFavoritos(favoritos);
  }, [favoritos]);

  const statusAtual = useMemo(() => {
    if (!bilheteAtual.numeros.length) {
      return 'Aguardando o primeiro sorteio inteligente.';
    }

    return bilheteAtual.aprovado
      ? 'Jogo dentro da zona estatistica configurada.'
      : 'Jogo criado sem todos os filtros de tendencia.';
  }, [bilheteAtual]);

  const resumoSimulador = useMemo(() => {
    if (!bilheteAtual.numeros.length) {
      return 'Sem dados';
    }

    const melhor = bilheteAtual.simulacao.melhorAcerto;
    return melhor >= 4 ? `${melhor} acertos demo` : 'Sem quadra demo';
  }, [bilheteAtual]);

  const taxaOtimizacao = useMemo(() => {
    if (!historicoBilhetes.length) {
      return 100;
    }

    const aprovados = historicoBilhetes.filter((jogo) => jogo.aprovado).length;
    return Math.round((aprovados / historicoBilhetes.length) * 100);
  }, [historicoBilhetes]);

  function gerarJogoOtimizado() {
    const tentativasMaximas = usarFiltros ? 700 : 1;

    for (let tentativa = 0; tentativa < tentativasMaximas; tentativa += 1) {
      const jogo = criarBilhete(sortearNumeros(quantidade), quantidade);
      if (!usarFiltros || jogo.aprovado) {
        return jogo;
      }
    }

    return criarBilhete(sortearNumeros(quantidade), quantidade);
  }

  function tocarSomMagico() {
    if (!somAtivo) {
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      return;
    }

    const contexto = new AudioContext();
    const oscilador = contexto.createOscillator();
    const ganho = contexto.createGain();

    oscilador.type = 'triangle';
    oscilador.frequency.setValueAtTime(520, contexto.currentTime);
    oscilador.frequency.exponentialRampToValueAtTime(880, contexto.currentTime + 0.18);
    ganho.gain.setValueAtTime(0.001, contexto.currentTime);
    ganho.gain.exponentialRampToValueAtTime(0.08, contexto.currentTime + 0.03);
    ganho.gain.exponentialRampToValueAtTime(0.001, contexto.currentTime + 0.22);
    oscilador.connect(ganho).connect(contexto.destination);
    oscilador.start();
    oscilador.stop(contexto.currentTime + 0.24);
  }

  function gerarBilhetes() {
    const novosJogos = Array.from({ length: quantidadeJogos }, () => gerarJogoOtimizado());

    setHistoricoBilhetes((historico) => [...novosJogos, ...historico].slice(0, 80));
    setBilheteAtual(novosJogos[0]);
    setAnimacaoSeed((seed) => seed + 1);
    tocarSomMagico();
  }

  function favoritarBilhete(bilhete) {
    const chave = bilhete.numeros.join('-');

    setFavoritos((lista) => {
      const jaExiste = lista.some((favorito) => favorito.numeros.join('-') === chave);
      return jaExiste
        ? lista.filter((favorito) => favorito.numeros.join('-') !== chave)
        : [bilhete, ...lista].slice(0, 30);
    });
  }

  async function copiarJogos() {
    const texto = historicoBilhetes
      .map((jogo, index) => `Jogo ${index + 1}: ${jogo.numeros.map(formatarNumero).join(' - ')}`)
      .join('\n');

    await navigator.clipboard.writeText(texto);
  }

  function exportarBilhete() {
    const numeros = bilheteAtual.numeros.map(formatarNumero).join('   ');
    const svg = `
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#150722"/>
      <stop offset="0.55" stop-color="#3b1066"/>
      <stop offset="1" stop-color="#08040f"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1080" rx="80" fill="url(#bg)"/>
  <text x="90" y="180" fill="#f6d66f" font-size="72" font-family="Arial" font-weight="700">Bilhete Magico Pro</text>
  <text x="90" y="270" fill="#ffffff" font-size="38" font-family="Arial">Jogo otimizado da Mega-Sena</text>
  <text x="90" y="560" fill="#ffffff" font-size="80" font-family="Arial" font-weight="700">${numeros}</text>
  <text x="90" y="850" fill="#cbb7ff" font-size="36" font-family="Arial">Soma ${bilheteAtual.metricas.soma} | Pares ${bilheteAtual.metricas.pares} | Impares ${bilheteAtual.metricas.impares}</text>
</svg>`;
    const blob = new Blob([svg.trim()], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'bilhete-magico-pro.svg';
    link.click();
    URL.revokeObjectURL(url);
  }

  function limparHistorico() {
    setHistoricoBilhetes([]);
    setBilheteAtual(criarBilhete([], quantidade));
  }

  function isFavorito(bilhete) {
    const chave = bilhete.numeros.join('-');
    return favoritos.some((favorito) => favorito.numeros.join('-') === chave);
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div className="clover-field" aria-hidden="true">
          <span>🍀</span>
          <span>🍀</span>
          <span>🍀</span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true">🍀</span> Bilhete Magico Pro</p>
          <h1>Engenharia de sorteios com toque de sorte.</h1>
          <p>
            Gere jogos da Mega-Sena com filtros de tendencia, leitura instantanea
            de padroes e exportacao pronta para compartilhar.
          </p>
        </div>

        <div className="hero-stats" aria-label="Resumo do gerador">
          <div>
            <strong>{historicoBilhetes.length}</strong>
            <span>jogos criados</span>
          </div>
          <div>
            <strong>{favoritos.length}</strong>
            <span>favoritos</span>
          </div>
          <div>
            <strong>{taxaOtimizacao}%</strong>
            <span>aprovados</span>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <aside className="panel control-panel">
          <div className="section-heading">
            <span>🍀 01</span>
            <div>
              <h2>Motor de Geracao</h2>
              <p>Configure a estrategia antes de sortear.</p>
            </div>
          </div>

          <label>
            Dezenas por jogo
            <select value={quantidade} onChange={(event) => setQuantidade(Number(event.target.value))}>
              {[6, 7, 8, 9, 10].map((valor) => (
                <option key={valor} value={valor}>
                  {valor} dezenas
                </option>
              ))}
            </select>
          </label>

          <label>
            Volume de jogos
            <select value={quantidadeJogos} onChange={(event) => setQuantidadeJogos(Number(event.target.value))}>
              {[1, 10, 20, 50].map((valor) => (
                <option key={valor} value={valor}>
                  {valor} jogo{valor > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </label>

          <div className="toggle-card">
            <input
              id="filtro"
              checked={usarFiltros}
              type="checkbox"
              onChange={(event) => setUsarFiltros(event.target.checked)}
            />
            <label htmlFor="filtro">
              <strong>Filtros de tendencia</strong>
              <span>Pares/impares, soma e quadrantes equilibrados.</span>
            </label>
          </div>

          <div className="toggle-card">
            <input
              id="audio"
              checked={somAtivo}
              type="checkbox"
              onChange={(event) => setSomAtivo(event.target.checked)}
            />
            <label htmlFor="audio">
              <strong>Som magico</strong>
              <span>Feedback sonoro curto via Web Audio API.</span>
            </label>
          </div>

          <button className="primary-action" type="button" onClick={gerarBilhetes}>
            Gerar bilhete magico
          </button>
          <button className="ghost-action" type="button" onClick={limparHistorico}>
            Limpar historico
          </button>
        </aside>

        <section className="panel spotlight-panel">
          <div className="section-heading">
            <span>🍀 02</span>
            <div>
              <h2>Bilhete em Destaque</h2>
              <p>{statusAtual}</p>
            </div>
          </div>

          <div className="ticket-stage" key={animacaoSeed}>
            {!bilheteAtual.numeros.length ? (
              <p className="empty-state">Clique em gerar para revelar as dezenas com efeito magico.</p>
            ) : (
              <div className="ball-grid" aria-label="Numeros gerados">
                {bilheteAtual.numeros.map((numero, index) => (
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

          {bilheteAtual.numeros.length > 0 && (
            <div className="insights-grid">
              <article>
                <span>Pares/Impares</span>
                <strong>{bilheteAtual.metricas.pares} / {bilheteAtual.metricas.impares}</strong>
              </article>
              <article>
                <span>Soma</span>
                <strong>{bilheteAtual.metricas.soma}</strong>
              </article>
              <article>
                <span>Quadrantes</span>
                <strong>{bilheteAtual.metricas.quadrantes.join('-')}</strong>
              </article>
              <article>
                <span>Simulador</span>
                <strong>{resumoSimulador}</strong>
              </article>
            </div>
          )}

          <div className="action-row">
            <button type="button" onClick={() => favoritarBilhete(bilheteAtual)} disabled={!bilheteAtual.numeros.length}>
              Favoritar
            </button>
            <button type="button" onClick={copiarJogos} disabled={!historicoBilhetes.length}>
              Copiar jogos
            </button>
            <button type="button" onClick={exportarBilhete} disabled={!bilheteAtual.numeros.length}>
              Exportar SVG
            </button>
          </div>
        </section>

        <section className="panel history-list history-panel">
          <div className="section-heading">
            <span>🍀 03</span>
            <div>
              <h2>Teimosinha e Bolao</h2>
              <p>Jogos otimizados prontos para copiar ou favoritar.</p>
            </div>
          </div>

          {!historicoBilhetes.length && (
            <div className="empty-history">
              Nenhum jogo gerado ainda. O historico aparece aqui em lotes de 1, 10, 20 ou 50.
            </div>
          )}

          {historicoBilhetes.map((bilhete, index) => (
            <article key={bilhete.id} className="history-item">
              <div>
                <span className="history-index">Jogo {index + 1}</span>
                <strong>{bilhete.numeros.map(formatarNumero).join(' - ')}</strong>
              </div>
              <div className="history-meta">
                <span>Soma {bilhete.metricas.soma}</span>
                <span>{bilhete.metricas.pares}P/{bilhete.metricas.impares}I</span>
                <span>{bilhete.aprovado ? 'Otimizado' : 'Livre'}</span>
              </div>
              <button type="button" onClick={() => favoritarBilhete(bilhete)}>
                {isFavorito(bilhete) ? 'Remover' : 'Favoritar'}
              </button>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
