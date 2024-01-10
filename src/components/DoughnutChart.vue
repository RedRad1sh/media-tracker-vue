<template>
  <div>
    <Doughnut :data="getDataForChart" :options="chartOptions" ref="myChart" />
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
      },
      deep: true,
    },
  },

  computed:{ 
    getDataForChart(){
      return this.getChartData(Object.values(this.chartData)[0].genres, Object.values(this.chartData)[0].count)
    }
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
      //  console.log(this.$refs.myChart.chart.options.plugins.title.text);
      }
    },
  },
};
</script>
