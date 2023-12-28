<template>
    <select v-model="selectedValue" @change="switchSelect($event)">
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
    },

    methods:{
      switchSelect(event){
        this.selectedValue = event.target.value;
        let backendUrl = 'http://localhost:3000/add-user-lists';
        const dataToSend = {
        myProp: this.myProp,
        };

        if ( this.selectedValue !== '-')
        {
          axios.post(backendUrl, dataToSend)
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