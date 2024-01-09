<template>
 <div class="content-header">{{ rowTitle }}</div>
 <div class="container-row">
   <div class="chart-block" v-for="(obj, index) in chartData.data" :key="index">
     <div class="chart-title">{{ chartData.actions[index] }}</div>
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
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            align: 'start',
            display: true,
            font: {
              size: 24,
              family: 'sans-serif',
            },
            color: 'white',
         },
         legend: {
          position: "right",
          labels: {
            font: {
              size: 14,
            },
            color: "white",
          },    
         },
       },
      },
    };
  },

props: {
    chartData: {
      type: Object,
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