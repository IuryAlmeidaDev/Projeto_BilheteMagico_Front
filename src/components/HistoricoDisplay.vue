<template>
  <div id="historico">
    <div class="historico-bilhete" v-for="(bilhete, index) in historico" :key="index">
      {{ bilhete.join(' - ') }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  historico: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
@keyframes aparecer {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

#historico {
  border: 5px solid #FFD700;
  margin-top: 20px;
  padding: 20px;
  background-color: #4CAF50;
  border-radius: 10px;
  width: 100%;
  max-width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: #FFD700 #4CAF50;
}

.historico-bilhete {
  border: 3px solid #FFD700;
  font-size: 1.2em;
  background-color: #f4f4f4;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(-10px);
  animation: aparecer 0.5s ease forwards;
}
</style>