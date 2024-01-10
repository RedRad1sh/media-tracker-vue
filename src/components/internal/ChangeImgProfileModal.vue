<template>
    <div class="dialog" v-if="show === true" >
      <div class="dialog-contetnt">
        <div class="input-box">
            <img src="@/assets/general_assets/image-modal.svg">
            <input type="text" required v-model="inputUrl" />
            <label>Вставте ссылку на изображение</label>
        </div>
        <button class="btn-change" @click="sendChanges">Применить</button>
      </div>
      <div class="overlay" @click="closeModal"></div>
    </div>
</template>
<script>
import { config } from '@/config/config.js';
import axios from "axios";
import UserStorage from "@/service/user-storage-service";

export default {
  props: {
      show: {
        type: Boolean,
        default: false,
    },
  },
  data() {
    return {
      inputUrl: '',
    };
  },
  mounted() {
  
  },
  methods:{
    sendChanges(){
      let backendUrl =  `${config.backend.url}/profile/update-img`;
      const dataToSend = {
          user_id : UserStorage.getUser().id,
          new_img_url: this.inputUrl
        };
      console.log(dataToSend);
      if (dataToSend.new_img_url !== ''){
        axios.put(backendUrl, dataToSend)
            .then(response => {
              this.inputUrl = '';
              this.$emit('closeModal');
             })
             .catch(error => {
               console.error('Ошибка при отправке данных:', error);
             });
      }
    },
    closeModal(){
        this.inputUrl = '';
        this.$emit('closeModal');
    }
  },
}
</script>
<style scoped>
.dialog{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    display: flex;
    z-index: 100;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
    z-index: 0;
}

.dialog-contetnt{
    position: relative;
    margin: auto;
    background: #150c16;
    border-radius: 20px;
    min-width: 50px;
    min-height: 50px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
}

.input-box{
    position: relative;
    width: 100%;
    height: 45px;
    border-bottom: 1px solid white;
    margin: 30px 0;
}

.input-box input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    padding: 15px 40px 0 5px;
    color: white;
    font-size: 18px;
    font-weight: 400;
    box-sizing: border-box;
}

.input-box label {
    position: absolute;
    top: 25px;
    left: 5px;
    transform: translateY(-68%);
    font-size: 20px;
    font-weight: 400;
    color: #ffdace;
    pointer-events: none;
}

.input-box img {
    position: absolute;
    top: 10px;
    right: 8px;
    width: 30px;
}

.btn-change{
    background-color: #0971c7;
    color: #fff;
    border: none;
    text-align: center;
    padding: 8px;
    font-size: 17px;
    font-weight: 500;
    border-radius: 8px;
    min-width: 150px;
    cursor: pointer;
}
.input-box input:focus ~ label, .input-box input:valid ~ label
  {
    top: 0px ;
  }

</style>