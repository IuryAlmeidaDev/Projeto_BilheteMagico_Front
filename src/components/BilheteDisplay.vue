<template>
  <div class="bilhete">
    <span v-for="numero in numeros" :key="numero">{{ numero }}</span>
  </div>
</template>

<script setup>
defineProps({
  numeros: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.bilhete {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  padding: 20px 0;
  margin-top: 20px;
}

.bilhete span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #4caf50;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.5s ease-in;
}
</style>