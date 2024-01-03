<template>
    <select v-model="selectedValue" @change="switchSelect($event)">
      <option value="-">-</option>
      <option v-for="cnttype in arraylist" :key="cnttype" :value="cnttype">{{ cnttype }}</option>
    </select>
  </template>
  
  <script>
  import axios from 'axios';
  import { config } from '@/config/config.js';

  export default {
    props: {
        ObjectType: {
            type: String,
            required: true,
        },
        ObjectId: {
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
        if (this.ObjectType === 'Movie') {
          return ['Запланировано', 'Смотрю', 'Просмотрено'];
        } 
        else if (this.ObjectType === 'Game') {
          return ['Запланировано', 'Прохожу', 'Пройдено'];
        }
        else if (this.ObjectType === 'Book') {
          return ['Запланировано', 'Читаю', 'Прочитано'];
        }
        else { 
          return [];
        }
      },
    },

    methods:{
      switchSelect(event){
        this.selectedValue = event.target.value;
        let backendUrl =  `${config.backend.url}/lists`;

        const dataToSend = {
          user_id : '658891c99f8aaf381016ebd0',
          content_type: this.ObjectType,
          content_id: this.ObjectId,
          action: this.selectedValue
        };
        console.log(dataToSend);

        if ( dataToSend.action !== '-')
        {
          axios.put(backendUrl, dataToSend)
            .then(response => {
               console.log('Успешно отправлено:', response.data);
             })
             .catch(error => {
               console.error('Ошибка при отправке данных:', error);
             });
        } 
      }
    },
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