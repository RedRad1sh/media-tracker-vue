<template>
  <table class="table">
    <thead>
    <tr>
      <th class="cell-header">#</th>
      <th class="cell-header header-name">Название</th>
      <th class="cell-header">Режиссер</th>
      <th class="cell-header">Жанр</th>
      <th class="cell-header">Рейтинг</th>
      <th class="cell-header">Оценка</th>
      <th class="cell-header">Действия</th>
      <th class="cell-header">Удалить</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="(film, index) in content" :key="film.id">
        <td class="cell-value number">{{ index + 1 }}</td>
        <td class="cell-value"><a href="film-page.html">{{ film.name }}</a></td>
        <td class="cell-value"><span>{{ film.author }}</span></td>
        <td class="cell-value"><span>{{ film.genre }}</span></td>
        <td class="cell-value rate"><span>{{ film.rating }}</span></td>
        <td class="cell-value rate">
          <label>
            <select v-model="film.userRate">
              <option v-for="index in 10" :key="index">{{ index }}</option>
            </select>
          </label>
        </td>
        <td class="cell-value">
          <label>
            <select v-model="film.statusType">
              <option v-for="index in 3"  :value="index - 1" :key="index">{{ statuses[index - 1] }}</option>
            </select>
          </label>
        </td>
        <td class="cell-value number" style="color:red;cursor:pointer">X</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ContentTableList",
  props: {
    content: {
      type: Array,
      required: true
    },
    statuses: []
  },
  data() {
    return {
      selectedStatusId: null
    }
  }
}
</script>

<style scoped>

</style>