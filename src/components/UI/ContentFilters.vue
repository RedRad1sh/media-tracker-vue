<template>
  <div class="collection-filters" data-base_path="/animes">
    <div v-if="showDurations" class="text-block">
      <div class="subheadline">Длительность</div>
      <ul class="kinds ">
        <li v-for="duration in durations" :key="duration.name" class="sub">
          <input autocomplete="off" type="checkbox" @change="changeDuration(duration.type)">{{duration.name}}
          <div class="tooltip">{{ duration.tooltip }}</div>
        </li>
      </ul>
    </div>
    <div class="text-block -text-block mylist-text-block"><span
        class="filter text-block-filter item-sign"></span>
      <div class="subheadline">Список</div>
      <ul>
        <li v-for="list in lists" :key="list">
          <input autocomplete="off" type="checkbox" @change="changeList(list)">
          <label class="genre-ru">{{ list }}</label>
        </li>
      </ul>
    </div>
    <div class="text-block">
      <div class="subheadline">Год</div>
      <ul class="filter-group">
        <label class="year-filter">
          <input
              class="year-input"
              placeholder="от"
              maxlength="4"
              type="text"
              v-model="yearFrom"
              @change="changeYearFrom()"
          >
        </label>
        <label class="year-filter">
          <input
              class="year-input"
              placeholder="до"
              maxlength="4"
              type="text"
              v-model="yearTo"
              @change="changeYearTo()"
          >
        </label>
      </ul>
    </div>
    <div class="text-block">
      <div class="subheadline">Оценка</div>
      <div class="block-row">
        <input type="range" min="0" max="10" v-model="rate" @change="changeRate()" />
        <output :value="rate">-</output>
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
export default {
  name: "ContentFilters",
  props: {
    genres: {
      type: Array
    },
    lists: {
      type: Array
    },
    showDurations: {
      type: Boolean
    },
    durations: {
      type: Array
    }
  },
  data() {
    return {
      booksData: [],
      rate: '-',
      yearFrom: undefined,
      yearTo: undefined
    }
  },
  methods: {
    addGenre(genre) {
      this.$emit("addGenre", genre);
    },
    changeRate() {
      this.$emit("changeRate", this.rate);
    },
    changeYearFrom() {
      this.$emit("changeYearFrom", this.yearFrom);
    },
    changeYearTo() {
      this.$emit("changeYearTo", this.yearTo);
    },
    changeDuration(type) {
      this.$emit("changeDuration", type);
    },
    changeList(list) {
      this.$emit("changeList", list);
    },
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

.sub .tooltip {
  margin-left: 20px;
  visibility: hidden;
  min-width: 120px;
  max-width: 180px;
  background-color: var(--dl-half-transparent-5);
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 999;
}

.sub:hover .tooltip {
  visibility: visible;
}
</style> 