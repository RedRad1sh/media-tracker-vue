<template lang="">
    <div class="block">
      <MenuComponent id="menu-include" active-element="2" />
      <div class="content-main">
        <div class="block-row" style="justify-content: center">
          <div class="content-header">{{ gameobj.title }}</div>
        </div>
        <div class="obj-first-row">
          <div class="obj-img-element">
            <img
              :src= gameobj.image_url
              alt="IMAGE2415"
              class="obj-image"
            />
          </div>
          <div class="obj-info-element">
            <div class="info-header">Информация</div>
            <div class="obj-info">
              <InfoforCurrentPage :titles="gameinfo" :values="gameInfoObj" />
            </div>
          </div>
        </div>
        <div class="obj-first-row">
          <div class="obj-rating-element">
            <div class="info-header">Рейтинги</div>
            <div class="obj-info">
              <InfoforCurrentPage :typeinfo="'RATING'" :titles="gamerating" :values="gameRatingObj" />
            </div>
          </div>
          <div class="obj-rating-element">
          <div class="info-header">Действия</div>
            <div class="obj-actions">
              <span class="text-format">
                Оценка:
              </span>
              <SelectionMark id="rate"> </SelectionMark>
            </div>
            <div class="obj-actions">
              <span class="text-format">
                Списки:
              </span>
              <SelectionContent :ObjectType="type"> </SelectionContent>
            </div>
          </div>
        </div>
        <div class="obj-first-row">
        <div class="obj-description-element">
          <div class="info-header">Описание</div>
            <div class="text-block">
              <div class="game-block" v-html="gameobj.description">
            </div>
          </div>
        </div>
      </div>
      <div class="obj-first-row">
          <div class="obj-rating-element">
            <div class="info-header">Cистемные требования</div>
            <div class="row-rec">
                <div class="block-pc-rec"  v-html="gameobj.pc_req_min"> </div>
                <div class="block-pc-rec"  v-html="gameobj.pc_req_rec" ></div>       
              </div>   
          </div>
        </div>
      <div class="obj-first-row">
          <div class="obj-description-element">
            <div class="info-header">Трейлер</div>
            <iframe width="100%" height="720px" :src="gameobj.video" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
        <div class="create-review">
          <div class="create-review-container">
            <label class="text-block text-block-otz" for="review-field"
              >Оставьте отзыв к фильму:</label
            >
            <br />
            <textarea
              id="review-field"
              class="frame3-frame-inputlabels"
            ></textarea>
          </div>
          <button
            id="review-button"
            class="button-create-review"
            onclick="createMessageElement()"
          >
            Опубликовать
          </button>
        </div>
        
        <div class="obj-first-row">
          <div class="review-container">
            <div class="user-info">
              <img
                class="user-img"
                src="https://avtozaryad.ru/local/templates/main/assets/images/user.png"
              />
              <div class="user-name-rate">
                <div class="user-name">@username</div>
                <div class="user-rate">Оценка: 7/10</div>
              </div>
            </div>
            <span class="review-text"></span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import MenuComponent from "@/components/navigation/MenuComponent.vue";
  import SelectionMark from "@/components/UI/SelectionMark.vue";
  import SelectionContent from "@/components/UI/SelectionContent.vue";
  import InfoforCurrentPage from "@/components/InfoforCurrentPage.vue";
  
  export default {
    name: "CurrentFilm",
    components: { MenuComponent, SelectionMark, SelectionContent, InfoforCurrentPage },
  
    data() {
      return {
        type: "GAME",
        gameobj: {
          steam_app_id: 4647040,
          type: "GAME",
          image_url: "https://cdn.akamai.steamstatic.com/steam/apps/1129580/header_alt_assets_29.jpg?t=1702658029",
          title: "Medieval Dynasty",
          description:
            "<h1>Bundles with friends</h1><p><a href=\"https://store.steampowered.com/bundle/36623/Medieval_Dynasty__Timberborn/\" target=\"_blank\" rel=\"\"  ><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/1129580/extras/header_586x192__4_.jpg?t=1702658029\" /></a><br><a href=\"https://store.steampowered.com/bundle/16211/Medieval_Dynasty__Digital_Supporter_Edition/\" target=\"_blank\" rel=\"\"  ><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/1129580/extras/header_586x192__3_.jpg?t=1702658029\" /></a></p><br><h1>План развития</h1><p><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/1129580/extras/Roadmap_Coop-Update_EN_610.png?t=1702658029\" /></p><br><h1>Check out other games</h1><p><a href=\"https://store.steampowered.com/app/1702010/Sengoku_Dynasty/\" target=\"_blank\" rel=\"\"  id=\"dynamiclink_0\" >https://store.steampowered.com/app/1702010/Sengoku_Dynasty/</a><br><a href=\"https://store.steampowered.com/app/2191500/Vampire_Dynasty/\" target=\"_blank\" rel=\"\"  id=\"dynamiclink_1\" >https://store.steampowered.com/app/2191500/Vampire_Dynasty/</a><br><a href=\"https://store.steampowered.com/app/1610520/Serum/\" target=\"_blank\" rel=\"\"  id=\"dynamiclink_2\" >https://store.steampowered.com/app/1610520/Serum/</a></p><br><h1>Об игре</h1><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/1129580/extras/intro.gif?t=1702658029\" /><br><br><strong>Начните с малого: выберите клочок земли и постройте дом. Занимайтесь обычным земледелием или охотой и набирайтесь опыта. Постепенно вы обретете нужные навыки и станете главой процветающего города. Ваш дом тоже пройдет путь от простой лачуги до богатой фермы: меняйте внешний вид, достраивая и улучшая его. Убедите людей поселиться на вашей земле. Династия не должна прерваться — найдите свою любовь и создайте семью. Играйте в одиночку или объединитесь с друзьями, чтобы исследовать каждый уголок сурового, но прекрасного средневекового мира в режиме кооперации.</strong><br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/1129580/extras/build.gif?t=1702658029\" /><br><br>Огромный открытый мир ждет вас. Будь то жаркое лето или морозная зима — следите, чтобы ни вы, ни ваши люди ни в чем не нуждались. <br><br>Medieval Dynasty обязательно заинтересует вас уникальным сочетанием жанров и невероятной атмосферой Средневековья!<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/1129580/extras/hunt.gif?t=1702658029\" /><br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/1129580/extras/01_PNG_RU.png?t=1702658029\" /><br>Бросьте вызов суровым условиям! Смерть от голода или жажды не была редкостью — следите, чтобы вас и ваших людей не постигла та же участь! Будьте готовы ко всему: охотьтесь на диких зверей, выращивайте еду и торгуйте ресурсами.<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/1129580/extras/02_PNG_RU.png?t=1702658029\" /><br>Все в ваших руках. Без топора, как известно, по дрова не ходят. Для любого промысла: охоты, лесозаготовки, земледелия, строительства — нужны инструменты. Главное, следите за их состоянием. Вы же не хотите оказаться в глуши со сломанной киркой?<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/1129580/extras/03_PNG_RU.png?t=1702658029\" /><br>Век живи — век учись. Развивайте своего персонажа в конкретной сфере или станьте мастером на все руки, общаясь с другими героями, заботясь о семье, исследуя мир и выполняя разные поручения.<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/1129580/extras/04_PNG_RU.png?t=1702658029\" /><br>Здесь будет город стоять! Представьте, что вы зодчий, строитель и градоначальник в одном лице. Продумывайте расположение зданий, управляйте жителями, собирайте ресурсы, производите товары и торгуйте ими, чтобы ваше поселение росло и процветало.<br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/1129580/extras/harvest.gif?t=1702658029\" /><br><br><strong><i>Перед вами целый средневековый мир — опасный, но от того не менее прекрасный.</i></strong><br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/1129580/extras/city.gif?t=1702658029\" /><br><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/1129580/extras/05_PNG_RU.png?t=1702658029\" /><br><ul class=\"bb_ul\"><li><strong>Реалистичный открытый мир.</strong> Исследуйте две огромные карты: «Долина» (одиночная игра) и «Старица» (одиночная и совместная игра), наслаждаясь красотами.<br></li><li><strong>Совместная многопользовательская игра.</strong> Пригласите до 4 друзей и разделите веселье с ними.<br></li><li><strong>Настройка персонажа.</strong> В редакторе персонажа вы сможете детально настроить свой аватар.<br></li><li><strong>Динамичная реалистичная среда.</strong> Четыре времени года, смена дня и ночи, разная погода — и все это при активном взаимодействии с окружающей средой, будь то рубка деревьев или исследование пещер.<br></li><li><strong>Разнообразие зданий и интерьеров.</strong> Преображайте свое поселение с более чем 25 зданиями: от скромных хижин до добротных каменных домов. А затем украшайте их мебелью и всякими мелочами — больше 120 предметов в вашем распоряжении. <br></li><li><strong>Изготовление предметов.</strong> Вы сможете произвести более 300 изделий: оружие, инструменты, мебель и одежду. <br></li><li><strong>Взаимодействие с дикой природой.</strong> Вам повстречаются волки, кабаны, олени, зубры и другие лесные обитатели.<br></li><li><strong>Механики выживания.</strong> Следите за уровнем еды, воды, здоровья и выносливости. <br></li><li><strong>Дерево навыков.</strong> Покупайте новые навыки и развивайте персонажа. <br></li><li><strong>Уникальные события.</strong> Участвуйте в динамичных событиях и принимайте решения, которые повлияют на игру. <br></li><li><strong>Задания и экономика.</strong> Выполняйте различные задания, торгуйте и развивайте экономику. <br></li><li><strong>Общение и создание семьи.</strong> Развивайте отношения с неигровыми персонажами и создайте семью. Может, вы даже испытаете радость родительства в игре и сумеете передать свое наследие следующим поколениям.<br></li><li><strong>Интерактивное окружение.</strong> Эти широкие просторы будут меняться в соответствии с вашими действиями! Рубите лес, собирайте ресурсы и исследуйте загадочные пещеры. За каждым поворотом вас может ждать нечто удивительное.</li></ul><br><img src=\"https://cdn.akamai.steamstatic.com/steam/apps/1129580/extras/family.gif?t=1702658029\" />",
          metcrt_rating: 78,
          user_rating: 5,
          release_date: null,
          genres: "Экшены, Приключенческие игры, Инди, Ролевые игры, Симуляторы",
          pc_req_min: "<strong>Минимальные:</strong><br><ul class=\"bb_ul\"><li><strong>ОС:</strong> Windows 10, 11<br></li><li><strong>Процессор:</strong> Intel Core i5 @ 3.3GHz or AMD @ 3.5GHz<br></li><li><strong>Оперативная память:</strong> 8 GB ОЗУ<br></li><li><strong>Видеокарта:</strong> DirectX 11 compatible GPU, 6GB dedicated VRAM (GeForce GTX 1060 / Radeon RX 580)<br></li><li><strong>DirectX:</strong> версии 11<br></li><li><strong>Сеть:</strong> Широкополосное подключение к интернету<br></li><li><strong>Место на диске:</strong> 10 GB<br></li><li><strong>Дополнительно:</strong> Though not required, SSD for storage and 16 GB of memory is recommended</li></ul>" ,
          pc_req_rec: "<strong>Рекомендованные:</strong><br><ul class=\"bb_ul\"><li><strong>ОС:</strong> Windows 11<br></li><li><strong>Процессор:</strong> Intel Core i5/i7 @ 4GHz or Ryzen 5 @ 4GHz<br></li><li><strong>Оперативная память:</strong> 16 GB ОЗУ<br></li><li><strong>Видеокарта:</strong> DirectX 12 compatible GPU, 8GB dedicated VRAM (GeForce GTX 1660 / Radeon RX 590)<br></li><li><strong>DirectX:</strong> версии 12<br></li><li><strong>Сеть:</strong> Широкополосное подключение к интернету<br></li><li><strong>Место на диске:</strong> 10 GB<br></li><li><strong>Дополнительно:</strong> Though not required, SSD for storage is recommended</li></ul>",
          developers: "Render Cube",
          video: "http://cdn.akamai.steamstatic.com/steam/apps/256987375/movie_max_vp9.webm?t=1701962327",
        },
        gameinfo: ['Тип:', 'Дата выхода:', 'Разработчик:', 'Жанры:'],
        gamerating: ['Оценка Metacritic:', 'Оценка MediaTracker:'],
      };
    },
  
    computed:{



      gameInfoObj() {
        return ['Игра', this.gameobj.release_date, this.gameobj.developers, this.gameobj.genres, ];
      },
  
      gameRatingObj() {
        return [this.gameobj.metcrt_rating, this.gameobj.user_rating];
      },
    },

    methods: {
      getGmebyId(){
        console.log(this.$router.currentRoute.path);
      },
    },
  
  };
  </script>
  
  <style scoped>


  @import "~@/assets/css/cur-obj-page.scss";
  @import "~@/assets/css/review-messages.scss";
  </style>
  
