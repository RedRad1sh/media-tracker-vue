<template>
  <input type="checkbox" id="nav-toggle" hidden>
  <div class="mask-content"></div>
  <nav class="nav">
    <ul id="nav"></ul>
  </nav>
  <div class="block">
    <div class="content-main">
      <div class="description">
        <h1>Добро пожаловать на MediaTracker</h1>
        <div class="block-row">
          <div class="information">
            <br>
            <h2>Ваш личный гид в мире развлечений!</h2>
            <br>
            <p>
              Здесь, на MediaTracker, мы предлагаем вам полный контроль над вашими развлекательными
              предпочтениями.
            </p>
            <p>
              Отслеживайте свои любимые фильмы, сериалы, книги и игры, создавайте список просмотра и чтения, и
              получайте персонализированные рекомендации, основанные на ваших интересах.
            </p>
          </div>
          <div class="swiper-container features-container">
            <swiper class="swiper-wrapper" :loop="true" :speed="800" :modules="modules" :autoplay="{delay: 2000}">
              <swiper-slide class="swiper-slide">
                <div class="feature box">
                  <h3>Ведение списков</h3>
                  <p>Создавайте и управляйте списками фильмов, книг и игр, чтобы всегда быть в курсе своих
                    предпочтений.</p>
                  <img src="~@/assets/main-page-images/list-ico.svg" alt="Формирование рекомендаций">
                </div>
              </swiper-slide>
              <swiper-slide class="swiper-slide">
                <div class="feature box">
                  <h3>Рекомендации</h3>
                  <p>Получайте персонализированные рекомендации на основе ваших интересов и
                    предпочтений.</p>
                  <img src="~@/assets/main-page-images/recommend.svg" alt="Формирование рекомендаций">
                </div>
              </swiper-slide>
              <swiper-slide class="swiper-slide">
                <div class="feature box">
                  <h3>Коллекция контента</h3>
                  <p>Откройте для себя бесконечный мир развлечений через нашу обширную коллекцию.</p>
                  <img src="~@/assets/main-page-images/library.svg" alt="Формирование рекомендаций">
                </div>
              </swiper-slide>
            </swiper>

          </div>
        </div>

        <div class="block-row" style="justify-content: center">
          <div class="content-header">Популярные фильмы</div>
          <a class="move-content-link" @click="$router.push({path: '/movies'})"><span>Открыть фильмы</span></a>
        </div>

        <div class="swiper-container contents">
          <!-- Additional required wrapper -->
          <swiper class="swiper-wrapper" :modules="modules" :navigation="navigation" :speed="600">
            <div class="buttons">
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>
            <swiper-slide class="swiper-slide">
              <h1>Переводчик</h1>
              <p>Сержант Джон Кинли едва не погиб на войне в Афганистане: его спас местный переводчик Ахмед, вытащив
                раненым из засады врага. Джону удалось вернуться домой, но Ахмед не получил обещанного убежища. Теперь ему
                и его близким грозит смертельное преследование.
                <br>
                <br>
                В ролях: Джейк Джилленхол, Дар Салим, Александр Людвиг, Энтони Старр
              </p>
              <form class="login-form" style="flex-direction: row">
                <p>
                  <input type="submit" value="Открыть" @click.stop.prevent="$router.push({path: '/current-film/1'})"/>
                </p>
                <p>
                  <input type="submit" value="Добавить в список" />
                </p>
              </form>
              <img style="object-position: 0 0" class="img-movie"
                src="https://pic.rutubelist.ru/video/50/57/50574de55e0462be67a3129a50353e50.jpg"
                alt="Формирование рекомендаций">
            </swiper-slide>
            <swiper-slide class="swiper-slide">
              <h1>Джон Уик 4</h1>
              <p>Чтобы обрести свободу, киллер-изгой бросает вызов Правлению кланов. Самая зрелищная часть стильной
                экшен-саги
                <br>
                <br>
                В ролях: Киану Ривз, Донни Йен, Билл Скарсгард
              </p>
              <form class="login-form" style="flex-direction: row">
                <p>
                  <input type="submit" value="Открыть" @click.stop.prevent="$router.push({path: '/current-film/1'})"/>
                </p>
                <p>
                  <input type="submit" value="Добавить в список" />
                </p>
              </form>
              <img style="object-position: 0 0" class="img-movie"
                src="https://wallpapershome.ru/images/pages/pic_h/24447.jpg" alt="Формирование рекомендаций">

            </swiper-slide>
            <swiper-slide class="swiper-slide">
              <h1>Кунг-фу жеребец</h1>
              <p>«Кунг-фу жеребец» – двухчасовая драма о тяжелой жизни каскадера. Когда-то герой был суперзвездой, а
                теперь обанкротился, поругался с семьей и поселился в конюшне. Надежду дает верный конь, но и того вот-вот
                отберут злые банкиры.
                <br>
                <br>
                В ролях: Джеки Чан
              </p>
              <form class="login-form" style="flex-direction: row">
                <p>
                  <input type="submit" value="Открыть" @click.stop.prevent="$router.push({path: '/current-film/1'})"/>
                </p>
                <p>
                  <input type="submit" value="Добавить в список" />
                </p>
              </form>
              <img class="img-movie"
                src="https://avatars.dzeninfra.ru/get-zen_doc/9428044/pub_6450977e28852a1ba5c37a1d_64509995c6419c1f9c32b0c0/scale_1200"
                alt="Формирование рекомендаций">
            </swiper-slide>
          </swiper>

        </div>

        <div class="block-row" style="justify-content: center">
          <div class="content-header">Популярные игры</div>
          <a class="move-content-link" @click="$router.push({path: '/games'})"><span>Открыть игры</span></a>
        </div>

        <div class="swiper-container contents">
          <!-- Additional required wrapper -->
          <swiper class="swiper-wrapper" :modules="modules" :navigation="navigation" :speed="600">
            <div class="buttons">
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>
            <swiper-slide class="swiper-slide">
              <h1>Age of Wonders 4</h1>
              <p>Правьте волшебным королевством в Age of Wonders 4! Вас ждёт фирменное сочетание 4X-стратегии с пошаговыми
                тактическими сражениями. Расширяйте свою империю ход за ходом!
                <br>
                <br>
              </p>
              <form class="login-form" style="flex-direction: row">
                <p>
                  <input type="submit" value="Открыть" @click.stop.prevent="$router.push({path: '/current-game/1'})"/>
                </p>
                <p>
                  <input type="submit" value="Добавить в список" />
                </p>
              </form>
              <img class="img-movie"
                src="https://code4game.ru/upload/resize_cache/iblock/3ed/1600_1200_0/ln7nwq1lhqph3zxe4oo2i9z38rzra0vy.jpg"
                alt="Формирование рекомендаций">
            </swiper-slide>
            <swiper-slide class="swiper-slide">
              <h1>The Outlast Trials</h1>
              <p>Red Barrels приглашает вас испытать ошеломляющий ужас, на этот раз с друзьями. Независимо от того,
                пройдете ли вы испытания в одиночку или в команде, если вы продержитесь достаточно долго и пройдете курс
                терапии, Муркофф с радостью позволит вам уйти ... но будете ли вы прежними?
                <br>
                <br>
              </p>
              <form class="login-form" style="flex-direction: row">
                <p>
                  <input type="submit" value="Открыть" @click.stop.prevent="$router.push({path: '/current-game/1'})"/>
                </p>
                <p>
                  <input type="submit" value="Добавить в список" />
                </p>
              </form>
              <img style="object-position: 0 0" class="img-movie"
                src="https://droidnews.ru/img/2022/august/novuyu-the-outlast-trials-pokazhut-na-gamescom-2022_19-08-22-23-15-38.jpg"
                alt="Формирование рекомендаций">

            </swiper-slide>
            <swiper-slide class="swiper-slide">
              <h1>Cities: Skylines II</h1>
              <p>Начните строить город с нуля и превратите его в процветающий мегаполис. Такого симулятора строительства
                еще не было! Cities: Skylines II — это живая экономическая система, позволяющая создать целый мир.
                <br>
                <br>
                Дата выхода: 24 окт. 2023
              </p>
              <form class="login-form" action="pages/film-page.html" style="flex-direction: row">
                <p>
                  <input type="submit" value="Открыть" @click.stop.prevent="$router.push({path: '/current-game/1'})"/>
                </p>
                <p>
                  <input type="submit" value="Добавить в список" />
                </p>
              </form>
              <img style="object-position: 0 0" class="img-movie"
                src="https://static.actugaming.net/media/2023/03/Cities-Skylines-2-Ann_03-06-23-1536x864.jpg"
                alt="Формирование рекомендаций">
            </swiper-slide>
          </swiper>

        </div>

        <div class="block-row" style="justify-content: center">
          <div class="content-header">Бестстеллеры литературы</div>
          <a class="move-content-link" @click="$router.push({path: '/books'})"><span>Открыть книги</span></a>
        </div>

        <div class="swiper-container contents">
          <!-- Additional required wrapper -->

          <swiper class="swiper-wrapper" :modules="modules" :navigation="navigation" :speed="600">
            <swiper-slide class="swiper-slide">
              <h1>Стальные боги</h1>
              <p>Когда боги примут чью-то сторону, победитель впишет свое имя в скрижали небес…
                <br>
                <br>
                Автор: Замиль Ахтар
              </p>
              <form class="login-form" style="flex-direction: row">
                <p>
                  <input type="submit" value="Открыть" @click.stop.prevent="$router.push({path: '/current-book/1'})" />
                </p>
                <p>
                  <input type="submit" value="Добавить в список" />
                </p>
              </form>
              <img style="object-position: 0 35%" class="img-movie"
                src="https://sun9-72.userapi.com/impg/BVsKgFmQQKsRv7nN2Fb_1EUuXgYTfKDeMEUA0Q/EfIswaygk40.jpg?size=1280x891&quality=95&sign=041ba6371f3e4b9e0f14f63775a5b8c5&c_uniq_tag=39jlqmksFwbPNWZRleQR_NYgYj1PCbz_fltu96dctOk&type=album"
                alt="Формирование рекомендаций">
            </swiper-slide>
            <swiper-slide class="swiper-slide">
              <h1>Задача трех тел</h1>
              <p>Они придут, и Земля вновь станет гармоничным и процветающим миром…
                <br>
                <br>
                Автор: Лю Цысинь
              </p>
              <form class="login-form" style="flex-direction: row">
                <p>
                  <input type="submit" value="Открыть" @click.stop.prevent="$router.push({path: '/current-book/1'})" />
                </p>
                <p>
                  <input type="submit" value="Добавить в список" />
                </p>
              </form>
              <img style="object-position: 10px top" class="img-movie" src="~@/assets/main-page-images/three-body.jpg"
                alt="Формирование рекомендаций">

            </swiper-slide>
            <swiper-slide class="swiper-slide">
              <h1>Задача трех тел</h1>
              <p>Они придут, и Земля вновь станет гармоничным и процветающим миром…
                <br>
                <br>
                Автор: Лю Цысинь
              </p>
              <form class="login-form" style="flex-direction: row">
                <p>
                  <input type="submit" value="Открыть" @click.stop.prevent="$router.push({path: '/current-book/1'})"/>
                </p>
                <p>
                  <input type="submit" value="Добавить в список" />
                </p>
              </form>
              <img style="object-position: 10px top" class="img-movie" src="~@/assets/main-page-images/three-body.jpg"
                alt="Формирование рекомендаций">

            </swiper-slide>
            <div class="buttons">
              <div ref="prev" class="swiper-button-prev"></div>
              <div ref="next" class="swiper-button-next"></div>
            </div>
          </swiper>

        </div>

        <form class="login-form" style="flex-direction: row">
          <p>
            <input type="submit" value="Вход" @click.stop.prevent="$router.push({path: '/login'})"/>
          </p>
          <p>
            <input type="submit" value="Регистрация" @click.stop.prevent="$router.push({path: '/registration'})"/>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

export default {

  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      swiperOptions: {
        // cycle
        loop: true,
        // Indicator
        pagination: {
          el: '.swiper-pagination',
          clickable: true 
        },
        // Direction: horizontal or portrait vertical
        direction: 'horizontal',
        // Autoplay
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        // Switching speed
        speed: 600,
        // Left and right arrow buttons
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay]
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~@/assets/css/main-page.scss";
@import "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
</style>
