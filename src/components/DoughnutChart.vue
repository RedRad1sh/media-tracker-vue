<template>
  <div>
    <Doughnut :data="chartData" :options="chartOptions" ref="myChart" />
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
    chartOptions: {
      type: Object,
    },
    chartTitle: {
      type: String,
    },
  },
  watch: {
    chartData: {
      handler(newChartData) {
        this.updateChart(newChartData);
      },
      deep: true,
    },
  },
  methods: {
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
