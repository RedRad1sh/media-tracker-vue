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
          <li :class="this.type === 'AUTH' ? 'tabbase-active' : 'tabbase'" @click="this.type='AUTH'">
            <a href="#" class="text">Авторизация</a>
          </li>
          <li :class="this.type === 'REG' ? 'tabbase-active' : 'tabbase'" @click="this.type='REG'">
            <a href="#" class="text">Регистрация</a>
          </li>
        </ul>
        <div v-if="this.type === 'AUTH'" class="tabs-panel active" data-index="0">
          <div class="description">
            <form class="login-form">
              <label>Введите логин <br>
                <input type="text" required>
              </label>
              <label>Введите пароль <br>
                <input type="password" required>
              </label>
              <p>
                <input @click="authorize()" type="button" value="Войти"/>
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
              <p>
                <input @click="registerUser()" type="button" value="Зарегистрироваться"/>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {config} from "@/config/config";
import axios from "axios";
import router from "@/router/router";

export default {
  name: "LoginPage",
  methods: {
    authorize() {
      // TODO
    },
    registerUser() {
      if (this.newUser.password === this.confirmPassword) {
        const backendUrl = `${config.backend.url}/users`;
        axios.post(backendUrl, this.newUser)
            .then(response => {
              // TODO если бэк будет возвращать состояние авторизованности пользователя, то брать тут из response
              router.push("/");
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
      newUser: {},
      confirmPassword: ""
    }
  },
  mounted() {
    async function init () {
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
        el.innerText = el.innerText.slice(0, el.innerText.length -1);
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