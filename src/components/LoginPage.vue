<template>
  <div>
    <input type="checkbox" id="nav-toggle" hidden>
    <div class="mask-content"></div>
    <nav class="nav">
      <ul id="nav"></ul>
    </nav>
    <div class="content-login-row">
      <div class="img-container">
        <div class="animated-container">
          <span id="type-text"></span>
          <span class="blinking-cursor">_</span>
        </div>
        <img src="../assets/main-page-images/Dream_Background.png" alt="Main page">
      </div>
      <div class="content-login">
        <ul class="tabs">
          <li :class="this.type === 'AUTH' ? 'tabbase-active' : 'tabbase'" @click="this.type = 'AUTH'">
            <a href="#" class="text">Авторизация</a>
          </li>
          <li :class="this.type === 'REG' ? 'tabbase-active' : 'tabbase'" @click="this.type = 'REG'">
            <a href="#" class="text">Регистрация</a>
          </li>
        </ul>
        <div v-if="this.type === 'AUTH'" class="tabs-panel active" data-index="0">
          <div class="description">
            <form class="login-form">
              <label>Введите логин <br>
                <input v-model="authUser.login" type="text" required>
              </label>
              <label>Введите пароль <br>
                <input v-model="authUser.password" type="password" required>
              </label>
              <div v-if="errorMessage" style="color:red">
                <span>{{ errorMessage }}</span>
              </div>
              <p>
                <input @click="authorize()" type="button" value="Войти" />
              </p>
            </form>
          </div>
        </div>

        <div v-if="this.type === 'REG'" class="tabs-panel active" data-index="1">
          <div class="description">
            <form class="login-form">
              <label>Почта <br>
                <input v-model="newUser.email" type="text" required pattern="^\S+@\S+\.\S+$">
              </label>
              <label>Логин <br>
                <input v-model="newUser.login" type="text" required>
              </label>
              <label>Пароль <br>
                <input v-model="newUser.password" type="password" required minlength="6">
              </label>
              <label>Повторите пароль <br>
                <input v-model="confirmPassword" type="password" required>
              </label>
              <label>Ссылка на фото профиля <br>
                <input v-model="newUser.imgUrl" type="text">
              </label>
              <div v-if="errorMessage" style="color:red">
                <span>{{ errorMessage }}</span>
              </div>
              <p>
                <input @click="registerUser()" type="button" value="Зарегистрироваться" />
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { config } from "@/config/config";
import axios from "axios";
import router from "@/router/router";
import UserStorage from "@/service/user-storage-service";

export default {
  name: "LoginPage",
  methods: {
    authorize() {
      const backendUrl = `${config.backend.url}/users/auth`;
      axios.post(backendUrl, this.authUser)
        .then(response => {
          if (response.data.errorMessage) {
            this.errorMessage = response.data.errorMessage;
          } else {
            this.errorMessage = undefined;
            UserStorage.storeUser(response.data.token, response.data.user);
            location.reload();
          }
        })
        .catch(error => {
          console.error('Ошибка при регистрации пользователя', error);
        });
    },
    registerUser() {
      if (this.newUser.password === this.confirmPassword) {
        const backendUrl = `${config.backend.url}/users`;
        axios.post(backendUrl, this.newUser)
          .then(response => {
            UserStorage.storeUser(response.data.token, response.data.user);
            location.reload();
          })
          .catch(error => {
            console.error('Ошибка при регистрации пользователя', error);
          });
      }
    }
  },
  data() {
    return {
      type: 'AUTH',
      authUser: {},
      newUser: {},
      confirmPassword: "",
      errorMessage: undefined
    }
  },
  mounted() {
    if (UserStorage.isUserAuth()) {
      router.push("/");
      this.$notify({
        group: 'nots',
        type: 'info',
        title: '',
        text: 'Вы авторизованы'
      });
      return;
    }

    async function init() {
      const node = document.querySelector("#type-text")

      await sleep(1000)
      node.innerText = ""

      const whileCondition = true;

      while (whileCondition) {
        await clearText(node, 'Добро пожаловать!');
        await typeText(node, 'Media Tracker')
        await sleep(2000);
        await clearText(node, 'Media Tracker');
        await typeText(node, 'Добро пожаловать!')
        await sleep(2000);
      }
    }

    const sleep = time => new Promise(resolve => setTimeout(resolve, time))

    function typeInterval() {
      const randomMs = 100 * Math.random()
      return randomMs < 50 ? 10 : randomMs
    }

    async function typeText(el, text) {
      for (let character of text) {
        el.innerText += character;
        await sleep(typeInterval());
      }
    }

    async function clearText(el, text) {
      for (let character of text) {
        el.innerText = el.innerText.slice(0, el.innerText.length - 1);
        await sleep(typeInterval());
      }
    }

    init()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/login.scss';
@import '@/assets/css/animated-text.scss';

.content-login-row {
  height: 505px;
}
</style>