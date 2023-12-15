<template>
    <select v-model="selectedValue">
      <option value="-">-</option>
      <option v-for="cnttype in arraylist" :key="cnttype" :value="cnttype">{{ cnttype }}</option>
    </select>
  </template>
  
  <script>
  export default {
    props: {
        ObjectType: {
            type: String,
            required: true,
        }
    },

    data() {
      return {
        selectedValue: '-',
      };
    },
    computed:{
      arraylist() {
        if (this.ObjectType === 'FILM') {
          return ['Запланировано', 'Смотрю', 'Просмотрено'];
        } 
        else if (this.ObjectType === 'GAME') {
          return ['Запланировано', 'Прохожу', 'Пройдено'];
        }
        else if (this.ObjectType === 'BOOK') {
          return ['Запланировано', 'Читаю', 'Прочитано'];
        }
        else { 
          return [];
        }
      },
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