'use client';

import { useEffect, useMemo, useState } from 'react';
import ControlPanel from '../components/ControlPanel';
import FloatingClovers from '../components/FloatingClovers';
import Hero from '../components/Hero';
import HistoryList from '../components/HistoryList';
import StatsCards from '../components/StatsCards';
import TicketDisplay from '../components/TicketDisplay';
import {
  carregarFavoritos,
  criarBilhete,
  formatarNumero,
  gerarJogoOtimizado,
  salvarFavoritos
} from '../lib/ticketEngine';

const FILTROS_INTELIGENTES = {
  paresEquilibrados: true,
  somaEquilibrada: true,
  quadrantesAtivos: true,
  semSequenciaLonga: true,
  evitarSimilares: true
};

export default function Home() {
  const [quantidade, setQuantidade] = useState(6);
  const [quantidadeJogos, setQuantidadeJogos] = useState(1);
  const somAtivo = true;
  const [animacaoSeed, setAnimacaoSeed] = useState(0);
  const [historicoBilhetes, setHistoricoBilhetes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [copiarStatus, setCopiarStatus] = useState('');
  const [bilheteAtual, setBilheteAtual] = useState(() => criarBilhete([], 6, FILTROS_INTELIGENTES));

  useEffect(() => {
    setFavoritos(carregarFavoritos());
  }, []);

  useEffect(() => {
    salvarFavoritos(favoritos);
  }, [favoritos]);

  useEffect(() => {
    if (!copiarStatus) {
      return;
    }

    const timeout = window.setTimeout(() => setCopiarStatus(''), 2000);
    return () => window.clearTimeout(timeout);
  }, [copiarStatus]);

  const statusAtual = useMemo(() => {
    if (!bilheteAtual.numeros.length) {
      return 'Aguardando o primeiro sorteio inteligente.';
    }

    return bilheteAtual.aprovado
      ? 'Jogo dentro da zona estatística configurada.'
      : 'Jogo criado fora de um ou mais filtros Pro.';
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
    const novosJogos = [];

    for (let index = 0; index < quantidadeJogos; index += 1) {
      novosJogos.push(
        gerarJogoOtimizado({
          quantidade,
          filtros: FILTROS_INTELIGENTES,
          historico: [...novosJogos, ...historicoBilhetes]
        })
      );
    }

    setHistoricoBilhetes((historico) => [...novosJogos, ...historico].slice(0, 80));
    setBilheteAtual(novosJogos[0]);
    setAnimacaoSeed((seed) => seed + 1);
    tocarSomMagico();
  }

  function favoritarBilhete(bilhete) {
    if (!bilhete.numeros.length) {
      return;
    }

    const chave = bilhete.numeros.join('-');

    setFavoritos((lista) => {
      const jaExiste = lista.some((favorito) => favorito.numeros.join('-') === chave);
      return jaExiste
        ? lista.filter((favorito) => favorito.numeros.join('-') !== chave)
        : [bilhete, ...lista].slice(0, 30);
    });
  }

  async function copiarJogos() {
    const origem = historicoBilhetes.length ? historicoBilhetes : [bilheteAtual];
    const texto = origem
      .filter((jogo) => jogo.numeros.length)
      .map((jogo, index) => `Jogo ${index + 1}: ${jogo.numeros.map(formatarNumero).join(' - ')}`)
      .join('\n');

    if (!texto) {
      return;
    }

    await navigator.clipboard.writeText(texto);
    setCopiarStatus('Copiado!');
  }

  function exportarBilhete() {
    const numeros = bilheteAtual.numeros.map(formatarNumero).join('   ');
    const svg = `
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#000000"/>
      <stop offset="0.55" stop-color="#02200d"/>
      <stop offset="1" stop-color="#000000"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1080" rx="80" fill="url(#bg)"/>
  <text x="90" y="170" fill="#38ff8e" font-size="76" font-family="Arial" font-weight="700">Bilhete Mágico Pro</text>
  <text x="90" y="265" fill="#d7ffe4" font-size="38" font-family="Arial">Jogo otimizado da Mega-Sena</text>
  <text x="90" y="560" fill="#ffffff" font-size="82" font-family="Arial" font-weight="700">${numeros}</text>
  <text x="90" y="850" fill="#8deeb4" font-size="36" font-family="Arial">Soma ${bilheteAtual.metricas.soma} | Pares ${bilheteAtual.metricas.pares} | Ímpares ${bilheteAtual.metricas.impares}</text>
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
    setBilheteAtual(criarBilhete([], quantidade, FILTROS_INTELIGENTES));
  }

  return (
    <main className="app-shell">
      <FloatingClovers />
      <Hero onGerar={gerarBilhetes}>
        <StatsCards
          historicoTotal={historicoBilhetes.length}
          favoritosTotal={favoritos.length}
          taxaOtimizacao={taxaOtimizacao}
        />
      </Hero>

      <section className="dashboard-grid">
        <ControlPanel
          quantidade={quantidade}
          quantidadeJogos={quantidadeJogos}
          onQuantidadeChange={setQuantidade}
          onQuantidadeJogosChange={setQuantidadeJogos}
          onGerar={gerarBilhetes}
          onLimpar={limparHistorico}
        />

        <TicketDisplay
          bilhete={bilheteAtual}
          animacaoSeed={animacaoSeed}
          statusAtual={statusAtual}
          resumoSimulador={resumoSimulador}
          copiarStatus={copiarStatus}
          onFavoritar={() => favoritarBilhete(bilheteAtual)}
          onCopiar={copiarJogos}
          onExportar={exportarBilhete}
        />

        <HistoryList
          historico={historicoBilhetes}
          favoritos={favoritos}
          onFavoritar={favoritarBilhete}
        />
      </section>
    </main>
  );
}
