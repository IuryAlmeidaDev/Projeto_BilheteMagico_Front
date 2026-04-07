export const STORAGE_KEY = 'bilhete-magico-pro-favoritos';

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

export function formatarNumero(numero) {
  return numero.toString().padStart(2, '0');
}

export function analisarNumeros(numeros) {
  const pares = numeros.filter((numero) => numero % 2 === 0).length;
  const soma = numeros.reduce((total, numero) => total + numero, 0);
  const quadrantes = [0, 0, 0, 0];
  let maiorSequencia = 1;
  let sequenciaAtual = 1;

  numeros.forEach((numero, index) => {
    quadrantes[Math.min(Math.floor((numero - 1) / 15), 3)] += 1;

    if (index > 0 && numero === numeros[index - 1] + 1) {
      sequenciaAtual += 1;
      maiorSequencia = Math.max(maiorSequencia, sequenciaAtual);
    } else {
      sequenciaAtual = 1;
    }
  });

  return {
    pares,
    impares: numeros.length - pares,
    soma,
    quadrantes,
    maiorSequencia: numeros.length ? maiorSequencia : 0
  };
}

export function simularHistorico(numeros) {
  const resultado = concursosDemo.map((concurso) => {
    const acertos = numeros.filter((numero) => concurso.includes(numero)).length;
    return { concurso, acertos };
  });

  return {
    melhorAcerto: Math.max(0, ...resultado.map((item) => item.acertos)),
    resultado
  };
}

export function validarTendencias(metricas, quantidade, filtros) {
  if (!metricas.soma) {
    return false;
  }

  const resultados = {
    paresEquilibrados: metricas.pares >= 2 && metricas.pares <= Math.max(4, quantidade - 2),
    somaEquilibrada: metricas.soma >= quantidade * 20 && metricas.soma <= quantidade * 41,
    quadrantesAtivos: metricas.quadrantes.filter(Boolean).length >= 3,
    semSequenciaLonga: metricas.maiorSequencia <= 2
  };

  return Object.entries(resultados).every(([chave, aprovado]) => !filtros[chave] || aprovado);
}

export function criarBilhete(numeros, quantidade, filtros) {
  const metricas = analisarNumeros(numeros);
  const simulacao = simularHistorico(numeros);

  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    numeros,
    metricas,
    simulacao,
    aprovado: validarTendencias(metricas, quantidade, filtros)
  };
}

export function sortearNumeros(quantidade) {
  const numeros = new Set();

  while (numeros.size < quantidade) {
    numeros.add(Math.floor(Math.random() * 60) + 1);
  }

  return [...numeros].sort((a, b) => a - b);
}

export function temSimilaridadeAlta(jogo, historico) {
  return historico.some((bilhete) => {
    const repetidos = jogo.numeros.filter((numero) => bilhete.numeros.includes(numero)).length;
    return repetidos >= Math.max(4, jogo.numeros.length - 2);
  });
}

export function gerarJogoOtimizado({ quantidade, filtros, historico }) {
  const usaAlgumFiltro = Object.values(filtros).some(Boolean);
  const tentativasMaximas = usaAlgumFiltro ? 900 : 1;

  for (let tentativa = 0; tentativa < tentativasMaximas; tentativa += 1) {
    const jogo = criarBilhete(sortearNumeros(quantidade), quantidade, filtros);
    const similaridadeOk = !filtros.evitarSimilares || !temSimilaridadeAlta(jogo, historico);

    if ((!usaAlgumFiltro || jogo.aprovado) && similaridadeOk) {
      return jogo;
    }
  }

  return criarBilhete(sortearNumeros(quantidade), quantidade, filtros);
}

export function carregarFavoritos() {
  try {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  } catch {
    return [];
  }
}

export function salvarFavoritos(lista) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  } catch {
    // O app continua funcionando mesmo se o navegador bloquear o armazenamento.
  }
}
