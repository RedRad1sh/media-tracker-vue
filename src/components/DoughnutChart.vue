<template>
  <div v-if="isNoEmpty"> 
    <Doughnut :data="getDataForChart" :options="chartOptions" ref="myChart" />
  </div>
  <div class="not-found-block" v-else>
    Данные не найдены. 
    <br> 
    Добавте что-нибудь в список.
    <img src="../assets/general_assets/defolt_chart.png" alt="" />
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);
import { Doughnut } from 'vue-chartjs';

export default {
  components: {
    Doughnut
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartTitle: {
      type: String,
    },
  },

  data() {
    return {
      isNoEmpty: true,
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
          fullSize: true,
          itemWrap: true,
          labels: {
            boxWidth: 15,
            padding: 5,
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

  watch: {
    chartData: {
      handler(newChartData) {
        this.updateChart(newChartData);
        this.updateSost();
      },
      deep: true,
    },
  },

  computed:{ 
    getDataForChart(){
      return this.getChartData(Object.values(this.chartData)[0].genres, Object.values(this.chartData)[0].count)
    }
  },

  mounted() {
    this.updateSost();
  },

  methods: {
    getChartData(labels, data ){
      return { labels: labels,
               datasets: [{ data: data, },],
      };
    },
    updateChart(newChartData) {
      if (this.$refs.myChart) {
        this.$refs.myChart.chart.data = newChartData;
        this.$refs.myChart.chart.options = this.chartOptions;
        this.$refs.myChart.chart.options.plugins.title.text = this.chartTitle;
      }
    },
    updateSost(){
      const chartDataValues = Object.values(this.chartData)[0];
      if (chartDataValues && chartDataValues.count) {
        this.isNoEmpty = (chartDataValues.count.length > 0) ? true : false  ;
      }
    }
  },
};
</script>

<style scoped>
  .not-found-block{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items:center;
    gap: 10px;
    text-align: center;
    color: white;
    font-size: 16px;
  }
  .not-found-block img{
    width: 180px;
    height: 180px;
    border-color: rgb(129, 156, 255);
    border-style: solid;
    border-radius: 270px;
    -o-object-fit: cover;
    object-fit: cover;
  }
</style>
