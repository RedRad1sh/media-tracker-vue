<template>
 <div class="content-header">{{ rowTitle }}</div>
 <div class="container-row">
   <div class="chart-block" v-for="(obj, index) in chartData" :key="index">
     <div class="chart-title">{{ Object.values(obj)[0].actions}}</div>
     <DoughnutChart :chartData="obj" :chartOptions="chartOptions"/>
   </div>
 </div>
</template>
<script>
import DoughnutChart from './DoughnutChart.vue';

export default {
components: {
    DoughnutChart
  },

props: {
    chartData: {
      type: Array,
      required: true,
    },
    rowTitle: {
      type: String,
      required: true,
    },
}
}
</script>
<style scoped>
   @import "~@/assets/css/profile.scss";
</style>