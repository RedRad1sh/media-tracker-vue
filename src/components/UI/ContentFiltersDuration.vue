<template>
  <div class="subheadline">Длительность</div>
  <ul class="kinds ">
    <li v-for="duration in durations" :key="duration.name" class="sub" data-field="kind" data-value="{{duration.dataValue}}">
      <input autocomplete="off" type="checkbox">{{duration.name}}
      <span class="b-question b-tooltipped mobile" data-direction="top" original-title="{{duration.originalTitle}}"></span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ContentFiltersDuration",
  props: {
    durations: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>