<template>
  <div class="container" :class="{ animar: animarContainer }">
    <h1>BilheteMágico</h1>
    <div class="controle">
      <label for="quantidade">Escolha a quantidade de números:</label>
      <select id="quantidade" v-model="quantidade">
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <button @click="gerarBilhete">Gerar</button>
      <button @click="limparHistorico">Limpar</button>
    </div>

    <BilheteDisplay :numeros="bilheteAtual" />

    <HistoricoDisplay 
      v-if="historicoBilhetes.length > 0" 
      :historico="historicoBilhetes" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BilheteDisplay from './components/BilheteDisplay.vue';
import HistoricoDisplay from './components/HistoricoDisplay.vue';

const quantidade = ref(6);
const bilheteAtual = ref([]);
const historicoBilhetes = ref([]);
const animarContainer = ref(false);

function gerarBilhete() {
  const numeros = [];
  while (numeros.length < quantidade.value) {
    const num = (Math.floor(Math.random() * 60) + 1).toString().padStart(2, '0');
    if (!numeros.includes(num)) {
      numeros.push(num);
    }
  }
  
  // Organizando em ordem crescente
  const numerosOrdenados = [...numeros].sort((a, b) => parseInt(a) - parseInt(b));
  
  bilheteAtual.value = numerosOrdenados;
  historicoBilhetes.value.push(numerosOrdenados);
  
  // Animação do container
  animarContainer.value = false;
  setTimeout(() => {
    animarContainer.value = true;
  }, 10);
}

function limparHistorico() {
  historicoBilhetes.value = [];
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  background: url('@/assets/fundo.png') no-repeat center center fixed;
  background-size: cover;
}

@keyframes atualizarContainer {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.container {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  min-height: 400px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.animar {
  animation: atualizarContainer 0.5s ease-in-out;
}

h1 {
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  color: white;
  background-color: #4CAF50;
  padding: 12px 20px;
  font-family: 'Bungee', sans-serif;
  font-size: 2.8em;
  border-radius: 10px;
  border: 4px solid #FFD700;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.controle {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  width: 100%;
}

label {
  font-size: 1.1em;
}

select {
  padding: 12px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  border: 3px solid #FFD700;
  background-color: #4CAF50;
  color: white;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: background-color 0.3s;
}

select:hover {
  background-color: #45a049;
}

select:focus {
  outline: none;
  border-color: #3e8e41;
  box-shadow: 0 0 5px rgba(0, 128, 0, 0.5);
}

button {
  border: 3px solid #FFD700;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s;
  cursor: pointer;
  width: auto;
}

button:hover {
  background-color: #45a049;
}

.controle button {
  padding: 10px 20px;
  font-size: 1.1em;
}
</style>