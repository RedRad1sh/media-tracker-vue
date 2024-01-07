<template>
  <table class="table">
    <thead>
    <tr>
      <th class="cell-header">#</th>
      <th class="cell-header header-name">Название</th>
      <th class="cell-header">{{tableHeaderUniq}}</th>
      <th class="cell-header">Жанры</th>
      <th class="cell-header">Рейтинг</th>
      <th class="cell-header">Оценка</th>
      <th class="cell-header">Действия</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="(obj, index) in content" :key="obj.content_id.const_content_id">
        <td class="cell-value number">{{ index + 1 }}</td>
        <td  class="cell-value"><a @click="this.$router.push({ path: `/current-${obj.content_type.toLowerCase()}/${obj.content_id.const_content_id}` })">{{ obj.content_id.title }}</a></td>

        <td v-if="obj.content_type === 'Movie'" class="cell-value"><span>{{ obj.content_id.directors }}</span></td>
        <td v-else-if="obj.content_type === 'Game'" class="cell-value"><span>{{ obj.content_id.developers }}</span></td>
        <td v-else-if="obj.content_type === 'Book'" class="cell-value"><span>{{ obj.content_id.authors }}</span></td>

        <td v-if="obj.content_type !== 'Book'" class="cell-value"><span>{{ obj.content_id.genres }}</span></td>
        <td v-else class="cell-value" ><span>{{ obj.content_id.categories_ru }}</span></td>

        <td class="cell-value rate"><span>{{ obj.content_id.user_rating }}</span></td>
        <td class="cell-value rate">
          <SelectionMark
              :contentType="obj.content_type"
              :contentId="obj.content_id.const_content_id"
          />
        </td>
        <td class="cell-value">
          <SelectionContent :ObjectType="obj.content_type"
                            :ObjectId="obj.content_id.const_content_id"
                            :ObjectAction="obj.action"
                            @selectChanged="callUpdateLists"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import SelectionMark from "@/components/UI/SelectionMark.vue";
import SelectionContent from "@/components/UI/SelectionContent.vue";

export default {
  name: "ContentTableList",
  components: {SelectionContent, SelectionMark},
  props: {
    content: {
      type: Array,
      required: true
    },
    statuses: [],
    tableHeaderUniq:{
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedStatusId: null,
    }
  },

  methods:{
    callUpdateLists() {
      this.$emit('updateInfoLists');
    },
  }
}
</script>

<style scoped>

</style>