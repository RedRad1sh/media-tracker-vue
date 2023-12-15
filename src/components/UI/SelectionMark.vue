<template>
    <select v-model="selectedValue">
      <option value="-">-</option>
      <option v-for="number in numbers" :key="number" :value="number">{{ number }}</option>
    </select>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedValue: '-',
        numbers: Array.from({ length: 10 }, (_, index) => index + 1)
      };
    }
  };
  </script>
  
  <style scoped>
    select {
      position: relative;
      transition: border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
      border: 0;
      font-family: var(--dl-font-family);
      text-align: center;
      background: rgba(100, 100, 255, 0.3);
      color: white;
      font-size: 20px;
      padding: 5px;
      height: 35px;
    }
  </style>