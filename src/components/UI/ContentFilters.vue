<template>
  <div class="collection-filters" data-base_path="/animes">
    <div class="text-block">
      <ContentFiltersDuration :durations="durations"/>
    </div>
    <div class="text-block -text-block mylist-text-block"><span
        class="filter text-block-filter item-sign"></span>
      <div class="subheadline">Список</div>
      <ul>
        <li v-for="list in lists" :key="list">
          <input autocomplete="off" type="checkbox">
          <label class="genre-ru">{{ list }}</label>
        </li>
      </ul>
    </div>
    <div class="text-block">
      <div class="subheadline">Год</div>
      <ul class="filter-group">
        <label class="year-filter">
          <input class="year-input" placeholder="от" maxlength="4" type="text">
        </label>
        <label class="year-filter">
          <input class="year-input" placeholder="до" maxlength="4" type="text">
        </label>
      </ul>
    </div>
    <div class="text-block">
      <div class="subheadline">Оценка</div>
      <div class="block-row">
        <input type="range" value="" min="0" max="10" oninput="rangevalue.value=value"/>
        <output id="rangevalue">-</output>
      </div>
    </div>
    <div class="text-block">
      <div class="subheadline">Жанры</div>
      <div class="b-spoiler"><label style="display: none;">Показать список</label>
        <ul>
          <li v-for="genre in genres" :key="genre" class="genre">
            <input autocomplete="off" type="checkbox" @change="addGenre(genre)">
            <label class="genre-label">{{ genre }}</label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ContentFiltersDuration from '@/components/UI/ContentFiltersDuration.vue';

const durations = [
  {
    name: 'Короткие',
    dataValue: 'tv_13',
    originalTitle: '~13 эпизодов'
  },
  {
    name: 'Средние',
    dataValue: 'tv_24',
    originalTitle: '~24 эпизодов'
  },
  {
    name: 'Длинные',
    dataValue: 'tv_48',
    originalTitle: '~30 эпизодов'
  }
];

export default {
  name: "ContentFilters",
  components: { ContentFiltersDuration },
  props: {
    genres: {
      type: Array
    },
    lists: {
      type: Array
    }
  },
  data() {
    return {
      booksData: [],
      durations: durations
    }
  },
  methods: {
    addGenre(genre) {
      this.$emit("addGenre", genre);
    }
  }
}
</script>

<style scoped>
.genre {
  display: flex;
  align-items: start;
}

.genre-label {
  display: block;
  width: 150px;
  overflow-wrap: anywhere;
}
</style> 